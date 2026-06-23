import { ABOUT_PAGE } from '../../../constants/content';
import { AboutInfoRow } from './AboutInfoRow';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionHeadingClass } from '../../../lib/utils';

export function AboutCompanySection() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { company } = ABOUT_PAGE;

  return (
    <section id="company" className="scroll-mt-28 bg-background section-padding">
      <div className="page-container">
        <div ref={ref} className={cn('reveal', isVisible && 'reveal-visible')}>
          <h2 className={sectionHeadingClass}>{company.displayTitle}</h2>

          <div className="mt-4 lg:mt-8">
            <AboutInfoRow title={company.whoTitle} body={company.whoBody} showTopBorder={false} />
            <AboutInfoRow title={company.purposeTitle} body={company.purposeBody} />
            <AboutInfoRow title={company.whyTitle} body={company.whyBody} />
          </div>
        </div>
      </div>
    </section>
  );
}
