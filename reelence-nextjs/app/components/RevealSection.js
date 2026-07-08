/**
 * RevealSection.js
 * "use client" — generic wrapper that uses IntersectionObserver to add the
 * `.in` class when an element enters the viewport, triggering the `.reveal`
 * CSS transition defined in globals.css.
 *
 * Props:
 *   children   — React nodes
 *   className  — extra classes to merge (e.g. "reveal-delay-1")
 *   tag        — HTML element to render, default "div"
 *   threshold  — IO threshold, default 0.15
 */

'use client';

import { useEffect, useRef } from 'react';

export default function RevealSection({
  children,
  className = '',
  tag: Tag = 'div',
  threshold = 0.15,
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
