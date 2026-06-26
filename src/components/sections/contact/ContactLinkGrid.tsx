import { cn, subsectionHeadingClass } from '../../../lib/utils';

export interface IContactGridItem {
  title: string;
  email?: string;
  phone?: string;
  href?: string;
  linkLabel?: string;
}

interface IContactLinkGridProps {
  items: readonly IContactGridItem[];
  className?: string;
  external?: boolean;
}

function formatPhoneTel(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('63')) return `+${digits}`;
  if (digits.startsWith('0')) return `+63${digits.slice(1)}`;
  return `+${digits}`;
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
          className="flex w-[min(100%,13rem)] flex-col items-center text-center sm:w-[calc(33.333%-2rem)] sm:max-w-[13rem]"
        >
          <h3 className={subsectionHeadingClass}>{item.title}</h3>

          {item.email ? (
            <a
              href={`mailto:${item.email}`}
              className="luxury-nav-link mt-2 text-muted-foreground"
            >
              {item.email}
            </a>
          ) : null}

          {item.phone ? (
            <a
              href={`tel:${formatPhoneTel(item.phone)}`}
              className="luxury-nav-link mt-1.5 text-muted-foreground"
            >
              {item.phone}
            </a>
          ) : null}

          {item.href && item.linkLabel ? (
            <a
              href={item.href}
              className="luxury-nav-link mt-2 text-muted-foreground"
              {...(external ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
            >
              {item.linkLabel}
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
