import { IMAGES } from '../assets/images';

const CAREERS_API = import.meta.env.VITE_CAREERS_API_URL;

export type TEmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
export type TJobViewMode = 'grid' | 'list';

export interface IJobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: TEmploymentType;
  summary: string;
  description: string;
  responsibilities: readonly string[];
  requirements: readonly string[];
  image: string;
  url: string;
}

export interface IInternshipListing {
  id: string;
  title: string;
  department: string;
  location: string;
  duration: string;
  summary: string;
  description: string;
  highlights: readonly string[];
  requirements: readonly string[];
  image: string;
  url: string;
}

export const STATIC_JOB_LISTINGS: IJobListing[] = [
  {
    id: 'telesales',
    title: 'Telesales',
    department: 'Sales',
    location: 'Metro Manila · On-site',
    type: 'Full-time',
    summary:
      'Convert leads and nurture customer relationships over the phone — representing KGOLD with clarity, warmth, and confidence on every call.',
    description:
      'You’ll be the voice of KGOLD on outbound and inbound calls — introducing our products, answering questions, and guiding customers from interest to purchase. This role suits someone who thrives in conversation and takes pride in hitting targets.',
    responsibilities: [
      'Make outbound calls to leads and follow up on inbound inquiries across assigned campaigns.',
      'Present KGOLD products clearly, handle objections, and close sales over the phone.',
      'Update CRM records, call logs, and daily activity reports with accurate notes.',
      'Coordinate with operations on order details, promotions, and fulfillment follow-ups.',
      'Share customer feedback and recurring objections to help refine scripts and offers.',
    ],
    requirements: [
      '1+ years in telesales, call center sales, or phone-based customer acquisition.',
      'Clear Filipino and English communication with a professional, persuasive tone.',
      'Comfortable working with daily call quotas and performance targets.',
      'Interest in beauty and personal care products is a plus.',
    ],
    image: IMAGES.jobTelesales,
    url: 'mailto:careers@kgoldbeauty.com?subject=Application%3A%20Telesales',
  },
  {
    id: 'tiktok-live-sellers',
    title: 'TikTok Live Sellers',
    department: 'Digital',
    location: 'Metro Manila · Hybrid',
    type: 'Full-time',
    summary:
      'Host energetic TikTok Live sessions that showcase KGOLD products, engage viewers in real time, and drive sales through live commerce.',
    description:
      'You’ll bring KGOLD to life on camera — demonstrating products, answering live questions, and creating the kind of sessions people stay for. This role is for someone who is natural on TikTok, comfortable selling live, and excited to grow with a beauty brand.',
    responsibilities: [
      'Host scheduled TikTok Live selling sessions with clear product demos and strong viewer engagement.',
      'Follow live scripts and promotional calendars while keeping delivery natural and on-brand.',
      'Respond to comments and questions in real time to build trust and close in-session sales.',
      'Coordinate with the digital team on bundles, flash offers, and post-live order follow-ups.',
      'Track session performance and share insights to improve conversion and repeat viewership.',
    ],
    requirements: [
      'Experience hosting TikTok Live, live selling, or short-form video commerce.',
      'Confident on camera with an engaging, authentic on-air presence.',
      'Strong product storytelling skills and comfort discussing beauty routines.',
      'Reliable internet, basic lighting setup, and availability for evening or peak live slots.',
    ],
    image: IMAGES.jobTiktokLiveSellers,
    url: 'mailto:careers@kgoldbeauty.com?subject=Application%3A%20TikTok%20Live%20Sellers',
  },
];

