import { DEFAULT_THEME, THEME_STORAGE_KEY } from '../constants/theme.constants';
import type { TTheme } from '../constants/theme.constants';

export function isTheme(value: string | null | undefined): value is TTheme {
  return value === 'light' || value === 'dark';
}

export function readStoredTheme(): TTheme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(stored)) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function resolveDarkMode(theme: TTheme): boolean {
  return theme === 'dark';
}

export function applyThemeClass(theme: TTheme): void {
  document.documentElement.classList.toggle('dark', resolveDarkMode(theme));
}

export function initThemeFromStorage(): void {
  applyThemeClass(readStoredTheme());
}
