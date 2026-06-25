export const HOME_SCROLL_KEY = 'kgold-scroll-to';

export function prepareHomeSectionScroll(sectionId: string) {
  sessionStorage.setItem(HOME_SCROLL_KEY, sectionId);
}

export function scrollToHomeSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}
