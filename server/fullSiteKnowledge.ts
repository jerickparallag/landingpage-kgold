import aboutJson from '../src/content/about.json';
import botJson from '../src/content/bot.json';
import collectionsJson from '../src/content/collections.json';
import contactJson from '../src/content/contact.json';
import homeJson from '../src/content/home.json';
import siteJson from '../src/content/site.json';
import { buildCareersKnowledgeBlock } from '../src/bot/formatCareersKnowledge';

/** Complete site content for Gemini — structured for direct Q&A (mission, vision, products, etc.). */
export function buildFullSiteKnowledge(): string {
  const site = siteJson.site;
  const home = homeJson as {
    hero: { body: string };
    featuredCategories: { items: { name: string; description: string; href: string; tagline?: string }[] };
    bestSellers: { items: { name: string; line: string; description: string; badge?: string }[] };
    aboutTeaser: { title: string; teaser: string; mission: string };
    values: { title: string; description: string }[];
    faq: { question: string; answer: string }[];
    finalCta: { title: string; description: string };
  };
  const about = aboutJson as typeof aboutJson;
  const contact = contactJson as typeof contactJson;
  const bot = botJson as {
    welcome: { title: string; body: string };
    salesChannels: { note: string; channels: { label: string; href: string; enabled: boolean }[] };
    intents: { id: string; answer: string }[];
  };
  const collections = (collectionsJson as {
    collections: {
      slug: string;
      name: string;
      tagline: string;
      description: string;
      products: { name: string; line: string; description: string }[];
    }[];
  }).collections;

  const valueBlock = about.mission.values
    .map((v) => `${v.title} (${v.subtitle}): ${v.description}`)
    .join('\n');

  const careersBlock = buildCareersKnowledgeBlock();

  return [
    '=== KGOLD OFFICIAL SITE KNOWLEDGE (answer from this first) ===',
    '',
    '--- BRAND IDENTITY ---',
    `Name: ${site.name}`,
    `Tagline: ${site.tagline ?? 'Beauty essentials, crafted with purpose.'}`,
    `Description: ${site.description}`,
    `Website: ${site.url ?? 'https://kgoldbeauty.com'}`,
    `Contact email: ${site.contactEmail}`,
    `Phone: ${site.contactPhone ?? '0992 427 5941'}`,
    '',
    '--- HOME PAGE ---',
    `Hero message: ${home.hero.body}`,
    `About teaser: ${home.aboutTeaser.mission}`,
    '',
    '--- WHO WE ARE (company) ---',
    about.company.whoBody,
    `Purpose: ${about.company.purposeBody}`,
    `Why we exist: ${about.company.whyBody}`,
    `Brand story: ${about.mission.storyLead} ${about.mission.story}`,
    '',
    '--- MISSION (use verbatim when asked about mission) ---',
    about.mission.missionStatement.body,
    '',
    '--- VISION (use verbatim when asked about vision) ---',
    about.mission.vision.body,
    '',
    '--- CORE VALUES (Malasakit, Grit ng Pinoy, etc.) ---',
    valueBlock,
    '',
    '--- LEADERSHIP ---',
    `${about.leadership.name}, ${about.leadership.role}`,
    `Quote: "${about.leadership.quote}"`,
    '',
    '--- QUALITY & TRUST (home page) ---',
    ...home.values.map((v) => `${v.title}: ${v.description}`),
    '',
    '--- PRODUCT CATEGORIES ---',
    ...home.featuredCategories.items.map(
      (c) => `${c.name} (${c.tagline ?? ''}): ${c.description} → ${c.href}`,
    ),
    '',
    '--- BESTSELLERS ---',
    ...home.bestSellers.items.map(
      (p) => `${p.name} (${p.line})${p.badge ? ` [${p.badge}]` : ''}: ${p.description}`,
    ),
    '',
    '--- FULL COLLECTIONS CATALOG ---',
    ...collections.flatMap((c) => [
      `${c.name} — ${c.tagline}: ${c.description} (/shop/${c.slug})`,
      ...c.products.map((p) => `  • ${p.name} (${p.line}): ${p.description}`),
    ]),
    '',
    '--- FAQ ---',
    ...home.faq.map((f) => `Q: ${f.question}\nA: ${f.answer}`),
    '',
    careersBlock,
    '',
    '--- CONTACT & LOCATIONS ---',
    contact.hero.body,
    ...contact.addresses.locations.map((loc) => `${loc.name}: ${loc.lines.join(', ')}`),
    '',
    'Inquiry channels:',
    ...contact.inquiries.items.map(
      (item) =>
        `${item.title}: ${item.email ?? site.contactEmail}${item.phone ? ` · ${item.phone}` : ''}`,
    ),
    '',
    '--- WHERE TO BUY ---',
    bot.salesChannels.note,
    ...bot.salesChannels.channels.map(
      (ch) => `${ch.label}: ${ch.enabled ? ch.href : 'URL pending'}`,
    ),
    '',
    '--- QUICK TOPIC ANSWERS ---',
    ...bot.intents.map((intent) => `${intent.id}: ${intent.answer}`),
    '',
    '--- PAGE URLS (for navigation only — do not send users here unless they ask to visit a page) ---',
    'Home: / | About: /about | Mission section: /about#mission | Leadership: /about#leadership',
    'Careers: /careers | Contact: /contact | Collections: /#categories | Shop: /shop/{slug}',
  ].join('\n');
}
