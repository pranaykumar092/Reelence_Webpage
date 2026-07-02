# AI_CONTEXT.md — Reelence Immersive Sample

> Feed this file to any AI model to give it instant, deep context about this codebase.
> Last generated: 2026-06-22

---

## 1. System Overview

This is a **React + Vite single-page web application** that acts as a futuristic, immersive marketing/pitch site for **Reelence Digital Studios** — an AI filmmaking and creative technology company. The entire experience is a single full-screen "cinematic" page where the user scrolls (mouse wheel) to navigate between distinct content **sections** (Home, Creative Studio, Studio OS, Entertainment, Kids World, Portfolio, About Us, Contact), each with animated backdrops, content panels, and a right-side visual display. Its core objective is to showcase Reelence's product offerings, team, and services through a premium, motion-rich UI.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Language | JavaScript (ES Modules, JSX) |
| UI Framework | React 18 |
| Build Tool | Vite 5 (with `@vitejs/plugin-react`) |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Styling | Vanilla CSS (single large `styles.css`) |
| Asset Serving | Vite's public directory (`/public`) |
| Custom Vite Plugin | `kidsWorldManifestPlugin` (auto-generates `/public/kids-world/manifest.json`) |
| Package Manager | npm |
| No backend / No database | All data is hardcoded in JSX; no API calls except fetching local `manifest.json` files |

---

## 3. Directory Map

```
reelence-immersive-sample/
│
├── index.html                          # HTML shell; mounts React into <div id="root">
├── package.json                        # Dependencies, npm scripts (dev / build / preview)
├── vite.config.js                      # Vite config + custom kidsWorldManifestPlugin
│
├── public/                             # Static assets served at root URL (/)
│   ├── assets/                         # Main visual assets
│   │   ├── home.mp4                    # Hero video played on the Home section
│   │   ├── reelence-logo.svg           # Placeholder logo used in visual panels
│   │   ├── ott-panel.svg               # Placeholder image for OTT section panel
│   │   ├── director-panel.svg          # Placeholder image for Director/Studio OS panel
│   │   ├── ads-panel.svg               # Placeholder image for Ads panel
│   │   ├── infra-panel.svg             # Placeholder image for Infra panel
│   │   ├── founders-panel.svg          # Placeholder image for Founders panel
│   │   └── founders/                   # Founder portrait photos (JPG)
│   │       ├── amit-kumar-pandey.jpg
│   │       ├── ambika-chopra.jpg
│   │       ├── navin-kumar.jpg
│   │       └── sunil_kumar1.jpg
│   ├── kids-world/                     # Drop-in folder for Kids World video files
│   │   ├── manifest.json               # Auto-generated list of video files (by vite plugin)
│   │   └── 3a.mp4                      # Example kids video
│   ├── brand/                          # (empty — reserved for brand assets)
│   └── logos/
│       └── reelence-logo.png           # High-res PNG logo
│
└── src/
    ├── main.jsx                        # React entry point; mounts <App> into #root, imports styles.css
    ├── App.jsx                         # Root component; composes GlobalHeader + ReelenceImmersiveScreen + GlobalFooter
    ├── styles.css                      # ALL styling (~98KB); no CSS modules — single global stylesheet
    │
    ├── config/
    │   └── reelenceAssets.js           # Exports reelenceLogoPath (currently null; swap to enable logo)
    │
    └── components/
        ├── ReelenceImmersiveScreen.jsx # ★ Core component (1652 lines); owns all section data, scroll logic, modals
        ├── CinematicBackgroundVideo.jsx# Full-bleed CSS background layer per section (video + fx layers)
        ├── DetailModal.jsx             # Reusable animated modal (Framer Motion)
        └── layout/
            ├── GlobalHeader.jsx        # Sticky nav bar with animated sliding bubble indicator + mobile menu
            └── GlobalFooter.jsx        # Icon-strip footer with pop-up info panels (contact, email, legal, social)
            └── GlobalFooter.css        # Isolated styles for the footer component
```

---

## 4. Core Workflows

### Application Boot Sequence

