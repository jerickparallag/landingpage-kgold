import { useLocation } from 'react-router-dom';
import { useHeroEnterAnimation } from '../../../hooks/useHeroEnterAnimation';
import { HeroBackground } from '../../ui/HeroBackground';
import {
  cn,
  getHeroEnterDelay,
  getHeroEnterDelayAfterLines,
  heroBodyClass,
  heroCollectionTitleClass,
  heroContentGridClass,
  heroEnterDelayStyle,
  heroEnterItemClass,
  heroOverlayHorizontalClass,
  heroOverlayVerticalClass,
  heroSectionClass,
  splitEditorialHeadline,
} from '../../../lib/utils';
import type { ICollection } from '../../../content/types';

interface ICollectionHeroProps {
  collection: ICollection;
}

export function CollectionHero({ collection }: ICollectionHeroProps) {
  const { pathname } = useLocation();
  const shouldAnimate = useHeroEnterAnimation(pathname);
  const titleLines = splitEditorialHeadline(collection.name);

  return (
    <section id="collection-hero" className={heroSectionClass}>
      <HeroBackground image={collection.image} position="center" animate={shouldAnimate} />
      <div className={heroOverlayHorizontalClass} aria-hidden="true" />
      <div className={heroOverlayVerticalClass} aria-hidden="true" />

      <div className="relative z-10 page-container">
        <div className={cn(heroContentGridClass, 'items-end lg:items-center')}>
          <div className="lg:col-span-7">
            <h1 className={cn(heroCollectionTitleClass, 'max-w-[12ch] uppercase')}>
              {titleLines.map((line, index) => (
                <span
                  key={line}
                  className={heroEnterItemClass(shouldAnimate, 'block')}
                  style={heroEnterDelayStyle(shouldAnimate, getHeroEnterDelay(index))}
                >
                  {line}
                </span>
              ))}
            </h1>
            <p
              className={heroEnterItemClass(shouldAnimate, heroBodyClass, 'mt-6 max-w-xl lg:text-[1.05rem]')}
              style={heroEnterDelayStyle(shouldAnimate, getHeroEnterDelayAfterLines(titleLines.length, 0.1))}
            >
              {collection.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
