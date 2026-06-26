import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  HOME_SCROLL_KEY,
  consumePendingHomeSectionScroll,
  scrollToHomeSectionInstant,
  scrollToPageTopInstant,
} from '../../lib/homeNavigation';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    if (pathname.startsWith('/shop/')) {
      sessionStorage.removeItem(HOME_SCROLL_KEY);
      scrollToPageTopInstant();
      return;
    }

    const sectionFromHash = hash ? hash.replace('#', '') : null;
    const sectionFromStorage = pathname === '/' ? consumePendingHomeSectionScroll() : null;
    const targetSection = sectionFromHash || sectionFromStorage;

    if (targetSection && scrollToHomeSectionInstant(targetSection)) {
      return;
    }

    scrollToPageTopInstant();
  }, [pathname, hash]);

  return null;
}
