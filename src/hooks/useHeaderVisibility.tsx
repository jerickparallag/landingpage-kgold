import { createContext, useContext, type ReactNode } from 'react';
import { useScrollDirection } from './useScrollDirection';

const HeaderVisibilityContext = createContext(true);

export function HeaderVisibilityProvider({ children }: { children: ReactNode }) {
  const visible = useScrollDirection();
  return (
    <HeaderVisibilityContext.Provider value={visible}>{children}</HeaderVisibilityContext.Provider>
  );
}

export function useHeaderVisibility() {
  return useContext(HeaderVisibilityContext);
}
