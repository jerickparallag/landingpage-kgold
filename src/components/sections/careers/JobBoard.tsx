import { CAREERS_PAGE } from '../../../constants/content';
import type { IJobListing } from '../../../lib/careers';
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
          <div className="aspect-[3/2] overflow-hidden rounded-brand">
            <img src={job.image} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-1 flex-col pt-5">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {job.department}
              <span className="mx-1.5 font-normal normal-case">·</span>
              {job.type}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{job.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{job.location}</p>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {job.summary}
            </p>
            <div className="mt-5">
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
        <div className="flex h-full flex-col p-5 sm:p-6">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {job.department}
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">{job.title}</h3>
          <div className="scrollbar-thin mt-4 flex-1 space-y-4 overflow-y-auto pr-1">
            <p className="text-sm leading-relaxed text-foreground/90">{job.description}</p>
            <div>
              <h4 className="text-sm font-semibold text-foreground">{copy.responsibilitiesLabel}</h4>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">{copy.requirementsLabel}</h4>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4">
            <FlipToggle
              isFlipped={isFlipped}
              onToggle={onToggle}
              learnMoreLabel={copy.viewDetailsLabel}
              backLabel={copy.hideDetailsLabel}
            />
            <a
              href={job.url}
              className="inline-flex items-center rounded-brand bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              {copy.applyLabel}
            </a>
          </div>
        </div>
      }
    />
  );
}

interface IJobListRowProps {
  job: IJobListing;
  isExpanded: boolean;
  onToggle: () => void;
}

export function JobListRow({ job, isExpanded, onToggle }: IJobListRowProps) {
  const { jobs: copy } = CAREERS_PAGE;

  return (
    <li className="overflow-hidden rounded-brand border border-border bg-card shadow-[var(--shadow-xs)]">
      <div className="flex flex-col lg:flex-row">
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden lg:aspect-auto lg:w-56 xl:w-64">
          <img src={job.image} alt="" loading="lazy" className="h-full w-full object-cover" />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1c1c1c]/10 lg:bg-gradient-to-t lg:from-[#1c1c1c]/30 lg:to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="min-w-0 flex-1 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-brand bg-primary-muted px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] text-accent-foreground uppercase">
                  {job.department}
                </span>
                <span className="rounded-brand border border-border px-2.5 py-1 text-xs font-medium text-foreground">
                  {job.type}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{job.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{job.location}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onToggle}
                className="text-sm font-medium text-primary transition hover:text-primary-hover"
              >
                {isExpanded ? copy.hideDetailsLabel : copy.viewDetailsLabel}
              </button>
              <a
                href={job.url}
                className="inline-flex items-center rounded-brand bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                {copy.applyLabel}
              </a>
            </div>
          </div>

          {isExpanded ? (
            <div className="mt-6 space-y-5 border-t border-border pt-6">
              <p className="text-sm leading-relaxed text-foreground/90">{job.description}</p>
              <div className="grid gap-5 lg:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{copy.responsibilitiesLabel}</h4>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                    {job.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{copy.requirementsLabel}</h4>
                  <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                    {job.requirements.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}
