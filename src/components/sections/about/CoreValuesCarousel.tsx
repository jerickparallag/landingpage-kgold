import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CarouselNav } from '../../ui/CarouselNav';

interface ICoreValue {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

interface ICoreValuesCarouselProps {
  values: readonly ICoreValue[];
  prevLabel?: string;
  nextLabel?: string;
}

const SCROLL_MS = 400;

export function CoreValuesCarousel({
  values,
  prevLabel = 'Previous value',
  nextLabel = 'Next value',
}: ICoreValuesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isJumpingRef = useRef(false);
  const hasInitializedRef = useRef(false);
  const count = values.length;
  const startIndex = count;

  const loopedValues = useMemo(
    () => [...values, ...values, ...values],
    [values],
  );

  const [activeIndex, setActiveIndex] = useState(startIndex);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;

    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior,
    });
  }, []);

  const goNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const goPrev = () => {
    setActiveIndex((current) => current - 1);
  };

  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      scrollToIndex(startIndex, 'instant');
      return;
    }

    if (isJumpingRef.current) {
      scrollToIndex(activeIndex, 'instant');
      isJumpingRef.current = false;
      return;
    }

    scrollToIndex(activeIndex, 'smooth');

    let timer: number | undefined;

    if (activeIndex >= count * 2) {
      timer = window.setTimeout(() => {
        isJumpingRef.current = true;
        setActiveIndex(activeIndex - count);
      }, SCROLL_MS);
    } else if (activeIndex < count) {
      timer = window.setTimeout(() => {
        isJumpingRef.current = true;
        setActiveIndex(activeIndex + count);
      }, SCROLL_MS);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [activeIndex, count, scrollToIndex, startIndex]);

  const displayIndex = activeIndex % count;

  return (
    <div>
      <div
        ref={trackRef}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
      >
        {loopedValues.map((value, index) => (
          <article
            key={`${value.title}-${index}`}
            className="w-[min(85vw,22rem)] shrink-0 snap-start sm:w-[20rem]"
          >
            <div className="aspect-3/2 overflow-hidden rounded-brand">
              <img src={value.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <p className="mt-5 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {value.subtitle}
            </p>
            <h4 className="mt-2 text-lg font-semibold tracking-tight text-foreground">{value.title}</h4>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {displayIndex + 1} / {count}
        </p>
        <CarouselNav
          onPrev={goPrev}
          onNext={goNext}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
        />
      </div>
    </div>
  );
}
