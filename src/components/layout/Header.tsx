import { useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBrand } from '../brand/AppBrand';
import { ThemeToggle } from './ThemeToggle';
import { NAV_LINKS } from '../../constants/content';
import { useHeaderVisibility } from '../../hooks/useHeaderVisibility';
import { cn } from '../../lib/utils';

function isLinkActive(href: string, pathname: string): boolean {
  return (
    (href.startsWith('/about') && (pathname === '/about' || pathname.startsWith('/about/'))) ||
    (href === '/careers' && (pathname === '/careers' || pathname.startsWith('/careers/')))
  );
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

  const isHashLink = href.startsWith('#');

  if (isHashLink) {
    return (
      <a
        href={href}
        className={cn(
          'text-sm font-normal transition hover:text-white',
          isActive ? 'text-white' : 'text-white/90',
          className,
        )}
        onClick={onClick}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className={cn(
        'text-sm font-normal transition hover:text-white',
        isActive ? 'text-white' : 'text-white/90',
        className,
      )}
      onClick={onClick}
    >
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

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-background/75 text-foreground backdrop-blur-md transition-transform duration-300 ease-out',
        headerVisible || menuOpen ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <div className="page-container grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Link
          to="/"
          className="flex min-w-0 items-center justify-self-start"
          onClick={() => setMenuOpen(false)}
        >
          <AppBrand showLabel={false} logoClassName="size-9 border-white/10 bg-white/5" />
        </Link>

        <nav className="hidden items-center justify-center gap-8 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center justify-end gap-1 justify-self-end">
          <ThemeToggle inverse />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center text-white/90 transition hover:text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'fixed inset-0 top-14 z-40 bg-background/90 backdrop-blur-md transition-opacity lg:hidden',
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!menuOpen}
      >
        <nav id="mobile-nav" className="page-container py-6" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  className="block border-b border-white/10 py-4 text-base"
                  onClick={() => setMenuOpen(false)}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
