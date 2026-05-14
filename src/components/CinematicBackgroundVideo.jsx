import { useEffect, useMemo, useState } from 'react';

const VIDEO_MAP = {
  home: 'home',
  services: 'services',
  'studio-os': 'studio',
  entertainment: 'studio',
  'kids-world': 'kids-world',
  portfolio: 'portfolio',
  'about-us': 'default',
  contact: 'default',
};

function resolveVideoName(videoName) {
  if (!videoName || typeof videoName !== 'string') return 'default';
  return VIDEO_MAP[videoName] || 'default';
}

export default function CinematicBackgroundVideo({ videoName }) {
  const [hasVideoError, setHasVideoError] = useState(false);

  const resolvedVideoName = useMemo(() => resolveVideoName(videoName), [videoName]);
  const videoSrc = `/videos/backgrounds/${resolvedVideoName}.mp4`;
  const shellClassName = [
    'cinematic-bg-shell',
    `cinematic-bg-${resolvedVideoName}`,
    hasVideoError ? 'cinematic-bg-shell-fallback' : '',
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    setHasVideoError(false);
  }, [videoSrc]);

  return (
    <div className={shellClassName} aria-hidden="true">
      {!hasVideoError && (
        <video
          key={videoSrc}
          className="cinematic-bg-video"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setHasVideoError(true)}
        />
      )}

      <div className="cinematic-bg-dark" />
      <div className="cinematic-bg-fx" />
      <div className="cinematic-bg-fog" />
    </div>
  );
}
