/**
 * GlobalHeader.js — "use client"
 * Migrated from src/components/layout/GlobalHeader.jsx
 * Features: animated sliding bubble indicator, smooth anchor scroll,
 * Framer Motion nav scroll transform, mobile hamburger menu.
 */

'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { navItems } from '@/app/data/siteData';

export default function GlobalHeader() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const maskRef = useRef(null);
  const innerRef = useRef(null);
  const buttonRefs = useRef([]);
  const rectsRef = useRef([]);
  const ratiosRef = useRef({});
  const bubbleX = useMotionValue(0);
  const bubbleW = useMotionValue(0);
  const springX = useSpring(bubbleX, { stiffness: 260, damping: 28 });
  const springW = useSpring(bubbleW, { stiffness: 260, damping: 32 });
  const [maxShift, setMaxShift] = useState(0);

  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, (v) => v * -maxShift);

  const goTo = (href) => {
    const id = href.replace('#', '');
    setActiveSection(id);
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const measureButtons = () => {
    const mask = maskRef.current;
    if (!mask) return;
    const maskRect = mask.getBoundingClientRect();
    rectsRef.current = (buttonRefs.current || []).map((btn) => {
      if (!btn) return null;
      const r = btn.getBoundingClientRect();
      return { left: r.left - maskRect.left, width: r.width, center: r.left - maskRect.left + r.width / 2 };
    });
  };

  const goToAndPositionBubble = (href, idx) => {
    goTo(href);
    measureButtons();
    const rect = rectsRef.current && rectsRef.current[idx];
    if (rect) {
      bubbleX.set(Math.max(0, rect.center - rect.width / 2));
      bubbleW.set(Math.max(24, rect.width));
    }
  };

  useLayoutEffect(() => {
    const mask = maskRef.current;
    const inner = innerRef.current;
    if (!mask || !inner) return;
    const update = () => setMaxShift(Math.max(0, inner.scrollWidth - mask.clientWidth));
    update();
    const onResize = () => { update(); measureButtons(); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const ids = navItems.map((n) => n.href.replace('#', ''));
    const ratios = ratiosRef.current;

    const observed = ids.map((id) => document.getElementById(id)).filter(Boolean);
    let io = null;

    if (observed.length > 0) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => { ratios[entry.target.id] = entry.intersectionRatio || 0; });
          let total = 0, weightedCenter = 0, weightedWidth = 0;
          ids.forEach((id, idx) => {
            const ratio = ratios[id] || 0;
            const rect = (rectsRef.current || [])[idx];
            if (!rect) return;
            total += ratio;
            weightedCenter += ratio * rect.center;
            weightedWidth += ratio * rect.width;
          });
          if (total > 0) {
            bubbleX.set(Math.max(0, weightedCenter / total - weightedWidth / total / 2));
            bubbleW.set(Math.max(24, weightedWidth / total));
            const maxId = ids.reduce((best, id) => (ratios[id] > (ratios[best] || 0) ? id : best), ids[0]);
            setActiveSection(maxId);
          }
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
      );
      measureButtons();
      observed.forEach((el) => io.observe(el));
    }

    return () => { if (io) io.disconnect(); };
  }, []);

  useEffect(() => {
    measureButtons();
    const idx = navItems.findIndex((n) => n.href.replace('#', '') === activeSection);
    const rect = (rectsRef.current || [])[idx];
    if (rect) {
      bubbleX.set(Math.max(0, rect.center - rect.width / 2));
      bubbleW.set(Math.max(24, rect.width));
    }
  }, [activeSection]);

  return (
    <header className="reelence-global-header">
      <div className="reelence-header-shell">
        {/* Brand */}
        <button className="reelence-brand reelence-brand-button" onClick={() => goTo('#home')}>
          <div className="reelence-logo-box">
            <div className="reelence-logo-fallback">R</div>
          </div>
          <div className="reelence-brand-copy">
            <div className="reelence-brand-name">REELENCE</div>
            <div className="reelence-brand-subtitle">Essence of the Reels</div>
          </div>
        </button>

        {/* Desktop nav with sliding bubble */}
        <nav className="reelence-desktop-nav" aria-label="Main navigation">
          <div className="reelence-desktop-nav-mask" ref={maskRef}>
            <motion.div className="nav-bubble" style={{ x: springX, width: springW }} aria-hidden="true" />
            <motion.div className="reelence-nav-inner" ref={innerRef} style={{ x }}>
              {navItems.map((item, idx) => {
                const id = item.href.replace('#', '');
                return (
                  <button
                    key={item.label}
                    ref={(el) => (buttonRefs.current[idx] = el)}
                    className={['reelence-nav-button', activeSection === id ? 'is-active' : ''].join(' ')}
                    onClick={() => goToAndPositionBubble(item.href, idx)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </nav>

        {/* CTA */}
        <button className="reelence-header-cta" onClick={() => goTo('#contact')}>
          <Sparkles size={15} />
          Let's Build
        </button>

        {/* Mobile toggle */}
        <button className="reelence-mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="reelence-mobile-menu">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => goTo(item.href)}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
