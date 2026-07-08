/**
 * ReelProgress.js
 * Fixed right-side vertical progress bar — fills gold as the user scrolls.
 * Also renders the "REEL 001" vertical label below the track.
 * Extracted as "use client" because it writes to a DOM element on scroll.
 */

'use client';

import { useEffect, useRef } from 'react';

export default function ReelProgress() {
  const fillRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      if (fillRef.current) {
        fillRef.current.style.height = progress * 100 + '%';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div id="reel-progress" aria-hidden="true">
      <div className="track">
        <div className="fill" ref={fillRef} id="reelFill" />
      </div>
      <span className="label">REEL 001</span>
    </div>
  );
}
