# Reelence Immersive Sample

This is a local React + Vite sample for a one-screen immersive Reelence experience.

## What this sample includes

- one fixed full-screen experience
- scroll inside the screen to switch sections
- clickable right-side navigation
- futuristic placeholder logo and visual panels
- editable content for OTT, Director, Ads, Infra, and About
- easy structure for adding more sections later

## Run locally

```bash
npm install
npm run dev
```

Then open the localhost URL shown in the terminal.

## Build for production

```bash
npm run build
npm run preview
```

## Main files to edit

- `src/components/ReelenceImmersiveScreen.jsx` → content, sections, navigation, behavior
- `src/styles.css` → all styling, layout, visuals, responsiveness
- `public/assets/reelence-logo.svg` → current placeholder Reelence logo
- `public/assets/*.svg` → current futuristic placeholder image panels

## Add more sections later

Inside `src/components/ReelenceImmersiveScreen.jsx`, add another object to the `sections` array.

## Replace placeholder visuals later

You can replace these files with your own images while keeping the same names:

- `public/assets/ott-panel.svg`
- `public/assets/director-panel.svg`
- `public/assets/ads-panel.svg`
- `public/assets/infra-panel.svg`
- `public/assets/founders-panel.svg`
- `public/assets/reelence-logo.svg`

## Suggested next upgrade path

1. replace placeholder SVG art with premium generated images
2. add real founder images
3. add more sections like Studio OS, Marketing, Education, Services, Contact
4. later convert selective sections into true WebGL / Three.js scenes
