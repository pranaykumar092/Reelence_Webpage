import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
