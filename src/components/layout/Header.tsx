import { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { NAV_LINKS } from '../../constants/content';
import { useHeaderVisibility } from '../../hooks/useHeaderVisibility';
import { IS_SINGLE_FILE } from '../../lib/isSingleFile';
import { cn } from '../../lib/utils';

function isLinkActive(href: string, pathname: string): boolean {
  if (href === '/') return pathname === '/';
  if (href === '/about') return pathname === '/about';
  if (href === '/careers') return pathname === '/careers' || pathname.startsWith('/careers/');
  if (href === '/contact') return pathname === '/contact';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  className,
  onClick,
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  const { pathname } = useLocation();
  const isActive = useMemo(() => isLinkActive(href, pathname), [href, pathname]);
  const isHashLink = href.startsWith('#') || (IS_SINGLE_FILE && href.startsWith('/#'));

  const linkClass = cn(
    'luxury-nav-link',
    isActive ? 'opacity-100 active' : 'opacity-70',
    className,
  );

  if (isHashLink) {
    return (
      <a href={href} className={linkClass} onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <Link to={href} className={linkClass} onClick={onClick}>
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const { pathname } = useLocation();
  const isActive = useMemo(() => isLinkActive(href, pathname), [href, pathname]);
  const isHashLink = href.startsWith('#') || (IS_SINGLE_FILE && href.startsWith('/#'));

  const linkClass = cn(
    'block w-full py-4 text-sm font-normal tracking-[0.18em] text-foreground uppercase transition hover:opacity-100',
    isActive ? 'opacity-100' : 'opacity-80',
  );

  if (isHashLink) {
    return (
      <a href={href} className={linkClass} onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <Link to={href} className={linkClass} onClick={onClick}>
      {label}
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerVisible = useHeaderVisibility();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const leftLinks = NAV_LINKS.slice(0, 2);
  const rightLinks = NAV_LINKS.slice(2);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-50 border-b border-border bg-background transition-transform duration-300 ease-out',
          headerVisible || menuOpen ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <div className="page-container relative flex h-14 items-center justify-between">
          <div className="flex flex-1 items-center justify-start lg:hidden">
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center text-foreground/80 transition hover:text-foreground"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          <nav className="hidden flex-1 items-center gap-10 lg:flex" aria-label="Main left">
            {leftLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          <Link
            to="/"
            className="luxury-wordmark absolute left-1/2 -translate-x-1/2"
            onClick={() => setMenuOpen(false)}
          >
            KGOLD
          </Link>

          <div className="flex flex-1 items-center justify-end gap-4 sm:gap-6">
            <nav className="hidden items-center gap-10 lg:flex" aria-label="Main right">
              {rightLinks.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto bg-white transition-opacity duration-300 lg:hidden dark:bg-[#1a1a1a]',
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!menuOpen}
      >
        <nav id="mobile-nav" className="page-container flex min-h-full flex-col py-6" aria-label="Mobile">
          <div className="border-b border-border pb-4">
            <p className="text-[10px] font-normal tracking-[0.28em] text-muted-foreground uppercase">
              Menu
            </p>
          </div>

          <ul className="flex flex-1 flex-col py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-border">
                <MobileNavLink
                  href={link.href}
                  label={link.label}
                  onClick={() => setMenuOpen(false)}
                />
              </li>
            ))}
          </ul>

          <div className="border-t border-border pt-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Explore KGOLD collections, craftsmanship, and brand story from one place.
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
