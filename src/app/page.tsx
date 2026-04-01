'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';

/* ═══════════════════════════════
   NAVBAR
   ═══════════════════════════════ */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = useCallback((href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px, 4vw, 60px)',
        background: scrolled ? 'rgba(15,25,35,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(249,158,11,0.08)' : '1px solid transparent',
        transition: 'all 0.5s ease',
      }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 600, letterSpacing: '0.08em', color: '#f59e0b' }}>
            ELİT
          </span>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 400, letterSpacing: '0.08em', color: '#e8e0d4', marginLeft: 6 }}>
            YAPI
          </span>
        </button>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 36 }}>
          {['Hakkımızda', 'Hizmetler', 'Projeler', 'İletişim'].map((l) => (
            <button key={l} onClick={() => go('#' + l.toLowerCase().replace(/ı/g,'i').replace(/ü/g,'u'))} style={{
              fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: scrolled ? '#7a8a98' : 'rgba(232,224,212,0.5)',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px 0', transition: 'color 0.4s ease',
              fontFamily: '-apple-system, sans-serif', fontWeight: 400,
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#f59e0b'; }}
              onMouseLeave={e => { e.currentTarget.style.color = scrolled ? '#7a8a98' : 'rgba(232,224,212,0.5)'; }}
            >
              {l}
            </button>
          ))}
          <button style={{
            fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
            background: '#f59e0b', color: '#0f1923', border: 'none', cursor: 'pointer',
            padding: '10px 22px', fontWeight: 600, fontFamily: '-apple-system, sans-serif',
            transition: 'all 0.3s ease', borderRadius: 0,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fbbf24'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f59e0b'; }}
          >
            Teklif Al
          </button>
        </div>

        <button onClick={() => setOpen(true)} className="md:hidden" style={{
          background: 'none', border: 'none', cursor: 'pointer', color: '#e8e0d4', padding: 8,
        }}>
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div onClick={() => setOpen(false)} style={{
        position: 'fixed', inset: 0, zIndex: 200, background: '#0f1923',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 0.5s ease',
      }}>
        <button onClick={() => setOpen(false)} style={{
          position: 'absolute', top: 20, right: 24, background: 'none', border: 'none',
          cursor: 'pointer', color: '#7a8a98', padding: 8,
        }}>
          <X size={28} strokeWidth={1.5} />
        </button>
        {['Hakkımızda', 'Hizmetler', 'Projeler', 'İletişim'].map((l) => (
          <button key={l} onClick={e => { e.stopPropagation(); setOpen(false); }} style={{
            fontSize: 22, letterSpacing: '0.2em', textTransform: 'uppercase' as const,
            color: '#7a8a98', background: 'none', border: 'none', cursor: 'pointer',
            padding: '10px 0', fontWeight: 400, fontFamily: 'Georgia, serif', transition: 'color 0.3s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f59e0b'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#7a8a98'; }}
          >
            {l}
          </button>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════
   HERO
   ═══════════════════════════════ */
function Hero() {
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>

      {/* ─── Top color band ─── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 4, zIndex: 50,
        background: 'linear-gradient(90deg, #f59e0b, #dc6843, #2dd4a0, #3b82f6)',
      }} />

      {/* ─── Background: colorful gradient ─── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 20% 80%, rgba(249,158,11,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 80% 20%, rgba(45,212,160,0.05) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 50% 50%, rgba(59,130,246,0.03) 0%, transparent 60%),
          #0f1923
        `,
      }} />

      {/* ─── Decorative geometric shapes ─── */}
      <div style={{
        position: 'absolute', top: '15%', right: '8%', width: 200, height: 200,
        border: '1px solid rgba(249,158,11,0.06)', borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', bottom: '25%', left: '5%', width: 120, height: 120,
        border: '1px solid rgba(45,212,160,0.06)',
        transform: 'rotate(45deg)', animation: 'float 10s ease-in-out infinite reverse', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '30%', width: 80, height: 80,
        border: '1px solid rgba(220,104,67,0.04)', borderRadius: '50%',
        animation: 'pulse-soft 6s ease-in-out infinite', zIndex: 1,
      }} />

      {/* ─── Main content ─── */}
      <div style={{
        position: 'relative', zIndex: 10, height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 clamp(24px, 5vw, 80px)', maxWidth: 1400, margin: '0 auto',
      }}>

        {/* Top row: label + year */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 24,
          marginBottom: 48, flexWrap: 'wrap',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 16px', borderRadius: 2,
            background: 'rgba(249,158,11,0.08)',
            border: '1px solid rgba(249,158,11,0.15)',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{
              fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase',
              color: '#f59e0b', fontFamily: '-apple-system, sans-serif', fontWeight: 500,
            }}>
              Est. 2000 — İstanbul
            </span>
          </div>
          <span style={{
            fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#3d5a6e', fontFamily: '-apple-system, sans-serif',
          }}>
            25 Yıllık Tecrübe
          </span>
        </div>

        {/* Main layout: text left + image right */}
        <div style={{ display: 'flex', gap: 'clamp(24px, 5vw, 80px)', alignItems: 'center' }}>
          {/* Text side */}
          <div style={{ flex: '1 1 55%', maxWidth: 700 }}>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
              fontWeight: 400, lineHeight: 1.1,
              color: '#e8e0d4', marginBottom: 36,
              letterSpacing: '-0.01em',
            }}>
              Geleceği{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#f59e0b' }}>
                İnşa
              </span>
              <br />
              <span style={{
                fontWeight: 300,
                background: 'linear-gradient(135deg, #2dd4a0, #3b82f6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Ediyoruz
              </span>
            </h1>

            <p style={{
              fontSize: 16, lineHeight: 1.85, color: '#6b7f8e', fontWeight: 300,
              maxWidth: 420, marginBottom: 48,
              fontFamily: '-apple-system, sans-serif',
            }}>
              İstanbul&apos;da lüks konut, ticari yapı ve restorasyon projelerinde
              sektörün lideri olarak hayalinizdeki mekanları hayata geçiriyoruz.
            </p>

            {/* CTA buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center' }}>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 32px', background: '#f59e0b',
                color: '#0f1923', fontSize: 12, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                border: 'none', cursor: 'pointer',
                fontFamily: '-apple-system, sans-serif',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fbbf24'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(249,158,11,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f59e0b'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                Projelerimiz
                <ArrowRight size={15} />
              </button>

              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 32px',
                border: '1px solid rgba(45,212,160,0.3)',
                color: '#2dd4a0', fontSize: 12, fontWeight: 400,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                background: 'rgba(45,212,160,0.05)', cursor: 'pointer',
                fontFamily: '-apple-system, sans-serif',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(45,212,160,0.6)'; e.currentTarget.style.background = 'rgba(45,212,160,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(45,212,160,0.3)'; e.currentTarget.style.background = 'rgba(45,212,160,0.05)'; }}
              >
                İletişim
              </button>
            </div>
          </div>

          {/* Image side */}
          <div style={{
            flex: '1 1 40%', display: 'flex', justifyContent: 'center',
          }}>
            <div className="hidden md:block" style={{
              position: 'relative', width: '100%', maxWidth: 440,
              aspectRatio: '3/4', borderRadius: 4, overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
            }}>
              <Image src="/images/construction/hero.png" alt="ELİT YAPI" fill unoptimized priority
                style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
              {/* Color overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(249,158,11,0.08) 0%, transparent 30%, transparent 60%, rgba(15,25,35,0.5) 100%)',
              }} />
              {/* Bottom tag on image */}
              <div style={{
                position: 'absolute', bottom: 20, left: 20, right: 20,
                padding: '16px 20px', background: 'rgba(15,25,35,0.85)',
                backdropFilter: 'blur(12px)', borderRadius: 2,
                borderLeft: '3px solid #f59e0b',
              }}>
                <div style={{
                  fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#f59e0b', fontFamily: '-apple-system, sans-serif', marginBottom: 4,
                }}>
                  Öne Çıkan
                </div>
                <div style={{
                  fontSize: 15, color: '#e8e0d4', fontFamily: 'Georgia, serif', fontWeight: 400,
                }}>
                  Vista Premium Konutları
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom stats bar ─── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        borderTop: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(15,25,35,0.5)',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto', padding: '0 clamp(24px, 4vw, 80px)',
          height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {[
            { num: '25+', label: 'Yıl', color: '#f59e0b' },
            { num: '200+', label: 'Proje', color: '#2dd4a0' },
            { num: '₺2B+', label: 'Değer', color: '#dc6843' },
            { num: '%98', label: 'Memnuniyet', color: '#3b82f6' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{
                fontSize: 22, fontWeight: 400, color: s.color,
                fontFamily: 'Georgia, serif',
              }}>
                {s.num}
              </span>
              <span style={{
                fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#4a5e6e', fontFamily: '-apple-system, sans-serif',
              }}>
                {s.label}
              </span>
            </div>
          ))}

          {/* Mobile: hide extra items */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 16 }}>
            <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.06)' }} />
            <span style={{
              fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#3d5a6e', fontFamily: '-apple-system, sans-serif',
            }}>
              Scroll to explore
            </span>
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              border: '1px solid rgba(249,158,11,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 3, height: 8, borderRadius: 2, background: '#f59e0b', opacity: 0.6 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   FOOTER
   ═══════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      marginTop: 'auto', padding: '32px clamp(20px, 4vw, 60px)',
      borderTop: '1px solid rgba(255,255,255,0.04)',
    }}>
      <p style={{ textAlign: 'center', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2a3a48' }}>
        © 2025 <span style={{ color: '#f59e0b' }}>ELİT YAPI</span> — Tüm hakları saklıdır.
      </p>
    </footer>
  );
}

/* ═══════════════════════════════
   PAGE
   ═══════════════════════════════ */
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
}
