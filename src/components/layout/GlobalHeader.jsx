import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { reelenceLogoPath } from "../../config/reelenceAssets";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Creative Studio", href: "#services" },
  { label: "Studio OS", href: "#studio-os" },
  { label: "Entertainment", href: "#entertainment" },
  { label: "Kids + Learning", href: "#kids-world" },
  { label: "Showcase", href: "#portfolio" },
  { label: "About", href: "#about-us" },
];

export default function GlobalHeader() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
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
    setActiveSection(href.replace("#", ""));
    window.location.hash = href;
    window.dispatchEvent(new CustomEvent("reelence:navigate", { detail: href.replace("#", "") }));
    setOpen(false);
  };

  // position bubble when user clicks a nav item for immediate feedback
  const goToAndPositionBubble = (href, idx) => {
    goTo(href);
    measureButtons();
    const rect = rectsRef.current && rectsRef.current[idx];
    if (rect) {
      const targetX = rect.center - rect.width / 2;
      bubbleX.set(Math.max(0, targetX));
      bubbleW.set(Math.max(24, rect.width));
    }
  };

  useLayoutEffect(() => {
    const mask = maskRef.current;
    const inner = innerRef.current;
    if (!mask || !inner) return;
    const update = () => setMaxShift(Math.max(0, inner.scrollWidth - mask.clientWidth));
    update();
    window.addEventListener("resize", update);
    const onResize = () => measureButtons();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const measureButtons = () => {
    const mask = maskRef.current;
    if (!mask) return;
    const maskRect = mask.getBoundingClientRect();
    rectsRef.current = (buttonRefs.current || []).map((btn) => {
      if (!btn) return null;
      const r = btn.getBoundingClientRect();
      return {
        left: r.left - maskRect.left,
        width: r.width,
        center: r.left - maskRect.left + r.width / 2,
      };
    });
  };

  useEffect(() => {
    const ids = navItems.map((n) => n.href.replace("#", ""));
    const getHashId = () => window.location.hash.replace("#", "") || "home";
    const isKnownId = (id) => ids.includes(id);

    const applySectionId = (sectionId) => {
      if (!sectionId || !isKnownId(sectionId)) return;
      setActiveSection(sectionId);
    };

    const onHashChange = () => applySectionId(getHashId());
    const onNavigate = (event) => applySectionId(event.detail);
    const onActiveSection = (event) => applySectionId(event.detail);

    const observed = ids.map((id) => document.getElementById(id)).filter(Boolean);
    let io = null;

    if (observed.length > 0) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            ratiosRef.current[entry.target.id] = entry.intersectionRatio || 0;
          });

          const ratios = ratiosRef.current;
          const rects = rectsRef.current || [];
          let total = 0;
          let weightedCenter = 0;
          let weightedWidth = 0;

          ids.forEach((id, idx) => {
            const ratio = ratios[id] || 0;
            const rect = rects[idx];
            if (!rect) return;
            total += ratio;
            weightedCenter += ratio * rect.center;
            weightedWidth += ratio * rect.width;
          });

          if (total > 0) {
            const center = weightedCenter / total;
            const width = weightedWidth / total;
            bubbleX.set(Math.max(0, center - width / 2));
            bubbleW.set(Math.max(24, width));
            const maxId = ids.reduce((best, id) => (ratios[id] > (ratios[best] || 0) ? id : best), ids[0]);
            setActiveSection(maxId);
          }
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
      );

      measureButtons();
      observed.forEach((el) => io.observe(el));
    }

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("reelence:navigate", onNavigate);
    window.addEventListener("reelence:active-section", onActiveSection);
    applySectionId(getHashId());

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("reelence:navigate", onNavigate);
      window.removeEventListener("reelence:active-section", onActiveSection);
      if (io) io.disconnect();
    };
  }, []);

  useEffect(() => {
    // whenever activeSection or layout changes, ensure measurements exist
    measureButtons();
  }, [activeSection]);

  useEffect(() => {
    // on mount, ensure bubble has an initial position (first button)
    measureButtons();
    const first = rectsRef.current && rectsRef.current[0];
    if (first) {
      const targetX = first.center - first.width / 2;
      bubbleX.set(Math.max(0, targetX));
      bubbleW.set(Math.max(24, first.width));
    }
  }, []);

  useEffect(() => {
    // position bubble on the currently active section if measured
    if (!rectsRef.current || rectsRef.current.length === 0) return;
    const ids = navItems.map((n) => n.href.replace('#', ''));
    const idx = ids.indexOf(activeSection);
    const rect = rectsRef.current[idx];
    if (rect) {
      const targetX = rect.center - rect.width / 2;
      bubbleX.set(Math.max(0, targetX));
      bubbleW.set(Math.max(24, rect.width));
    }
  }, [activeSection]);

  return (
    <header className="reelence-global-header">
      <div className="reelence-header-shell">
        <button className="reelence-brand reelence-brand-button" onClick={() => goTo("#home")}>
          <div className="reelence-logo-box">
            {reelenceLogoPath ? (
              <img src={reelenceLogoPath} alt="Reelence" className="reelence-logo-img" />
            ) : (
              <div className="reelence-logo-fallback">R</div>
            )}
          </div>

          <div className="reelence-brand-copy">
            <div className="reelence-brand-name">REELENCE</div>
            <div className="reelence-brand-subtitle">Essence of the Reels</div>
          </div>
        </button>

        <nav className="reelence-desktop-nav">
          <div className="reelence-desktop-nav-mask" ref={maskRef} tabIndex={0}>
            <motion.div className="nav-bubble" style={{ x: springX, width: springW }} pointerEvents="none" aria-hidden="true" />
            <motion.div className="reelence-nav-inner" ref={innerRef} style={{ x }}>
              {navItems.map((item, idx) => {
                const id = item.href.replace('#', '');
                return (
                  <button
                    key={item.label}
                    ref={(el) => (buttonRefs.current[idx] = el)}
                    className={["reelence-nav-button", activeSection === id ? 'is-active' : ''].join(' ')}
                      onClick={() => goToAndPositionBubble(item.href, idx)}
                  >
                    {item.label}
                  </button>
                );
              })}
            </motion.div>
          </div>
        </nav>

        <button className="reelence-header-cta" onClick={() => goTo("#contact")}>
          <Sparkles size={15} />
          Let’s Build
        </button>

        <button className="reelence-mobile-toggle" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

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
