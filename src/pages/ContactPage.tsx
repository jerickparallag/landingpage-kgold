import { ContactHero } from '../components/sections/contact/ContactHero';
import { ContactInquiries } from '../components/sections/contact/ContactInquiries';
import { ContactSocial } from '../components/sections/contact/ContactSocial';
import { ContactAddresses } from '../components/sections/contact/ContactAddresses';
import { ContactCta } from '../components/sections/contact/ContactCta';

export function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInquiries />
      <ContactSocial />
      <ContactAddresses />
      <ContactCta />
    </>
  );
}
