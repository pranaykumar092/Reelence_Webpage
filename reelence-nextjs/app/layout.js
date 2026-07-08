/**
 * layout.js — Root App Layout
 * Fonts are loaded via a standard Google Fonts <link> tag (in metadata.other)
 * to avoid next/font/google network timeouts during compilation.
 */

import './globals.css';
import SmoothScroll from '@/app/components/SmoothScroll';
import GlobalHeader from '@/app/components/layout/GlobalHeader';
import GlobalFooter from '@/app/components/layout/GlobalFooter';

/* ─── Metadata ─────────────────────────────────────────────────── */
export const metadata = {
  title: 'Reelence — Stories, Directed by Intelligence',
  description:
    'An AI filmmaking studio where every frame — script, shot, score, and edit — moves through a single intelligent pipeline. Human direction. Machine precision.',
  openGraph: {
    title: 'Reelence — Stories, Directed by Intelligence',
    description: 'AI filmmaking studio. Human direction. Machine precision.',
    type: 'website',
  },
};

/* ─── Root Layout ──────────────────────────────────────────────── */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>
          {/* Fixed navigation — rendered on every page */}
          <GlobalHeader />

          {/* Page content */}
          <main>{children}</main>

          {/* Footer */}
          <GlobalFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}

