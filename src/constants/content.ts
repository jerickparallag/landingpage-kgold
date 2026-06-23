export const SITE = {
  name: 'KGOLD Beauty Essentials',
  tagline: 'Beauty essentials, crafted with purpose.',
  description:
    'Filipino-crafted beauty essentials built on quality formulations, trusted partnerships, and care that respects people and planet.',
  url: 'https://kgoldbeauty.com',
  contactEmail: 'hello@kgoldbeauty.com',
} as const;

export const NAV_LINKS = [
  { label: 'Shop', href: '/#categories' },
  { label: 'Bestsellers', href: '/#bestsellers' },
  { label: 'Quality', href: '/#quality' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/about/contact' },
] as const;

export const HERO = {
  headline: ['Beauty essentials,', 'crafted with', 'purpose.'],
  subheadline: 'The standard your skin deserves',
  body: 'Formulated in partnership with Filipino experts. Proven in salons and stores nationwide. Made for people who expect more from everyday care.',
  ctaLabel: 'Explore collections',
  ctaHref: '#categories',
  backgroundImage: '/hero-bg.png',
} as const;

export const FEATURED_CATEGORIES = {
  title: 'Shop by collection',
  description:
    'Four curated lines. One uncompromising standard. Find the routine that fits how you live.',
  items: [
    {
      id: 'skincare',
      name: 'Skincare',
      tagline: 'Glow that lasts beyond the mirror',
      description: 'Serums, moisturizers, and treatments formulated for real tropical climates.',
      image: '/images/category-skincare.png',
      href: '/#bestsellers',
      span: 'large' as const,
    },
    {
      id: 'haircare',
      name: 'Haircare',
      tagline: 'Salon results, every wash',
      description: 'Repair, nourish, and protect — from daily care to professional treatment.',
      image: '/images/category-haircare.png',
      href: '/#bestsellers',
      span: 'default' as const,
    },
    {
      id: 'bodycare',
      name: 'Body Care',
      tagline: 'Skin-first from neck to toe',
      description: 'Rich textures and clean formulas for all-day comfort.',
      image: '/images/category-bodycare.png',
      href: '/#bestsellers',
      span: 'default' as const,
    },
    {
      id: 'men',
      name: "Men's Grooming",
      tagline: 'No fuss. No compromise.',
      description: 'Straightforward essentials built for modern grooming routines.',
      image: '/images/category-men.png',
      href: '/#bestsellers',
      span: 'wide' as const,
    },
  ],
} as const;

export const BEST_SELLERS = {
  title: 'Customer favorites',
  description:
    'The products partners reorder first — and customers come back for.',
  viewAllHref: '/#categories',
  viewAllLabel: 'Request catalog',
  items: [
    {
      id: 'radiance-serum',
      name: 'KGOLD Radiance Serum',
      line: 'Skincare',
      description: 'Vitamin-infused daily serum for visible luminosity and even tone.',
      image: '/images/product-serum.png',
      badge: 'No. 1 bestseller',
    },
    {
      id: 'silk-repair',
      name: 'Silk Repair Shampoo',
      line: 'Haircare',
      description: 'Keratin-rich formula that restores softness after just one wash.',
      image: '/images/product-shampoo.png',
      badge: 'Salon pick',
    },
    {
      id: 'velvet-cream',
      name: 'Velvet Body Cream',
      line: 'Body Care',
      description: 'Deep hydration with a lightweight finish — never greasy, always smooth.',
      image: '/images/product-bodycream.png',
      badge: 'Top rated',
    },
    {
      id: 'daily-defense',
      name: 'Daily Defense SPF 50',
      line: 'Skincare',
      description: 'Broad-spectrum protection that layers seamlessly under makeup.',
      image: '/images/product-spf.png',
      badge: 'New arrival',
    },
  ],
} as const;

export const ABOUT = {
  title: 'A brand built on consistency, not hype.',
  teaser:
    'For over 15 years, KGOLD has partnered with formulators and retailers who believe the same thing we do: everyday beauty should never feel like a compromise.',
  mission:
    'We make thoughtfully formulated beauty essentials accessible through reliable partnerships — held to the same standard, every batch, every shelf.',
  backgroundImage: '/hero-bg.png',
  ctaLabel: 'Who we are',
  ctaHref: '/about',
} as const;

export const ABOUT_PAGE = {
  subNavParent: { label: 'About', href: '/about' },
  subNav: [
    { label: 'Company', href: '/about#company' },
    { label: 'Mission', href: '/about#mission' },
    { label: 'Leadership', href: '/about#leadership' },
    { label: 'Contact', href: '/about/contact' },
  ],
  hero: {
    headline: ['About us'],
    subheadline: 'Beauty essentials, built with purpose.',
    body:
      'A homegrown Filipino brand — from Isabela to Marikina — creating wellness that works at a price that respects every kababayan.',
    ctaLabel: 'Meet the company',
    ctaHref: '#company',
    backgroundImage: '/hero-bg.png',
  },
  company: {
    displayTitle: 'About us',
    whoTitle: 'Who we are',
    whoBody:
      'We are headquartered in Marikina City and Isabela, selling directly to Filipino consumers through TikTok Shop, Shopee, Lazada, and our own direct channels — a homegrown beauty brand that competes with the best.',
    purposeTitle: 'Our purpose',
    purposeBody:
      'We unlock innovative potential in Filipino beauty — empowering our workforce, resellers, and communities through products made with purpose, at a price that respects every kababayan.',
    whyTitle: 'Why choose KGOLD?',
    whyBody:
      'Our team across marketing, sales, operations, and product delivers real results for customers, builds livelihoods for our people, and honors every community we serve — with the same consistency behind every batch, every shelf, and every partnership.',
  },
  mission: {
    storyTitle: 'Our story',
    storyLead:
      'We started in a barrio in Isabela — built through hard work, faith, and refusing to quit.',
    story:
      'Today we create Filipino-made beauty and wellness products that work — for customers who deserve more, and for people who believe excellence is not optional. Every formula, every partnership, and every shelf reflects the same standard we held from day one.',
    vision: {
      title: 'Our vision',
      body: 'To transform 1 million Filipino lives by 2030 — empowering our workforce, resellers, and communities through products made with purpose.',
    },
    missionStatement: {
      title: 'Our mission',
      body: 'We create Filipino-made beauty and wellness products that work — building livelihoods for our workforce and resellers, delivering real results for our customers, and honoring every community we serve.',
    },
    valuesTitle: 'Our core values',
    valuesTagline: 'Five principles that shape how we treat people, build products, and show up every day.',
    valuesLearnMore: 'Read more',
    valuesBack: 'Back',
    values: [
      {
        title: 'Malasakit first',
        subtitle: 'How we treat each other',
        description:
          'We treat every kababayan — employee, reseller, customer — like family. Their wins are our wins.',
        image: '/images/category-skincare.png',
      },
      {
        title: 'We rise together',
        subtitle: 'How we move as one team',
        description:
          'No one climbs alone at K Gold. When one of us wins, we lift the next. When one of us falls, we reach back.',
        image: '/images/category-haircare.png',
      },
      {
        title: 'Ownership',
        subtitle: 'How we work',
        description:
          "We own the outcome, not just the task. No one at K Gold says 'that's not my job.'",
        image: '/images/category-bodycare.png',
      },
      {
        title: 'Excellence with humility',
        subtitle: 'How we build',
        description:
          'We build products and services worthy of our name — and we stay grateful for the chance to do this work.',
        image: '/images/category-men.png',
      },
      {
        title: 'Grit ng Pinoy',
        subtitle: 'How we endure',
        description:
          'We started in a barrio in Isabela. We built this through hard work, faith, and refusing to quit. That is the standard.',
        image: '/hero-bg.png',
      },
    ],
  },
  leadership: {
    title: 'Leadership',
    image: '/images/category-men.png',
    quote:
      'We are ruthless about our standards because we care deeply about our people and our customers. Excellence is not optional here — it is our competitive advantage.',
    name: 'The KGold Leadership Team',
    role: 'K Gold Beauty Essentials Corporation',
  },
  careers: {
    title: 'Build beauty with purpose.',
    description:
      'We grow when our people grow. Explore full-time roles and internship programs across marketing, sales, operations, and product.',
    backgroundImage: '/hero-bg.png',
    ctaLabel: 'View careers',
    ctaHref: '/careers',
  },
} as const;

export const QUALITY_SECTION = {
  title: 'Held to a higher standard',
} as const;

export const VALUES = [
  {
    title: 'Manufacturing standards',
    description:
      'Every batch is traceable. Every facility is vetted. Every release meets our internal benchmark before it ships.',
    ctaLabel: 'Our process',
    ctaHref: '#about',
  },
  {
    title: 'Ingredient integrity',
    description:
      'Transparent labels. Responsible sourcing. No hidden fillers dressed up as innovation.',
    ctaLabel: 'See our standards',
    ctaHref: '#about',
  },
  {
    title: 'Partner accountability',
    description:
      'We grow when our retailers grow — with fair terms, reliable supply, and products that sell themselves.',
    ctaLabel: 'Partner with us',
    ctaHref: '/about/contact',
  },
] as const;

export const FAQ_SECTION = {
  title: 'General questions asked by customers.',
  description:
    'Our friendly team is always here to help you with quick, clear, and reliable answers whenever needed.',
  ctaLabel: 'Contact sales',
  ctaHref: '/about/contact',
} as const;

export const FAQ = [
  {
    question: 'Where can I buy KGOLD products?',
    answer:
      'KGOLD is available through 500+ partner locations nationwide — including salons, beauty stores, and select retailers. Contact us to find a store near you.',
  },
  {
    question: 'Do you offer wholesale or distribution partnerships?',
    answer:
      'Yes. We work with distributors and retailers who share our quality standards. Email us at hello@kgoldbeauty.com and our team will respond within 2 business days.',
  },
  {
    question: 'Are KGOLD products cruelty-free?',
    answer:
      'We do not test finished products on animals and work exclusively with partners who align with our cruelty-free commitments.',
  },
  {
    question: 'What makes KGOLD different from other local brands?',
    answer:
      'Consistency. Our formulations are developed with Filipino experts, produced in GMP-aligned facilities, and proven in real retail environments — not just focus groups.',
  },
] as const;

export const FINAL_CTA = {
  title: 'Ready to bring KGOLD to your shelves?',
  description:
    'Partner with a brand your customers already trust. Reach out to explore wholesale, distribution, or collaboration opportunities.',
  primaryLabel: 'Get in touch',
  secondaryLabel: 'Browse collections',
  secondaryHref: '/#categories',
} as const;

export const FOOTER = {
  copyright: `© ${new Date().getFullYear()} KGOLD Beauty Essentials. All rights reserved.`,
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
  ],
  social: [
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
  careers: { label: 'Careers', href: '/careers' },
  contact: { label: 'Contact', href: '/about/contact' },
} as const;

export const CONTACT_PAGE = {
  hero: {
    headline: ['Get in touch', 'with us'],
    backgroundImage: '/hero-bg.png',
  },
  inquiries: {
    title: 'Contact us',
    items: [
      {
        title: 'Sales inquiries',
        linkLabel: 'Email our sales team',
        href: 'mailto:hello@kgoldbeauty.com',
      },
      {
        title: 'Customer support',
        linkLabel: 'Get help with your order',
        href: 'mailto:hello@kgoldbeauty.com',
      },
      {
        title: 'Partner requests',
        linkLabel: 'Explore partnership options',
        href: 'mailto:hello@kgoldbeauty.com',
      },
      {
        title: 'Press and media',
        linkLabel: 'Media inquiries',
        href: 'mailto:hello@kgoldbeauty.com',
      },
      {
        title: 'General inquiries',
        linkLabel: 'hello@kgoldbeauty.com',
        href: 'mailto:hello@kgoldbeauty.com',
      },
      {
        title: 'Career opportunities',
        linkLabel: 'See open roles',
        href: '/careers',
      },
    ],
  },
  addresses: {
    title: 'Our address',
    image: '/images/category-skincare.png',
    locations: [
      {
        name: 'Marikina City',
        lines: [
          'K Gold Beauty Essentials Corporation',
          'Marikina City, Metro Manila',
          'Philippines',
        ],
      },
      {
        name: 'Isabela',
        lines: [
          'K Gold Beauty Essentials Corporation',
          'Isabela, Philippines',
        ],
      },
    ],
  },
  cta: {
    title: 'Ready to bring KGOLD to your shelves?',
    description:
      'Partner with a brand your customers already trust. Reach out to explore wholesale, distribution, or collaboration opportunities.',
    primaryLabel: 'Email us',
    primaryHref: 'mailto:hello@kgoldbeauty.com',
    secondaryLabel: 'Browse collections',
    secondaryHref: '/#categories',
  },
} as const;

export const CAREERS_PAGE = {
  subNavParent: { label: 'Careers', href: '/careers' },
  subNav: [
    { label: 'Culture', href: '/careers#culture' },
    { label: 'Open roles', href: '/careers#open-roles' },
    { label: 'Internships', href: '/careers#internships' },
    { label: 'Contact', href: '/careers/contact' },
  ],
  hero: {
    headline: ['Build beauty', 'with purpose.'],
    subheadline: 'Join a team that puts quality first — in every formula, partnership, and shelf.',
    body: 'We are growing across marketing, sales, operations, and product. Explore open roles and internship opportunities below.',
    ctaLabel: 'View open roles',
    ctaHref: '#open-roles',
    backgroundImage: '/hero-bg.png',
  },
  culture: {
    title: 'Why KGOLD',
    items: [
      {
        title: 'Meaningful work',
        description:
          'Help shape a Filipino beauty brand trusted in salons and stores nationwide — work that shows up in real products and real partnerships.',
      },
      {
        title: 'Room to grow',
        description:
          'Clear paths across functions, mentorship from experienced leaders, and exposure to every stage of the product lifecycle.',
      },
      {
        title: 'Standards that matter',
        description:
          'We invest in people the same way we invest in formulations — with consistency, care, and respect for craft.',
      },
    ],
  },
  jobs: {
    title: 'Open positions',
    description:
      'Current full-time opportunities across our teams. Search by role, filter by team, and switch between grid or list view.',
    searchPlaceholder: 'Search roles, teams, or locations',
    filterAll: 'All teams',
    resultsSingular: 'role found',
    resultsPlural: 'roles found',
    viewGrid: 'Grid view',
    viewList: 'List view',
    responsibilitiesLabel: "What you'll do",
    requirementsLabel: "What we're looking for",
    viewDetailsLabel: 'Learn more',
    hideDetailsLabel: 'Back',
    applyLabel: 'Apply',
    emptyMessage: 'No roles match your search. Try a different keyword or team filter.',
    banner: {
      image: '/images/category-men.png',
      headline: 'Grow with a brand built on consistency',
      subline:
        'Full-time roles across marketing, sales, operations, and digital — where quality standards guide every team.',
      ctaLabel: 'View open roles',
      ctaHref: '#open-roles-list',
    },
  },
  internships: {
    title: 'Internship program',
    description:
      'Hands-on experience for students and early-career talent. Search by program, filter by team, and switch between grid or list view.',
    applyLabel: 'Apply for internship',
    learnMoreLabel: 'Learn more',
    hideDetailsLabel: 'Back',
    highlightsLabel: "What you'll experience",
    requirementsLabel: 'Who should apply',
    resultsSingular: 'program found',
    resultsPlural: 'programs found',
    emptyMessage: 'No programs match your search. Try a different keyword or team filter.',
    generalCta: 'Questions about internships?',
    generalHref: 'mailto:careers@kgoldbeauty.com?subject=Internship%20inquiry',
    banner: {
      image: '/images/category-skincare.png',
      headline: 'Learn the industry from the inside',
      subline:
        'Structured internships across marketing, product, sales, and operations — real projects, real mentorship.',
      ctaLabel: 'Explore programs',
      ctaHref: '#internship-programs',
    },
  },
  cta: {
    title: 'Don’t see the right role?',
    description:
      'We welcome general applications from people who share our standards. Tell us how you’d like to contribute.',
    primaryLabel: 'Send your CV',
    primaryHref: 'mailto:careers@kgoldbeauty.com?subject=General%20application',
  },
  careersEmail: 'careers@kgoldbeauty.com',
  listFilters: {
    searchPlaceholder: 'Search by title, team, or location',
    filterAll: 'All teams',
    viewGrid: 'Grid view',
    viewList: 'List view',
  },
} as const;
