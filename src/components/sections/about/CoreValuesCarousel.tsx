import { useCallback, useEffect, useRef, useState } from 'react';
import {
  cn,
  sectionDescriptionClass,
  sectionSubheadingClass,
} from '../../../lib/utils';
import { OptimizedImage } from '../../ui/OptimizedImage';

const AUTOPLAY_INTERVAL_MS = 12000;

interface ICoreValue {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

interface ICoreValuesCarouselProps {
  values: readonly ICoreValue[];
}

function CarouselArrow({ direction }: { direction: 'prev' | 'next' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {direction === 'prev' ? (
        <path
          d="M15 6l-6 6 6 6"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function PlayPauseIcon({ playing }: { playing: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {playing ? (
        <>
          <path d="M8 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </>
      ) : (
        <path
          d="M8 5.5v13l10-6.5-10-6.5z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function getInitialAutoplayState() {
  if (typeof window === 'undefined') return true;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function CoreValuesCarousel({ values }: ICoreValuesCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(getInitialAutoplayState);
  const total = values.length;
  const transitionTimeout = useRef<number | null>(null);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    transitionTimeout.current = window.setTimeout(() => {
      setIndex((current) => (current - 1 + total) % total);
      setIsTransitioning(false);
    }, 360);
  }, [isTransitioning, total]);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    transitionTimeout.current = window.setTimeout(() => {
      setIndex((current) => (current + 1) % total);
      setIsTransitioning(false);
    }, 360);
  }, [isTransitioning, total]);

  const toggleAutoplay = useCallback(() => {
    setIsPlaying((playing) => !playing);
  }, []);

  useEffect(() => {
    if (!isPlaying || total <= 1) return undefined;

    const timerId = window.setInterval(goToNext, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timerId);
  }, [goToNext, isPlaying, total]);

  useEffect(() => {
    return () => {
      if (transitionTimeout.current) {
        window.clearTimeout(transitionTimeout.current);
      }
    };
  }, []);

  if (total === 0) return null;

  const current = values[index];

  return (
    <div className="grid lg:grid-cols-2">
      <div className="core-values-text-panel order-2 lg:order-1">
        <div className="flex flex-1 items-center px-8 py-14 sm:px-12 lg:justify-end lg:py-24 lg:pl-16 lg:pr-12 xl:pl-24">
          <div
            key={current.title}
            className="core-values-slide-content w-full max-w-md text-left lg:max-w-lg"
            aria-live="polite"
          >
            <h3 className={sectionSubheadingClass}>{current.title}</h3>
            <p className={cn(sectionDescriptionClass, 'mt-4 lg:mt-5')}>{current.description}</p>
          </div>
        </div>

        {total > 1 ? (
          <button
            type="button"
            className="core-values-play-btn"
            aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
            aria-pressed={isPlaying}
            onClick={toggleAutoplay}
          >
            <PlayPauseIcon playing={isPlaying} />
          </button>
        ) : null}
      </div>

      <div className="core-values-slide-image order-1 lg:order-2">
        <div
          key={current.image}
          className="core-values-slide-media absolute inset-0"
        >
          <OptimizedImage
            src={current.image}
            alt=""
            pictureClassName="absolute inset-0 block h-full w-full"
            className="object-cover"
          />
        </div>
        {total > 1 ? (
          <>
            <button
              type="button"
              className="core-values-nav-btn core-values-nav-btn-prev"
              aria-label="Previous core value"
              onClick={goToPrevious}
              disabled={isTransitioning}
            >
              <CarouselArrow direction="prev" />
            </button>
            <button
              type="button"
              className="core-values-nav-btn core-values-nav-btn-next"
              aria-label="Next core value"
              onClick={goToNext}
              disabled={isTransitioning}
            >
              <CarouselArrow direction="next" />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
