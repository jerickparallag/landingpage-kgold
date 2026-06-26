import { HERO } from '../../constants/content';
import { useHeroEnterAnimation } from '../../hooks/useHeroEnterAnimation';
import { HeroBackground } from '../ui/HeroBackground';
import {
  cn,
  getHeroEnterDelay,
  getHeroEnterDelayAfterLines,
  heroActionLinkClass,
  heroBodyClass,
  heroCtaOnImageClass,
  heroEnterDelayStyle,
  heroEnterItemClass,
  heroHomeTitleClass,
  heroOverlayHorizontalClass,
  heroOverlayVerticalClass,
  heroSectionClass,
  heroSubheadlineClass,
} from '../../lib/utils';

export function Hero() {
  const shouldAnimate = useHeroEnterAnimation('/');
  const lineCount = HERO.headline.length;

  return (
    <section id="home-hero" className={heroSectionClass}>
      <HeroBackground image={HERO.backgroundImage} animate={shouldAnimate} />
      <div className={heroOverlayHorizontalClass} aria-hidden="true" />
      <div className={heroOverlayVerticalClass} aria-hidden="true" />

      <div className="relative z-10 page-container">
        <div className="hero-min-h-home hero-content grid items-end gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className={cn(heroHomeTitleClass, 'text-left')}>
              {HERO.headline.map((line, index) => (
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
          <div className="max-w-lg lg:col-span-5 lg:pl-8">
            {HERO.subheadline ? (
              <p
                className={heroEnterItemClass(shouldAnimate, heroSubheadlineClass)}
                style={heroEnterDelayStyle(shouldAnimate, getHeroEnterDelayAfterLines(lineCount, 0.1))}
              >
                {HERO.subheadline}
              </p>
            ) : null}
            <p
              className={heroEnterItemClass(shouldAnimate, heroBodyClass, !HERO.subheadline && 'mt-0')}
              style={heroEnterDelayStyle(
                shouldAnimate,
                getHeroEnterDelayAfterLines(lineCount, HERO.subheadline ? 0.22 : 0.1),
              )}
            >
              {HERO.body}
            </p>
            <a
              href={HERO.ctaHref}
              className={heroEnterItemClass(shouldAnimate, heroActionLinkClass, heroCtaOnImageClass)}
              style={heroEnterDelayStyle(
                shouldAnimate,
                getHeroEnterDelayAfterLines(lineCount, HERO.subheadline ? 0.38 : 0.26),
              )}
            >
              {HERO.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
