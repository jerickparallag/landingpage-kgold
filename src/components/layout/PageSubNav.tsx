import { Link, useLocation } from 'react-router-dom';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useHeaderVisibility } from '../../hooks/useHeaderVisibility';
import { cn } from '../../lib/utils';
import type { IPageSubNavLink, IPageSubNavProps } from './PageSubNav.types';

const SUB_NAV_LINK_CLASS =
  'inline-flex h-14 shrink-0 items-center text-sm font-normal transition-colors';

function splitHref(href: string) {
  const hashIndex = href.indexOf('#');
  if (hashIndex === -1) {
    return { pathname: href, hash: '' };
  }
  return {
    pathname: href.slice(0, hashIndex),
    hash: href.slice(hashIndex),
  };
}

function isRouteLink(href: string) {
  return href.startsWith('/');
}

function NavItem({
  link,
  isActive,
}: {
  link: IPageSubNavLink;
  isActive: boolean;
}) {
  const className = cn(
    SUB_NAV_LINK_CLASS,
    isActive
      ? 'border-b-2 border-white text-white'
      : 'text-white/90 hover:text-white',
  );

  if (isRouteLink(link.href)) {
    return (
      <Link to={link.href} className={className}>
        {link.label}
      </Link>
    );
  }

  return (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  );
}

export function PageSubNav({ parentLink, links }: IPageSubNavProps) {
  const { pathname, hash } = useLocation();
  const headerVisible = useHeaderVisibility();

  const hashHrefs = links
    .map((link) => splitHref(link.href).hash)
    .filter((value): value is string => value.length > 0);

  const scrollActiveHash = useActiveSection(hashHrefs);

  const isLinkActive = (link: IPageSubNavLink) => {
    const { pathname: linkPath, hash: linkHash } = splitHref(link.href);

    if (linkHash) {
      const basePath = linkPath || pathname;
      if (pathname !== basePath) return false;
      return (hash || scrollActiveHash) === linkHash;
    }

    return pathname === linkPath;
  };

  return (
    <>
      <nav
        className={cn(
          'fixed top-14 right-0 left-0 z-40 border-b border-white/10 bg-[#1c1c1c]/75 text-white backdrop-blur-md transition-transform duration-300 ease-out',
          headerVisible ? 'translate-y-0' : '-translate-y-[calc(100%+3.5rem)]',
        )}
        aria-label="Page sections"
      >
        <div className="page-container">
          <ul className="scrollbar-none -mx-4 flex h-14 items-center gap-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <li className="shrink-0">
              <Link
                to={parentLink.href}
                className={cn(SUB_NAV_LINK_CLASS, 'text-white/90 hover:text-white')}
              >
                {parentLink.label}
              </Link>
            </li>

            <li
              className="h-4 w-px shrink-0 bg-white/25"
              aria-hidden="true"
            />

            {links.map((link) => (
              <li key={link.href} className="shrink-0">
                <NavItem link={link} isActive={isLinkActive(link)} />
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="h-28" aria-hidden="true" />
    </>
  );
}
