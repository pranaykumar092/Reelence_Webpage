import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
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

  const goTo = (href) => {
    window.location.hash = href;
    window.dispatchEvent(new CustomEvent("reelence:navigate", { detail: href.replace("#", "") }));
    setOpen(false);
  };

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
          {navItems.map((item) => (
            <button key={item.label} onClick={() => goTo(item.href)}>
              {item.label}
            </button>
          ))}
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
