import '../styles.css';

export const metadata = {
  title: 'Reelence Immersive Sample',
  description:
    'A futuristic one-screen immersive Reelence sample built with React, Framer Motion, and editable local assets.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
