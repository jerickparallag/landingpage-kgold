import { useInView } from '../../../hooks/useInView';
import { cn, heroCollectionTitleClass, heroBodyClass } from '../../../lib/utils';
import type { ICollection } from '../../../content/types';

interface ICollectionHeroProps {
  collection: ICollection;
}

export function CollectionHero({ collection }: ICollectionHeroProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="relative overflow-hidden bg-[#171717] text-white">
      <div
        className="parallax-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${collection.image})` }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#111111] via-[#111111]/78 to-[#111111]/18"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#111111]/72 via-[#111111]/10 to-[#111111]/10"
        aria-hidden="true"
      />

      <div className="relative z-10 page-container">
        <div
          ref={ref}
          className={cn(
            'reveal flex min-h-[72svh] max-w-2xl flex-col justify-end py-16 sm:min-h-[78svh] sm:py-20 lg:min-h-[86svh] lg:py-24',
            isVisible && 'reveal-visible',
          )}
        >
          <p className="mb-4 text-[10px] font-normal tracking-[0.32em] text-white/65 uppercase">
            Collection
          </p>
          <h1 className={cn(heroCollectionTitleClass, 'max-w-[12ch] text-[clamp(2.4rem,6vw,5rem)] leading-[0.96] tracking-[0.08em] uppercase')}>
            {collection.name}
          </h1>
          <p className={cn(heroBodyClass, 'mt-6 max-w-xl text-white/72 sm:text-base lg:text-[1.05rem]')}>
            {collection.description}
          </p>
        </div>
      </div>
    </section>
  );
}
