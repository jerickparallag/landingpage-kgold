import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IS_SINGLE_FILE } from '../../lib/isSingleFile';

const SCROLL_KEY = 'kgold-scroll-to';

export function parseAppLink(href: string): { path: string | null; sectionId: string | null } {
  if (href.startsWith('/#')) {
    return { path: '/', sectionId: href.slice(2) };
  }
  if (href.startsWith('#')) {
    return { path: null, sectionId: href.slice(1) };
  }
  const hashIndex = href.indexOf('#');
  if (hashIndex >= 0) {
    return {
      path: href.slice(0, hashIndex) || '/',
      sectionId: href.slice(hashIndex + 1),
    };
  }
  if (href.startsWith('/')) {
    return { path: href, sectionId: null };
  }
  return { path: null, sectionId: null };
}

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

/** Enables file:// usage: HashRouter paths + scroll targets without URL hash conflicts. */
export function SingleFileNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!IS_SINGLE_FILE) return;

    const pending = sessionStorage.getItem(SCROLL_KEY);
    if (!pending) return;

    sessionStorage.removeItem(SCROLL_KEY);
    const timer = window.setTimeout(() => scrollToSection(pending), 80);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (!IS_SINGLE_FILE) return;

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.startsWith('mailto:') || href.startsWith('http')) return;

      // HashRouter <Link> hrefs — let React Router handle these
      if (href.startsWith('#/')) return;

      if (!href.startsWith('/') && !href.startsWith('#')) return;

      event.preventDefault();
      event.stopPropagation();

      const { path, sectionId } = parseAppLink(href);
      const targetPath = path ?? pathname;

      if (targetPath !== pathname) {
        if (sectionId) sessionStorage.setItem(SCROLL_KEY, sectionId);
        navigate(targetPath);
        return;
      }

      if (sectionId) scrollToSection(sectionId);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [navigate, pathname]);

  return null;
}
