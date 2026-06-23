import { HERO } from '../../constants/content';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../lib/utils';

function HeroCta({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group mt-8 inline-flex items-center gap-3 text-white transition"
    >
      <span className="text-sm font-semibold sm:text-base">{label}</span>
      <span className="inline-flex size-8 items-center justify-center rounded-brand bg-primary text-primary-foreground transition group-hover:bg-primary-hover">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}

export function Hero() {
  const { ref, isVisible } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="relative overflow-hidden bg-[#1c1c1c] text-white">
      <div
        className="parallax-bg absolute inset-0 bg-cover bg-[center_right]"
        style={{ backgroundImage: `url(${HERO.backgroundImage})` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1c1c1c] via-[#1c1c1c]/75 to-[#1c1c1c]/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1c1c1c]/40 via-transparent to-[#1c1c1c]/20"
        aria-hidden="true"
      />

      {/* Subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 page-container">
        <div
          ref={ref}
          className={cn(
            'reveal grid min-h-[min(80svh,720px)] items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20',
            isVisible && 'reveal-visible',
          )}
        >
          <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] font-semibold tracking-tight uppercase">
            {HERO.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div className="max-w-md lg:justify-self-end">
            <div className="mb-6 h-1 w-12 bg-primary" aria-hidden="true" />
            <p className="text-xl font-semibold tracking-tight sm:text-2xl">{HERO.subheadline}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">{HERO.body}</p>
            <HeroCta href={HERO.ctaHref} label={HERO.ctaLabel} />
          </div>
        </div>
      </div>
    </section>
  );
}
