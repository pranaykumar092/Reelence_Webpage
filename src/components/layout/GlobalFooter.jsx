import { useState } from "react";
import {
<<<<<<< HEAD
  Facebook,
=======
  AtSign,
  Copyright,
  Facebook,
  FileText,
>>>>>>> origin/Sunil-branch
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
<<<<<<< HEAD
  Handshake,
  X,
  Youtube,
} from "lucide-react";

const infoCards = {
  bangalore: {
    type: "office",
    title: "Bangalore Contact",
    subtitle: "Primary India contact point",
    address: "Reelence Digital Studios, Bangalore, Karnataka, India",
    email1: "sales@reelence.com",
    email2: "consulting@reelence.com",
    phone: "+91 9886669814",
  },
  paris: {
    type: "collaboration",
    title: "Paris Collaboration",
    subtitle: "European innovation collaboration",
    collaboration:
      "Reelence collaborates with Scientists AI and Robotics, Paris and Shaktinova, Paris for AI, robotics, creative technology, and future-facing innovation initiatives.",
    email1: "sales@reelence.com",
    email2: "consulting@reelence.com",
    phone: "+91 9886669814",
  },
};

export default function GlobalFooter() {
  const [activeCard, setActiveCard] = useState(null);
  const card = activeCard ? infoCards[activeCard] : null;

  return (
    <>
      <footer className="reelence-global-footer">
        <div className="reelence-footer-left">
          <strong>REELENCE</strong>
          <span>AI-powered cinematic storytelling and enterprise creative innovation.</span>
        </div>

        <div className="reelence-footer-center">
          <a href="#home">Home</a>
          <a href="#studio-os">Studio OS</a>
          <a href="#entertainment">Entertainment</a>
          <a href="#kids-world">Kids + Learning</a>
          <a href="#portfolio">Showcase</a>
          <a href="#about-us">About</a>
        </div>

        <div className="reelence-footer-right">
          <button onClick={() => setActiveCard("bangalore")}>Bangalore</button>
          <button onClick={() => setActiveCard("paris")}>Paris Collaboration</button>

          <div className="reelence-socials" aria-label="Social media placeholders">
            <Youtube size={17} />
            <Instagram size={17} />
            <Linkedin size={17} />
            <Facebook size={17} />
          </div>
        </div>
      </footer>

      <div className="reelence-bottom-bar" role="contentinfo">
        <div className="reelence-bottom-left">Paris collaboration</div>

        <div className="reelence-bottom-center">Contact us = Bangalore</div>

        <div className="reelence-bottom-right" aria-label="Social links">
          <a className="social-btn" href="#" aria-label="YouTube">
            <Youtube size={16} />
          </a>
          <a className="social-btn" href="#" aria-label="Instagram">
            <Instagram size={16} />
          </a>
          <a className="social-btn" href="#" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a className="social-btn" href="#" aria-label="Facebook">
            <Facebook size={16} />
          </a>
        </div>
      </div>

      {card && (
        <div className="reelence-office-backdrop" onClick={() => setActiveCard(null)}>
          <div className="reelence-office-modal" onClick={(event) => event.stopPropagation()}>
            <button className="reelence-office-close" onClick={() => setActiveCard(null)}>
              <X size={18} />
            </button>

            <div className="reelence-office-kicker">
              {card.type === "office" ? "India Presence" : "Global Collaboration"}
            </div>

            <h2>{card.title}</h2>
            <p className="reelence-office-subtitle">{card.subtitle}</p>

            {card.type === "office" ? (
              <div className="reelence-office-row">
                <MapPin size={18} />
                <span>{card.address}</span>
              </div>
            ) : (
              <div className="reelence-office-row">
                <Handshake size={18} />
                <span>{card.collaboration}</span>
              </div>
            )}

            <div className="reelence-office-row">
              <Mail size={18} />
              <span>{card.email1}</span>
            </div>

            <div className="reelence-office-row">
              <Mail size={18} />
              <span>{card.email2}</span>
            </div>

            <div className="reelence-office-row">
              <Phone size={18} />
              <span>{card.phone}</span>
=======
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
>>>>>>> origin/Sunil-branch
            </div>
          </div>
        </div>
      )}
    </>
  );
}
