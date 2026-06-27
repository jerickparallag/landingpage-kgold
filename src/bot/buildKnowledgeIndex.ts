import botJson from '../content/bot.json';
import jobsJson from '../content/careers/jobs.json';
import internshipsJson from '../content/careers/internships.json';
import {
  ABOUT_PAGE,
  CONTACT_PAGE,
  FAQ,
  FEATURED_CATEGORIES,
  SITE,
} from '../content';
import { getAllCollections } from '../lib/collections';
import { getSitePages } from './siteNavigation';
import type { IBotConfig, IKnowledgeIndex, IKnowledgeTopic } from './types';

function extractKeywordsFromText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

export function buildKnowledgeIndex(): IKnowledgeIndex {
  const config = botJson as IBotConfig;
  const topics: IKnowledgeTopic[] = [];

  for (const item of FAQ) {
    topics.push({
      id: `faq-${normalizeId(item.question)}`,
      question: item.question,
      keywords: [item.question, ...extractKeywordsFromText(item.question), ...extractKeywordsFromText(item.answer)],
      answer: item.answer,
      actionRefs: ['showChannels', 'link:/contact'],
    });
  }

  for (const intent of config.intents) {
    topics.push({
      id: `intent-${intent.id}`,
      keywords: intent.keywords,
      answer: intent.answer,
      actionRefs: intent.actions,
    });
  }

  topics.push({
    id: 'about-company',
    keywords: [
      'about',
      'company',
      'k gold',
      'kgold',
      'who are you',
      'who is kgold',
      'what is kgold',
      'sino kayo',
      'corporation',
      'brand',
      'tungkol sa inyo',
      'tungkol sa kgold',
      'kwento',
      'about page',
      'about us',
    ],
    answer: ABOUT_PAGE.company.whoBody,
    actionRefs: ['navigate:/about'],
  });

  topics.push({
    id: 'about-story',
    keywords: ['story', 'history', 'journey', 'how we started', 'isabela', 'kwento', 'pinagmulan'],
    answer: ABOUT_PAGE.mission.story,
    actionRefs: ['navigate:/about#mission'],
  });

  topics.push({
    id: 'about-vision',
    keywords: ['vision', '2030', 'future', 'layunin', 'pangarap', 'what is the vision', 'kgold vision'],
    answer: `The vision of KGOLD is ${ABOUT_PAGE.mission.vision.body}`,
    actionRefs: ['navigate:/about#mission'],
  });

  topics.push({
    id: 'about-mission',
    keywords: ['mission', 'purpose', 'layunin', 'what is the mission', 'kgold mission'],
    answer: `The mission of KGOLD is ${ABOUT_PAGE.mission.missionStatement.body}`,
    actionRefs: ['navigate:/about#mission'],
  });

  topics.push({
    id: 'about-values',
    keywords: ['values', 'malasakit', 'grit', 'principles', 'what we stand for', 'core values'],
    answer: ABOUT_PAGE.mission.values
      .map((value) => `${value.title}: ${value.description}`)
      .join('\n\n'),
    actionRefs: ['navigate:/about#mission'],
  });

  topics.push({
    id: 'about-leadership',
    keywords: ['leadership', 'ceo', 'founder', 'owner', 'leanne', 'dela cruz', 'boss', 'sino ang ceo'],
    answer: `${ABOUT_PAGE.leadership.name} is our ${ABOUT_PAGE.leadership.role}. ${ABOUT_PAGE.leadership.quote}`,
    actionRefs: ['navigate:/about#leadership'],
  });

  for (const category of FEATURED_CATEGORIES.items) {
    topics.push({
      id: `category-${category.id}`,
      keywords: [
        category.name,
        category.tagline,
        ...extractKeywordsFromText(category.description),
      ],
      answer: `${category.name} — ${category.description}`,
      actionRefs: [`link:${category.href}`],
    });
  }

  for (const collection of getAllCollections()) {
    topics.push({
      id: `collection-${collection.slug}`,
      keywords: [
        collection.name,
        collection.tagline,
        ...extractKeywordsFromText(collection.description),
        ...collection.products.flatMap((product) => [product.name, product.line]),
      ],
      answer: `${collection.name}: ${collection.description}`,
      actionRefs: [`link:/shop/${collection.slug}`],
    });

    for (const product of collection.products) {
      topics.push({
        id: `product-${product.id}`,
        keywords: [
          product.name,
          product.line,
          collection.name,
          ...extractKeywordsFromText(product.description),
        ],
        answer: `${product.name} (${product.line}) — ${product.description}`,
        actionRefs: [`link:/shop/${collection.slug}`, 'showChannels'],
      });
    }
  }

  const locationLines = CONTACT_PAGE.addresses.locations
    .map((location) => `${location.name}: ${location.lines.join(', ')}`)
    .join('\n\n');

  topics.push({
    id: 'locations',
    keywords: ['location', 'address', 'office', 'marikina', 'isabela', 'alicia', 'saan kayo'],
    answer: locationLines,
    actionRefs: ['link:/contact', 'contactHandoff'],
  });

  topics.push({
    id: 'contact-info',
    keywords: ['email', 'phone', 'contact', 'support', 'hello', 'tawag', 'number'],
    answer: `Email: ${SITE.contactEmail}\nPhone: ${SITE.contactPhone ?? '0992 427 5941'}`,
    actionRefs: ['contactHandoff', 'link:/contact'],
  });

  const jobCount = jobsJson.jobs.length;
  const internCount = internshipsJson.internships.length;

  topics.push({
    id: 'careers-summary',
    keywords: ['career', 'careers', 'job', 'jobs', 'hiring', 'internship', 'apply', 'trabaho'],
    answer: `We currently list ${jobCount} open role${jobCount === 1 ? '' : 's'} and ${internCount} internship program${internCount === 1 ? '' : 's'}. Visit our Careers page for details and application links.`,
    actionRefs: ['link:/careers'],
  });

  for (const item of CONTACT_PAGE.inquiries.items) {
    topics.push({
      id: `inquiry-${normalizeId(item.title)}`,
      keywords: [item.title, 'inquiry', 'inquiries', ...extractKeywordsFromText(item.title)],
      answer: `${item.title}: ${item.email}${item.phone ? ` · ${item.phone}` : ''}`,
      actionRefs: item.href ? [`link:${item.href}`] : ['contactHandoff'],
    });
  }

  for (const page of getSitePages()) {
    topics.push({
      id: `nav-${page.id}`,
      keywords: [
        ...page.keywords,
        ...page.phrases,
        `where is ${page.navLabel.toLowerCase()}`,
        `go to ${page.navLabel.toLowerCase()}`,
        `${page.navLabel.toLowerCase()} page`,
      ],
      answer: `${page.navLabel} is available at ${page.href}.`,
      actionRefs: [`navigate:${page.href}`],
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
  const jobCount = jobsJson.jobs.length;
  const internCount = internshipsJson.internships.length;
  return `We currently list ${jobCount} open role${jobCount === 1 ? '' : 's'} and ${internCount} internship program${internCount === 1 ? '' : 's'}.`;
}

export function getCollectionsSummaryText(): string {
  return getAllCollections()
    .map((collection) => `• ${collection.name} — /shop/${collection.slug}`)
    .join('\n');
}
