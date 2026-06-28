import { CAREERS_PAGE } from '../../../constants/content';
import type { IJobListing } from '../../../lib/careers';
import { cn, ctaButtonClass, typeBodyMutedClass, typeSubheadingClass } from '../../../lib/utils';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { FlipCareerCard, FlipToggle } from './FlipCareerCard';

interface IJobCardProps {
  job: IJobListing;
  isFlipped: boolean;
  onToggle: () => void;
}

export function JobCard({ job, isFlipped, onToggle }: IJobCardProps) {
  const { jobs: copy } = CAREERS_PAGE;

  return (
    <FlipCareerCard
      isFlipped={isFlipped}
      front={
        <>
          <div className="aspect-square overflow-hidden bg-muted">
            <OptimizedImage
              src={job.image}
              alt=""
              pictureClassName="block h-full w-full"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col pt-4">
            <p className="journal-card-category">
              {job.department}
              <span className="mx-1.5 font-normal">·</span>
              {job.type}
            </p>
            <h3 className={cn('journal-card-title', 'mt-2 font-normal')}>{job.title}</h3>
            <p className={cn(typeBodyMutedClass, 'mt-1')}>{job.location}</p>
            <p className={cn(typeBodyMutedClass, 'mt-3 line-clamp-2')}>{job.summary}</p>
            <div className="mt-auto pt-5">
              <FlipToggle
                isFlipped={isFlipped}
                onToggle={onToggle}
                learnMoreLabel={copy.viewDetailsLabel}
                backLabel={copy.hideDetailsLabel}
              />
            </div>
          </div>
        </>
      }
      back={
        <div className="flex h-full min-h-0 flex-col p-4 sm:p-5">
          <div className="shrink-0">
            <p className="journal-card-category">{job.department}</p>
            <h3 className={cn('journal-card-title', 'mt-2 font-normal')}>{job.title}</h3>
          </div>
          <div className="scrollbar-thin mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
            <p className={typeBodyMutedClass}>{job.description}</p>
            <div>
              <h4 className={typeSubheadingClass}>{copy.responsibilitiesLabel}</h4>
              <ul className={cn(typeBodyMutedClass, 'mt-2 space-y-1.5')}>
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className={typeSubheadingClass}>{copy.requirementsLabel}</h4>
              <ul className={cn(typeBodyMutedClass, 'mt-2 space-y-1.5')}>
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 flex shrink-0 flex-wrap items-center gap-4 border-t border-border pt-4">
            <FlipToggle
              isFlipped={isFlipped}
              onToggle={onToggle}
              learnMoreLabel={copy.viewDetailsLabel}
              backLabel={copy.hideDetailsLabel}
            />
            <a href={job.url} className={ctaButtonClass}>
              {copy.applyLabel}
            </a>
          </div>
        </div>
      }
    />
  );
}
