import { QUALITY_SECTION, VALUES } from '../../constants/content';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../lib/utils';

export function QualityValues() {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="quality" className="bg-background section-padding">
      <div className="page-container">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          {QUALITY_SECTION.title}
        </h2>

        <div
          ref={ref}
          className={cn(
            'reveal mt-14 grid gap-10 sm:gap-12 lg:mt-20 lg:grid-cols-3 lg:gap-16',
            isVisible && 'reveal-visible',
          )}
        >
          {VALUES.map((value) => (
            <div key={value.title} className="flex h-full flex-col">
              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-[1.35rem]">
                {value.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {value.description}
              </p>
              <a
                href={value.ctaHref}
                className="mt-auto pt-6 text-sm font-medium text-primary transition hover:text-primary-hover"
              >
                {value.ctaLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
