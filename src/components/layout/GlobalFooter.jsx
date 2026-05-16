import { useState } from "react";
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
      ["Phone", "+33 7 68 88 76 64", Phone],
    ],
  },
  social: {
    eyebrow: "Social Handles",
    title: "Follow Reelence",
    rows: [
      ["YouTube", "https://www.youtube.com/@reelence", Youtube],
      ["Instagram", "https://www.instagram.com/reelence2025/", Instagram],
      ["LinkedIn", "https://www.linkedin.com/company/reelence/", Linkedin],
      ["X", "https://x.com/reelence", X],
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
                    <div className="rf-value">
                      {typeof value === "string" && value.startsWith("http") ? (
                        <a href={value} target="_blank" rel="noopener noreferrer" className="rf-link">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </div>
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
