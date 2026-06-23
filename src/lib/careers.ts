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
    id: 'brand-marketing-manager',
    title: 'Brand Marketing Manager',
    department: 'Marketing',
    location: 'Makati City · Hybrid',
    type: 'Full-time',
    summary:
      'Lead brand campaigns, retail activations, and storytelling that connects KGOLD with partners and consumers nationwide.',
    description:
      'You will own how KGOLD shows up in the market — from campaign planning and content direction to partner launches and in-store storytelling. This role sits at the center of brand, sales, and product.',
    responsibilities: [
      'Plan and execute integrated marketing campaigns across retail, digital, and trade channels.',
      'Develop brand guidelines, campaign assets, and partner toolkits with internal and agency teams.',
      'Coordinate product launches with sales and operations for consistent shelf and salon presence.',
      'Track campaign performance and translate insights into actionable brand recommendations.',
      'Manage marketing budgets, timelines, and cross-functional stakeholder alignment.',
    ],
    requirements: [
      '4+ years in brand marketing, preferably in beauty, FMCG, or lifestyle.',
      'Strong project management and written communication skills.',
      'Experience working with distributors, retailers, or salon partners is a plus.',
      'Comfortable balancing creative direction with commercial outcomes.',
    ],
    image: '/images/category-skincare.png',
    url: 'mailto:careers@kgoldbeauty.com?subject=Application%3A%20Brand%20Marketing%20Manager',
  },
  {
    id: 'regional-sales-executive',
    title: 'Regional Sales Executive',
    department: 'Sales',
    location: 'Metro Manila · On-site',
    type: 'Full-time',
    summary:
      'Grow KGOLD’s retail footprint by building trusted relationships with distributors, salons, and beauty resellers.',
    description:
      'This is a field-facing role for someone who understands the Philippine beauty trade — you’ll represent KGOLD on the ground, open doors with new partners, and help existing accounts grow.',
    responsibilities: [
      'Hit territory sales targets through active account development and new business acquisition.',
      'Conduct partner visits, product trainings, and merchandising checks in assigned areas.',
      'Coordinate with marketing and operations on promotions, stock levels, and launch execution.',
      'Maintain accurate pipeline records, forecasts, and visit reports.',
      'Gather market feedback to inform pricing, assortment, and regional strategy.',
    ],
    requirements: [
      '2+ years in field sales within beauty, personal care, or FMCG.',
      'Valid driver’s license and willingness to travel within Metro Manila and nearby provinces.',
      'Relationship-driven communicator with strong follow-through.',
      'Familiarity with salon, pharmacy, or modern trade channels preferred.',
    ],
    image: '/images/category-haircare.png',
    url: 'mailto:careers@kgoldbeauty.com?subject=Application%3A%20Regional%20Sales%20Executive',
  },
  {
    id: 'quality-assurance-specialist',
    title: 'Quality Assurance Specialist',
    department: 'Operations',
    location: 'Laguna · On-site',
    type: 'Full-time',
    summary:
      'Safeguard product integrity through batch reviews, facility audits, and documentation that meets KGOLD’s quality bar.',
    description:
      'Quality is non-negotiable at KGOLD. You’ll work closely with manufacturing partners and the product team to ensure every release is traceable, compliant, and shelf-ready.',
    responsibilities: [
      'Review batch records, COAs, and stability documentation before product release.',
      'Conduct supplier and facility audits aligned with GMP-aligned internal standards.',
      'Investigate quality deviations and coordinate corrective actions with partners.',
      'Maintain SOPs, checklists, and traceability logs across SKUs.',
      'Support new product scale-up with pre-production quality checkpoints.',
    ],
    requirements: [
      'Background in chemistry, pharmacy, cosmetic science, or related field.',
      '1–3 years in QA/QC, preferably in cosmetics or personal care manufacturing.',
      'Detail-oriented with strong documentation habits.',
      'Comfortable collaborating with external manufacturing partners.',
    ],
    image: '/images/product-serum.png',
    url: 'mailto:careers@kgoldbeauty.com?subject=Application%3A%20Quality%20Assurance%20Specialist',
  },
  {
    id: 'ecommerce-coordinator',
    title: 'E-Commerce Coordinator',
    department: 'Digital',
    location: 'Remote · Philippines',
    type: 'Full-time',
    summary:
      'Keep KGOLD’s digital storefronts accurate, on-brand, and optimized for conversion across partner and owned channels.',
    description:
      'You’ll be the operational backbone of our e-commerce presence — managing product listings, coordinating promotions, and ensuring the online experience reflects the same standard as our physical shelves.',
    responsibilities: [
      'Upload and maintain product content, pricing, and inventory across e-commerce platforms.',
      'Coordinate with marketing on digital campaigns, banners, and promotional calendars.',
      'Monitor order flow issues and escalate fulfillment or listing discrepancies.',
      'Track basic performance metrics and prepare weekly channel reports.',
      'Support marketplace onboarding for new retail partners.',
    ],
    requirements: [
      '1–2 years in e-commerce operations, marketplace management, or digital merchandising.',
      'Organized, responsive, and comfortable with spreadsheets and CMS tools.',
      'Interest in beauty and consumer brands.',
      'Experience with Shopee, Lazada, or Shopify is an advantage.',
    ],
    image: '/images/category-bodycare.png',
    url: 'mailto:careers@kgoldbeauty.com?subject=Application%3A%20E-Commerce%20Coordinator',
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
    image: '/images/category-skincare.png',
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
    image: '/images/product-shampoo.png',
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
    image: '/images/category-haircare.png',
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
    image: '/images/product-bodycream.png',
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
    image: '/images/product-spf.png',
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
    image: '/images/product-serum.png',
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
