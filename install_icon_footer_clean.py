from pathlib import Path

ROOT = Path.cwd()
FOOTER = ROOT / "src" / "components" / "layout" / "GlobalFooter.jsx"
FOOTER_CSS = ROOT / "src" / "components" / "layout" / "GlobalFooter.css"

footer_jsx = r'''import { useState } from "react";
import {
  AtSign,
  Copyright,
  Facebook,
  FileText,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Share2,
  X,
  Youtube,
} from "lucide-react";
import "./GlobalFooter.css";

const panels = {
  contact: {
    eyebrow: "Company Contact",
    title: "Reelence Digital Studios PVT LTD",
    rows: [
      ["Registered Address", "#195, 6th Cross, Celebrity Paradise, Doddathugur, Electronic City Phase 1, Bangalore - 560100, Karnataka, India", MapPin],
      ["Phone", "+91 9886669814  |  +91 9953793025", Phone],
      ["Business Email", "sales@reelence.com", Mail],
    ],
  },
  email: {
    eyebrow: "Email Desk",
    title: "Reach Reelence",
    rows: [
      ["Business Queries", "sales@reelence.com", Mail],
      ["Consulting & Partnerships", "consulting@reelence.com", Mail],
    ],
  },
  paris: {
    eyebrow: "European Innovation Collaboration",
    title: "Paris Collaboration",
    rows: [
      ["Collaboration", "Reelence collaborates with Scientists AI and Robotics, Paris and Shaktinova, Paris for AI, robotics, creative technology, and future-facing innovation initiatives.", MapPin],
      ["Email", "sales@reelence.com  |  consulting@reelence.com", Mail],
      ["Phone", "+91 9886669814", Phone],
    ],
  },
  social: {
    eyebrow: "Social Handles",
    title: "Follow Reelence",
    rows: [
      ["YouTube", "Placeholder link", Youtube],
      ["Instagram", "Placeholder link", Instagram],
      ["LinkedIn", "Placeholder link", Linkedin],
      ["Facebook", "Placeholder link", Facebook],
    ],
  },
  legal: {
    eyebrow: "Legal",
    title: "Policies & Compliance",
    rows: [
      ["Privacy Policy", "Coming soon", FileText],
      ["Terms of Use", "Coming soon", FileText],
      ["Cookie Policy", "Coming soon", FileText],
    ],
  },
  copyright: {
    eyebrow: "Copyright",
    title: "Reelence Rights",
    rows: [
      ["Notice", "© 2026 Reelence Digital Studios PVT LTD. All rights reserved.", Copyright],
    ],
  },
};

const icons = [
  ["contact", "Contact", Phone],
  ["email", "Email", AtSign],
  ["paris", "Paris Collaboration", null, "🗼"],
  ["social", "Social", Share2],
  ["legal", "Legal", FileText],
  ["copyright", "Copyright", Copyright],
];

export default function GlobalFooter() {
  const [active, setActive] = useState(null);
  const panel = active ? panels[active] : null;

  return (
    <>
      <footer className="rf-icon-footer">
        {icons.map(([id, label, Icon, emoji]) => (
          <button
            key={id}
            className="rf-icon-btn"
            onClick={() => setActive(id)}
            aria-label={label}
            title={label}
          >
            {emoji ? <span className="rf-emoji">{emoji}</span> : <Icon size={18} strokeWidth={1.8} />}
          </button>
        ))}
      </footer>

      {panel && (
        <div className="rf-modal-backdrop" onClick={() => setActive(null)}>
          <div className="rf-modal" onClick={(e) => e.stopPropagation()}>
            <button className="rf-close" onClick={() => setActive(null)}>
              <X size={18} />
            </button>

            <div className="rf-eyebrow">{panel.eyebrow}</div>
            <h2>{panel.title}</h2>

            <div className="rf-rows">
              {panel.rows.map(([label, value, Icon]) => (
                <div className="rf-row" key={label}>
                  <div className="rf-row-icon">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="rf-label">{label}</div>
                    <div className="rf-value">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
'''

