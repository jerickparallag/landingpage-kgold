import botJson from '../content/bot.json';
import jobsJson from '../content/careers/jobs.json';
import internshipsJson from '../content/careers/internships.json';
import { ABOUT_PAGE, CAREERS_PAGE, CONTACT_PAGE, FAQ, FEATURED_CATEGORIES } from '../content';
import { getAllCollections } from '../lib/collections';
import {
  buildCareersSummaryAnswer,
  formatInternshipAnswer,
  formatJobAnswer,
} from './formatCareersKnowledge';
import {
  formatAboutTeaserAnswer,
  formatBestsellersAnswer,
  formatBrandIdentityAnswer,
  formatBrandStoryAnswer,
  formatCategoryAnswer,
  formatCollectionCatalogAnswer,
  formatContactOverviewAnswer,
  formatCoreValuesAnswer,
  formatLeadershipAnswer,
  formatLocationsAnswer,
  formatMissionAnswer,
  formatPartnershipAnswer,
  formatProductsOverviewAnswer,
  formatPurposeAnswer,
  formatQualityTrustAnswer,
  formatSingleValueAnswer,
  formatVisionAnswer,
  formatWhereToBuyAnswer,
  formatWhyWeExistAnswer,
} from './formatSiteKnowledge';
import type { IBotConfig, IKnowledgeIndex, IKnowledgeTopic } from './types';

const INTENT_ANSWER_OVERRIDES: Partial<Record<string, () => string>> = {
  buy: () => formatWhereToBuyAnswer(),
  products: () => formatProductsOverviewAnswer(),
  careers: () => buildCareersSummaryAnswer(),
  contact: () => formatContactOverviewAnswer(),
  reseller: () => formatPartnershipAnswer(),
};

function extractKeywordsFromText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

function faqActionRefs(question: string): string[] {
  const normalized = question.toLowerCase();
  if (normalized.includes('buy') || normalized.includes('where')) {
    return ['showChannels', 'contactHandoff'];
  }
  if (normalized.includes('reseller') || normalized.includes('wholesale') || normalized.includes('partner')) {
    return ['mailto:hello@kgoldbeauty.com?subject=Partnership%20inquiry', 'contactHandoff'];
  }
  if (normalized.includes('product') || normalized.includes('offer')) {
    return ['showCollections'];
  }
  return ['contactHandoff'];
}