export const STATIC_INTERNSHIPS: IInternshipListing[] = [
  {
    id: 'marketing-intern',
    title: 'Marketing Intern',
    department: 'Marketing',
    location: 'Makati City · Hybrid',
    duration: '3–6 months',
    summary:
      'Learn how a beauty brand plans campaigns, creates content, and activates retail partners in the real world.',
    description:
      'Work alongside our marketing team on live projects — from social content and campaign support to partner kits and launch materials. You’ll leave with portfolio-ready work and a clear view of brand marketing in beauty.',
    highlights: [
      'Support social content planning and asset coordination',
      'Assist with retail and salon activation materials',
      'Join campaign briefs and weekly team reviews',
      'Build a portfolio of real brand work',
    ],
    requirements: [
      'Currently enrolled in marketing, communications, business, or related program',
      'Strong writing skills and attention to detail',
      'Available at least 3 days per week',
      'Passion for beauty and Filipino consumer brands',
    ],
    image: IMAGES.categorySkincare,
    url: 'mailto:careers@kgoldbeauty.com?subject=Application%3A%20Marketing%20Intern',
  },
  {
    id: 'product-development-intern',
    title: 'Product Development Intern',
    department: 'R&D',
    location: 'Laguna · On-site',
    duration: '4–6 months',
    summary:
      'Get hands-on exposure to formulation reviews, packaging checks, and quality documentation in beauty product development.',
    description:
      'You’ll support our product team as they bring new SKUs from concept to shelf — observing how quality, compliance, and consumer needs shape every decision along the way.',
    highlights: [
      'Assist with formulation and packaging documentation',
      'Join product review meetings and supplier coordination',
      'Learn batch traceability and release checklists',
      'Exposure to GMP-aligned quality workflows',
    ],
    requirements: [
      'Studying chemistry, pharmacy, cosmetic science, or related field',
      'Curious, meticulous, and comfortable in a lab or manufacturing environment',
      'Available for on-site work in Laguna',
      'Interest in product integrity and responsible formulation',
    ],
    image: IMAGES.productShampoo,
    url: 'mailto:careers@kgoldbeauty.com?subject=Application%3A%20Product%20Development%20Intern',
  },
  {
    id: 'sales-intern',
    title: 'Sales & Distribution Intern',
    department: 'Sales',
    location: 'Metro Manila · On-site',
    duration: '3–5 months',
    summary:
      'Shadow field sales and learn how KGOLD builds partnerships with salons, retailers, and distributors across the country.',
    description:
      'You’ll join account visits, assist with partner onboarding materials, and see how a beauty brand grows shelf presence — from pitch to replenishment.',
    highlights: [
      'Join field visits and partner training sessions',
      'Help prepare sales kits and merchandising guides',
      'Learn pipeline tracking and territory planning basics',
      'Exposure to salon, pharmacy, and trade channels',
    ],
    requirements: [
      'Enrolled in business, marketing, or related program',
      'Comfortable communicating with external partners',
      'Willing to travel within Metro Manila',
      'Interest in sales and the Philippine beauty trade',
    ],
    image: IMAGES.categoryHaircare,
    url: 'mailto:careers@kgoldbeauty.com?subject=Application%3A%20Sales%20%26%20Distribution%20Intern',
  },
  {
    id: 'operations-intern',
    title: 'Operations Intern',
    department: 'Operations',
    location: 'Laguna · Hybrid',
    duration: '4–6 months',
    summary:
      'Support supply coordination, inventory planning, and fulfillment workflows that keep KGOLD products moving reliably.',
    description:
      'Work with our operations team on day-to-day logistics — learning how quality standards extend beyond the lab into warehousing, dispatch, and partner delivery.',
    highlights: [
      'Assist with inventory reports and stock movement logs',
      'Support order fulfillment and dispatch coordination',
      'Join operations reviews and process improvement discussions',
      'Learn traceability practices across the supply chain',
    ],
    requirements: [
      'Studying business, industrial engineering, supply chain, or related field',
      'Strong organizational skills and Excel proficiency',
      'Detail-oriented with a process-minded mindset',
      'Available for hybrid work in Laguna and remote days',
    ],
    image: IMAGES.productBodycream,
    url: 'mailto:careers@kgoldbeauty.com?subject=Application%3A%20Operations%20Intern',
  },
  {
    id: 'ecommerce-intern',
    title: 'E-Commerce Intern',
    department: 'Digital',
    location: 'Remote · Philippines',
    duration: '3–5 months',
    summary:
      'Support online storefronts, product listings, and digital campaigns across KGOLD’s e-commerce channels.',
    description:
      'You’ll work with the digital team to keep product pages accurate, assist with promotional calendars, and learn how a beauty brand manages its online shelf presence day to day.',
    highlights: [
      'Update product content, pricing, and assets on marketplaces',
      'Assist with campaign banners and promotional scheduling',
      'Track basic channel performance and listing health',
      'Exposure to Shopee, Lazada, and owned digital channels',
    ],
    requirements: [
      'Enrolled in marketing, business, IT, or related program',
      'Comfortable with spreadsheets and detail-oriented work',
      'Interest in e-commerce and digital merchandising',
      'Reliable internet and available at least 3 days per week',
    ],
    image: IMAGES.productSpf,
    url: 'mailto:careers@kgoldbeauty.com?subject=Application%3A%20E-Commerce%20Intern',
  },
  {
    id: 'quality-assurance-intern',
    title: 'Quality Assurance Intern',
    department: 'Operations',
    location: 'Laguna · On-site',
    duration: '4–6 months',
    summary:
      'Learn how KGOLD safeguards product integrity through documentation, batch reviews, and facility quality checks.',
    description:
      'Support the QA team with record-keeping, sample coordination, and audit prep — gaining firsthand insight into how quality standards are maintained from production to release.',
    highlights: [
      'Assist with batch records and certificate filing',
      'Support sample collection and lab coordination',
      'Join quality review meetings and checklist updates',
      'Learn GMP-aligned documentation practices',
    ],
    requirements: [
      'Studying chemistry, pharmacy, cosmetic science, or related field',
      'Meticulous, organized, and comfortable with documentation',
      'Available for on-site work in Laguna',
      'Strong interest in product safety and quality systems',
    ],
    image: IMAGES.productSerum,
    url: 'mailto:careers@kgoldbeauty.com?subject=Application%3A%20Quality%20Assurance%20Intern',
  },
];

