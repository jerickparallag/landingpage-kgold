import { useEffect, useState } from 'react';

/** Highlights the section whose top has most recently crossed below the sticky nav offset. */
export function useActiveSection(hrefs: readonly string[], offsetPx = 120) {
  const [activeHref, setActiveHref] = useState(hrefs[0] ?? '');

  useEffect(() => {
    const sectionIds = hrefs.map((href) => href.replace(/^#/, ''));

    const update = () => {
      let current = hrefs[0] ?? '';
      for (let i = 0; i < sectionIds.length; i += 1) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= offsetPx) {
          current = hrefs[i];
        }
      }
      setActiveHref(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [hrefs, offsetPx]);

  return activeHref;
}
