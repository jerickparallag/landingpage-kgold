import { ABOUT_PAGE } from '../../../constants/content';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionHeadingClass } from '../../../lib/utils';

export function AboutCareersSection() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { careers } = ABOUT_PAGE;

  return (
    <section id="careers" className="relative min-h-[min(72vh,680px)] overflow-hidden">
      <div
        className="parallax-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${careers.backgroundImage})` }}
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
            <h2 className={sectionHeadingClass}>
              {careers.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{careers.description}</p>
            <a
              href={careers.ctaHref}
              className="mt-8 inline-flex items-center rounded-brand bg-foreground px-7 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              {careers.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
