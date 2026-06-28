import type { ImgHTMLAttributes } from 'react';
import { getWebpSrc } from '../../lib/imageUtils';
import { cn } from '../../lib/utils';

interface IOptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  /** LCP / above-the-fold — eager load + high fetch priority. */
  priority?: boolean;
  pictureClassName?: string;
}

export function OptimizedImage({
  src,
  priority = false,
  alt = '',
  className,
  pictureClassName,
  loading,
  decoding = 'async',
  fetchPriority,
  ...rest
}: IOptimizedImageProps) {
  const webpSrc = getWebpSrc(src);
  const imgProps = {
    src,
    alt,
    className: cn('h-full w-full', className),
    loading: loading ?? (priority ? 'eager' : 'lazy'),
    decoding,
    fetchPriority: fetchPriority ?? (priority ? 'high' : undefined),
    ...rest,
  };

  if (!webpSrc) {
    return <img {...imgProps} />;
  }

  return (
    <picture className={pictureClassName}>
      <source srcSet={webpSrc} type="image/webp" />
      <img {...imgProps} />
    </picture>
  );
}
