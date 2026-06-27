import type { IBotAction, IBotAdapter, IBotMessage, IBotResponse } from '../types';
import {
  detectNavigationTarget,
  isNavigationQuery,
  navigationActionForPage,
} from '../siteNavigation';
import { StaticContentAdapter } from './staticAdapter';

function resolveEndpoint(apiUrl: string): string {
  const trimmed = apiUrl.replace(/\/$/, '');
  if (trimmed.endsWith('/chat')) return trimmed;
  return `${trimmed}/chat`;
}

/**
 * Calls the server-side chat API (Gemini proxy).
 * Falls back to static content when the API is unavailable.
 */
export class ApiBotAdapter implements IBotAdapter {
  readonly supportsAsync = true;

  private readonly fallback: StaticContentAdapter;
  private readonly endpoint: string;

  constructor(apiUrl: string, fallback: StaticContentAdapter) {
    this.endpoint = resolveEndpoint(apiUrl);
    this.fallback = fallback;
  }

  getAssistantName(): string {
    return this.fallback.getAssistantName();
  }

  getDisclaimer(): string {
    return this.fallback.getDisclaimer();
  }

  getWelcome(): IBotResponse {
    return this.fallback.getWelcome();
  }

  getQuickReplies() {
    return this.fallback.getQuickReplies();
  }

  matchQuickReply(id: string): IBotResponse {
    return this.fallback.matchQuickReply(id);
  }

  matchQuery(text: string): IBotResponse {
    return this.fallback.matchQuery(text);
  }

  async matchQueryAsync(
    text: string,
    history: Pick<IBotMessage, 'role' | 'content'>[] = [],
  ): Promise<IBotResponse> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: history.map((item) => ({
            role: item.role,
            content: item.content,
          })),
        }),
      });

      if (!response.ok) {
        return this.mergeWithStaticActions(text, this.fallback.matchQuery(text));
      }

      const payload = (await response.json()) as IBotResponse & { error?: string };
      if (!payload.content || payload.error) {
        return this.mergeWithStaticActions(text, this.fallback.matchQuery(text));
      }

      return this.mergeWithStaticActions(text, {
        content: payload.content,
        actions: payload.actions,
      });
    } catch {
      return this.fallback.matchQuery(text);
    }
  }

  private mergeWithStaticActions(text: string, response: IBotResponse): IBotResponse {
    const wantsNavigation = isNavigationQuery(text);
    const navigationTarget = wantsNavigation ? detectNavigationTarget(text) : undefined;

    const actions: IBotAction[] = wantsNavigation
      ? dedupeActions([
          ...(navigationTarget ? [navigationActionForPage(navigationTarget)] : []),
          ...(response.actions ?? []),
        ])
      : [];

    return {
      content: response.content,
      actions: actions.length > 0 ? actions : undefined,
    };
  }
}

function dedupeActions(actions: IBotAction[]): IBotAction[] {
  const seen = new Set<string>();
  return actions.filter((action) => {
    const key = `${action.type}:${action.href}:${action.label}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
