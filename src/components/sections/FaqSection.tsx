import { useState } from 'react';
import { FAQ, FAQ_SECTION } from '../../constants/content';
import { useInView } from '../../hooks/useInView';
import { cn, sectionDescriptionClass, sectionHeadingClass } from '../../lib/utils';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ[0]?.question ?? null);
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="faq" className="scroll-section bg-background section-padding">
      <div className="page-container">
        <div
          ref={ref}
          className={cn(
            'reveal section-grid grid lg:grid-cols-2',
            isVisible && 'reveal-visible',
          )}
        >
          <div className="flex flex-col lg:min-h-[420px]">
            <h2 className={cn(sectionHeadingClass, 'max-w-md')}>{FAQ_SECTION.title}</h2>

            <div className="section-stack flex flex-col gap-6 lg:mt-auto lg:pt-16">
              <p className={cn(sectionDescriptionClass, 'mt-0 max-w-sm')}>{FAQ_SECTION.description}</p>
              <a href={FAQ_SECTION.ctaHref} className="luxury-nav-link w-fit">
                {FAQ_SECTION.ctaLabel}
              </a>
            </div>
          </div>

          <div className="section-accordion-stack">
            {FAQ.map((item) => {
              const isOpen = openId === item.question;
              return (
                <div
                  key={item.question}
                  className="overflow-hidden rounded-brand border border-border bg-background"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left sm:px-7 sm:py-6"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.question)}
                  >
                    <span className="text-sm font-normal text-foreground sm:text-[15px]">
                      {item.question}
                    </span>
                    <span
                      className="inline-flex size-10 shrink-0 items-center justify-center rounded-brand border border-border text-xl leading-none font-light text-foreground transition-transform duration-500"
                      aria-hidden="true"
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    className={cn(
                      "transition-all duration-500 ease-out overflow-hidden",
                      isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground sm:px-7 sm:pb-7 sm:text-base">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
