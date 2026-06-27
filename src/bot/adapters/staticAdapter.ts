import {
  buildKnowledgeIndex,
  getCareersSummaryText,
  getCollectionsSummaryText,
} from '../buildKnowledgeIndex';
import { getAllCollections } from '../../lib/collections';
import {
  detectNavigationTarget,
  isNavigationQuery,
  navigationActionForPage,
  buildNavigationFallbackContent,
} from '../siteNavigation';
import { findBestMatch } from '../matchQuery';
import { MATCH_SCORE_THRESHOLD } from '../constants';
import type {
  IBotAction,
  IBotAdapter,
  IBotConfig,
  IBotIntent,
  IBotResponse,
  IKnowledgeIndex,
  IQuickReply,
  ISalesChannel,
} from '../types';
import { SITE } from '../../content';

function resolveActionRef(ref: string, config: IBotConfig): IBotAction[] {
  if (ref.startsWith('link:')) {
    const href = ref.slice(5);
    return [{ type: 'link', label: linkLabel(href), href }];
  }

  if (ref.startsWith('navigate:')) {
    const href = ref.slice(9);
    return [{ type: 'navigate', label: linkLabel(href), href }];
  }

  if (ref.startsWith('mailto:')) {
    return [{ type: 'mailto', label: 'Send email', href: ref.slice(7) }];
  }

  if (ref.startsWith('tel:')) {
    return [{ type: 'tel', label: 'Call us', href: ref.slice(4) }];
  }

  switch (ref) {
    case 'showChannels':
      return buildChannelActions(config.salesChannels.channels);
    case 'showCollections':
      return getAllCollectionLinkActions();
    case 'showCareersSummary':
      return [{ type: 'navigate', label: 'View Careers', href: '/careers' }];
    case 'contactHandoff':
      return buildContactHandoffActions();
    default:
      return [];
  }
}

function getAllCollectionLinkActions(): IBotAction[] {
  return getAllCollections().map((collection) => ({
    type: 'link' as const,
    label: collection.name,
    href: `/shop/${collection.slug}`,
  }));
}

function buildChannelActions(channels: ISalesChannel[]): IBotAction[] {
  const enabled = channels.filter((channel) => channel.enabled && channel.href !== '#');
  if (enabled.length === 0) {
    return [
      {
        type: 'link',
        label: 'Browse collections',
        href: '/#categories',
      },
      ...buildContactHandoffActions(),
    ];
  }

  return enabled.map((channel) => ({
    type: 'external' as const,
    label: channel.label,
    href: channel.href,
  }));
}

function buildContactHandoffActions(): IBotAction[] {
  const actions: IBotAction[] = [
    { type: 'link', label: 'Contact page', href: '/contact' },
  ];

  if (SITE.contactEmail) {
    actions.push({
      type: 'mailto',
      label: 'Email us',
      href: `mailto:${SITE.contactEmail}`,
    });
  }

  if (SITE.contactPhoneTel) {
    actions.push({
      type: 'tel',
      label: SITE.contactPhone ?? 'Call us',
      href: `tel:${SITE.contactPhoneTel}`,
    });
  }

  return actions;
}

function linkLabel(href: string): string {
  if (href === '/contact') return 'Contact Us';
  if (href === '/careers') return 'View Careers';
  if (href === '/about') return 'Discover Our Story';
  if (href === '/about#mission') return 'Our Mission';
  if (href === '/#categories') return 'Explore Collections';
  if (href === '/') return 'Return Home';
  if (href.startsWith('/shop/')) {
    const slug = href.replace('/shop/', '');
    const collection = getAllCollections().find((item) => item.slug === slug);
    return collection ? `View ${collection.name}` : 'View Collection';
  }
  return 'Learn More';
}

function dedupeActions(actions: IBotAction[]): IBotAction[] {
  const seen = new Set<string>();
  return actions.filter((action) => {
    const key = `${action.type}:${action.href}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildResponseFromIntent(intent: IBotIntent, config: IBotConfig): IBotResponse {
  let content = intent.answer;

  if (intent.id === 'careers') {
    content = `${intent.answer}\n\n${getCareersSummaryText()}`;
  }

  if (intent.id === 'products') {
    content = `${intent.answer}\n\n${getCollectionsSummaryText()}`;
  }

  if (intent.id === 'buy' && config.salesChannels.note) {
    content = `${content}\n\n${config.salesChannels.note}`;
  }

  const actions = dedupeActions(
    (intent.actions ?? []).flatMap((ref) => resolveActionRef(ref, config)),
  );

  return { content, actions };
}

export class StaticContentAdapter implements IBotAdapter {
  private readonly index: IKnowledgeIndex;

  constructor(index: IKnowledgeIndex = buildKnowledgeIndex()) {
    this.index = index;
  }

  getAssistantName(): string {
    return this.index.config.assistantName;
  }

  getDisclaimer(): string {
    return this.index.config.disclaimer;
  }

  getWelcome(): IBotResponse {
    const { welcome, quickReplies } = this.index.config;
    return {
      content: `${welcome.title}\n\n${welcome.body}`,
      followUpQuickReplies: quickReplies,
    };
  }

  getQuickReplies(): IQuickReply[] {
    return this.index.config.quickReplies;
  }

  matchQuickReply(id: string): IBotResponse {
    const intent = this.index.config.intents.find((item) => item.id === id);
    if (intent) return buildResponseFromIntent(intent, this.index.config);

    const topic = this.index.topics.find((item) => item.id === id);
    if (topic) return this.buildTopicResponse(topic);

    return this.buildFallbackResponse();
  }

  matchQuery(text: string): IBotResponse {
    const trimmed = text.trim();
    if (!trimmed) return this.buildFallbackResponse();

    if (isNavigationQuery(trimmed)) {
      const navigationTarget = detectNavigationTarget(trimmed);
      if (navigationTarget) {
        return {
          content: buildNavigationFallbackContent(navigationTarget),
          actions: [navigationActionForPage(navigationTarget)],
        };
      }
    }

    const quickIntent = this.index.config.intents.find((intent) =>
      intent.keywords.some((keyword) => trimmed.toLowerCase().includes(keyword.toLowerCase())),
    );
    if (quickIntent) return buildResponseFromIntent(quickIntent, this.index.config);

    const topic = findBestMatch(trimmed, this.index.topics, MATCH_SCORE_THRESHOLD);
    if (topic) return this.buildTopicResponse(topic, trimmed);

    return this.buildFallbackResponse();
  }

  private buildTopicResponse(
    topic: IKnowledgeIndex['topics'][number],
    query = '',
  ): IBotResponse {
    const allActions = dedupeActions(
      (topic.actionRefs ?? []).flatMap((ref) => resolveActionRef(ref, this.index.config)),
    );
    const actions = isNavigationQuery(query)
      ? allActions
      : allActions.filter((action) => action.type !== 'navigate');
    return { content: topic.answer, actions: actions.length > 0 ? actions : undefined };
  }

  private buildFallbackResponse(): IBotResponse {
    const { fallback } = this.index.config;
    const actions = dedupeActions(
      fallback.actions.flatMap((ref) => resolveActionRef(ref, this.index.config)),
    );
    return {
      content: fallback.message,
      actions,
      followUpQuickReplies: this.getQuickReplies(),
    };
  }
}
