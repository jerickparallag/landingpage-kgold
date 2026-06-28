import collectionsJson from '../content/collections.json';
import type { IBotAction } from './types';

export interface ISitePage {
  id: string;
  href: string;
  navLabel: string;
  buttonLabel: string;
  keywords: string[];
  phrases: string[];
}

const CORE_PAGES: ISitePage[] = [
  {
    id: 'home',
    href: '/',
    navLabel: 'Home',
    buttonLabel: 'Return Home',
    keywords: ['home', 'homepage', 'main', 'landing', 'start'],
    phrases: ['home page', 'main page', 'landing page', 'homepage'],
  },
  {
    id: 'about',
    href: '/about',
    navLabel: 'About',
    buttonLabel: 'Discover Our Story',
    keywords: ['about page', 'about us page', 'company page'],
    phrases: [
      'about page',
      'about us page',
      'company page',
      'saan ang about',
      'go to about',
      'take me to about',
      'open about',
    ],
  },
  {
    id: 'about-mission',
    href: '/about#mission',
    navLabel: 'Mission & Vision',
    buttonLabel: 'Our Mission',
    keywords: ['mission page', 'vision page'],
    phrases: [
      'mission page',
      'vision page',
      'go to mission',
      'take me to mission',
    ],
  },
  {
    id: 'about-leadership',
    href: '/about#leadership',
    navLabel: 'Leadership',
    buttonLabel: 'Meet Leadership',
    keywords: ['leadership page', 'meet leadership'],
    phrases: [
      'leadership page',
      'go to leadership',
      'take me to leadership',
    ],
  },
  {
    id: 'careers',
    href: '/careers',
    navLabel: 'Careers',
    buttonLabel: 'View Careers',
    keywords: ['career', 'careers', 'job', 'jobs', 'hiring', 'apply', 'internship', 'intern', 'work', 'trabaho'],
    phrases: [
      'career page',
      'careers page',
      'jobs page',
      'work with us',
      'open roles',
      'hiring page',
      'saan ang career',
      'trabaho sa kgold',
    ],
  },
  {
    id: 'careers-jobs',
    href: '/careers/jobs',
    navLabel: 'Open Roles',
    buttonLabel: 'View Open Roles',
    keywords: ['open roles', 'job listings', 'job openings', 'positions', 'hiring'],
    phrases: ['open roles page', 'view jobs', 'see job listings', 'available jobs'],
  },
  {
    id: 'careers-internships',
    href: '/careers/internships',
    navLabel: 'Internships',
    buttonLabel: 'View Internships',
    keywords: ['internship', 'internships', 'intern program', 'intern programs'],
    phrases: ['internship page', 'intern programs', 'view internships'],
  },
  {
    id: 'journal',
    href: '/journal',
    navLabel: 'Journal',
    buttonLabel: 'View Journal',
    keywords: [
      'journal',
      'events',
      'event',
      'workshop',
      'workshops',
      'seminar',
      'seminars',
      'masterclass',
      'talk',
      'news',
      'stories',
      'latest',
      'recent',
    ],
    phrases: [
      'journal page',
      'events page',
      'workshop page',
      'seminar page',
      'latest events',
      'company events',
      'saan ang events',
      'go to journal',
      'take me to journal',
    ],
  },
  {
    id: 'contact',
    href: '/contact',
    navLabel: 'Contact',
    buttonLabel: 'Contact Us',
    keywords: ['contact', 'email', 'phone', 'call', 'reach', 'location', 'address', 'office', 'tawag'],
    phrases: [
      'contact page',
      'get in touch',
      'reach us',
      'locations page',
      'contact us page',
      'saan ang contact',
      'email ninyo',
    ],
  },
  {
    id: 'collections',
    href: '/#categories',
    navLabel: 'Collections',
    buttonLabel: 'Explore Collections',
    keywords: ['shop', 'store', 'catalog', 'collection', 'collections', 'products', 'categories', 'browse', 'bilihan'],
    phrases: [
      'shop page',
      'product page',
      'collections page',
      'categories section',
      'browse products',
      'saan makakabili',
      'saan ang products',
    ],
  },
];

