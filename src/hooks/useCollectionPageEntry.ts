import { useLayoutEffect, useState } from 'react';
import { scrollToPageTopInstant } from '../lib/homeNavigation';

/** Resets scroll to hero and delays products until the page is anchored at the top. */
export function useCollectionPageEntry(slug: string | undefined) {
  const [productsReady, setProductsReady] = useState(false);

  useLayoutEffect(() => {
    if (!slug) {
      setProductsReady(false);
      return;
    }

    setProductsReady(false);
    scrollToPageTopInstant();

    const frame = requestAnimationFrame(() => {
      scrollToPageTopInstant();
      setProductsReady(true);
    });

    return () => {
      cancelAnimationFrame(frame);
      setProductsReady(false);
    };
  }, [slug]);

  return productsReady;
}
