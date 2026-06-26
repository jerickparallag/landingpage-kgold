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
            'reveal section-grid flex min-h-0 flex-col lg:grid lg:min-h-[320px] lg:grid-cols-2 lg:grid-rows-[auto_1fr]',
            isVisible && 'reveal-visible',
          )}
        >
          <h2
            className={cn(
              sectionHeadingClass,
              'order-1 max-w-md lg:col-start-1 lg:row-start-1',
            )}
          >
            {FAQ_SECTION.title}
          </h2>

          <div className="order-2 flex-1 divide-y divide-border lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:flex-none lg:pt-14">
            {FAQ.map((item) => {
              const isOpen = openId === item.question;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.question)}
                  >
                    <span className="text-sm font-normal text-foreground sm:text-[15px]">
                      {item.question}
                    </span>
                    <span
                      className="shrink-0 text-xl leading-none font-light text-foreground transition-transform duration-300"
                      aria-hidden="true"
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    className={cn(
                      'overflow-hidden transition-all duration-500 ease-out',
                      isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
                    )}
                  >
                    <div className="pb-6 text-sm leading-relaxed text-muted-foreground sm:pb-7 sm:text-base">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="order-3 mt-auto section-stack flex flex-col items-center gap-6 pt-10 text-center lg:order-none lg:col-start-1 lg:row-start-2 lg:mt-0 lg:items-start lg:self-end lg:pt-8 lg:text-left">
            <p className={cn(sectionDescriptionClass, 'mt-0 max-w-sm')}>{FAQ_SECTION.description}</p>
            <a href={FAQ_SECTION.ctaHref} className="luxury-nav-link mx-auto w-fit lg:mx-0">
              {FAQ_SECTION.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
