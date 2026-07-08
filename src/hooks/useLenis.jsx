import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext(null);

const HEADER_OFFSET = -80; // px offset for fixed header

/**
 * Returns the Lenis instance from context.
 * Must be used inside <LenisProvider>.
 */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Wraps the application with a single Lenis instance.
 * - Disables smooth scroll when prefers-reduced-motion is set.
 * - Listens for `reelence:navigate` events and smooth-scrolls to the target section.
 * - Drives the RAF loop internally.
 */
export function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReducedMotion,
      touchMultiplier: prefersReducedMotion ? 1 : 1.8,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    lenisRef.current = lenis;

    // RAF loop
    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    // Handle reelence:navigate → smooth scroll to target section
    const onNavigate = (event) => {
      const sectionId = event.detail;
      if (!sectionId) return;
      const target = document.getElementById(sectionId);
      if (!target) return;
      lenis.scrollTo(target, {
        offset: HEADER_OFFSET,
        duration: prefersReducedMotion ? 0 : 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    };

    window.addEventListener('reelence:navigate', onNavigate);

    return () => {
      window.removeEventListener('reelence:navigate', onNavigate);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}
