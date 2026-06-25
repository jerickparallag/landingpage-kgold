import jobsData from '../content/careers/jobs.json';
import internshipsData from '../content/careers/internships.json';
import {
  resolveInternshipListings,
  resolveJobListings,
} from '../content/resolve';
import type {
  ICareersApiResponse,
  IInternshipListing,
  IInternshipListingRaw,
  IJobListing,
  IJobListingRaw,
} from '../content/types';

export type {
  ICareersApiResponse,
  IInternshipListing,
  IInternshipListingRaw,
  IJobListing,
  IJobListingRaw,
  TEmploymentType,
  TJobViewMode,
} from '../content/types';

const CAREERS_API = import.meta.env.VITE_CAREERS_API_URL;

const LOCAL_JOBS = resolveJobListings(jobsData.jobs as IJobListingRaw[]);
const LOCAL_INTERNSHIPS = resolveInternshipListings(internshipsData.internships as IInternshipListingRaw[]);

function isJobListingRaw(value: unknown): value is IJobListingRaw {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'title' in value &&
    'imageKey' in value &&
    'applyUrl' in value
  );
}

function isInternshipListingRaw(value: unknown): value is IInternshipListingRaw {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'title' in value &&
    'duration' in value &&
    'imageKey' in value &&
    'applyUrl' in value
  );
}

/** Normalize API or CMS payload into job listings. */
export function normalizeCareersPayload(payload: ICareersApiResponse): {
  jobs: IJobListing[];
  internships: IInternshipListing[];
} {
  const jobs = Array.isArray(payload.jobs)
    ? payload.jobs.filter(isJobListingRaw).map((job) => resolveJobListings([job])[0])
    : LOCAL_JOBS;

  const internships = Array.isArray(payload.internships)
    ? payload.internships
        .filter(isInternshipListingRaw)
        .map((internship) => resolveInternshipListings([internship])[0])
    : LOCAL_INTERNSHIPS;

  return { jobs, internships };
}

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

async function fetchCareersPayload(): Promise<ICareersApiResponse | null> {
  if (!CAREERS_API) return null;

  try {
    const response = await fetch(CAREERS_API);
    if (!response.ok) return null;
    return (await response.json()) as ICareersApiResponse;
  } catch {
    return null;
  }
}

/** Returns API listings when wired; otherwise JSON files in src/content/careers/. */
export async function fetchJobListings(): Promise<IJobListing[]> {
  const payload = await fetchCareersPayload();
  if (!payload) return LOCAL_JOBS;
  return normalizeCareersPayload(payload).jobs;
}

export async function fetchInternships(): Promise<IInternshipListing[]> {
  const payload = await fetchCareersPayload();
  if (!payload) return LOCAL_INTERNSHIPS;
  return normalizeCareersPayload(payload).internships;
}
