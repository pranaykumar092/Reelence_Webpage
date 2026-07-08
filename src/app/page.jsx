'use client';

import dynamic from 'next/dynamic';

// The immersive experience is fully client-driven (framer-motion, wheel handlers,
// direct window/document access), so it's loaded client-side only.
const App = dynamic(() => import('../App'), { ssr: false });

export default function HomePage() {
  return <App />;
}
