import { CONTACT_PAGE } from '../../../constants/content';
import { Button } from '../../ui/Button';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionHeadingClass } from '../../../lib/utils';

export function ContactCta() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { cta } = CONTACT_PAGE;

  return (
    <section className="bg-background section-padding">
      <div className="page-container">
        <div
          ref={ref}
          className={cn('reveal w-full text-center', isVisible && 'reveal-visible')}
        >
          <h2 className={sectionHeadingClass}>{cta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {cta.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Button as="a" href={cta.primaryHref}>
              {cta.primaryLabel}
            </Button>
            <a
              href={cta.secondaryHref}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {cta.secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
