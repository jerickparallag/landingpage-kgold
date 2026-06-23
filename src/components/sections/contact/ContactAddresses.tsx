import { CONTACT_PAGE } from '../../../constants/content';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionHeadingClass } from '../../../lib/utils';

export function ContactAddresses() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { addresses } = CONTACT_PAGE;

  return (
    <section className="bg-muted/30 section-padding dark:bg-muted/15">
      <div className="page-container">
        <div ref={ref} className={cn('reveal', isVisible && 'reveal-visible')}>
          <h2 className={sectionHeadingClass}>{addresses.title}</h2>

          <div className="mt-12 grid items-start gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-brand">
                <div className="aspect-4/3">
                  <img
                    src={addresses.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-10 lg:col-span-7 lg:space-y-12">
              {addresses.locations.map((location) => (
                <div key={location.name}>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {location.name}
                  </h3>
                  <address className="mt-4 space-y-1 text-base leading-relaxed text-muted-foreground not-italic sm:text-lg">
                    {location.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </address>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
