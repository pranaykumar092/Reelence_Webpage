'use client';

/**
 * LeaderAvatar.js — Client Component
 * Handles the onError fallback for founder images.
 * Isolated here because event handlers can't be used in Server Components.
 */
export default function LeaderAvatar({ src, name }) {
  return (
    <div className="leader-avatar">
      <img
        src={src}
        alt={name}
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    </div>
  );
}
