import { ABOUT_PAGE } from '../../../constants/content';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../lib/utils';

export function AboutLeadershipSection() {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { leadership } = ABOUT_PAGE;

  return (
    <section id="leadership" className="scroll-section min-h-screen flex items-center bg-background">
      <div className="page-container">
        <div ref={ref} className={cn('reveal', isVisible && 'reveal-visible')}>
          <div className="section-grid grid items-center lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-brand">
                <div className="aspect-video">
                  <OptimizedImage
                    src={leadership.image}
                    alt=""
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-12">
              <blockquote className="text-xl leading-snug font-light tracking-wide text-foreground sm:text-2xl lg:text-4xl lg:leading-snug">
                &ldquo;{leadership.quote}&rdquo;
              </blockquote>
              <div className="section-inner-stack">
                <p className="text-base font-medium text-foreground sm:text-lg">
                  {leadership.name}
                </p>
                {leadership.role ? (
                  <p className="mt-1 text-sm text-muted-foreground">{leadership.role}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
