import { HERO } from '../../constants/content';
import { useInView } from '../../hooks/useInView';
import { cn, heroActionLinkClass, heroBodyClass, heroHomeTitleClass, heroSubheadlineClass } from '../../lib/utils';

export function Hero() {
  const { ref, isVisible } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="relative overflow-hidden bg-[#1a1a1a] text-white">
      <div
        className="parallax-bg absolute inset-0 bg-cover bg-[center_right]"
        style={{ backgroundImage: `url(${HERO.backgroundImage})` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a]/70 to-[#1a1a1a]/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/50 via-transparent to-[#1a1a1a]/15"
        aria-hidden="true"
      />

      <div className="relative z-10 page-container">
        <div
          ref={ref}
          className={cn(
            'reveal hero-min-h-home hero-content grid items-end gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-12',
            isVisible && 'reveal-visible',
          )}
        >
          <div className="lg:col-span-7">
            <h1 className={cn(heroHomeTitleClass, 'text-left')}>
              {HERO.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <div className="max-w-lg lg:col-span-5 lg:pl-8">
            <p className={cn(heroSubheadlineClass, 'text-white/80')}>{HERO.subheadline}</p>
            <p className={cn(heroBodyClass, 'text-white/70')}>{HERO.body}</p>
            <a href={HERO.ctaHref} className={cn(heroActionLinkClass, 'text-white border-white hover:bg-white hover:text-[#1a1a1a]')}>
              {HERO.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
