import { ABOUT } from '../../constants/content';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../lib/utils';

export function About({
  sectionId = 'about',
  showCta = true,
}: {
  sectionId?: string;
  showCta?: boolean;
}) {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id={sectionId} className="relative min-h-[min(72vh,680px)] overflow-hidden">
      <div
        className="parallax-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ABOUT.backgroundImage})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-background from-35% via-background/92 to-background/25 dark:from-background dark:via-background/95 dark:to-background/30"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-[min(72vh,680px)] items-center section-padding">
        <div className="page-container w-full">
          <div
            ref={ref}
            className={cn('reveal max-w-xl', isVisible && 'reveal-visible')}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
              {ABOUT.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{ABOUT.teaser}</p>
            <p className="mt-4 text-base leading-relaxed text-foreground/85">{ABOUT.mission}</p>
            {showCta ? (
              <a
                href={ABOUT.ctaHref}
                className="mt-8 inline-flex items-center rounded-brand bg-foreground px-7 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                {ABOUT.ctaLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
