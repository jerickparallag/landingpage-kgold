import { ABOUT_PAGE } from '../../../constants/content';
import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../lib/utils';

export function AboutLeadershipSection() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { leadership } = ABOUT_PAGE;

  return (
    <section id="leadership" className="scroll-mt-28 bg-background section-padding">
      <div className="page-container">
        <div ref={ref} className={cn('reveal', isVisible && 'reveal-visible')}>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-brand">
                <div className="aspect-video">
                  <img
                    src={leadership.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <blockquote className="text-2xl leading-snug font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl lg:leading-tight">
                &ldquo;{leadership.quote}&rdquo;
              </blockquote>
              <p className="mt-8 text-base font-medium text-foreground sm:text-lg">
                {leadership.name}
              </p>
              {leadership.role ? (
                <p className="mt-1 text-sm text-muted-foreground">{leadership.role}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
