/**
 * GlobalFooter.js — "use client"
 * Full cinematic footer matching the site's dark aesthetic.
 * Replaces the floating bubble strip with a proper site footer:
 * Brand | Navigation | Contact | Legal + Copyright bar.
 */

'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, X, ArrowUpRight } from 'lucide-react';

const footerNav = [
  { heading: 'Studio', links: ['Creative Studio', 'Studio OS', 'Entertainment', 'Kids + Learning'] },
  { heading: 'Company', links: ['About Us', 'Showcase', 'Contact', 'Collaborate'] },
  { heading: 'Legal', links: ['Privacy Policy', 'Terms of Use', 'Cookie Policy'] },
];

const contactRows = [
  { icon: MapPin, label: 'Bangalore', value: 'Electronic City Phase 1, Karnataka, India' },
  { icon: Phone, label: 'Phone', value: '+91 9886669814  ·  +91 9953793025' },
  { icon: Mail, label: 'Email', value: 'sales@reelence.com' },
];

const socialLinks = [
  { label: 'YouTube', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Facebook', href: '#' },
];

export default function GlobalFooter() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* ─── Main Footer ──────────────────────────────── */}
      <footer className="site-footer" aria-label="Site footer">
        <div className="site-footer-inner">

          {/* Brand column */}
          <div className="footer-brand-col">
            <div className="footer-logo-row">
              <div className="footer-logo-box">R</div>
              <div>
                <div className="footer-brand-name">REELENCE</div>
                <div className="footer-brand-sub">Essence of the Reels</div>
              </div>
            </div>
            <p className="footer-brand-desc">
              A premium AI filmmaking and creative technology ecosystem — building cinematic content, Studio OS intelligence, and OTT-ready entertainment IP.
            </p>
            <div className="footer-social-row">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} className="footer-social-pill" aria-label={s.label}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.heading} className="footer-nav-col">
              <div className="footer-col-heading">{col.heading}</div>
              <ul className="footer-link-list">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="footer-contact-col">
            <div className="footer-col-heading">Contact</div>
            <div className="footer-contact-list">
              {contactRows.map(({ icon: Icon, label, value }) => (
                <div key={label} className="footer-contact-row">
                  <div className="footer-contact-icon">
                    <Icon size={14} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="footer-contact-label">{label}</div>
                    <div className="footer-contact-value">{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <a href="mailto:sales@reelence.com" className="footer-cta-btn">
              Start a Conversation <ArrowUpRight size={14} />
            </a>
          </div>

        </div>

        {/* ─── Bottom bar ───────────────────────────────── */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-inner">
            <div className="footer-copyright">
              © 2026 Reelence Digital Studios PVT LTD. All rights reserved.
            </div>
            <div className="footer-bottom-links">
              <span className="footer-bottom-badge">Paris Collaboration 🗼</span>
              <a href="#" className="footer-bottom-link">consulting@reelence.com</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
