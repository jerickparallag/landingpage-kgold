import { CAREERS_PAGE } from '../../../constants/content';
import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../lib/utils';

export function CareersCulture() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { culture } = CAREERS_PAGE;

  return (
    <section id="culture" className="scroll-mt-28 bg-background section-padding">
      <div className="page-container">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {culture.title}
        </h2>

        <div
          ref={ref}
          className={cn(
            'reveal mt-12 grid gap-10 sm:gap-12 lg:mt-16 lg:grid-cols-3 lg:gap-16',
            isVisible && 'reveal-visible',
          )}
        >
          {culture.items.map((item) => (
            <div key={item.title}>
              <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-[1.35rem]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
