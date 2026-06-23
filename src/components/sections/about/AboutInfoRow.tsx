import { cn, subsectionHeadingClass } from '../../../lib/utils';

interface IAboutInfoRowProps {
  title: string;
  body: string;
  showTopBorder?: boolean;
}

export function AboutInfoRow({ title, body, showTopBorder = true }: IAboutInfoRowProps) {
  return (
    <div
      className={cn(
        'grid gap-6 py-10 sm:gap-8 lg:grid-cols-12 lg:gap-12 lg:py-12',
        showTopBorder && 'border-t border-border',
      )}
    >
      <h3 className={cn(subsectionHeadingClass, 'lg:col-span-4')}>{title}</h3>
      <p className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:col-span-8">
        {body}
      </p>
    </div>
  );
}
