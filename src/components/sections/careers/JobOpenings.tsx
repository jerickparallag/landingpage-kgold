import { useEffect, useState } from 'react';
import { CAREERS_PAGE } from '../../../constants/content';
import {
  fetchJobListings,
  filterJobListings,
  getJobDepartments,
} from '../../../lib/careers';
import { useCareerListFilters } from '../../../hooks/useCareerListFilters';
import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../lib/utils';
import { JobCard, JobListRow } from './JobBoard';
import { CareerSectionBanner } from './CareerSectionBanner';
import { CareerListToolbar } from './CareerListToolbar';

export function JobOpenings() {
  const [jobs, setJobs] = useState<Awaited<ReturnType<typeof fetchJobListings>>>([]);
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { jobs: copy, listFilters } = CAREERS_PAGE;

  useEffect(() => {
    fetchJobListings().then(setJobs);
  }, []);

  const {
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    viewMode,
    setViewMode,
    activeItemId,
    toggleActiveItem,
    departments,
    filteredItems: filteredJobs,
  } = useCareerListFilters(jobs, filterJobListings, getJobDepartments);

  return (
    <section id="open-roles" className="scroll-mt-28 bg-background section-padding">
      <div className="page-container">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.description}
          </p>
        </div>

        <CareerSectionBanner {...copy.banner} />

        <div
          id="open-roles-list"
          ref={ref}
          className={cn('reveal mt-12 lg:mt-16', isVisible && 'reveal-visible')}
        >
          <CareerListToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            departments={departments}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            resultCount={filteredJobs.length}
            labels={{
              ...listFilters,
              resultsSingular: copy.resultsSingular,
              resultsPlural: copy.resultsPlural,
            }}
          />

          <div className="mt-8">
            {filteredJobs.length === 0 ? (
              <p className="rounded-brand border border-dashed border-border bg-card px-6 py-10 text-center text-base text-muted-foreground">
                {copy.emptyMessage}
              </p>
            ) : viewMode === 'grid' ? (
              <div className="grid auto-rows-[28rem] gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isFlipped={activeItemId === job.id}
                    onToggle={() => toggleActiveItem(job.id)}
                  />
                ))}
              </div>
            ) : (
              <ul className="flex flex-col gap-4">
                {filteredJobs.map((job) => (
                  <JobListRow
                    key={job.id}
                    job={job}
                    isExpanded={activeItemId === job.id}
                    onToggle={() => toggleActiveItem(job.id)}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
