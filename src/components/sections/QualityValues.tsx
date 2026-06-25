import { QUALITY_SECTION, VALUES } from '../../constants/content';
import { SectionHeader } from '../ui/SectionHeader';
import { useInView } from '../../hooks/useInView';
import { cn, sectionItemBodyClass, subsectionHeadingClass } from '../../lib/utils';

export function QualityValues() {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="quality" className="scroll-section bg-background section-padding">
      <div className="page-container">
        <SectionHeader title={QUALITY_SECTION.title} />

        <div
          ref={ref}
          className={cn(
            'reveal section-stack section-grid grid lg:grid-cols-3',
            isVisible && 'reveal-visible',
          )}
        >
          {VALUES.map((value) => (
            <div key={value.title} className="flex h-full flex-col rounded-brand border border-border bg-card p-5 sm:p-6 lg:border-0 lg:bg-transparent lg:p-0">
              <h3 className={subsectionHeadingClass}>{value.title}</h3>
              <p className={sectionItemBodyClass}>{value.description}</p>
              <a
                href={value.ctaHref}
                className="mt-auto pt-6 relative text-[11px] font-normal tracking-[0.18em] text-foreground uppercase transition hover:opacity-100"
              >
                {value.ctaLabel}
                <span className='absolute left-0 bottom-[-2px] h-[1px] bg-current w-0 transition-all duration-300 ease-out hover:w-full' />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
