import { AppBrand } from '../brand/AppBrand';
import { FOOTER } from '../../constants/content';
import { HEADER_BRAND_LOGO_CLASS } from '../../constants/brand.constants';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

export function Footer() {
  const { isDark } = useTheme();
  const isLightFooter = isDark;

  return (
    <footer className={isLightFooter ? 'bg-background text-foreground' : 'bg-surface text-surface-foreground'}>
      <div className="page-container section-padding !py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <AppBrand
            logoClassName={HEADER_BRAND_LOGO_CLASS}
            className={isLightFooter ? '[&_span]:text-foreground' : '[&_span]:text-surface-foreground'}
          />

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className={cn('mb-3 text-sm font-semibold', isLightFooter ? 'text-foreground' : 'text-surface-foreground')}>Legal</p>
              <ul className="space-y-2">
                {FOOTER.legal.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={cn(
                        'text-sm transition hover:text-primary',
                        isLightFooter ? 'text-muted-foreground hover:text-primary' : 'text-surface-foreground/65 hover:text-surface-foreground'
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={cn('mb-3 text-sm font-semibold', isLightFooter ? 'text-foreground' : 'text-surface-foreground')}>Connect</p>
              <ul className="space-y-2">
                {FOOTER.social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={cn(
                        'text-sm transition hover:text-primary',
                        isLightFooter ? 'text-muted-foreground hover:text-primary' : 'text-surface-foreground/65 hover:text-surface-foreground'
                      )}
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
              <p className={cn('mb-3 text-sm font-semibold', isLightFooter ? 'text-foreground' : 'text-surface-foreground')}>Company</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href={FOOTER.careers.href}
                    className={cn(
                      'text-sm transition hover:text-primary',
                      isLightFooter ? 'text-muted-foreground hover:text-primary' : 'text-surface-foreground/65 hover:text-surface-foreground'
                    )}
                  >
                    {FOOTER.careers.label}
                  </a>
                </li>
                <li>
                  <a
                    href={FOOTER.contact.href}
                    className={cn(
                      'text-sm transition hover:text-primary',
                      isLightFooter ? 'text-muted-foreground hover:text-primary' : 'text-surface-foreground/65 hover:text-surface-foreground'
                    )}
                  >
                    {FOOTER.contact.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6">
          <p className={cn('text-sm', isLightFooter ? 'text-muted-foreground' : 'text-surface-foreground/55')}>{FOOTER.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
