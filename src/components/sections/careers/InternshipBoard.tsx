import { CAREERS_PAGE } from '../../../constants/content';
import type { IInternshipListing } from '../../../lib/careers';
import { cn, ctaButtonClass, typeBodyMutedClass, typeSubheadingClass } from '../../../lib/utils';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { FlipCareerCard, FlipToggle } from './FlipCareerCard';

interface IInternshipCardProps {
  role: IInternshipListing;
  isFlipped: boolean;
  onToggle: () => void;
}

export function InternshipCard({ role, isFlipped, onToggle }: IInternshipCardProps) {
  const { internships: copy } = CAREERS_PAGE;

  return (
    <FlipCareerCard
      isFlipped={isFlipped}
      front={
        <>
          <div className="aspect-square overflow-hidden bg-muted">
            <OptimizedImage
              src={role.image}
              alt=""
              pictureClassName="block h-full w-full"
              className="object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col pt-4">
            <p className="journal-card-category">
              Internship
              <span className="mx-1.5 font-normal">·</span>
              {role.duration}
            </p>
            <h3 className={cn('journal-card-title', 'mt-2 font-normal')}>{role.title}</h3>
            <p className={cn(typeBodyMutedClass, 'mt-1')}>
              {role.department}
              <span aria-hidden="true"> · </span>
              {role.location}
            </p>
            <p className={cn(typeBodyMutedClass, 'mt-3 line-clamp-2')}>{role.summary}</p>
            <div className="mt-auto pt-5">
              <FlipToggle
                isFlipped={isFlipped}
                onToggle={onToggle}
                learnMoreLabel={copy.learnMoreLabel}
                backLabel={copy.hideDetailsLabel}
              />
            </div>
          </div>
        </>
      }
      back={
        <div className="flex h-full min-h-0 flex-col p-4 sm:p-5">
          <div className="shrink-0">
            <p className="journal-card-category">Internship · {role.duration}</p>
            <h3 className={cn('journal-card-title', 'mt-2 font-normal')}>{role.title}</h3>
          </div>
          <div className="scrollbar-thin mt-4 min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
            <p className={typeBodyMutedClass}>{role.description}</p>
            <div>
              <h4 className={typeSubheadingClass}>{copy.highlightsLabel}</h4>
              <ul className={cn(typeBodyMutedClass, 'mt-2 space-y-1.5')}>
                {role.highlights.map((item) => (
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
                {role.requirements.map((item) => (
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
              learnMoreLabel={copy.learnMoreLabel}
              backLabel={copy.hideDetailsLabel}
            />
            <a href={role.url} className={ctaButtonClass}>
              {copy.applyLabel}
            </a>
          </div>
        </div>
      }
    />
  );
}
