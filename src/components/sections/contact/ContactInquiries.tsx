import { CONTACT_PAGE } from '../../../constants/content';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionHeadingClass } from '../../../lib/utils';

export function ContactInquiries() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { inquiries } = CONTACT_PAGE;

  return (
    <section className="bg-background section-padding">
      <div className="page-container">
        <div ref={ref} className={cn('reveal', isVisible && 'reveal-visible')}>
          <h2 className={sectionHeadingClass}>{inquiries.title}</h2>

          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-14">
            {inquiries.items.map((item) => (
              <li key={item.title}>
                <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {item.title}
                </h3>
                <a
                  href={item.href}
                  className="mt-3 inline-block text-sm text-primary underline-offset-4 transition hover:underline sm:text-base"
                >
                  {item.linkLabel}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
