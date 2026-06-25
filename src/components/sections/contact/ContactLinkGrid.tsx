import { cn, subsectionHeadingClass } from '../../../lib/utils';

export interface IContactGridItem {
  title: string;
  linkLabel: string;
  href: string;
}

interface IContactLinkGridProps {
  items: readonly IContactGridItem[];
  className?: string;
  external?: boolean;
}

export function ContactLinkGrid({ items, className, external = false }: IContactLinkGridProps) {
  return (
    <ul
      className={cn(
        'section-stack mx-auto flex w-full max-w-4xl flex-wrap justify-center gap-x-12 gap-y-10',
        className,
      )}
    >
      {items.map((item) => (
        <li
          key={item.title}
          className="flex w-[min(100%,11rem)] flex-col items-center text-center sm:w-[calc(33.333%-2rem)] sm:max-w-[11rem]"
        >
          <h3 className={subsectionHeadingClass}>{item.title}</h3>
          <a
            href={item.href}
            className="luxury-nav-link mt-2 text-muted-foreground"
            {...(external ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
          >
            {item.linkLabel}
          </a>
        </li>
      ))}
    </ul>
  );
}
