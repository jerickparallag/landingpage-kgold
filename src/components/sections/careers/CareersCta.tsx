import { CAREERS_PAGE } from '../../../constants/content';
import { Button } from '../../ui/Button';
import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../lib/utils';

export function CareersCta() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { cta } = CAREERS_PAGE;

  return (
    <section className="bg-background section-padding">
      <div className="page-container">
        <div
          ref={ref}
          className={cn('reveal w-full text-center', isVisible && 'reveal-visible')}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {cta.description}
          </p>
          <div className="mt-8">
            <Button as="a" href={cta.primaryHref}>
              {cta.primaryLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
