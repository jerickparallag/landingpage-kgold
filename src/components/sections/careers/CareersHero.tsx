import { CAREERS_PAGE } from '../../../constants/content';
import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../lib/utils';

export function CareersHero() {
  const { ref, isVisible } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { hero } = CAREERS_PAGE;

  return (
    <section className="relative overflow-hidden bg-[#1c1c1c] text-white">
      <div
        className="parallax-bg absolute inset-0 bg-cover bg-[center_right]"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1c1c1c] via-[#1c1c1c]/80 to-[#1c1c1c]/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1c1c1c]/50 via-transparent to-[#1c1c1c]/25"
        aria-hidden="true"
      />

      <div className="relative z-10 page-container">
        <div
          ref={ref}
          className={cn(
            'reveal flex min-h-[min(70svh,560px)] max-w-3xl flex-col justify-center py-16 lg:py-20',
            isVisible && 'reveal-visible',
          )}
        >
          <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] font-semibold tracking-tight">
            {hero.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 text-xl font-semibold tracking-tight sm:text-2xl">{hero.subheadline}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            {hero.body}
          </p>
          <a
            href={hero.ctaHref}
            className="group mt-8 inline-flex w-fit items-center gap-3 transition"
          >
            <span className="text-sm font-semibold sm:text-base">{hero.ctaLabel}</span>
            <span className="inline-flex size-8 items-center justify-center rounded-brand bg-primary text-primary-foreground transition group-hover:bg-primary-hover">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
