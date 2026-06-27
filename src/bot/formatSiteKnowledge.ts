import botJson from '../content/bot.json';
import {
  ABOUT,
  ABOUT_PAGE,
  BEST_SELLERS,
  CONTACT_PAGE,
  FEATURED_CATEGORIES,
  HERO,
  SITE,
  VALUES,
} from '../content';
import { getAllCollections } from '../lib/collections';
import type { IBotConfig } from './types';

type CoreValue = (typeof ABOUT_PAGE.mission.values)[number];

export function formatBrandIdentityAnswer(): string {
  return [
    `${SITE.name} is a Filipino beauty and wellness brand.`,
    SITE.tagline,
    SITE.description,
    '',
    HERO.body,
  ].join('\n');
}

export function formatPurposeAnswer(): string {
  return `Our purpose: ${ABOUT_PAGE.company.purposeBody}`;
}

export function formatWhyWeExistAnswer(): string {
  return ABOUT_PAGE.company.whyBody;
}

export function formatBrandStoryAnswer(): string {
  return `${ABOUT_PAGE.mission.storyLead} ${ABOUT_PAGE.mission.story}`;
}

export function formatVisionAnswer(): string {
  return `The vision of KGOLD is ${ABOUT_PAGE.mission.vision.body}`;
}

export function formatMissionAnswer(): string {
  return `The mission of KGOLD is ${ABOUT_PAGE.mission.missionStatement.body}`;
}

export function formatCoreValuesAnswer(): string {
  return ABOUT_PAGE.mission.values
    .map((value) => `${value.title} (${value.subtitle}): ${value.description}`)
    .join('\n\n');
}

export function formatSingleValueAnswer(value: CoreValue): string {
  return `${value.title} (${value.subtitle}): ${value.description}`;
}

export function formatLeadershipAnswer(): string {
  const { name, role, quote } = ABOUT_PAGE.leadership;
  return `${name} is our ${role}.\n\n"${quote}"`;
}

export function formatQualityTrustAnswer(): string {
  return VALUES.map((value) => `${value.title}: ${value.description}`).join('\n\n');
}

export function formatBestsellersAnswer(): string {
  const items = BEST_SELLERS.items
    .map(
      (item) =>
        `• ${item.name} (${item.line})${item.badge ? ` — ${item.badge}` : ''}: ${item.description}`,
    )
    .join('\n');

  return [`Our bestsellers include:`, '', items].join('\n');
}

export function formatCategoryAnswer(category: (typeof FEATURED_CATEGORIES.items)[number]): string {
  return `${category.name} (${category.tagline}): ${category.description}`;
}

export function formatCollectionCatalogAnswer(
  collection: ReturnType<typeof getAllCollections>[number],
): string {
  const productLines = collection.products
    .map((product) => `• ${product.name} (${product.line}): ${product.description}`)
    .join('\n');

  return [
    `${collection.name} — ${collection.tagline}`,
    '',
    collection.description,
    '',
    'Products in this collection:',
    productLines,
  ].join('\n');
}

export function formatProductsOverviewAnswer(): string {
  const collections = getAllCollections();
  const categoryLines = FEATURED_CATEGORIES.items
    .map((item) => `• ${item.name}: ${item.description}`)
    .join('\n');

  const collectionBlocks = collections.map((collection) => {
    const productNames = collection.products.map((p) => p.name).join(', ');
    return `• ${collection.name} — ${collection.tagline}: ${productNames}`;
  });

  return [
    'KGOLD offers skincare, personal care, wellness, herbal solutions, and men\'s essentials.',
    '',
    'Featured categories:',
    categoryLines,
    '',
    'Full collections:',
    ...collectionBlocks,
    '',
    'Ask me about any collection or product for more detail.',
  ].join('\n');
}

export function formatWhereToBuyAnswer(config: IBotConfig = botJson as IBotConfig): string {
  const channels = config.salesChannels.channels
    .map((ch) => `• ${ch.label}${ch.enabled && ch.href !== '#' ? '' : ' (store link coming soon)'}`)
    .join('\n');

  return [
    'KGOLD products are available through authorized distributors, resellers, and official online channels nationwide.',
    '',
    'Official online channels:',
    channels,
    '',
    config.salesChannels.note,
    '',
    `For help finding a seller near you, contact ${SITE.contactEmail} or call ${SITE.contactPhone ?? '0992 427 5941'}.`,
  ].join('\n');
}

export function formatPartnershipAnswer(): string {
  return [
    'We welcome individuals and businesses who share our standards for quality, care, and long-term partnership.',
    '',
    'KGOLD works with distributors, retailers, salons, and resellers across the Philippines.',
    'Whether you want to resell, wholesale, or explore a distribution partnership, our team can guide you through next steps.',
    '',
    `Partnership inquiries: ${SITE.contactEmail}`,
    `Phone: ${SITE.contactPhone ?? '0992 427 5941'}`,
  ].join('\n');
}

export function formatContactOverviewAnswer(): string {
  const locationLines = CONTACT_PAGE.addresses.locations
    .map((location) => `• ${location.name}: ${location.lines.join(', ')}`)
    .join('\n');

  const inquiryLines = CONTACT_PAGE.inquiries.items
    .map((item) => `• ${item.title}: ${item.email}${item.phone ? ` · ${item.phone}` : ''}`)
    .join('\n');

  return [
    CONTACT_PAGE.hero.body,
    '',
    `General email: ${SITE.contactEmail}`,
    `Phone: ${SITE.contactPhone ?? '0992 427 5941'}`,
    '',
    'Office locations:',
    locationLines,
    '',
    'Reach the right team:',
    inquiryLines,
  ].join('\n');
}

export function formatLocationsAnswer(): string {
  return CONTACT_PAGE.addresses.locations
    .map((location) => `${location.name}:\n${location.lines.join('\n')}`)
    .join('\n\n');
}

export function formatAboutTeaserAnswer(): string {
  return `${ABOUT.title}\n\n${ABOUT.mission}`;
}

export function formatCollectionsSummaryText(): string {
  return getAllCollections()
    .map((collection) => {
      const preview = collection.products
        .slice(0, 3)
        .map((p) => p.name)
        .join(', ');
      const suffix = collection.products.length > 3 ? ', and more' : '';
      return `• ${collection.name} — ${collection.tagline}: ${preview}${suffix}`;
    })
    .join('\n');
}