export function filterJobListings(
  jobs: readonly IJobListing[],
  query: string,
  department: string | null,
): IJobListing[] {
  const normalizedQuery = query.trim().toLowerCase();

  return jobs.filter((job) => {
    const matchesDepartment = !department || job.department === department;
    if (!matchesDepartment) return false;
    if (!normalizedQuery) return true;

    const haystack = [
      job.title,
      job.department,
      job.location,
      job.type,
      job.summary,
      job.description,
      ...job.responsibilities,
      ...job.requirements,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function getJobDepartments(jobs: readonly IJobListing[]): string[] {
  return [...new Set(jobs.map((job) => job.department))].sort();
}

export function filterInternshipListings(
  internships: readonly IInternshipListing[],
  query: string,
  department: string | null,
): IInternshipListing[] {
  const normalizedQuery = query.trim().toLowerCase();

  return internships.filter((internship) => {
    const matchesDepartment = !department || internship.department === department;
    if (!matchesDepartment) return false;
    if (!normalizedQuery) return true;

    const haystack = [
      internship.title,
      internship.department,
      internship.location,
      internship.duration,
      internship.summary,
      internship.description,
      ...internship.highlights,
      ...internship.requirements,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function getInternshipDepartments(internships: readonly IInternshipListing[]): string[] {
  return [...new Set(internships.map((internship) => internship.department))].sort();
}

/** Returns API listings when wired; otherwise static openings. */
export async function fetchJobListings(): Promise<IJobListing[]> {
  if (!CAREERS_API) return STATIC_JOB_LISTINGS;

  try {
    const response = await fetch(CAREERS_API);
    if (!response.ok) return STATIC_JOB_LISTINGS;
    // Future: normalize API payload to IJobListing[]
    return STATIC_JOB_LISTINGS;
  } catch {
    return STATIC_JOB_LISTINGS;
  }
}

export async function fetchInternships(): Promise<IInternshipListing[]> {
  return STATIC_INTERNSHIPS;
}
