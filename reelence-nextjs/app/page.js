/**
 * page.js — Main Landing Page (Server Component)
 *
 * All 8 sections migrated from the original ReelenceImmersiveScreen.jsx.
 * Data is imported from /app/data/siteData.js.
 * Client-side widgets (TimecodeHUD, ReelProgress, RevealSection) are
 * isolated into their own "use client" sub-components.
 */

import ReelProgress from '@/app/components/ReelProgress';
import RevealSection from '@/app/components/RevealSection';
import LeaderAvatar from '@/app/components/LeaderAvatar';
import { sections, leaders, kidsWorldCards, kidsWorldHighlights } from '@/app/data/siteData';

/* ─── Helpers ───────────────────────────────────────────────────── */
function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`page-section ${className}`.trim()}>
      {children}
    </section>
  );
}

function Eyebrow({ children }) {
  return <RevealSection tag="div" className="section-eyebrow">{children}</RevealSection>;
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <ReelProgress />

      {sections.map((section, sIdx) => {
        /* ── HOME ── */
        if (section.id === 'home') return (
          <Section key={section.id} id="home" className="hero-section">
            <div className="wrap">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <RevealSection tag="h1" className="hero-title reveal-delay-1">
                {section.title}
              </RevealSection>
              <RevealSection tag="p" className="hero-desc reveal-delay-2">
                {section.description}
              </RevealSection>
              <RevealSection tag="div" className="hero-actions reveal-delay-3">
                <a href="#services" className="btn-primary">{section.cta}</a>
                <a href="#contact" className="btn-secondary">{section.secondaryCta}</a>
              </RevealSection>
              <RevealSection tag="div" className="hero-stats reveal-delay-4">
                {section.stats.map((s, i) => (
                  <div key={i} className="hero-stat-pill">{s}</div>
                ))}
              </RevealSection>
              {section.features && (
                <div className="features-grid">
                  {section.features.map((f, i) => (
                    <RevealSection key={i} tag="div" className={`feature-card reveal-delay-${i % 4}`}>
                      <h3>{f.title}</h3>
                      <p>{f.detail}</p>
                    </RevealSection>
                  ))}
                </div>
              )}
            </div>
          </Section>
        );

        /* ── CREATIVE STUDIO / SERVICES ── */
        if (section.id === 'services') return (
          <Section key={section.id} id="services" className="services-section">
            <div className="wrap">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <RevealSection tag="h2" className="section-title reveal-delay-1">{section.title}</RevealSection>
              <RevealSection tag="p" className="section-desc reveal-delay-2">{section.description}</RevealSection>

              {section.serviceCards && (
                <div className="service-cards-grid">
                  {section.serviceCards.map((card, i) => (
                    <RevealSection key={i} tag="div" className={`service-card reveal-delay-${i % 4}`}>
                      <h3>{card.title}</h3>
                      <p>{card.summary}</p>
                      <div className="service-card-includes">
                        <span className="includes-label">Includes: </span>{card.includes}
                      </div>
                    </RevealSection>
                  ))}
                </div>
              )}

              {section.whyChoose && (
                <RevealSection tag="div" className="why-choose-row">
                  <h3>Why Reelence?</h3>
                  <div className="why-chips">
                    {section.whyChoose.map((w, i) => <span key={i} className="why-chip">{w}</span>)}
                  </div>
                </RevealSection>
              )}

              {section.bottomCta && (
                <RevealSection tag="div" className="section-bottom-cta">
                  <h3>{section.bottomCta.title}</h3>
                  <p>{section.bottomCta.text}</p>
                  <div className="cta-row">
                    <a href="#contact" className="btn-primary">{section.bottomCta.primary}</a>
                    <a href="#contact" className="btn-secondary">{section.bottomCta.secondary}</a>
                  </div>
                </RevealSection>
              )}
            </div>
          </Section>
        );

        /* ── STUDIO OS ── */
        if (section.id === 'studio-os') return (
          <Section key={section.id} id="studio-os">
            <div className="wrap">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <RevealSection tag="h2" className="section-title reveal-delay-1">{section.title}</RevealSection>
              <RevealSection tag="p" className="section-desc reveal-delay-2">{section.description}</RevealSection>
              <RevealSection tag="div" className="section-actions reveal-delay-3">
                <a href="#contact" className="btn-primary">{section.cta}</a>
                {section.secondaryCta && <a href="#contact" className="btn-secondary">{section.secondaryCta}</a>}
              </RevealSection>
              {section.features && (
                <div className="filmstrip">
                  {section.features.map((f, i) => (
                    <RevealSection key={i} tag="div" className={`frame reveal-delay-${i % 4}`}>
                      <div className="fnum">FRAME {String(i + 1).padStart(2, '0')}</div>
                      <div>
                        <h3 className="display">{f.title}</h3>
                        <p>{f.detail}</p>
                      </div>
                    </RevealSection>
                  ))}
                </div>
              )}
            </div>
          </Section>
        );

        /* ── ENTERTAINMENT ── */
        if (section.id === 'entertainment') return (
          <Section key={section.id} id="entertainment">
            <div className="wrap">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <RevealSection tag="h2" className="section-title reveal-delay-1">{section.title}</RevealSection>
              <RevealSection tag="p" className="section-desc reveal-delay-2">{section.description}</RevealSection>
              <RevealSection tag="div" className="section-actions reveal-delay-3">
                <a href="#contact" className="btn-primary">{section.cta}</a>
                {section.secondaryCta && <a href="#contact" className="btn-secondary">{section.secondaryCta}</a>}
              </RevealSection>
              {section.features && (
                <div className="features-grid">
                  {section.features.map((f, i) => (
                    <RevealSection key={i} tag="div" className={`feature-card reveal-delay-${i % 4}`}>
                      <h3>{f.title}</h3>
                      <p>{f.detail}</p>
                    </RevealSection>
                  ))}
                </div>
              )}
            </div>
          </Section>
        );

        /* ── KIDS WORLD ── */
        if (section.id === 'kids-world') return (
          <Section key={section.id} id="kids-world" className="kids-section">
            <div className="wrap">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <RevealSection tag="h2" className="section-title reveal-delay-1">{section.title}</RevealSection>
              <RevealSection tag="p" className="section-desc reveal-delay-2">{section.description}</RevealSection>
              <RevealSection tag="div" className="section-actions reveal-delay-3">
                <a href="#contact" className="btn-primary">{section.cta}</a>
                {section.secondaryCta && <a href="#contact" className="btn-secondary">{section.secondaryCta}</a>}
              </RevealSection>
              <RevealSection tag="div" className="kids-highlights">
                {kidsWorldHighlights.map((h, i) => <span key={i} className="kids-highlight-pill">{h}</span>)}
              </RevealSection>
              <div className="kids-cards-grid">
                {kidsWorldCards.map((card, i) => (
                  <RevealSection key={i} tag="div" className={`kids-card reveal-delay-${i % 4}`}>
                    <h3>{card.title}</h3>
                    <p>{card.summary}</p>
                    <ul className="kids-benefits">
                      {card.benefits.map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                  </RevealSection>
                ))}
              </div>
            </div>
          </Section>
        );

        /* ── PORTFOLIO / SHOWCASE ── */
        if (section.id === 'portfolio') return (
          <Section key={section.id} id="portfolio">
            <div className="wrap">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <RevealSection tag="h2" className="section-title reveal-delay-1">{section.title}</RevealSection>
              <RevealSection tag="p" className="section-desc reveal-delay-2">{section.description}</RevealSection>
              {section.showcaseCards && (
                <div className="showcase-grid">
                  {section.showcaseCards.map((card, i) => (
                    <RevealSection key={i} tag="div" className={`showcase-card reveal-delay-${i % 4}`}>
                      <div className="showcase-card-inner">
                        <div className="showcase-num">0{i + 1}</div>
                        <div className="showcase-title">{card}</div>
                      </div>
                    </RevealSection>
                  ))}
                </div>
              )}
              <RevealSection tag="div" className="section-actions">
                <a href="#contact" className="btn-primary">{section.cta}</a>
                {section.secondaryCta && <a href="#contact" className="btn-secondary">{section.secondaryCta}</a>}
              </RevealSection>
            </div>
          </Section>
        );

        /* ── ABOUT US ── */
        if (section.id === 'about-us') return (
          <Section key={section.id} id="about-us" className="about-section">
            <div className="wrap">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <RevealSection tag="h2" className="section-title reveal-delay-1">{section.title}</RevealSection>
              <RevealSection tag="p" className="section-desc reveal-delay-2">{section.description}</RevealSection>

              {/* Mission */}
              {section.mission && (
                <RevealSection tag="div" className="about-block">
                  <h3>{section.mission.title}</h3>
                  <p>{section.mission.text}</p>
                  <ul className="about-points">
                    {section.mission.points.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                </RevealSection>
              )}

              {/* Vision */}
              {section.vision && (
                <RevealSection tag="div" className="about-block">
                  <h3>{section.vision.title}</h3>
                  <p>{section.vision.text}</p>
                  <div className="vision-cards">
                    {section.vision.cards.map((c, i) => <span key={i} className="vision-card">{c}</span>)}
                  </div>
                </RevealSection>
              )}

              {/* Collaboration */}
              {section.collaboration && (
                <RevealSection tag="div" className="about-block">
                  <h3>{section.collaboration.title}</h3>
                  <p>{section.collaboration.text}</p>
                  <div className="collab-chips">
                    {section.collaboration.chips.map((c, i) => <span key={i} className="collab-chip">{c}</span>)}
                  </div>
                </RevealSection>
              )}

              {/* Leaders grid */}
              <RevealSection tag="h3" className="leaders-heading">Meet the Founders</RevealSection>
              <div className="leaders-grid">
                {leaders.map((leader, i) => (
                  <RevealSection key={i} tag="div" className={`leader-card reveal-delay-${i % 4}`}>
                    <LeaderAvatar src={leader.image} name={leader.name} />
                    <div className="leader-badge">{leader.badge}</div>
                    <div className="leader-name">{leader.name}</div>
                    <div className="leader-role">{leader.role}</div>
                    <p className="leader-bio">{leader.bio}</p>
                  </RevealSection>
                ))}
              </div>

              {/* Final CTA */}
              {section.finalCta && (
                <RevealSection tag="div" className="final-cta-block">
                  <h3>{section.finalCta.title}</h3>
                  <p>{section.finalCta.description}</p>
                  <div className="cta-row">
                    <a href="#contact" className="btn-primary">{section.finalCta.primary}</a>
                    <a href="#contact" className="btn-secondary">{section.finalCta.secondary}</a>
                  </div>
                </RevealSection>
              )}
            </div>
          </Section>
        );

        /* ── CONTACT ── */
        if (section.id === 'contact') return (
          <Section key={section.id} id="contact" className="contact-section">
            <div className="wrap">
              <Eyebrow>{section.eyebrow}</Eyebrow>
              <RevealSection tag="h2" className="section-title contact-title reveal-delay-1">{section.title}</RevealSection>
              <RevealSection tag="p" className="section-desc reveal-delay-2">{section.description}</RevealSection>
              <RevealSection tag="div" className="hero-stats reveal-delay-3">
                {section.stats.map((s, i) => <div key={i} className="hero-stat-pill">{s}</div>)}
              </RevealSection>
              <RevealSection tag="div" className="section-actions reveal-delay-4">
                <a href="mailto:sales@reelence.com" className="btn-primary">{section.cta}</a>
                {section.secondaryCta && <a href="#" className="btn-secondary">{section.secondaryCta}</a>}
              </RevealSection>
            </div>
          </Section>
        );

        return null;
      })}
    </>
  );
}