const NAVIGATION_PATTERNS = [
  /\bwhere (?:is|can i find|do i find|are)\b/i,
  /\btake me to\b/i,
  /\bgo to\b/i,
  /\bopen (?:the )?\b/i,
  /\bnavigate(?: to)?\b/i,
  /\bshow me\b/i,
  /\bbring me to\b/i,
  /\bpaano (?:pumunta|punta)\b/i,
  /\bsaan (?:ang|yung|yong|ba ang)\b/i,
  /\bpuntahan\b/i,
  /\bdirections? to\b/i,
  /\bhow (?:do i|can i) (?:get|go|find)\b/i,
  /\blead me to\b/i,
  /\bi want to (?:see|visit|view)\b/i,
  /\bcan you (?:show|take)\b/i,
];

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s#]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildCollectionPages(): ISitePage[] {
  const collections = (
    collectionsJson as {
      collections: {
        slug: string;
        name: string;
        tagline: string;
        products: { name: string }[];
      }[];
    }
  ).collections;

  return collections.map((collection) => ({
    id: `collection-${collection.slug}`,
    href: `/shop/${collection.slug}`,
    navLabel: collection.name,
    buttonLabel: `View ${collection.name}`,
    keywords: [
      collection.name,
      collection.slug,
      collection.tagline,
      ...collection.products.map((product) => product.name),
    ],
    phrases: [
      `${collection.name} page`,
      `${collection.slug} collection`,
      `shop ${collection.name}`,
      `${collection.name.toLowerCase()} products`,
    ],
  }));
}

function buildSitePages(): ISitePage[] {
  return [...CORE_PAGES, ...buildCollectionPages()];
}

export function getSitePages(): ISitePage[] {
  return buildSitePages();
}

export function isNavigationQuery(text: string): boolean {
  const normalized = normalizeText(text);
  return NAVIGATION_PATTERNS.some((pattern) => pattern.test(normalized));
}

function scorePageMatch(normalizedQuery: string, page: ISitePage): number {
  let score = 0;

  for (const phrase of page.phrases) {
    const normalizedPhrase = normalizeText(phrase);
    if (normalizedQuery.includes(normalizedPhrase)) {
      score = Math.max(score, 0.98);
    }
  }

  for (const keyword of page.keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (normalizedKeyword.length >= 3 && normalizedQuery.includes(normalizedKeyword)) {
      score = Math.max(score, normalizedKeyword.length >= 5 ? 0.88 : 0.82);
    }
  }

  if (normalizedQuery.includes(`${normalizeText(page.navLabel)} page`)) {
    score = Math.max(score, 0.96);
  }

  return score;
}

export function detectNavigationTarget(text: string): ISitePage | undefined {
  if (!isNavigationQuery(text)) return undefined;

  const normalized = normalizeText(text);
  const pages = buildSitePages();

  let best: ISitePage | undefined;
  let bestScore = 0;

  for (const page of pages) {
    const score = scorePageMatch(normalized, page);
    if (score > bestScore) {
      bestScore = score;
      best = page;
    }
  }

  if (!best || bestScore < 0.75) return undefined;

  return best;
}

export function navigationActionForPage(page: ISitePage): IBotAction {
  return {
    type: 'navigate',
    label: page.buttonLabel,
    href: page.href,
  };
}

export function buildSiteNavigationKnowledge(): string {
  const pages = buildSitePages();

  return [
    '--- SITE NAVIGATION ---',
    'Official website pages. When visitors ask where to find something, use these paths and offer to guide them.',
    '',
    'KEY PAGES (memorize these):',
    '• About / company story → /about',
    '• Mission & vision → /about#mission',
    '• Leadership → /about#leadership',
    '• Careers / jobs → /careers',
    '• Contact / locations → /contact',
    '• Collections overview → /#categories',
    '• Home → /',
    '',
    'All routes:',
    ...pages.map(
      (page) =>
        `• ${page.navLabel}: ${page.href}`,
    ),
  ].join('\n');
}

export function buildNavigationFallbackContent(page: ISitePage): string {
  return `Our ${page.navLabel} page is at ${page.href}. I can take you there now.`;
}
