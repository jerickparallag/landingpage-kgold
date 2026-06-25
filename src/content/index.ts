import aboutJson from './about.json';
import careersPageJson from './careers-page.json';
import contactJson from './contact.json';
import homeJson from './home.json';
import siteJson from './site.json';
import { resolveContentImages } from './resolve';
import type {
  IAboutPageContent,
  ICareersPageContent,
  ICategoryItem,
  IContactPageContent,
  IFaqItem,
  IFooterContent,
  IHeroContent,
  ILink,
  IProductItem,
  ISiteContent,
  IValueItem,
} from './types';

type THomeContent = {
  hero: IHeroContent;
  featuredCategories: {
    title: string;
    description: string;
    viewCollectionLabel: string;
    items: ICategoryItem[];
  };
  bestSellers: {
    title: string;
    description: string;
    viewAllHref: string;
    viewAllLabel: string;
    items: IProductItem[];
  };
  aboutTeaser: {
    title: string;
    teaser: string;
    mission: string;
    backgroundImage: string;
    ctaLabel: string;
    ctaHref: string;
  };
  qualitySection: { title: string };
  values: IValueItem[];
  faqSection: {
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  faq: IFaqItem[];
  finalCta: {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
};

const home = resolveContentImages(homeJson) as unknown as THomeContent;
const about = resolveContentImages(aboutJson) as unknown as IAboutPageContent;
const contact = resolveContentImages(contactJson) as unknown as IContactPageContent;
const careersPage = resolveContentImages(careersPageJson) as unknown as ICareersPageContent;

export const SITE: ISiteContent = siteJson.site;
export const NAV_LINKS: readonly ILink[] = siteJson.navLinks;
export const FOOTER = {
  ...siteJson.footer,
  copyright: `© ${new Date().getFullYear()} ${siteJson.footer.copyrightName}`,
} satisfies IFooterContent & { copyright: string };

export const HERO = home.hero;
export const FEATURED_CATEGORIES = home.featuredCategories;
export const BEST_SELLERS = home.bestSellers;
export const ABOUT = home.aboutTeaser;
export const QUALITY_SECTION = home.qualitySection;
export const VALUES = home.values;
export const FAQ_SECTION = home.faqSection;
export const FAQ = home.faq;
export const FINAL_CTA = home.finalCta;

export const ABOUT_PAGE = about;
export const CONTACT_PAGE = contact;
export const CAREERS_PAGE = careersPage;

export type {
  ICareersApiResponse,
  IInternshipListing,
  IInternshipListingRaw,
  IJobListing,
  IJobListingRaw,
  TEmploymentType,
  TJobViewMode,
} from './types';
