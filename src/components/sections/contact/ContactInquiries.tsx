import { CONTACT_PAGE } from '../../../constants/content';
import { ContactLinkGrid } from './ContactLinkGrid';
import { SectionHeader } from '../../ui/SectionHeader';
import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../lib/utils';

export function ContactInquiries() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { inquiries } = CONTACT_PAGE;

  return (
    <section className="contact-section-first">
      <div className="page-container">
        <div ref={ref} className={cn('reveal', isVisible && 'reveal-visible')}>
          <SectionHeader title={inquiries.title} />
          <ContactLinkGrid items={inquiries.items} />
        </div>
      </div>
    </section>
  );
}
