import { CONTACT_PAGE } from '../../../constants/content';
import { SectionHeader } from '../../ui/SectionHeader';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionDescriptionClass, subsectionHeadingClass } from '../../../lib/utils';

export function ContactAddresses() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { addresses } = CONTACT_PAGE;

  return (
    <section className="contact-section-last">
      <div className="page-container">
        <div ref={ref} className={cn('reveal', isVisible && 'reveal-visible')}>
          <SectionHeader title={addresses.title} />

          <div className="section-stack mx-auto flex w-full max-w-3xl flex-wrap justify-center gap-x-12 gap-y-10">
            {addresses.locations.map((location) => (
              <div
                key={location.name}
                className="flex w-[min(100%,14rem)] flex-col items-center text-center sm:w-[calc(50%-1.5rem)]"
              >
                <h3 className={subsectionHeadingClass}>{location.name}</h3>
                <address className={cn(sectionDescriptionClass, 'mt-4 not-italic')}>
                  {location.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
