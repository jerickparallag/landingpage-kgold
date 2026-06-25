import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IS_SINGLE_FILE } from '../../../lib/isSingleFile';
import { prepareHomeSectionScroll } from '../../../lib/homeNavigation';

export function CollectionEscapeBack() {
  const navigate = useNavigate();

  const goToCollections = useCallback(() => {
    prepareHomeSectionScroll('categories');

    if (IS_SINGLE_FILE) {
      navigate('/');
      return;
    }

    navigate('/#categories');
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
    <button
      type="button"
      onClick={goToCollections}
      className="fixed top-17 left-4 z-40 inline-flex items-center gap-3 rounded-full border border-white/25 bg-black/30 px-4 py-2.5 text-[10px] font-normal tracking-[0.22em] text-white uppercase backdrop-blur-md transition hover:bg-black/45 sm:left-6"
      aria-label="Back to collections (Esc)"
    >
      <span aria-hidden="true" className="text-xs leading-none text-white/80">
        ←
      </span>
      <span>Collections</span>
      <kbd className="inline-flex min-w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 px-2 py-1 font-sans text-[10px] font-normal tracking-[0.08em] text-white/85">
        Esc
      </kbd>
    </button>
  );
}
