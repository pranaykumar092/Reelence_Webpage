import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

/**
 * CircularMenu Component
 * - Displays as a half-circle on the right-edge center
 * - Rotates automatically to align active item at top
 * - Click center button to toggle expanded column menu
 * - Click outside expanded menu to collapse
 */
export default function CircularMenu({ sections, activeIndex, onSelect }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);

  const handleSelectItem = (index) => {
    onSelect(index);
    setIsExpanded(false);
  };
  const activeSection = sections[activeIndex];
  const ActiveIcon = activeSection.icon;

  return (
    <div className="glass-menu-container" ref={menuRef}>
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            key="circular"
            initial={{ opacity: 0, scale: 0.92, x: 20 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94, x: 20 }}
            transition={{ duration: 0.28 }}
            className="glass-semi-menu"
          >
            <div className="glass-semi-arc" />

            <button
              className="glass-active-peripheral"
              onClick={() => handleSelectItem(activeIndex)}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeSection.id}
                  className="glass-active-content"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="glass-active-icon-wrap">
                    <ActiveIcon size={14} />
                  </span>
                  <span className="glass-active-label">{activeSection.label}</span>
                </motion.span>
              </AnimatePresence>
            </button>

            <motion.button
              className="glass-semi-toggle"
              onClick={() => setIsExpanded(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              title="Open menu list"
            >
              <span>Menu</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, x: 18, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-menu-column"
          >
            <motion.button
              className="glass-column-close"
              onClick={() => setIsExpanded(false)}
              whileHover={{ x: 2 }}
            >
              <ChevronLeft size={16} />
              Back to Dial
            </motion.button>

            <div className="glass-column-list">
              {sections.map((section, idx) => (
                <motion.button
                  key={section.id}
                  className={`glass-column-item ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => handleSelectItem(idx)}
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <section.icon size={16} />
                  <span>{section.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
