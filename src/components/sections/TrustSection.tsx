import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { TRUST_SECTION } from '../../constants/content';
import { SectionHeader } from '../ui/SectionHeader';
import { useInView } from '../../hooks/useInView';
import { cn, sectionDescriptionClass } from '../../lib/utils';

interface TrustMetricItemProps {
  value: string;
  label: string;
  visible: boolean;
}

function TrustMetricItem({ value, label, visible }: TrustMetricItemProps) {
  const targetNumber = parseInt(value.replace(/\D/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');
  const [count, setCount] = useState(Number.isNaN(targetNumber) ? value : 0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!visible || Number.isNaN(targetNumber)) {
      setCount(Number.isNaN(targetNumber) ? value : 0);
      return;
    }

    const duration = 900;
    const start = performance.now();

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.round(targetNumber * progress));
      if (progress < 1) {
        animationRef.current = window.requestAnimationFrame(step);
      }
    };

    animationRef.current = window.requestAnimationFrame(step);

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [visible, targetNumber, value]);

  return (
    <div className="text-center">
      <p className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
        {Number.isNaN(targetNumber) ? value : `${count}${suffix}`}
      </p>
      <p className={cn(sectionDescriptionClass, 'mt-4')}>{label}</p>
    </div>
  );
}

export function TrustSection() {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="trust" className="scroll-section bg-background section-padding">
      <div className="page-container">
        <SectionHeader title={TRUST_SECTION.title} description={TRUST_SECTION.description} />
        <div
          ref={ref}
          className={cn(
            'reveal grid gap-6 pt-8 lg:grid-cols-4',
            isVisible && 'reveal-visible',
          )}
        >
          {TRUST_SECTION.items.map((item) => (
            <TrustMetricItem
              key={item.label}
              value={item.value}
              label={item.label}
              visible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
