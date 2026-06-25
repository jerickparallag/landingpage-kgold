import type { TImageKey } from '../assets/images';

export type TEmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type TJobViewMode = 'grid' | 'list';
export type TCategorySpan = 'large' | 'default' | 'wide';

export interface ILink {
  label: string;
  href: string;
}

export interface ISiteContent {
  name: string;
  tagline: string;
  description: string;
  url: string;
  contactEmail: string;
}

export interface IFooterContent {
  copyrightName: string;
  legal: ILink[];
  social: ILink[];
  careers: ILink;
  contact: ILink;
}

export interface IHeroContent {
  headline: string[];
  subheadline?: string;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: string;
}

export interface ICategoryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
  span: TCategorySpan;
}

export interface IProductItem {
  id: string;
  name: string;
  line: string;
  description: string;
  image: string;
  badge?: string;
}

export type TIconKey = 'arrowRight' | 'check' | 'skincare' | 'haircare' | 'bodycare' | 'men';

export interface ICollectionHighlight {
  iconKey: TIconKey;
  text: string;
}

export interface ICollection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  iconKey: TIconKey;
  products: IProductItem[];
}

export interface IValueItem {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface IFaqItem {
  question: string;
  answer: string;
}

export interface ICoreValueItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface IAboutPageContent {
  subNavParent: ILink;
  subNav: ILink[];
  hero: IHeroContent;
  company: {
    displayTitle: string;
    whoTitle: string;
    whoBody: string;
    purposeTitle: string;
    purposeBody: string;
    whyTitle: string;
    whyBody: string;
  };
  mission: {
    storyTitle: string;
    storyLead: string;
    story: string;
    vision: { title: string; body: string };
    missionStatement: { title: string; body: string };
    valuesTitle: string;
    valuesTagline: string;
    valuesLearnMore: string;
    valuesBack: string;
    values: ICoreValueItem[];
  };
  leadership: {
    title: string;
    image: string;
    quote: string;
    name: string;
    role: string;
  };
  careers: {
    title: string;
    description: string;
    backgroundImage: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

export interface IContactPageContent {
  hero: Pick<IHeroContent, 'headline' | 'subheadline' | 'body' | 'ctaLabel' | 'ctaHref' | 'backgroundImage'>;
  inquiries: {
    title: string;
    items: { title: string; linkLabel: string; href: string }[];
  };
  social: {
    title: string;
    items: { title: string; linkLabel: string; href: string }[];
  };
  addresses: {
    title: string;
    locations: { name: string; lines: string[] }[];
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
}

export interface ICareerBannerContent {
  image: string;
  headline: string;
  subline: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ICareersPageContent {
  subNavParent: ILink;
  subNav: ILink[];
  hero: IHeroContent;
  culture: {
    title: string;
    items: { title: string; description: string }[];
  };
  jobs: {
    title: string;
    description: string;
    searchPlaceholder: string;
    filterAll: string;
    resultsSingular: string;
    resultsPlural: string;
    viewGrid: string;
    viewList: string;
    responsibilitiesLabel: string;
    requirementsLabel: string;
    viewDetailsLabel: string;
    hideDetailsLabel: string;
    applyLabel: string;
    emptyMessage: string;
    banner: ICareerBannerContent;
  };
  internships: {
    title: string;
    description: string;
    applyLabel: string;
    learnMoreLabel: string;
    hideDetailsLabel: string;
    highlightsLabel: string;
    requirementsLabel: string;
    resultsSingular: string;
    resultsPlural: string;
    emptyMessage: string;
    generalCta: string;
    generalHref: string;
    banner: ICareerBannerContent;
  };
  cta: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
  };
  careersEmail: string;
  listFilters: {
    searchPlaceholder: string;
    filterAll: string;
    viewGrid: string;
    viewList: string;
  };
}

export interface IJobListingRaw {
  id: string;
  title: string;
  department: string;
  location: string;
  type: TEmploymentType;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  imageKey: TImageKey;
  applyUrl: string;
}

export interface IInternshipListingRaw {
  id: string;
  title: string;
  department: string;
  location: string;
  duration: string;
  summary: string;
  description: string;
  highlights: string[];
  requirements: string[];
  imageKey: TImageKey;
  applyUrl: string;
}

export interface IJobListing extends Omit<IJobListingRaw, 'imageKey' | 'applyUrl'> {
  image: string;
  url: string;
}

export interface IInternshipListing extends Omit<IInternshipListingRaw, 'imageKey' | 'applyUrl'> {
  image: string;
  url: string;
}

export interface ICareersApiResponse {
  jobs?: IJobListingRaw[];
  internships?: IInternshipListingRaw[];
  updatedAt?: string;
}
