import { useState } from 'react';
import { useLocation } from 'react-router-dom';

/** Persists for the SPA session; resets on full page refresh. */
const playedHeroRoutes = new Set<string>();

/** Play hero entrance animation only the first time a route is visited. */
export function useHeroEnterAnimation(routeKey?: string): boolean {
  const { pathname } = useLocation();
  const key = routeKey ?? pathname;

  const [shouldAnimate] = useState(() => {
    if (playedHeroRoutes.has(key)) {
      return false;
    }
    playedHeroRoutes.add(key);
    return true;
  });

  return shouldAnimate;
}
