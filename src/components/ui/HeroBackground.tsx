import { OptimizedImage } from './OptimizedImage';
import { cn } from '../../lib/utils';

interface IHeroBackgroundProps {
  image: string;
  position?: 'center' | 'center_right';
  animate?: boolean;
  priority?: boolean;
}

export function HeroBackground({
  image,
  position = 'center_right',
  animate = true,
  priority = true,
}: IHeroBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <OptimizedImage
        src={image}
        alt=""
        priority={priority}
        pictureClassName="absolute inset-0 block h-full w-full"
        className={cn(
          'object-cover',
          animate && 'hero-img-enter',
          position === 'center' ? 'object-center' : 'object-[center_right]',
        )}
      />
    </div>
  );
}
