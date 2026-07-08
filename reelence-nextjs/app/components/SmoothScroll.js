/**
 * SmoothScroll.js
 * "use client" wrapper — initialises Lenis smooth scroll globally.
 * Respects prefers-reduced-motion: if the user prefers reduced motion,
 * Lenis is not activated and children render normally.
 *
 * Usage: wrap children in <SmoothScroll> inside app/layout.js
 */

'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && lenisRef.current?.lenis) {
      lenisRef.current.lenis.destroy();
    }
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.15,
        smoothWheel: true,
        smoothTouch: false,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}
