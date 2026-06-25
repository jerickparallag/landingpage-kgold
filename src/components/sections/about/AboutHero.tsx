import { ABOUT_PAGE } from '../../../constants/content';
import { useInView } from '../../../hooks/useInView';
import {
  cn,
  heroActionLinkClass,
  heroBodyClass,
  heroSubheadlineClass,
  heroHomeTitleClass,
} from '../../../lib/utils';

export function AboutHero() {
  const { ref, isVisible } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { hero } = ABOUT_PAGE;

  return (
    <section className="relative overflow-hidden bg-[#1a1a1a] text-white">
      <div
        className="parallax-bg absolute inset-0 bg-cover bg-[center_right]"
        style={{ backgroundImage: `url(${hero.backgroundImage})` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/80 to-[#1a1a1a]/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 via-transparent to-[#1a1a1a]/25"
        aria-hidden="true"
      />

      <div className="relative z-10 page-container">
        <div
          ref={ref}
          className={cn(
            'reveal hero-min-h-home hero-content grid items-center gap-12 lg:grid-cols-12',
            isVisible && 'reveal-visible',
          )}
        >
          <div className="lg:col-span-7">
            <h1 className={cn(heroHomeTitleClass, 'text-left')}>
              {hero.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pl-8">
            <p className={cn(heroSubheadlineClass, 'text-white/80')}>{hero.subheadline}</p>
            <p className={cn(heroBodyClass, 'text-white/70')}>{hero.body}</p>
            <a href={hero.ctaHref} className={cn(heroActionLinkClass, 'text-white border-white hover:bg-white hover:text-[#1a1a1a]')}>
              {hero.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
