import type { IInternshipListing, IJobListing } from '../../../lib/careers';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionCtaButtonClass, sectionDescriptionClass } from '../../../lib/utils';

interface ICareerDetailContentProps {
  variant: 'job' | 'internship';
  item: IJobListing | IInternshipListing;
  labels: {
    applyLabel: string;
    responsibilitiesLabel?: string;
    requirementsLabel: string;
    highlightsLabel?: string;
  };
}

export function CareerDetailContent({ variant, item, labels }: ICareerDetailContentProps) {
  const { ref: bodyRef, isVisible } = useInView<HTMLDivElement>();
  const isJob = variant === 'job';
  const job = isJob ? (item as IJobListing) : null;
  const meta = isJob
    ? `${job!.location} · ${job!.type}`
    : `${(item as IInternshipListing).location} · ${(item as IInternshipListing).duration}`;

  return (
    <article className="scroll-section bg-background pb-16 lg:pb-24">
      <div className="page-container">
        <header className="journal-article-header">
          <p className="journal-card-category">{item.department}</p>
          <h1 className="journal-article-title">{item.title}</h1>
          <p className="journal-article-date">{meta}</p>
        </header>

        <figure className="journal-article-figure">
          <OptimizedImage
            src={item.image}
            alt=""
            className="aspect-[16/10] object-cover sm:aspect-[3/2]"
          />
        </figure>

        <div
          ref={bodyRef}
          className={cn('journal-article-body reveal', isVisible && 'reveal-visible')}
        >
          <p className="journal-article-paragraph">{item.summary}</p>
          <p className="journal-article-paragraph">{item.description}</p>

          {isJob && job ? (
            <div className="space-y-6 pt-2">
              <div>
                <h2 className="text-sm font-semibold text-foreground">{labels.responsibilitiesLabel}</h2>
                <ul className="mt-3 space-y-2">
                  {job.responsibilities.map((entry) => (
                    <li key={entry} className={sectionDescriptionClass}>
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">{labels.requirementsLabel}</h2>
                <ul className="mt-3 space-y-2">
                  {job.requirements.map((entry) => (
                    <li key={entry} className={sectionDescriptionClass}>
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6 pt-2">
              <div>
                <h2 className="text-sm font-semibold text-foreground">{labels.highlightsLabel}</h2>
                <ul className="mt-3 space-y-2">
                  {(item as IInternshipListing).highlights.map((entry) => (
                    <li key={entry} className={sectionDescriptionClass}>
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">{labels.requirementsLabel}</h2>
                <ul className="mt-3 space-y-2">
                  {(item as IInternshipListing).requirements.map((entry) => (
                    <li key={entry} className={sectionDescriptionClass}>
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <a href={item.url} className={cn(sectionCtaButtonClass, 'mt-4')}>
            {labels.applyLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
