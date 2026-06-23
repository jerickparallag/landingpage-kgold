import { FINAL_CTA } from '../../constants/content';
import { Button } from '../ui/Button';
import { useInView } from '../../hooks/useInView';
import { cn, sectionHeadingClass } from '../../lib/utils';

export function FinalCta() {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="contact" className="scroll-mt-28 bg-background section-padding">
      <div className="page-container">
        <div
          ref={ref}
          className={cn(
            'reveal w-full text-center',
            isVisible && 'reveal-visible',
          )}
        >
          <h2 className={sectionHeadingClass}>
            {FINAL_CTA.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {FINAL_CTA.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Button as="a" href="/about/contact">
              {FINAL_CTA.primaryLabel}
            </Button>
            <a
              href={FINAL_CTA.secondaryHref}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {FINAL_CTA.secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
