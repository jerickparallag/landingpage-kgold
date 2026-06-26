import { cn } from '../../lib/utils';

interface IHeroBackgroundProps {
  image: string;
  position?: 'center' | 'center_right';
  animate?: boolean;
}

export function HeroBackground({ image, position = 'center_right', animate = true }: IHeroBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className={cn(
          'parallax-bg absolute inset-0 bg-cover',
          animate && 'hero-bg-enter',
          position === 'center' ? 'bg-center' : 'bg-[center_right]',
        )}
        style={{ backgroundImage: `url(${image})` }}
      />
    </div>
  );
}
