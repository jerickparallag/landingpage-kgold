import aboutJson from '../src/content/about.json';
import botJson from '../src/content/bot.json';
import careersPageJson from '../src/content/careers-page.json';
import collectionsJson from '../src/content/collections.json';
import contactJson from '../src/content/contact.json';
import internshipsJson from '../src/content/careers/internships.json';
import jobsJson from '../src/content/careers/jobs.json';
import homeJson from '../src/content/home.json';
import siteJson from '../src/content/site.json';
import { buildAboutPageKnowledge } from './aboutKnowledge';
import { buildSiteNavigationKnowledge } from '../src/bot/siteNavigation';

/** Server-side knowledge text for Gemini — JSON only, no image bundling. */
export function buildGeminiKnowledgeContext(): string {
  const site = siteJson.site;
  const home = homeJson as {
    faq: { question: string; answer: string }[];
    featuredCategories: {
      items: { name: string; description: string; href: string }[];
    };
  };
  const about = aboutJson as {
    company: { whoBody: string; purposeBody: string; whyBody: string };
    mission: {
      story: string;
      vision: { body: string };
      missionStatement: { body: string };
      values: { title: string; description: string }[];
    };
    leadership: { name: string; role: string; quote: string };
    hero: { body: string };
  };
  const contact = contactJson as {
    addresses: { locations: { name: string; lines: string[] }[] };
    inquiries: { items: { title: string; email?: string; phone?: string }[] };
  };
  const bot = botJson as {
    salesChannels: {
      note: string;
      channels: { label: string; href: string; enabled: boolean }[];
    };
  };
  const collections = (collectionsJson as {
    collections: {
      slug: string;
      name: string;
      description: string;
      products: { name: string; description: string }[];
    }[];
  }).collections;

  const jobCount = jobsJson.jobs.length;
  const internCount = internshipsJson.internships.length;

  const sections: string[] = [
    `Site: ${site.name} — ${site.description}`,
    `Contact email: ${site.contactEmail}`,
    `Phone: ${site.contactPhone ?? '0992 427 5941'}`,
    '',
    buildSiteNavigationKnowledge(),
    '',
    buildAboutPageKnowledge(),
    '',
    '--- BRAND SNAPSHOT ---',
    `Tagline: ${site.tagline ?? 'Beauty essentials, crafted with purpose.'}`,
    about.hero.body,
    '',
    '--- FAQ ---',
    ...home.faq.map((item) => `Q: ${item.question}\nA: ${item.answer}`),
    '',
    '--- COMPANY SUMMARY ---',
    about.company.whoBody,
    `Purpose: ${about.company.purposeBody}`,
    `Mission: ${about.mission.missionStatement.body}`,
    `Vision: ${about.mission.vision.body}`,
    '',
    '--- CATEGORIES ---',
    ...home.featuredCategories.items.map(
      (item) => `${item.name}: ${item.description} (${item.href})`,
    ),
    '',
    '--- COLLECTIONS & PRODUCTS ---',
    ...collections.flatMap((collection) => [
      `${collection.name} (/shop/${collection.slug}): ${collection.description}`,
      ...collection.products.map((product) => `  • ${product.name}: ${product.description}`),
    ]),
    '',
    '--- CAREERS ---',
    `Open roles: ${jobCount}. Internship programs: ${internCount}. Careers page: /careers`,
    `Careers intro: ${(careersPageJson as { hero: { body?: string } }).hero.body ?? ''}`,
    '',
    '--- LOCATIONS ---',
    ...contact.addresses.locations.map(
      (location) => `${location.name}: ${location.lines.join(', ')}`,
    ),
    '',
    '--- INQUIRIES ---',
    ...contact.inquiries.items.map(
      (item) => `${item.title}: ${item.email ?? site.contactEmail}${item.phone ? ` · ${item.phone}` : ''}`,
    ),
    '',
    '--- SALES CHANNELS ---',
    bot.salesChannels.note,
    ...bot.salesChannels.channels.map(
      (channel) => `${channel.label}: ${channel.enabled ? channel.href : '(URL pending)'}`,
    ),
  ];

  return sections.join('\n');
}
