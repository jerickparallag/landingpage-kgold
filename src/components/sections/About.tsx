import { ABOUT } from '../../constants/content';
import { EditorialFixedBackground } from '../ui/EditorialFixedBackground';
import { useInView } from '../../hooks/useInView';
import { cn, sectionCtaButtonClass, sectionDescriptionClass, sectionHeadingClass, sectionLedeClass } from '../../lib/utils';

export function About({
  sectionId = 'about',
  showCta = true,
}: {
  sectionId?: string;
  showCta?: boolean;
}) {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id={sectionId} className="scroll-section relative hero-min-h-editorial">
      <EditorialFixedBackground image={ABOUT.backgroundImage} />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background from-35% via-background/92 to-background/25 dark:from-background dark:via-background/95 dark:to-background/30"
        aria-hidden="true"
      />

      <div className="relative z-10 flex hero-min-h-editorial items-center section-padding">
        <div className="page-container w-full">
          <div
            ref={ref}
            className={cn('reveal max-w-xl', isVisible && 'reveal-visible')}
          >
            <h2 className={sectionHeadingClass}>{ABOUT.title}</h2>
            <p className={sectionLedeClass}>{ABOUT.teaser}</p>
            <p className={sectionDescriptionClass}>{ABOUT.mission}</p>
            {showCta ? (
              <a href={ABOUT.ctaHref} className={sectionCtaButtonClass}>
                {ABOUT.ctaLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
