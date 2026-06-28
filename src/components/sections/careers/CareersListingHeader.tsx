import { cn, sectionDescriptionClass, sectionHeadingClass } from '../../../lib/utils';

interface ICareersListingHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function CareersListingHeader({ eyebrow, title, description }: ICareersListingHeaderProps) {
  return (
    <header className="careers-listing-header">
      <p className="careers-listing-eyebrow">{eyebrow}</p>
      <h1 className={cn(sectionHeadingClass, 'mt-3 text-2xl sm:text-3xl lg:text-4xl')}>{title}</h1>
      {description ? (
        <p className={cn(sectionDescriptionClass, 'mx-auto mt-4 max-w-2xl')}>{description}</p>
      ) : null}
    </header>
  );
}