footer_css = r'''/* Reelence Icon Only Footer - isolated CSS */

.rf-icon-footer {
  position: fixed;
  left: 50%;
  bottom: 18px;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transform: translateX(-50%);
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.14);
  background:
    linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.018)),
    rgba(3, 7, 15, 0.42);
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.12),
    inset 0 -18px 34px rgba(0,0,0,0.25),
    0 24px 80px rgba(0,0,0,0.45);
}

.rf-icon-btn {
  display: grid;
  place-items: center;
  width: 43px;
  height: 43px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.095);
  color: rgba(235,247,255,0.78);
  background:
    radial-gradient(circle at 34% 20%, rgba(255,255,255,0.13), transparent 28%),
    linear-gradient(145deg, rgba(255,255,255,0.065), rgba(255,255,255,0.015));
  box-shadow:
    inset 2px 2px 5px rgba(255,255,255,0.08),
    inset -7px -9px 15px rgba(0,0,0,0.34),
    0 8px 20px rgba(0,0,0,0.24);
  cursor: pointer;
  transition: 0.24s ease;
}

.rf-icon-btn svg,
.rf-emoji {
  opacity: 0.86;
  filter:
    drop-shadow(1px 1px 0 rgba(255,255,255,0.12))
    drop-shadow(-1px -1px 0 rgba(0,0,0,0.5));
}

.rf-emoji {
  font-size: 17px;
  line-height: 1;
}

.rf-icon-btn:hover {
  color: #9eeeff;
  transform: translateY(-3px);
  border-color: rgba(158,238,255,0.42);
  box-shadow:
    inset 2px 2px 5px rgba(255,255,255,0.13),
    inset -7px -9px 16px rgba(0,0,0,0.36),
    0 0 24px rgba(104,231,255,0.24),
    0 18px 42px rgba(0,0,0,0.36);
}

.rf-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(0,0,0,0.58);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.rf-modal {
  position: relative;
  width: min(620px, 92vw);
  padding: 32px;
  border-radius: 30px;
  border: 1px solid rgba(255,255,255,0.16);
  color: #fff;
  background:
    radial-gradient(circle at 20% 0%, rgba(104,231,255,0.16), transparent 36%),
    radial-gradient(circle at 85% 25%, rgba(255,45,45,0.11), transparent 34%),
    linear-gradient(180deg, rgba(13,21,35,0.94), rgba(4,8,16,0.96));
  box-shadow: 0 38px 120px rgba(0,0,0,0.62);
}

.rf-close {
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  place-items: center;
  width: 39px;
  height: 39px;
  border-radius: 15px;
  border: 1px solid rgba(255,255,255,0.13);
  color: #fff;
  background: rgba(255,255,255,0.08);
  cursor: pointer;
}

.rf-eyebrow {
  margin-bottom: 9px;
  color: #9eeeff;
  font-size: 11px;
  font-weight: 950;
  letter-spacing: 0.26em;
  text-transform: uppercase;
}

.rf-modal h2 {
  margin: 0 44px 22px 0;
  font-size: clamp(28px, 4vw, 42px);
  letter-spacing: -0.045em;
}

.rf-rows {
  display: grid;
  gap: 13px;
}

.rf-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 13px;
  padding: 15px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.105);
  background: rgba(255,255,255,0.055);
}

.rf-row-icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 14px;
  color: #9eeeff;
  background: rgba(158,238,255,0.08);
}

.rf-label {
  margin-bottom: 4px;
  color: rgba(255,255,255,0.56);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.rf-value {
  color: rgba(255,255,255,0.84);
  font-size: 14px;
  line-height: 1.45;
}

@media (max-width: 640px) {
  .rf-icon-footer {
    bottom: 10px;
    width: calc(100vw - 24px);
    gap: 8px;
    padding: 9px;
  }

  .rf-icon-btn {
    width: 40px;
    height: 40px;
  }

  .rf-modal {
    padding: 26px 20px;
  }
}
'''

FOOTER.write_text(footer_jsx, encoding="utf-8")
FOOTER_CSS.write_text(footer_css, encoding="utf-8")

print("DONE: Clean isolated icon footer installed.")
print("Files updated:")
print(FOOTER)
print(FOOTER_CSS)