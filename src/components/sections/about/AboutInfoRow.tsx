import { cn, sectionDescriptionClass, subsectionHeadingClass } from '../../../lib/utils';

interface IAboutInfoRowProps {
  title: string;
  body: string;
  showTopBorder?: boolean;
}

export function AboutInfoRow({ title, body, showTopBorder = true }: IAboutInfoRowProps) {
  return (
    <div
      className={cn(
        'section-info-row',
        showTopBorder && 'border-t border-border',
      )}
    >
      <h3 className={cn(subsectionHeadingClass, 'lg:col-span-4')}>{title}</h3>
      <p className={cn(sectionDescriptionClass, 'mt-0 lg:col-span-8')}>{body}</p>
    </div>
  );
}
