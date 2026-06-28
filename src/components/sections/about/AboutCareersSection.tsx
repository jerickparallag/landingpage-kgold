import { ABOUT_PAGE } from '../../../constants/content';
import { EditorialFixedBackground } from '../../ui/EditorialFixedBackground';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionCtaButtonClass, sectionDescriptionClass, sectionHeadingClass } from '../../../lib/utils';

export function AboutCareersSection() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { careers } = ABOUT_PAGE;

  return (
    <section id="careers" className="scroll-section relative hero-min-h-editorial">
      <EditorialFixedBackground image={careers.backgroundImage} />
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
            <h2 className={sectionHeadingClass}>{careers.title}</h2>
            <p className={sectionDescriptionClass}>{careers.description}</p>
            <a href={careers.ctaHref} className={sectionCtaButtonClass}>
              {careers.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
