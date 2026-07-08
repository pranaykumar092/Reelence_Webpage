Context: This is a React 18 + Vite + Framer Motion 11 site (Reelence). Full current 
architecture is documented in AI_CONTEXT.md — read that first. 

IMPORTANT: The current nav model is wheel-event-driven section JUMPING (each scroll 
tick swaps `activeIndex` and one full-screen section replaces another via 
AnimatePresence). I want to REPLACE this with real, continuous, inertia-smoothed 
scrolling, similar in feel to https://units.gr/en/homepage/ and 
https://banhmivietnam.xyz — sections flow one after another down a real scrollable 
page, with elements revealing progressively as they enter the viewport, not jumping 
between fixed screens.

Please do the following:

1. SCROLL ENGINE
   - Add Lenis (@studio-freight/lenis) for inertia/smoothed native scrolling.
   - Remove the wheel-event listener and `activeIndex`-based section switching in 
     ReelenceImmersiveScreen.jsx. Sections should render as a normal vertical stack 
     in the DOM, in the same order as the current `sections[]` array, and the user 
     scrolls through them naturally.
   - Keep hash-based deep-linking working: clicking a GlobalHeader nav item should 
     smooth-scroll (via Lenis) to that section's DOM node instead of jumping 
     `activeIndex`. Use IntersectionObserver to detect which section is currently 
     in view and fire `reelence:active-section` so GlobalHeader's nav bubble still 
     syncs correctly — keep that event contract intact.

2. SCROLL-TRIGGERED REVEALS
   - For each section, animate child elements (eyebrow, title, description, 
     stat pills, feature/service cards, CTAs) in with a fade + y-offset (~30-40px) 
     as they cross ~75-80% up the viewport, using Framer Motion's `useInView` 
     (or `whileInView` prop) — NOT animation tied to activeIndex anymore, since 
     that concept goes away.
   - Stagger children within a section (staggerChildren/delayChildren) so text 
     leads, then cards/stats, then CTAs — same order as before.
   - Add subtle parallax to VisualPanel imagery / founder photos / panel SVGs 
     using Framer Motion's `useScroll` + `useTransform` mapped to each element's 
     scroll progress, similar to the layered depth effect on units.gr.

3. BACKDROP / CINEMATIC VIDEO LAYER
   - CinematicBackgroundVideo currently keys off the single active section. 
     Adapt it to either (a) crossfade between backdrops based on which section 
     is majority-in-viewport via the same IntersectionObserver, or (b) become 
     per-section (each section mounts its own backdrop layer that fades in via 
     whileInView) — pick whichever avoids jank, and tell me which you chose and why.

4. MOBILE
   - Verify Lenis + whileInView reveals degrade gracefully on touch devices 
     (Lenis has native touch smoothing options — enable them). Confirm the 
     mobile nav menu in GlobalHeader still scrolls-to-section correctly.

5. PERFORMANCE / ACCESSIBILITY
   - Respect `prefers-reduced-motion`: disable Lenis smoothing and scroll-linked 
     transforms, fall back to instant scroll + simple fades.
   - Avoid re-triggering entrance animations every time a section re-enters 
     viewport on scroll-up (use `once: true` in useInView unless you think 
     re-triggering fits the vibe better — flag your choice).

Do NOT:
- Touch the Section Data Schema, Kids World manifest system, or DetailModal's 
  internal logic beyond adjusting its open/close animation if needed.
- Remove the `reelence:navigate` / `reelence:active-section` event contract — 
  adapt what triggers them, don't delete them, since GlobalHeader depends on it.

Show me the diff for each file you touch, and call out explicitly which files 
change the most (I expect ReelenceImmersiveScreen.jsx and CinematicBackgroundVideo.jsx 
to be the heaviest).