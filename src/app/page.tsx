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

  const navItems = [
    { label: 'Hakkımızda', href: '#hakkimizda' },
    { label: 'Hizmetler', href: '#hizmetler' },
    { label: 'Projeler', href: '#projeler' },
    { label: 'İletişim', href: '#iletisim' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: scrolled ? 64 : 80,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `0 clamp(20px, 4vw, 64px)`,
        background: scrolled ? 'rgba(12,20,32,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(251,191,36,0.06)' : '1px solid transparent',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Logo mark */}
            <div style={{
              width: 32, height: 32, position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 2,
                border: '2px solid rgba(251,191,36,0.6)',
                transform: 'rotate(45deg)',
                transition: 'all 0.4s ease',
              }} />
              <span style={{
                position: 'absolute', fontSize: 14, fontWeight: 700,
                color: '#fbbf24', fontFamily: 'Georgia, serif', letterSpacing: '-0.02em',
              }}>
                E
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <span style={{
                fontSize: 14, fontWeight: 600, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: '#fbbf24', lineHeight: 1,
              }}>
                ELİT
              </span>
              <span style={{
                fontSize: 10, fontWeight: 400, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#7a8a9a', lineHeight: 1,
              }}>
                YAPI
              </span>
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 32 }}>
          {navItems.map((item) => (
            <button key={item.href} onClick={() => go(item.href)} style={{
              fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: scrolled ? '#6a7a8a' : 'rgba(232,224,212,0.4)',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px 0', transition: 'color 0.4s ease',
              fontFamily: '-apple-system, sans-serif', fontWeight: 400,
              position: 'relative',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fbbf24'; }}
              onMouseLeave={e => { e.currentTarget.style.color = scrolled ? '#6a7a8a' : 'rgba(232,224,212,0.4)'; }}
            >
              {item.label}
            </button>
          ))}
          <button style={{
            fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            color: '#0c1420', border: 'none', cursor: 'pointer',
            padding: '11px 24px', fontWeight: 600, borderRadius: 2,
            fontFamily: '-apple-system, sans-serif',
            transition: 'all 0.3s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(251,191,36,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
          >
            Teklif Al
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(true)} className="md:hidden" style={{
          background: 'none', border: 'none', cursor: 'pointer', color: '#e8e0d4', padding: 8,
        }}>
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div onClick={() => setOpen(false)} style={{
        position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(8,14,22,0.98)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 40,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 0.5s ease',
      }}>
        <button onClick={() => setOpen(false)} style={{
          position: 'absolute', top: 20, right: 24, background: 'none', border: 'none',
          cursor: 'pointer', color: '#5a6a7a', padding: 8,
        }}>
          <X size={28} strokeWidth={1.5} />
        </button>

        {/* Mobile logo */}
        <div style={{
          fontSize: 20, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
          color: '#fbbf24', fontFamily: 'Georgia, serif', marginBottom: 20,
        }}>
          ELİT YAPI
        </div>

        {navItems.map((item) => (
          <button key={item.href} onClick={e => { e.stopPropagation(); setOpen(false); }} style={{
            fontSize: 20, letterSpacing: '0.25em', textTransform: 'uppercase' as const,
            color: '#5a6a7a', background: 'none', border: 'none', cursor: 'pointer',
            padding: '10px 0', fontWeight: 400, fontFamily: 'Georgia, serif',
            transition: 'color 0.3s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fbbf24'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#5a6a7a'; }}
          >
            {item.label}
          </button>
        ))}

        <div style={{ width: 50, height: 1, background: 'rgba(251,191,36,0.15)', marginTop: 10 }} />

        <button onClick={e => { e.stopPropagation(); setOpen(false); }} style={{
          fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
          background: 'transparent', color: '#fbbf24',
          border: '1px solid rgba(251,191,36,0.3)', cursor: 'pointer',
          padding: '12px 28px', fontFamily: '-apple-system, sans-serif',
          transition: 'all 0.3s ease',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,191,36,0.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          Teklif Al
        </button>
      </div>
    </>
  );
}

/* ═══════════════════════════════
   HERO — Colorful Cinematic
   ═══════════════════════════════ */
function Hero() {
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0c1420' }}>

      {/* ─── Top gradient bar ─── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3, zIndex: 60,
        background: 'linear-gradient(90deg, #fbbf24, #f97316, #ef4444, #ec4899, #a855f7, #6366f1, #3b82f6, #06b6d4, #10b981)',
      }} />

      {/* ─── Background layers ─── */}
      {/* Gradient mesh */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 70% 50% at 15% 85%, rgba(251,191,36,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 60% 45% at 85% 15%, rgba(236,72,153,0.04) 0%, transparent 55%),
          radial-gradient(ellipse 50% 40% at 50% 50%, rgba(59,130,246,0.03) 0%, transparent 60%),
          radial-gradient(ellipse 40% 30% at 70% 70%, rgba(16,185,129,0.03) 0%, transparent 50%),
          #0c1420
        `,
      }} />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 70%)',
      }} />

      {/* ─── Decorative shapes ─── */}
      {/* Large circle - top right */}
      <div style={{
        position: 'absolute', top: '8%', right: '5%',
        width: 220, height: 220, borderRadius: '50%',
        border: '1px solid rgba(251,191,36,0.04)',
        animation: 'float-slow 12s ease-in-out infinite',
        zIndex: 1,
      }}>
        <div style={{
          position: 'absolute', inset: 20, borderRadius: '50%',
          border: '1px solid rgba(236,72,153,0.04)',
        }} />
      </div>

      {/* Diamond - bottom left */}
      <div style={{
        position: 'absolute', bottom: '20%', left: '3%',
        width: 100, height: 100,
        border: '1px solid rgba(99,102,241,0.06)',
        transform: 'rotate(45deg)',
        animation: 'float-slow-2 15s ease-in-out infinite',
        zIndex: 1,
      }} />

      {/* Small circle - center left */}
      <div style={{
        position: 'absolute', top: '35%', left: '18%',
        width: 60, height: 60, borderRadius: '50%',
        border: '1px solid rgba(16,185,129,0.06)',
        animation: 'float-slow 10s ease-in-out infinite reverse',
        zIndex: 1,
      }} />

      {/* Tiny dots cluster */}
      <div className="hidden lg:block" style={{
        position: 'absolute', top: '25%', right: '25%',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
        zIndex: 1,
      }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{
            width: 3, height: 3, borderRadius: '50%',
            background: [
              'rgba(251,191,36,0.12)', 'rgba(236,72,153,0.08)', 'rgba(59,130,246,0.08)',
              'rgba(16,185,129,0.1)', 'rgba(249,115,22,0.08)', 'rgba(168,85,247,0.06)',
            ][i % 6],
          }} />
        ))}
      </div>

      {/* ─── Main content ─── */}
      <div style={{
        position: 'relative', zIndex: 10, height: '100%',
        display: 'flex', alignItems: 'center',
        padding: '0 clamp(20px, 5vw, 80px)',
        maxWidth: 1400, margin: '0 auto', width: '100%',
      }}>
        <div style={{
          display: 'flex', gap: 'clamp(24px, 5vw, 80px)',
          alignItems: 'center', width: '100%',
        }}>

          {/* ─── Left: Text ─── */}
          <div style={{ flex: '1 1 55%', maxWidth: 650 }}>

            {/* Tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '8px 16px', marginBottom: 40,
              background: 'rgba(251,191,36,0.06)',
              border: '1px solid rgba(251,191,36,0.12)',
              borderRadius: 2,
            }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%',
                background: '#fbbf24',
                boxShadow: '0 0 8px rgba(251,191,36,0.4)',
              }} />
              <span style={{
                fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
                color: '#fbbf24', fontFamily: '-apple-system, sans-serif', fontWeight: 500,
              }}>
                Premium İnşaat & Mimari
              </span>
            </div>

            {/* Heading */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 400, lineHeight: 1.12,
              color: '#f0ece4', marginBottom: 28,
              letterSpacing: '-0.01em',
            }}>
              Geleceği{' '}
              <span style={{
                fontStyle: 'italic', fontWeight: 300,
                color: '#fbbf24',
                textShadow: '0 0 40px rgba(251,191,36,0.15)',
              }}>
                İnşa
              </span>
              <br />
              <span style={{
                fontWeight: 300,
                background: 'linear-gradient(135deg, #ec4899, #a855f7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Ediyoruz
              </span>
            </h1>

            {/* Decorative line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div style={{ width: 40, height: 2, background: 'linear-gradient(90deg, #fbbf24, transparent)', borderRadius: 1 }} />
              <div style={{ width: 20, height: 2, background: 'linear-gradient(90deg, #ec4899, transparent)', borderRadius: 1 }} />
            </div>

            {/* Body */}
            <p style={{
              fontSize: 15, lineHeight: 1.9, color: '#5a7088', fontWeight: 300,
              maxWidth: 400, marginBottom: 44,
              fontFamily: '-apple-system, sans-serif',
            }}>
              İstanbul&apos;da 25 yılı aşkın süredir lüks konut, ticari yapı ve
              restorasyon projelerinde hayalinizdeki mekanları hayata geçiriyoruz.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 30px', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                color: '#0c1420', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                border: 'none', cursor: 'pointer', borderRadius: 2,
                fontFamily: '-apple-system, sans-serif',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(251,191,36,0.15)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(251,191,36,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(251,191,36,0.15)'; }}
              >
                Projelerimiz
                <ArrowRight size={14} strokeWidth={2} />
              </button>

              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 30px',
                border: '1px solid rgba(236,72,153,0.25)',
                color: '#ec4899', fontSize: 11, fontWeight: 400,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                background: 'rgba(236,72,153,0.04)', cursor: 'pointer',
                borderRadius: 2,
                fontFamily: '-apple-system, sans-serif',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(236,72,153,0.5)'; e.currentTarget.style.background = 'rgba(236,72,153,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(236,72,153,0.25)'; e.currentTarget.style.background = 'rgba(236,72,153,0.04)'; }}
              >
                İletişim
              </button>
            </div>
          </div>

          {/* ─── Right: Image ─── */}
          <div style={{ flex: '1 1 40%', display: 'flex', justifyContent: 'center' }}>
            <div className="hidden md:block" style={{
              position: 'relative', width: '100%', maxWidth: 420,
              aspectRatio: '3/4',
            }}>
              {/* Glow behind image */}
              <div style={{
                position: 'absolute', top: '10%', left: '-10%', width: '120%', height: '80%',
                background: 'radial-gradient(ellipse, rgba(251,191,36,0.08) 0%, transparent 70%)',
                filter: 'blur(40px)',
                zIndex: 0,
              }} />

              {/* Image container */}
              <div style={{
                position: 'relative', width: '100%', height: '100%',
                borderRadius: 4, overflow: 'hidden', zIndex: 1,
                boxShadow: `
                  0 30px 60px rgba(0,0,0,0.3),
                  0 0 0 1px rgba(255,255,255,0.03)
                `,
              }}>
                <Image src="/images/construction/hero.png" alt="ELİT YAPI" fill unoptimized priority
                  style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />

                {/* Color gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `
                    linear-gradient(180deg,
                      rgba(251,191,36,0.06) 0%,
                      transparent 25%,
                      transparent 60%,
                      rgba(12,20,32,0.6) 100%
                    )
                  `,
                }} />

                {/* Border accent - left */}
                <div style={{
                  position: 'absolute', top: '15%', left: 0, bottom: '15%',
                  width: 2,
                  background: 'linear-gradient(180deg, transparent, rgba(251,191,36,0.4), transparent)',
                }} />
              </div>

              {/* Floating badge on image */}
              <div className="hidden lg:block" style={{
                position: 'absolute', bottom: -20, right: -20, zIndex: 5,
                padding: '20px 24px', background: 'rgba(12,20,32,0.9)',
                backdropFilter: 'blur(12px)', borderRadius: 2,
                borderLeft: '3px solid #fbbf24',
                maxWidth: 220,
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}>
                <div style={{
                  fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: '#fbbf24', fontFamily: '-apple-system, sans-serif', marginBottom: 6,
                }}>
                  Öne Çıkan Proje
                </div>
                <div style={{
                  fontSize: 14, color: '#e8e0d4', fontFamily: 'Georgia, serif',
                  fontWeight: 400, lineHeight: 1.4,
                }}>
                  Vista Premium Konutları
                </div>
                <div style={{
                  fontSize: 11, color: '#5a7088', fontFamily: '-apple-system, sans-serif',
                  marginTop: 6,
                }}>
                  İstanbul — 120 Konut
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom stats bar ─── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        borderTop: '1px solid rgba(255,255,255,0.03)',
        background: 'rgba(12,20,32,0.5)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          padding: '0 clamp(20px, 4vw, 80px)',
          height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 48)', flexWrap: 'wrap' }}>
            {[
              { num: '25+', label: 'Yıl Deneyim', color: '#fbbf24' },
              { num: '200+', label: 'Proje', color: '#ec4899' },
              { num: '₺2B+', label: 'Proje Değeri', color: '#a855f7' },
              { num: '%98', label: 'Memnuniyet', color: '#10b981' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{
                  fontSize: 20, fontWeight: 400, color: s.color,
                  fontFamily: 'Georgia, serif',
                }}>
                  {s.num}
                </span>
                <span style={{
                  fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: '#3a5060', fontFamily: '-apple-system, sans-serif',
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 12 }}>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.04)' }} />
            <span style={{
              fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#2a3a4a', fontFamily: '-apple-system, sans-serif',
            }}>
              Scroll
            </span>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              border: '1px solid rgba(251,191,36,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 2, height: 6, borderRadius: 2, background: '#fbbf24', opacity: 0.5 }} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom marquee ─── */}
      <div style={{
        position: 'absolute', bottom: 68, left: 0, right: 0, zIndex: 5,
        borderTop: '1px solid rgba(255,255,255,0.02)',
        height: 32, overflow: 'hidden', display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          display: 'flex', gap: 48, whiteSpace: 'nowrap',
          animation: 'marquee 30s linear infinite',
        }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: 48, alignItems: 'center' }}>
              {['Konut', 'Ticari', 'İç Tasarım', 'Restorasyon', 'Mimari', 'Danışmanlık'].map((t) => (
                <span key={`${t}-${i}`} style={{
                  fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: '#1a2a3a', fontWeight: 400,
                }}>
                  {t}
                </span>
              ))}
            </div>
          ))}
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
      marginTop: 'auto',
      padding: '32px clamp(20px, 4vw, 64px)',
      borderTop: '1px solid rgba(255,255,255,0.03)',
    }}>
      <p style={{
        textAlign: 'center', fontSize: 9, letterSpacing: '0.25em',
        textTransform: 'uppercase', color: '#1a2a3a',
      }}>
        © 2025 <span style={{ color: '#fbbf24' }}>ELİT YAPI</span> — Tüm hakları saklıdır.
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
