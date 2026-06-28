import type { IHeroContent } from '../../content/types';
import { useHeroEnterAnimation } from '../../hooks/useHeroEnterAnimation';
import {
  cn,
  getHeroEnterDelay,
  getHeroEnterDelayAfterLines,
  heroActionLinkClass,
  heroBodyClass,
  heroContentGridClass,
  heroCtaOnImageClass,
  heroEnterDelayStyle,
  heroEnterItemClass,
  heroHomeContentGridClass,
  heroHomeTitleClass,
  heroOverlayHorizontalClass,
  heroOverlayVerticalClass,
  heroSectionClass,
  heroSubheadlineClass,
} from '../../lib/utils';
import { HeroBackground } from './HeroBackground';

interface IPageHeroProps {
  hero: IHeroContent;
  routeKey?: string;
  id?: string;
  variant?: 'home' | 'page';
}

export function PageHero({ hero, routeKey, id, variant = 'page' }: IPageHeroProps) {
  const shouldAnimate = useHeroEnterAnimation(routeKey);
  const lineCount = hero.headline.length;
  const isHome = variant === 'home';

  return (
    <section id={id} className={heroSectionClass}>
      <HeroBackground image={hero.backgroundImage} animate={shouldAnimate} />
      <div className={heroOverlayHorizontalClass} aria-hidden="true" />
      <div className={heroOverlayVerticalClass} aria-hidden="true" />

      <div className="relative z-10 page-container">
        <div className={isHome ? heroHomeContentGridClass : heroContentGridClass}>
          <div className="lg:col-span-7">
            <h1 className={cn(heroHomeTitleClass, 'text-left')}>
              {hero.headline.map((line, index) => (
                <span
                  key={line}
                  className={heroEnterItemClass(shouldAnimate, 'block')}
                  style={heroEnterDelayStyle(shouldAnimate, getHeroEnterDelay(index))}
                >
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <div className={cn('lg:col-span-5 lg:pl-8', isHome && 'max-w-lg')}>
            {hero.subheadline ? (
              <p
                className={heroEnterItemClass(shouldAnimate, heroSubheadlineClass)}
                style={heroEnterDelayStyle(shouldAnimate, getHeroEnterDelayAfterLines(lineCount, 0.1))}
              >
                {hero.subheadline}
              </p>
            ) : null}
            <p
              className={heroEnterItemClass(shouldAnimate, heroBodyClass, !hero.subheadline && 'mt-0')}
              style={heroEnterDelayStyle(
                shouldAnimate,
                getHeroEnterDelayAfterLines(lineCount, hero.subheadline ? 0.22 : 0.1),
              )}
            >
              {hero.body}
            </p>
            <a
              href={hero.ctaHref}
              className={heroEnterItemClass(shouldAnimate, heroActionLinkClass, heroCtaOnImageClass)}
              style={heroEnterDelayStyle(
                shouldAnimate,
                getHeroEnterDelayAfterLines(lineCount, hero.subheadline ? 0.38 : 0.26),
              )}
            >
              {hero.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
