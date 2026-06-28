import { JOURNAL_PAGE } from '../../../constants/content';
import { Button } from '../../ui/Button';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionDescriptionClass, sectionHeadingClass } from '../../../lib/utils';

export function JournalCta() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { cta } = JOURNAL_PAGE;

  return (
    <section className="scroll-section bg-background section-padding">
      <div className="page-container">
        <div
          ref={ref}
          className={cn('reveal w-full text-center', isVisible && 'reveal-visible')}
        >
          <h2 className={sectionHeadingClass}>{cta.title}</h2>
          <p className={cn('mx-auto max-w-2xl', sectionDescriptionClass)}>{cta.description}</p>
          <div className="cta-actions">
            <Button as="a" href={cta.primaryHref}>
              {cta.primaryLabel}
            </Button>
            {cta.secondaryLabel && cta.secondaryHref ? (
              <a href={cta.secondaryHref} className="luxury-nav-link text-muted-foreground w-fit">
                {cta.secondaryLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
