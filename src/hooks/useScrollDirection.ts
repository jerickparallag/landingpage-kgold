import { useEffect, useRef, useState } from 'react';

/** Returns true when header should be visible (top of page or scrolling up). */
export function useScrollDirection() {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 8) {
        setVisible(true);
      } else if (y > lastY.current + 4) {
        setVisible(false);
      } else if (y < lastY.current - 4) {
        setVisible(true);
      }
      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return visible;
}
