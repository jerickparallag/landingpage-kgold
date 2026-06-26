import { CONTACT_PAGE } from '../../../constants/content';
import { SectionHeader } from '../../ui/SectionHeader';
import { useInView } from '../../../hooks/useInView';
import { cn, subsectionHeadingClass } from '../../../lib/utils';

export function ContactAddresses() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { addresses } = CONTACT_PAGE;

  return (
    <section className="contact-section-last">
      <div className="page-container">
        <div ref={ref} className={cn('reveal', isVisible && 'reveal-visible')}>
          <SectionHeader title={addresses.title} />

          <ul className="section-stack mx-auto flex w-full max-w-4xl flex-wrap justify-center gap-x-12 gap-y-10">
            {addresses.locations.map((location) => (
              <li
                key={location.name}
                className="flex w-[min(100%,11rem)] flex-col items-center text-center sm:w-[calc(33.333%-2rem)] sm:max-w-[13rem]"
              >
                <h3 className={subsectionHeadingClass}>{location.name}</h3>
                <address className="mt-2 text-sm font-light leading-relaxed text-muted-foreground not-italic">
                  {location.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </address>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
