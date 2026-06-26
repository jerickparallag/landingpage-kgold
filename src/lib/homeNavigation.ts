export const HOME_SCROLL_KEY = 'kgold-scroll-to';

export function prepareHomeSectionScroll(sectionId: string) {
  sessionStorage.setItem(HOME_SCROLL_KEY, sectionId);
}

export function consumePendingHomeSectionScroll(): string | null {
  const pending = sessionStorage.getItem(HOME_SCROLL_KEY);
  if (pending) {
    sessionStorage.removeItem(HOME_SCROLL_KEY);
  }
  return pending;
}

export function scrollToPageTopInstant() {
  const html = document.documentElement;
  const body = document.body;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  html.scrollTop = 0;
  body.scrollTop = 0;
  html.style.scrollBehavior = previous;
}

export function scrollToHomeSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

export function scrollToHomeSectionInstant(sectionId: string): boolean {
  const element = document.getElementById(sectionId);
  if (!element) return false;

  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  element.scrollIntoView({ block: 'start' });
  html.style.scrollBehavior = previous;
  return true;
}