1. Browser loads `index.html` → Vite injects `/src/main.jsx` as a module.
2. `main.jsx` imports `./styles.css` (global), then renders `<App>` inside `React.StrictMode`.
3. `App.jsx` renders three components in a vertical stack:
   ```
   <GlobalHeader />           ← fixed top nav
   <ReelenceImmersiveScreen />← full viewport immersive stage
   <GlobalFooter />           ← icon strip at bottom
   ```

### Section Navigation Flow

The entire navigation model is **hash-based** (`#home`, `#services`, etc.) without a router library:

1. **Mouse wheel** on desktop (`deltaY > 35px`): a `wheel` event listener in `ReelenceImmersiveScreen` increments/decrements `activeIndex` state with a 450ms debounce lock.
2. **Header nav click**: `GlobalHeader.goTo(href)` sets `window.location.hash` and fires the custom DOM event `reelence:navigate` with the section ID as payload.
3. **Hash change**: `ReelenceImmersiveScreen` listens to `hashchange` and `reelence:navigate` events, maps the section ID to an array index, and calls `setActiveIndex`.
4. When `activeIndex` changes, `ReelenceImmersiveScreen` fires `reelence:active-section` so `GlobalHeader` can sync its active nav bubble.
5. The URL hash is updated via `history.replaceState` to stay in sync without a page reload.

### Section Rendering

- `sections` is a static array of objects (defined in `ReelenceImmersiveScreen.jsx`) — one object per section.
- `active = sections[activeIndex]` selects the current section.
- `<Backdrop vibe={active.vibe}>` renders a CSS-animated 3D depth scene (pure CSS/DOM, no WebGL).
- `<SectionPanel section={active}>` renders the left/center text and interactive cards. It is a switch-like function that returns specialized panels based on `section.id`.
- `<VisualPanel section={active}>` renders the right-side decorative visual card (hidden for services/kids-world/about-us sections which use the full width).
- `<CinematicBackgroundVideo videoName={active.id}>` renders a full-bleed atmospheric video/fx layer behind everything.
- Framer Motion `AnimatePresence` + `motion.div` handles enter/exit animations on section transitions.

### Modal System

- Any interactive element (stat pill, feature card, service card, founder card) calls `openModal(titleOrKey, body?, showDemoButton?)`.
- `openModal` first checks `servicePopupContent` (a hardcoded map), then checks known About Us titles/leaders, then falls back to a plain text mapping.
- The resolved content is stored in `modal` state and passed to `<DetailModal>`.
- Kids World cards use a separate `kidsCardModal` state and a dedicated second `<DetailModal>` instance.

### Kids World Media Flow

1. On mount, `KidsWorldMediaPanel` fetches `/kids-world/manifest.json` (generated by the Vite plugin from files dropped in `public/kids-world/`).
2. The manifest is filtered for `.mp4/.webm/.mov` files, mapped to `{ file, url, type, title }` objects.
3. Up to 3 videos are shown in a sidebar; the main player is a standard `<video controls>` element.
4. Vite's `kidsWorldManifestPlugin` watches the `public/kids-world/` directory in dev mode and regenerates the manifest on any file add/remove/change.

### Mouse Parallax

- A `mousemove` listener on the `.page-shell` root element computes normalized offsets (`--mx`, `--my`) and sets them as CSS custom properties on the `.backdrop-layer`. CSS animations read these for subtle parallax movement.

---

## 5. Key Interfaces & Schemas

### Section Data Schema (defined in `ReelenceImmersiveScreen.jsx`, lines 94–368)

Every entry in the `sections[]` array conforms to this shape:

```js
{
  id: string,            // URL hash key, e.g. 'home', 'services', 'kids-world'
  label: string,         // Nav label shown in GlobalHeader
  title: string,         // Large heading text
  eyebrow: string,       // Small uppercase label above title
  accentClass: string,   // CSS class for title color accent, e.g. 'accent-home'
  description: string,   // Body paragraph
  cta: string,           // Primary button label
  secondaryCta?: string, // Optional secondary button label
  icon: LucideIconComponent,
  stats: string[],       // 3 clickable pill labels
  visualTitle: string,   // Header text inside the VisualPanel
  vibe: string,          // Backdrop theme key: 'home'|'ott'|'director'|'marketing'|'kids'|'channels'|'about'|'contact'

  // Optional section-specific fields:
  features?: Array<{ title: string, detail: string }>      // Home & Studio OS
  serviceCards?: Array<{ title, summary, includes }>        // services
  whyChoose?: string[]                                      // services
  bottomCta?: { title, text, primary, secondary }           // services
  showcaseCards?: string[]                                  // portfolio
  mission?: { title, text, points: string[] }              // about-us
  vision?: { title, text, cards: string[] }                // about-us
  collaboration?: { title, text, chips: string[] }         // about-us
  finalCta?: { title, description, primary, secondary }    // about-us
}
```

