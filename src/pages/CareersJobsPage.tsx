import { useEffect, useMemo, useState } from 'react';
import { JOBS_PAGE } from '../constants/content';
import {
  fetchJobListings,
  filterJobListings,
  getJobDepartments,
} from '../lib/careers';
import { CareersListingHeader } from '../components/sections/careers/CareersListingHeader';
import { CareersDepartmentNav } from '../components/sections/careers/CareersDepartmentNav';
import { CareersListingGrid } from '../components/sections/careers/CareersListingGrid';

export function CareersJobsPage() {
  const [jobs, setJobs] = useState<Awaited<ReturnType<typeof fetchJobListings>>>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const copy = JOBS_PAGE;

  useEffect(() => {
    fetchJobListings().then(setJobs);
  }, []);

  const departments = useMemo(() => getJobDepartments(jobs), [jobs]);
  const filteredJobs = useMemo(
    () => filterJobListings(jobs, '', selectedDepartment),
    [jobs, selectedDepartment],
  );

  return (
    <section className="scroll-section bg-background pb-16 lg:pb-24">
      <div className="page-container">
        <CareersListingHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />

        <div className="mt-10 sm:mt-12 lg:mt-14">
          <CareersDepartmentNav
            departments={departments}
            selectedDepartment={selectedDepartment}
            onSelect={setSelectedDepartment}
            filterAllLabel={copy.filterAll}
          />
          <div className="mt-10 sm:mt-12 lg:mt-14">
            <CareersListingGrid
              variant="job"
              jobs={filteredJobs}
              emptyMessage={copy.emptyMessage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
