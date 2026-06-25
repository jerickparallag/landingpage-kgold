import { CONTACT_PAGE } from '../../../constants/content';
import { ContactLinkGrid } from './ContactLinkGrid';
import { SectionHeader } from '../../ui/SectionHeader';
import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../lib/utils';

export function ContactSocial() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { social } = CONTACT_PAGE;

  return (
    <section className="contact-section">
      <div className="page-container">
        <div ref={ref} className={cn('reveal', isVisible && 'reveal-visible')}>
          <SectionHeader title={social.title} />
          <ContactLinkGrid items={social.items} external />
        </div>
      </div>
    </section>
  );
}
