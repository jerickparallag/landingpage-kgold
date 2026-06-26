import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IS_SINGLE_FILE } from '../../../lib/isSingleFile';
import { prepareHomeSectionScroll } from '../../../lib/homeNavigation';
import { cn } from '../../../lib/utils';

export function CollectionEscapeBack() {
  const navigate = useNavigate();

  const goToCollections = useCallback(() => {
    prepareHomeSectionScroll('categories');

    if (IS_SINGLE_FILE) {
      navigate('/');
      return;
    }

    navigate({ pathname: '/', hash: '#categories' });
  }, [navigate]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      goToCollections();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goToCollections]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-14 z-40">
      <div className="page-container flex h-14 items-center justify-end">
        <button
          type="button"
          onClick={goToCollections}
          className={cn(
            'pointer-events-auto inline-flex size-9 items-center justify-center rounded-full border border-foreground/10 bg-background/45 text-foreground/80 shadow-sm backdrop-blur-md transition hover:bg-background/65 hover:text-foreground dark:border-white/15 dark:bg-black/25 dark:hover:bg-black/40',
          )}
          aria-label="Back to collections"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
