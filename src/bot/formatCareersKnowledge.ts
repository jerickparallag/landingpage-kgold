import careersPageJson from '../content/careers-page.json';
import internshipsJson from '../content/careers/internships.json';
import jobsJson from '../content/careers/jobs.json';

type Job = (typeof jobsJson.jobs)[number];
type Internship = (typeof internshipsJson.internships)[number];

function bulletList(items: string[]): string {
  return items.map((item) => `  • ${item}`).join('\n');
}

export function formatJobDetail(job: Job): string {
  return [
    `ROLE: ${job.title} (id: ${job.id})`,
    `Department: ${job.department}`,
    `Location: ${job.location}`,
    `Type: ${job.type}`,
    `Summary: ${job.summary}`,
    `About this role: ${job.description}`,
    `What you'll do:`,
    bulletList(job.responsibilities),
    `What we're looking for:`,
    bulletList(job.requirements),
    `Apply: ${job.applyUrl}`,
  ].join('\n');
}

export function formatInternshipDetail(intern: Internship): string {
  return [
    `PROGRAM: ${intern.title} (id: ${intern.id})`,
    `Department: ${intern.department}`,
    `Location: ${intern.location}`,
    `Duration: ${intern.duration}`,
    `Summary: ${intern.summary}`,
    `About this program: ${intern.description}`,
    `What you'll experience:`,
    bulletList(intern.highlights),
    `Who should apply:`,
    bulletList(intern.requirements),
    `Apply: ${intern.applyUrl}`,
  ].join('\n');
}

export function buildCareersKnowledgeBlock(): string {
  const page = careersPageJson;
  const cultureBlock = page.culture.items
    .map((item) => `${item.title}: ${item.description}`)
    .join('\n');

  const openRolesList = jobsJson.jobs
    .map((job) => `  • ${job.title} — ${job.department}, ${job.location}, ${job.type}`)
    .join('\n');

  const internList = internshipsJson.internships
    .map((item) => `  • ${item.title} — ${item.department}, ${item.location}, ${item.duration}`)
    .join('\n');

  const jobDetails = jobsJson.jobs.map((job) => formatJobDetail(job)).join('\n\n---\n\n');
  const internDetails = internshipsJson.internships
    .map((item) => formatInternshipDetail(item))
    .join('\n\n---\n\n');

  return [
    '=== CAREERS AT KGOLD (answer career questions from this section) ===',
    '',
    '--- CAREERS OVERVIEW ---',
    page.hero.body,
    `Careers email: ${page.careersEmail}`,
    `General application: ${page.cta.primaryHref}`,
    `Careers page: /careers`,
    `Last updated: ${jobsJson.updatedAt}`,
    '',
    '--- WHY JOIN (culture) ---',
    cultureBlock,
    '',
    '--- OPEN ROLES SUMMARY ---',
    page.jobs.description,
    `Total open roles: ${jobsJson.jobs.length}`,
    openRolesList,
    '',
    '--- INTERNSHIP PROGRAMS SUMMARY ---',
    page.internships.description,
    `Total internship programs: ${internshipsJson.internships.length}`,
    internList,
    '',
    '--- FULL JOB LISTINGS (use for "what does X role do?", requirements, how to apply) ---',
    jobDetails,
    '',
    '--- FULL INTERNSHIP LISTINGS (use for program details, highlights, who should apply) ---',
    internDetails,
    '',
    '--- HOW TO APPLY ---',
    `Email applications to ${page.careersEmail} with the role or program name in the subject line.`,
    'Each listing above includes a pre-filled apply link (mailto) for that specific role.',
    `Internship questions: ${page.internships.generalHref}`,
  ].join('\n');
}

export function formatJobAnswer(job: Job): string {
  return [
    `${job.title} is a ${job.type} role in ${job.department}, based in ${job.location}.`,
    '',
    job.summary,
    '',
    job.description,
    '',
    "What you'll do:",
    ...job.responsibilities.map((item) => `• ${item}`),
    '',
    "What we're looking for:",
    ...job.requirements.map((item) => `• ${item}`),
    '',
    `Apply: ${job.applyUrl}`,
  ].join('\n');
}

export function formatInternshipAnswer(intern: Internship): string {
  return [
    `${intern.title} is a ${intern.duration} internship in ${intern.department}, based in ${intern.location}.`,
    '',
    intern.summary,
    '',
    intern.description,
    '',
    "What you'll experience:",
    ...intern.highlights.map((item) => `• ${item}`),
    '',
    'Who should apply:',
    ...intern.requirements.map((item) => `• ${item}`),
    '',
    `Apply: ${intern.applyUrl}`,
  ].join('\n');
}

export function buildCareersSummaryAnswer(): string {
  const jobCount = jobsJson.jobs.length;
  const internCount = internshipsJson.internships.length;
  const roleNames = jobsJson.jobs.map((j) => j.title).join(', ');
  const internNames = internshipsJson.internships.map((i) => i.title).join(', ');

  return [
    `KGOLD currently has ${jobCount} open role${jobCount === 1 ? '' : 's'} and ${internCount} internship program${internCount === 1 ? '' : 's'}.`,
    '',
    jobCount > 0 ? `Open roles: ${roleNames}.` : '',
    internCount > 0 ? `Internship programs: ${internNames}.` : '',
    '',
    `Applications go to ${careersPageJson.careersEmail}. Ask me about any specific role for responsibilities, requirements, and how to apply.`,
  ]
    .filter(Boolean)
    .join('\n');
}
