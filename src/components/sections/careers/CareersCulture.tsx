import { CAREERS_PAGE } from '../../../constants/content';
import { SectionHeader } from '../../ui/SectionHeader';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionItemBodyClass, subsectionHeadingClass } from '../../../lib/utils';

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
            'reveal section-stack section-grid grid lg:grid-cols-3',
            isVisible && 'reveal-visible',
          )}
        >
          {culture.items.map((item) => (
            <div key={item.title}>
              <h3 className={subsectionHeadingClass}>{item.title}</h3>
              <p className={sectionItemBodyClass}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
