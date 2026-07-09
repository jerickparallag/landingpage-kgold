import { Link } from 'react-router-dom';
import { FINAL_CTA } from '../../constants/content';
import { useInView } from '../../hooks/useInView';
import { cn, ctaButtonClass, sectionDescriptionClass, sectionHeadingClass } from '../../lib/utils';

export function FinalCta() {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="contact" className="scroll-section bg-background section-padding">
      <div className="page-container">
        <div
          ref={ref}
          className={cn(
            'reveal w-full text-center',
            isVisible && 'reveal-visible',
          )}
        >
          <h2 className={sectionHeadingClass}>{FINAL_CTA.title}</h2>
          <p className={cn('mx-auto max-w-2xl', sectionDescriptionClass)}>{FINAL_CTA.description}</p>
          <div className="cta-actions">
            {FINAL_CTA.primaryHref.startsWith('/') ? (
              <Link to={FINAL_CTA.primaryHref} className={ctaButtonClass}>
                {FINAL_CTA.primaryLabel}
              </Link>
            ) : (
              <a href={FINAL_CTA.primaryHref} className={ctaButtonClass}>
                {FINAL_CTA.primaryLabel}
              </a>
            )}
            {FINAL_CTA.secondaryHref.startsWith('/') ? (
              <Link
                to={FINAL_CTA.secondaryHref}
                className="luxury-nav-link text-muted-foreground final-cta-secondary-link"
              >
                {FINAL_CTA.secondaryLabel}
              </Link>
            ) : (
              <a
                href={FINAL_CTA.secondaryHref}
                className="luxury-nav-link text-muted-foreground final-cta-secondary-link"
              >
                {FINAL_CTA.secondaryLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
