import { useEffect, useMemo, useState } from 'react';
import { INTERNSHIPS_PAGE } from '../constants/content';
import {
  fetchInternships,
  filterInternshipListings,
  getInternshipDepartments,
} from '../lib/careers';
import { CareersListingHeader } from '../components/sections/careers/CareersListingHeader';
import { CareersDepartmentNav } from '../components/sections/careers/CareersDepartmentNav';
import { CareersListingGrid } from '../components/sections/careers/CareersListingGrid';

export function CareersInternshipsPage() {
  const [internships, setInternships] = useState<Awaited<ReturnType<typeof fetchInternships>>>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const copy = INTERNSHIPS_PAGE;

  useEffect(() => {
    fetchInternships().then(setInternships);
  }, []);

  const departments = useMemo(() => getInternshipDepartments(internships), [internships]);
  const filteredInternships = useMemo(
    () => filterInternshipListings(internships, '', selectedDepartment),
    [internships, selectedDepartment],
  );

  return (
    <section className="scroll-section bg-background pb-16 lg:pb-24">
      <div className="page-container">
        <CareersListingHeader
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-10 sm:mt-12 lg:mt-14">
          <CareersDepartmentNav
            departments={departments}
            selectedDepartment={selectedDepartment}
            onSelect={setSelectedDepartment}
            filterAllLabel={copy.filterAll}
          />
          <div className="mt-10 sm:mt-12 lg:mt-14">
            <CareersListingGrid
              variant="internship"
              internships={filteredInternships}
              emptyMessage={copy.emptyMessage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
