/**
 * TimecodeHUD.js
 * Fixed top-left HUD component displaying a live fabricated timecode
 * that advances with scroll progress (simulating a 24fps film reel counter).
 * Extracted as "use client" because it reads window.scrollY.
 */

'use client';

import { useEffect, useRef } from 'react';

function frameFromProgress(p) {
  // Fabricate a plausible timecode HH:MM:SS:FF from scroll progress (24 fps)
  const totalFrames = Math.floor(p * 2400); // arbitrary reel length
  const ff = totalFrames % 24;
  const totalSeconds = Math.floor(totalFrames / 24);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

export default function TimecodeHUD() {
  const tcRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      if (tcRef.current) {
        tcRef.current.textContent = frameFromProgress(progress);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div id="timecode-hud" aria-hidden="true">
      <span className="dot" />
      <span id="tc" ref={tcRef}>
        00:00:00:00
      </span>
    </div>
  );
}
