import { getParallaxBackgroundImage } from '../../lib/imageUtils';

interface IEditorialFixedBackgroundProps {
  image: string;
}

export function EditorialFixedBackground({ image }: IEditorialFixedBackgroundProps) {
  return (
    <div
      className="editorial-fixed-bg pointer-events-none absolute inset-0"
      style={{ backgroundImage: getParallaxBackgroundImage(image) }}
      aria-hidden="true"
    />
  );
}
