import { FOOTER } from '../../constants/content';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

export function Footer() {
  const { isDark } = useTheme();

  const footerLinkClass = cn(
    'luxury-footer-link',
    isDark ? 'text-white' : 'text-foreground',
  );

  const footerHeadingClass = cn(
    'mb-5 text-[10px] font-normal tracking-[0.26em] uppercase',
    isDark ? 'text-white' : 'text-foreground',
  );

  const footerBodyClass = cn(
    'text-[13px] font-light leading-relaxed',
    isDark ? 'text-white/65' : 'text-muted-foreground',
  );

  const footerCtaClass = cn(
    'luxury-nav-link mt-5 inline-block opacity-70 hover:opacity-100',
    isDark ? 'text-white' : 'text-foreground',
  );

  const copyrightClass = cn(
    'text-center text-[11px] font-light tracking-wide',
    isDark ? 'text-white/50' : 'text-muted-foreground',
  );

  const wordmarkClass = cn(
    'brand-wordmark-display text-[clamp(4rem,18vw,12rem)] leading-none',
    isDark ? 'text-white' : 'text-foreground',
  );

  return (
    <footer
      className={cn(
        'border-t border-border',
        isDark ? 'bg-[#0a0a0a] text-white' : 'bg-background text-foreground',
      )}
    >
      <div className="page-container py-14 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <p className={footerHeadingClass}>Company</p>
            <ul className="space-y-3">
              <li>
                <a href="/about" className={footerLinkClass}>
                  About
                </a>
              </li>
              <li>
                <a href={FOOTER.careers.href} className={footerLinkClass}>
                  {FOOTER.careers.label}
                </a>
              </li>
              <li>
                <a href={FOOTER.contact.href} className={footerLinkClass}>
                  {FOOTER.contact.label}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className={footerHeadingClass}>Connect</p>
            <ul className="space-y-3">
              {FOOTER.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={footerLinkClass}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={footerHeadingClass}>Legal</p>
            <ul className="space-y-3">
              {FOOTER.legal.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={footerLinkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={footerHeadingClass}>May we help you</p>
            <p className={footerBodyClass}>
              For product inquiries, partnerships, and general questions — we are here to assist.
            </p>
            <a href="/contact" className={footerCtaClass}>
              Contact us
            </a>
          </div>
        </div>

        <div
          className={cn(
            'mt-14 border-t pt-8',
            isDark ? 'border-white/15' : 'border-border',
          )}
        >
          <p className={copyrightClass}>{FOOTER.copyright}</p>
        </div>

        <div className="mt-12 flex justify-center overflow-hidden select-none" aria-hidden="true">
          <p className={wordmarkClass}>KGOLD</p>
        </div>
      </div>
    </footer>
  );
}
