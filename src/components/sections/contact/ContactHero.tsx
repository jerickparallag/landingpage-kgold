import { CONTACT_PAGE } from '../../../constants/content';
import { useHeroEnterAnimation } from '../../../hooks/useHeroEnterAnimation';
import { HeroBackground } from '../../ui/HeroBackground';
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
} from '../../../lib/utils';

export function ContactHero() {
  const shouldAnimate = useHeroEnterAnimation();
  const { hero } = CONTACT_PAGE;
  const lineCount = hero.headline.length;

  return (
    <section className={heroSectionClass}>
      <HeroBackground image={hero.backgroundImage} animate={shouldAnimate} />
      <div className={heroOverlayHorizontalClass} aria-hidden="true" />
      <div className={heroOverlayVerticalClass} aria-hidden="true" />

      <div className="relative z-10 page-container">
        <div className="hero-min-h-home hero-content grid items-center gap-12 lg:grid-cols-12">
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
          <div className="lg:col-span-5 lg:pl-8">
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
