import { useEffect, useState } from 'react';
import { CAREERS_PAGE } from '../../../constants/content';
import {
  fetchJobListings,
  filterJobListings,
  getJobDepartments,
} from '../../../lib/careers';
import { useCareerListFilters } from '../../../hooks/useCareerListFilters';
import { useInView } from '../../../hooks/useInView';
import { SectionHeader } from '../../ui/SectionHeader';
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
    <section id="open-roles" className="scroll-section bg-background section-padding">
      <div className="page-container">
        <SectionHeader title={copy.title} description={copy.description} />

        <CareerSectionBanner {...copy.banner} />

        <div
          id="open-roles-list"
          ref={ref}
          className={cn('reveal section-stack', isVisible && 'reveal-visible')}
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

          <div className="section-inner-stack">
            {filteredJobs.length === 0 ? (
              <p className="rounded-brand border border-dashed border-border bg-card px-6 py-10 text-center text-base text-muted-foreground">
                {copy.emptyMessage}
              </p>
            ) : viewMode === 'grid' ? (
              <div className="grid auto-rows-[28rem] section-career-grid sm:grid-cols-2 lg:grid-cols-3">
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
              <ul className="section-list-row">
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
