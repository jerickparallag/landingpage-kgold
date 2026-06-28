import { CAREERS_PAGE } from '../../../constants/content';
import { SectionHeader } from '../../ui/SectionHeader';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionDescriptionClass, sectionSubheadingClass } from '../../../lib/utils';

export function CareersCulture() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { culture } = CAREERS_PAGE;

  return (
    <section id="culture" className="scroll-section bg-background section-padding">
      <div className="page-container">
        <SectionHeader title={culture.title} />

        <div
          ref={ref}
          className={cn(
            'reveal section-stack grid gap-10 sm:gap-12 lg:grid-cols-3 lg:gap-14',
            isVisible && 'reveal-visible',
          )}
        >
          {culture.items.map((item) => (
            <div key={item.title}>
              <h3 className={sectionSubheadingClass}>{item.title}</h3>
              <p className={cn(sectionDescriptionClass, 'mt-4')}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
