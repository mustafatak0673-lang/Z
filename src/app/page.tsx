'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowRight, Phone, ChevronDown } from 'lucide-react';

/* ═══════════════════════════════════════
   RENKLER
   Gold: #C8962E | Orange: #D97520
   Cream: #FDFCFA | Dark: #1A1614
   ═══════════════════════════════════════ */

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

  const links = [
    ['about', 'Hakkımızda'],
    ['services', 'Hizmetler'],
    ['projects', 'Projeler'],
    ['contact', 'İletişim'],
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(24px, 5vw, 80px)',
        background: scrolled ? 'rgba(253,252,250,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(232,226,218,0.5)' : '1px solid transparent',
        transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: scrolled ? 'linear-gradient(135deg, #C8962E 0%, #D97520 100%)' : 'linear-gradient(135deg, #C8962E 0%, #D97520 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: scrolled ? '0 2px 12px rgba(200,150,46,0.2)' : '0 2px 12px rgba(200,150,46,0.3)',
            transition: 'box-shadow 0.5s',
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>EY</span>
          </div>
          <div>
            <span style={{
              fontSize: 15, fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase',
              color: scrolled ? '#1A1614' : '#fff',
              fontFamily: 'Georgia, serif',
              transition: 'color 0.5s',
            }}>ELİT</span>
            <span style={{
              fontSize: 15, fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase',
              color: scrolled ? '#C8962E' : '#E8C06A',
              fontFamily: 'Georgia, serif',
              marginLeft: 6,
              transition: 'color 0.5s',
            }}>YAPI</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 40 }}>
          {links.map(([id, label]) => (
            <span key={id} style={{
              fontSize: 12, fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase',
              color: scrolled ? '#8A7E72' : 'rgba(255,255,255,0.7)',
              cursor: 'pointer', transition: 'color 0.3s',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#C8962E'}
              onMouseLeave={e => e.currentTarget.style.color = scrolled ? '#8A7E72' : 'rgba(255,255,255,0.7)'}
            >{label}</span>
          ))}
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#fff', padding: '11px 26px', borderRadius: 0,
            background: 'linear-gradient(135deg, #C8962E 0%, #D97520 100%)',
            cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            boxShadow: '0 3px 12px rgba(200,150,46,0.25)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(200,150,46,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(200,150,46,0.25)'; }}
          >Teklif Alın</span>
        </div>

        <button onClick={() => setOpen(true)} className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: scrolled ? '#1A1614' : '#fff', padding: 8 }}>
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div onClick={() => setOpen(false)} style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(253,252,250,0.98)',
        backdropFilter: 'blur(30px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
      }}>
        <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: '#1A1614' }}>
          <X size={24} strokeWidth={1.5} />
        </button>
        {links.map(([id, label], i) => (
          <span key={id} onClick={e => { e.stopPropagation(); setOpen(false); }} style={{
            fontSize: 22, fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#1A1614', cursor: 'pointer', fontFamily: 'Georgia, serif',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#C8962E'}
            onMouseLeave={e => e.currentTarget.style.color = '#1A1614'}
          >{label}</span>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════
   HERO — Lüks Beyaz / Sarı / Turuncu
   ═══════════════════════════════════════ */
function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#FDFCFA' }}>

      {/* ═══ ARKA PLAN GÖRSEL ═══ */}
      <div className="hidden lg:block" style={{
        position: 'absolute', inset: 0,
      }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image src="/images/construction/hero.png" alt="" fill unoptimized priority
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
          {/* Overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(105deg, rgba(253,252,250,0.97) 0%, rgba(253,252,250,0.85) 35%, rgba(253,252,250,0.3) 60%, rgba(253,252,250,0.1) 80%)',
          }} />
        </div>
      </div>

      {/* Mobile bg */}
      <div className="lg:hidden" style={{ position: 'absolute', inset: 0 }}>
        <Image src="/images/construction/hero.png" alt="" fill unoptimized priority
          style={{ objectFit: 'cover', opacity: 0.08 }} />
      </div>

      {/* ═══ DEKORATİF ELEMANLAR ═══ */}

      {/* Altın çizgi — sol üst */}
      <div style={{
        position: 'absolute', top: 120, left: 'clamp(24px, 5vw, 80px)',
        width: 1, height: '30vh',
        background: 'linear-gradient(180deg, #C8962E 0%, rgba(200,150,46,0.05) 100%)',
        zIndex: 1,
      }} />

      {/* Turuncu noktalar */}
      <div style={{
        position: 'absolute', top: 120, left: 'clamp(24px, 5vw, 80px)',
        width: 7, height: 7, borderRadius: '50%',
        background: '#C8962E', zIndex: 2,
        boxShadow: '0 0 12px rgba(200,150,46,0.4)',
      }} />
      <div style={{
        position: 'absolute', bottom: '35vh', left: 'clamp(24px, 5vw, 80px)',
        width: 5, height: 5, borderRadius: '50%',
        background: '#D97520', zIndex: 2,
        boxShadow: '0 0 8px rgba(217,117,32,0.3)',
      }} />

      {/* Sağ üst yarı saydam turuncu daire */}
      <div className="hidden lg:block" style={{
        position: 'absolute', top: '-5%', right: '5%',
        width: 'clamp(250px, 30vw, 500px)', height: 'clamp(250px, 30vw, 500px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,150,46,0.08) 0%, transparent 70%)',
        animation: 'floatA 8s ease-in-out infinite',
        zIndex: 0,
      }} />

      {/* Sağ alt turuncu glow */}
      <div className="hidden lg:block" style={{
        position: 'absolute', bottom: '10%', right: '15%',
        width: 'clamp(200px, 25vw, 400px)', height: 'clamp(200px, 25vw, 400px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217,117,32,0.06) 0%, transparent 70%)',
        animation: 'floatB 6s ease-in-out infinite',
        zIndex: 0,
      }} />

      {/* ═══ İÇERİK ═══ */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, width: '100%', margin: '0 auto',
        padding: '0 clamp(24px, 5vw, 80px)',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 6vw, 100px)',
          alignItems: 'center', minHeight: '80vh',
        }} className="[grid-template-columns:1fr] lg:!grid-cols-2">

          {/* ═══ SOL — METİN ═══ */}
          <div>
            {/* Etiket */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 14,
              marginBottom: 36, paddingLeft: 20,
            }}>
              <div style={{
                width: 40, height: 1,
                background: 'linear-gradient(90deg, #C8962E, #D97520)',
                animation: 'widthGrow 1.2s ease-out forwards',
              }} />
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase',
                color: '#D97520',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>Kuruluş: 2000 — İstanbul</span>
            </div>

            {/* Başlık */}
            <h1 style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', fontWeight: 400,
              lineHeight: 1.08, color: '#1A1614', marginBottom: 28,
              letterSpacing: '-0.02em', fontFamily: 'Georgia, serif',
            }}>
              Hayallerinizdeki
              <br />
              <span style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #C8962E 0%, #D97520 50%, #E8C06A 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Mükemmelliği
              </span>
              <br />
              İnşa Ediyoruz
            </h1>

            {/* Açıklama */}
            <p style={{
              fontSize: 16, lineHeight: 1.9, color: '#8A7E72', fontWeight: 300,
              maxWidth: 400, marginBottom: 44,
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}>
              25 yılı aşkın tecrübemizle İstanbul&apos;da premium konut, ticari yapı
              ve restorasyon projelerinde sektörün lideriyiz.
            </p>

            {/* CTA Butonları */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 56 }}>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #C8962E 0%, #D97520 100%)',
                color: '#fff',
                fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                border: 'none', cursor: 'pointer', borderRadius: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 4px 20px rgba(200,150,46,0.25)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(200,150,46,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(200,150,46,0.25)'; }}
              >
                Projelerimiz <ArrowRight size={14} strokeWidth={2} />
              </button>

              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 36px',
                background: 'transparent',
                color: '#1A1614',
                fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                border: '1px solid #E8E2DA', cursor: 'pointer', borderRadius: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                transition: 'border-color 0.4s, background 0.4s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8962E'; e.currentTarget.style.background = 'rgba(200,150,46,0.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E2DA'; e.currentTarget.style.background = 'transparent'; }}
              >
                <Phone size={14} strokeWidth={1.5} /> İletişim
              </button>
            </div>

            {/* Altın ayırıcı */}
            <div style={{
              width: '100%', height: 1, marginBottom: 32,
              background: 'linear-gradient(90deg, #E8E2DA 0%, rgba(232,226,218,0.2) 100%)',
            }} />

            {/* İstatistikler */}
            <div style={{ display: 'flex', gap: 'clamp(20px, 4vw, 48)', flexWrap: 'wrap' }}>
              {[
                { n: '25+', t: 'Yıllık Deneyim', color: '#C8962E' },
                { n: '200+', t: 'Tamamlanan Proje', color: '#D97520' },
                { n: '%98', t: 'Müşteri Memnuniyeti', color: '#C8962E' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{
                    fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: s.color,
                    fontFamily: 'Georgia, serif', lineHeight: 1, letterSpacing: '-0.02em',
                  }}>{s.n}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: '#8A7E72',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>{s.t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ SAĞ — GÖRSEL KARTLARI ═══ */}
          <div className="hidden lg:block" style={{
            position: 'relative', height: '70vh', minWidth: 0,
          }}>
            {/* Ana görsel */}
            <div style={{
              position: 'absolute', top: '5%', right: 0,
              width: '85%', height: '80%',
              borderRadius: 0, overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(26,22,20,0.1)',
            }}>
              <Image src="/images/construction/hero.png" alt="ELİT YAPI" fill unoptimized priority
                style={{ objectFit: 'cover', objectPosition: 'center 25%' }} />
              {/* Alt gradient */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
                background: 'linear-gradient(0deg, rgba(26,22,20,0.5) 0%, transparent 100%)',
              }} />
              {/* Overlay info */}
              <div style={{
                position: 'absolute', bottom: 28, left: 28, right: 28,
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              }}>
                <div>
                  <div style={{
                    fontSize: 9, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#E8C06A', marginBottom: 6,
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                  }}>Son Proje</div>
                  <div style={{
                    fontSize: 20, fontWeight: 400, color: '#fff',
                    fontFamily: 'Georgia, serif', lineHeight: 1.2,
                  }}>Vista Premium<br />Konutları</div>
                </div>
                <div style={{
                  width: 50, height: 50, borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'border-color 0.3s, background 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8962E'; e.currentTarget.style.background = 'rgba(200,150,46,0.2)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  <ArrowRight size={18} color="#fff" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Floating kart — üst sol */}
            <div style={{
              position: 'absolute', top: 0, left: 0, zIndex: 5,
              background: '#fff',
              padding: '20px 24px',
              boxShadow: '0 10px 40px rgba(26,22,20,0.08)',
              animation: 'floatA 7s ease-in-out infinite',
            }}>
              <div style={{
                fontSize: 28, fontWeight: 400, color: '#C8962E',
                fontFamily: 'Georgia, serif', lineHeight: 1,
              }}>4.9<span style={{ fontSize: 16, color: '#D97520' }}>/5</span></div>
              <div style={{
                fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#8A7E72', marginTop: 4,
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>Müşteri Puanı</div>
              {/* Yıldızlar */}
              <div style={{ display: 'flex', gap: 2, marginTop: 8 }}>
                {[1,2,3,4,5].map(i => (
                  <div key={i} style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: i <= 4 ? 'linear-gradient(135deg, #C8962E, #D97520)' : '#E8E2DA',
                  }} />
                ))}
              </div>
            </div>

            {/* Floating kart — alt sol */}
            <div style={{
              position: 'absolute', bottom: '8%', left: '5%', zIndex: 5,
              background: '#1A1614',
              padding: '20px 24px',
              boxShadow: '0 10px 40px rgba(26,22,20,0.15)',
              animation: 'floatB 5s ease-in-out infinite',
            }}>
              <div style={{
                fontSize: 28, fontWeight: 400, color: '#E8C06A',
                fontFamily: 'Georgia, serif', lineHeight: 1,
              }}>200+</div>
              <div style={{
                fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)', marginTop: 4,
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
              }}>Proje Teslim Edildi</div>
            </div>

            {/* Dekoratif çerçeve — köşe */}
            <div style={{
              position: 'absolute', top: '-2%', right: '-2%',
              width: 60, height: 60,
              borderTop: '2px solid #C8962E',
              borderRight: '2px solid #C8962E',
              opacity: 0.4, zIndex: 3,
            }} />
            <div style={{
              position: 'absolute', bottom: '22%', left: '-3%',
              width: 40, height: 40,
              borderBottom: '2px solid #D97520',
              borderLeft: '2px solid #D97520',
              opacity: 0.3, zIndex: 3,
            }} />
          </div>
        </div>
      </div>

      {/* Aşağı kaydır */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        cursor: 'pointer', animation: 'floatB 3s ease-in-out infinite',
      }}>
        <span style={{
          fontSize: 9, color: '#8A7E72', fontWeight: 500,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        }}>Keşfet</span>
        <ChevronDown size={16} color="#8A7E72" strokeWidth={1.5} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      marginTop: 'auto',
      borderTop: '1px solid #E8E2DA',
      padding: '28px clamp(24px, 5vw, 80px)',
      background: '#FDFCFA',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #C8962E, #D97520)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>EY</span>
          </div>
          <span style={{
            fontSize: 12, fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#1A1614', fontFamily: 'Georgia, serif',
          }}>ELİT <span style={{ color: '#C8962E' }}>YAPI</span>
            <span style={{ fontSize: 10, color: '#8A7E72', marginLeft: 12, fontFamily: '-apple-system, sans-serif' }}>© 2025</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          {['Gizlilik', 'Koşullar', 'İletişim'].map(l => (
            <span key={l} style={{
              fontSize: 11, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#8A7E72', cursor: 'pointer', transition: 'color 0.3s',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#C8962E'}
              onMouseLeave={e => e.currentTarget.style.color = '#8A7E72'}
            >{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════
   PAGE
   ═══════════════════════════════════════ */
export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FDFCFA' }}>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
