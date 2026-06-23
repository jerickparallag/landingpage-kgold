import { useEffect, useState } from 'react';
import { CAREERS_PAGE } from '../../../constants/content';
import {
  fetchInternships,
  filterInternshipListings,
  getInternshipDepartments,
  type IInternshipListing,
} from '../../../lib/careers';
import { useCareerListFilters } from '../../../hooks/useCareerListFilters';
import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../lib/utils';
import { CareerSectionBanner } from './CareerSectionBanner';
import { CareerListToolbar } from './CareerListToolbar';
import { InternshipCard, InternshipListRow } from './InternshipBoard';

export function InternshipProgram() {
  const [internships, setInternships] = useState<IInternshipListing[]>([]);
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { internships: copy, listFilters } = CAREERS_PAGE;

  useEffect(() => {
    fetchInternships().then(setInternships);
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
    filteredItems: filteredInternships,
  } = useCareerListFilters(internships, filterInternshipListings, getInternshipDepartments);

  return (
    <section id="internships" className="scroll-mt-28 bg-background section-padding">
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
          id="internship-programs"
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
            resultCount={filteredInternships.length}
            labels={{
              ...listFilters,
              resultsSingular: copy.resultsSingular,
              resultsPlural: copy.resultsPlural,
            }}
          />

          <div className="mt-8">
            {filteredInternships.length === 0 ? (
              <p className="rounded-brand border border-dashed border-border bg-card px-6 py-10 text-center text-base text-muted-foreground">
                {copy.emptyMessage}
              </p>
            ) : viewMode === 'grid' ? (
              <div className="grid auto-rows-[28rem] gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                {filteredInternships.map((role) => (
                  <InternshipCard
                    key={role.id}
                    role={role}
                    isFlipped={activeItemId === role.id}
                    onToggle={() => toggleActiveItem(role.id)}
                  />
                ))}
              </div>
            ) : (
              <ul className="flex flex-col gap-4">
                {filteredInternships.map((role) => (
                  <InternshipListRow
                    key={role.id}
                    role={role}
                    isExpanded={activeItemId === role.id}
                    onToggle={() => toggleActiveItem(role.id)}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          {copy.generalCta}{' '}
          <a
            href={copy.generalHref}
            className="font-medium text-primary transition hover:text-primary-hover"
          >
            {CAREERS_PAGE.careersEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