export function buildKnowledgeIndex(): IKnowledgeIndex {
  const config = botJson as IBotConfig;
  const topics: IKnowledgeTopic[] = [];

  for (const item of FAQ) {
    topics.push({
      id: `faq-${normalizeId(item.question)}`,
      question: item.question,
      keywords: [
        item.question,
        ...extractKeywordsFromText(item.question),
        ...extractKeywordsFromText(item.answer),
      ],
      answer: item.answer,
      actionRefs: faqActionRefs(item.question),
    });
  }

  for (const intent of config.intents) {
    const override = INTENT_ANSWER_OVERRIDES[intent.id];
    topics.push({
      id: `intent-${intent.id}`,
      keywords: intent.keywords,
      answer: override ? override() : intent.answer,
      actionRefs: intent.actions,
    });
  }

  topics.push({
    id: 'brand-identity',
    keywords: [
      'kgold',
      'k gold',
      'beauty essentials',
      'brand',
      'tagline',
      'what is kgold',
      'who is kgold',
      'tell me about kgold',
      'ano ang kgold',
    ],
    answer: formatBrandIdentityAnswer(),
  });

  topics.push({
    id: 'about-company',
    keywords: [
      'about',
      'company',
      'who are you',
      'who we are',
      'sino kayo',
      'corporation',
      'tungkol sa inyo',
      'tungkol sa kgold',
      'about us',
      'philippine',
      'marikina',
      'filipino brand',
    ],
    answer: ABOUT_PAGE.company.whoBody,
  });

  topics.push({
    id: 'about-teaser',
    keywords: ['built through trust', 'growth takes time', 'trust', 'loyalty', 'expand'],
    answer: formatAboutTeaserAnswer(),
  });

  topics.push({
    id: 'about-purpose',
    keywords: ['purpose', 'our purpose', 'why kgold', 'layunin ng company'],
    answer: formatPurposeAnswer(),
  });

  topics.push({
    id: 'about-why',
    keywords: [
      'why we exist',
      'why do you exist',
      'why kgold exists',
      'bakit kayo nag exist',
      'communities',
      'livelihoods',
    ],
    answer: formatWhyWeExistAnswer(),
  });

  topics.push({
    id: 'about-story',
    keywords: [
      'story',
      'history',
      'journey',
      'how we started',
      'isabela',
      'kwento',
      'pinagmulan',
      'barrio',
      'how kgold started',
    ],
    answer: formatBrandStoryAnswer(),
  });

  topics.push({
    id: 'about-vision',
    keywords: [
      'vision',
      '2030',
      'future',
      'layunin',
      'pangarap',
      'what is the vision',
      'kgold vision',
      '1 million',
      'transform lives',
    ],
    answer: formatVisionAnswer(),
  });

  topics.push({
    id: 'about-mission',
    keywords: [
      'mission',
      'our mission',
      'what is the mission',
      'kgold mission',
      'mission statement',
    ],
    answer: formatMissionAnswer(),
  });

  topics.push({
    id: 'about-values',
    keywords: [
      'values',
      'core values',
      'principles',
      'what we stand for',
      'what you stand for',
      'company values',
      'culture values',
    ],
    answer: formatCoreValuesAnswer(),
  });

  for (const value of ABOUT_PAGE.mission.values) {
    topics.push({
      id: `value-${normalizeId(value.title)}`,
      keywords: [
        value.title,
        value.subtitle,
        ...extractKeywordsFromText(value.title),
        ...extractKeywordsFromText(value.description),
        ...(value.title === 'Malasakit First' ? ['malasakit'] : []),
        ...(value.title === 'Grit ng Pinoy' ? ['grit', 'pinoy', 'resilience'] : []),
        ...(value.title === 'Ownership' ? ['accountability', 'initiative'] : []),
        ...(value.title === 'We Rise Together' ? ['teamwork', 'together'] : []),
        ...(value.title === 'Excellence with Humility' ? ['excellence', 'humility'] : []),
      ],
      answer: formatSingleValueAnswer(value),
    });
  }

  topics.push({
    id: 'about-leadership',
    keywords: [
      'leadership',
      'ceo',
      'founder',
      'owner',
      'leanne',
      'dela cruz',
      'boss',
      'sino ang ceo',
      'who leads',
      'who runs kgold',
    ],
    answer: formatLeadershipAnswer(),
  });

  topics.push({
    id: 'quality-trust',
    keywords: [
      'quality',
      'manufacturing',
      'standards',
      'integrity',
      'trust',
      'gmp',
      'reliable',
      'partner confidence',
    ],
    answer: formatQualityTrustAnswer(),
  });

  topics.push({
    id: 'bestsellers',
    keywords: [
      'bestseller',
      'bestsellers',
      'best seller',
      'top product',
      'popular product',
      'radiance serum',
      'silk repair',
      'velvet cream',
      'spf',
      'most popular',
    ],
    answer: formatBestsellersAnswer(),
    actionRefs: ['showCollections', 'showChannels'],
  });

  topics.push({
    id: 'products-overview',
    keywords: [
      'what products',
      'what do you offer',
      'product line',
      'product range',
      'catalog',
      'collections',
      'ano ang products',
      'list of products',
      'all products',
    ],
    answer: formatProductsOverviewAnswer(),
    actionRefs: ['showCollections'],
  });

  for (const category of FEATURED_CATEGORIES.items) {
    topics.push({
      id: `category-${category.id}`,
      keywords: [
        category.name,
        category.tagline,
        category.id,
        ...extractKeywordsFromText(category.description),
      ],
      answer: formatCategoryAnswer(category),
      actionRefs: [`link:${category.href}`],
    });
  }

  for (const collection of getAllCollections()) {
    topics.push({
      id: `collection-${collection.slug}`,
      keywords: [
        collection.name,
        collection.slug,
        collection.tagline,
        ...extractKeywordsFromText(collection.description),
        ...collection.products.flatMap((product) => [
          product.name,
          product.line,
          ...extractKeywordsFromText(product.name),
        ]),
      ],
      answer: formatCollectionCatalogAnswer(collection),
      actionRefs: [`link:/shop/${collection.slug}`, 'showChannels'],
    });

    for (const product of collection.products) {
      topics.push({
        id: `product-${product.id}`,
        keywords: [
          product.name,
          product.line,
          collection.name,
          collection.slug,
          ...extractKeywordsFromText(product.description),
          ...extractKeywordsFromText(product.name),
        ],
        answer: `${product.name} (${product.line}) — ${product.description}\n\nPart of our ${collection.name} collection.`,
        actionRefs: [`link:/shop/${collection.slug}`, 'showChannels'],
      });
    }
  }

  topics.push({
    id: 'where-to-buy',
    keywords: [
      'where to buy',
      'where can i buy',
      'saan bibilhin',
      'saan makakabili',
      'shopee',
      'lazada',
      'tiktok shop',
      'online shop',
      'store',
      'purchase',
      'order online',
    ],
    answer: formatWhereToBuyAnswer(config),
    actionRefs: ['showChannels', 'contactHandoff'],
  });

  topics.push({
    id: 'partnership',
    keywords: [
      'reseller',
      'distributor',
      'wholesale',
      'partner',
      'partnership',
      'magbenta',
      'dealership',
      'retailer',
      'become a partner',
      'distribution network',
      'salon partner',
    ],
    answer: formatPartnershipAnswer(),
    actionRefs: ['mailto:hello@kgoldbeauty.com?subject=Partnership%20inquiry', 'link:/contact'],
  });

  topics.push({
    id: 'locations',
    keywords: [
      'location',
      'locations',
      'address',
      'office',
      'offices',
      'marikina',
      'isabela',
      'alicia',
      'saan kayo',
      'where are you located',
      'headquarters',
      'hq',
    ],
    answer: formatLocationsAnswer(),
    actionRefs: ['link:/contact', 'contactHandoff'],
  });

  topics.push({
    id: 'contact-info',
    keywords: [
      'email',
      'phone',
      'contact',
      'support',
      'hello',
      'tawag',
      'number',
      'reach',
      'call',
      'customer service',
    ],
    answer: formatContactOverviewAnswer(),
    actionRefs: ['contactHandoff', 'link:/contact'],
  });

  topics.push({
    id: 'careers-summary',
    keywords: [
      'career',
      'careers',
      'job',
      'jobs',
      'hiring',
      'internship',
      'internships',
      'apply',
      'trabaho',
      'open roles',
      'open positions',
      'hiring now',
      'work at kgold',
      'work with kgold',
      'careers email',
    ],
    answer: buildCareersSummaryAnswer(),
    actionRefs: ['link:/careers'],
  });

  topics.push({
    id: 'careers-culture',
    keywords: [
      'why join',
      'why work at kgold',
      'company culture',
      'work culture',
      'meaningful work',
      'room to grow',
    ],
    answer: [
      CAREERS_PAGE.hero.body,
      '',
      ...CAREERS_PAGE.culture.items.map((item) => `${item.title}: ${item.description}`),
      '',
      `Apply or inquire at ${CAREERS_PAGE.careersEmail}.`,
    ].join('\n'),
    actionRefs: ['link:/careers'],
  });

  for (const job of jobsJson.jobs) {
    topics.push({
      id: `job-${job.id}`,
      keywords: [
        job.id,
        job.title,
        job.department,
        job.type,
        ...extractKeywordsFromText(job.title),
        ...extractKeywordsFromText(job.summary),
        ...extractKeywordsFromText(job.description),
        `${job.title} requirements`,
        `${job.title} responsibilities`,
        `apply for ${job.title}`,
        'telesales',
        'phone sales',
        'call center',
        'tiktok live',
        'live seller',
        'live selling',
      ],
      answer: formatJobAnswer(job),
      actionRefs: [`link:${job.applyUrl}`],
    });
  }

  for (const intern of internshipsJson.internships) {
    topics.push({
      id: `intern-${intern.id}`,
      keywords: [
        intern.id,
        intern.title,
        intern.department,
        intern.duration,
        ...extractKeywordsFromText(intern.title),
        ...extractKeywordsFromText(intern.summary),
        ...extractKeywordsFromText(intern.description),
        `${intern.title} requirements`,
        `${intern.title} internship`,
        'intern program',
        'ojt',
        'on the job training',
        'marketing intern',
        'ecommerce intern',
        'e-commerce intern',
        'quality assurance intern',
      ],
      answer: formatInternshipAnswer(intern),
      actionRefs: [`link:${intern.applyUrl}`],
    });
  }

  for (const item of CONTACT_PAGE.inquiries.items) {
    topics.push({
      id: `inquiry-${normalizeId(item.title)}`,
      keywords: [
        item.title,
        'inquiry',
        'inquiries',
        ...extractKeywordsFromText(item.title),
      ],
      answer: `${item.title}: ${item.email}${item.phone ? ` · ${item.phone}` : ''}`,
      actionRefs: item.href ? [`link:${item.href}`] : ['contactHandoff'],
    });
  }

  return { topics, config };
}

function normalizeId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

export function getCareersSummaryText(): string {
  return buildCareersSummaryAnswer();
}

export { formatCollectionsSummaryText as getCollectionsSummaryText } from './formatSiteKnowledge';