### Leader Data Schema (`leaders[]`, lines 370–403)

```js
{
  name: string,
  role: string,
  image: string,   // Relative URL path to founder photo in /public
  badge: string,   // Short expertise tag
  bio: string,
}
```

### Kids World Card Schema (`kidsWorldCards[]`, lines 21–64)

```js
{
  title: string,
  summary: string,     // Short text shown on card
  details: string,     // Long text shown in modal
  benefits: string[],  // Bullet list shown in modal
}
```

---

### Component Props

#### `<ReelenceImmersiveScreen />` — no props (self-contained, owns all state)

#### `<CinematicBackgroundVideo />`
```ts
Props: { videoName: string }
// videoName is the section ID; internally mapped via VIDEO_MAP to a filename
// If the resolved name is not in SUPPORTED_BACKGROUND_VIDEOS[], no <video> is rendered (CSS fallback only)
```

#### `<DetailModal />`
```ts
Props: {
  open: boolean,
  title?: string,
  onClose: () => void,
  children: React.ReactNode,
  modalClassName?: string,    // appended to .modal-card
  overlayClassName?: string,  // appended to .modal-overlay
}
```

#### `<SectionPanel />`
```ts
Props: {
  section: SectionObject,           // one entry from sections[]
  onOpenStat: (titleOrKey: string, body?: string, showDemo?: boolean) => void,
  onOpenKidsCard: (card: KidsWorldCard) => void,
  scrollContainerRef: React.RefObject<HTMLElement>,
}
```

#### `<VisualPanel />`
```ts
Props: { section: SectionObject }
// Renders: leader grid (about-us), HomeMediaPlayer (home), or generic floating-card scene
```

#### `<GlobalHeader />` — no props
- Listens to: `reelence:active-section` custom event
- Dispatches: `reelence:navigate` custom event on nav click

#### `<GlobalFooter />` — no props
- Self-contained; manages its own `active` panel state

---

### Custom DOM Events (cross-component communication bus)

| Event Name | Direction | `event.detail` | Purpose |
|---|---|---|---|
| `reelence:navigate` | Header → Screen | `string` (sectionId) | Header tells Screen to jump to a section |
| `reelence:active-section` | Screen → Header | `string` (sectionId) | Screen tells Header which section is now visible |

---

### Vite Plugin: `kidsWorldManifestPlugin`

```ts
// Defined in vite.config.js
// Hooks: buildStart(), configureServer(server)
// Reads: public/kids-world/ directory
// Writes: public/kids-world/manifest.json  (JSON array of video filenames)
// Filter: /\.(mp4|webm|mov)$/i
// In dev mode: watches directory, auto-regenerates on file changes
```

---

### Config Export (`src/config/reelenceAssets.js`)

```js
export const reelenceLogoPath = null;
// Set to a URL string (e.g. '/logos/reelence-logo.png') to enable the logo image in GlobalHeader
```

---

## Notes for Editing AI

- **To add a new section**: append an object to the `sections[]` array in `ReelenceImmersiveScreen.jsx` and add a matching nav item in `GlobalHeader.jsx`.
- **To add service popup content**: add a key-value entry to `servicePopupContent` inside `ReelenceImmersiveScreen`.
- **To add Kids World videos**: drop `.mp4/.webm/.mov` files into `public/kids-world/`; the manifest auto-regenerates on next dev server start.
- **To replace placeholder SVGs**: swap files in `public/assets/` keeping the same filenames.
- **All styling lives in one file**: `src/styles.css` (~98KB). There are no CSS Modules or styled-components.
- **No routing library**: navigation is entirely hash-based with custom DOM events.
- **No state management library**: all state is local React `useState`/`useRef`/`useEffect`.
