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
import { SectionHeader } from '../../ui/SectionHeader';
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
    <section id="internships" className="scroll-section bg-background section-padding">
      <div className="page-container">
        <SectionHeader title={copy.title} description={copy.description} />

        <CareerSectionBanner {...copy.banner} />

        <div
          id="internship-programs"
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
            resultCount={filteredInternships.length}
            labels={{
              ...listFilters,
              resultsSingular: copy.resultsSingular,
              resultsPlural: copy.resultsPlural,
            }}
          />

          <div className="section-inner-stack">
            {filteredInternships.length === 0 ? (
              <p className="rounded-brand border border-dashed border-border bg-card px-6 py-10 text-center text-base text-muted-foreground">
                {copy.emptyMessage}
              </p>
            ) : viewMode === 'grid' ? (
              <div className="grid auto-rows-[28rem] section-career-grid sm:grid-cols-2 lg:grid-cols-3">
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
              <ul className="section-list-row">
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

        <p className="section-stack text-sm text-muted-foreground">
          {copy.generalCta}{' '}
          <a
            href={copy.generalHref}
            className="font-normal text-foreground underline-offset-4 transition hover:underline"
          >
            {CAREERS_PAGE.careersEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
