import { useState } from 'react';
import type { IInternshipListing, IJobListing } from '../../../lib/careers';
import { InternshipCard } from './InternshipBoard';
import { JobCard } from './JobBoard';

interface ICareersListingGridProps {
  variant: 'job' | 'internship';
  jobs?: readonly IJobListing[];
  internships?: readonly IInternshipListing[];
  emptyMessage: string;
}

export function CareersListingGrid({
  variant,
  jobs = [],
  internships = [],
  emptyMessage,
}: ICareersListingGridProps) {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const items = variant === 'job' ? jobs : internships;

  const toggleItem = (id: string) => {
    setActiveItemId((current) => (current === id ? null : id));
  };

  if (items.length === 0) {
    return (
      <p className="rounded-brand border border-dashed border-border bg-card px-6 py-10 text-center text-sm text-muted-foreground">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
      {variant === 'job'
        ? jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isFlipped={activeItemId === job.id}
              onToggle={() => toggleItem(job.id)}
            />
          ))
        : internships.map((role) => (
            <InternshipCard
              key={role.id}
              role={role}
              isFlipped={activeItemId === role.id}
              onToggle={() => toggleItem(role.id)}
            />
          ))}
    </div>
  );
}
