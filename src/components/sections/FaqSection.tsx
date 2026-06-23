import { useState } from 'react';
import { FAQ, FAQ_SECTION } from '../../constants/content';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../lib/utils';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ[0]?.question ?? null);
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="faq" className="bg-background section-padding">
      <div className="page-container">
        <div
          ref={ref}
          className={cn(
            'reveal grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24',
            isVisible && 'reveal-visible',
          )}
        >
          {/* Left — headline + CTA */}
          <div className="flex flex-col lg:min-h-[420px]">
            <h2 className="max-w-md text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
              {FAQ_SECTION.title}
            </h2>

            <div className="mt-10 flex flex-col gap-6 lg:mt-auto lg:pt-16">
              <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
                {FAQ_SECTION.description}
              </p>
              <a
                href={FAQ_SECTION.ctaHref}
                className="inline-flex w-fit items-center rounded-brand bg-foreground px-7 py-3 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                {FAQ_SECTION.ctaLabel}
              </a>
            </div>
          </div>

          {/* Right — accordion cards */}
          <div className="flex flex-col gap-3">
            {FAQ.map((item) => {
              const isOpen = openId === item.question;
              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-brand bg-card shadow-[var(--shadow-xs)]"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left sm:px-7 sm:py-6"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.question)}
                  >
                    <span className="text-base font-semibold text-foreground sm:text-lg">
                      {item.question}
                    </span>
                    <span
                      className="inline-flex size-10 shrink-0 items-center justify-center rounded-brand border border-border text-xl leading-none font-light text-foreground"
                      aria-hidden="true"
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground sm:px-7 sm:pb-7 sm:text-base">
                      {item.answer}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
