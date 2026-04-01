'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowRight, Phone, ChevronDown } from 'lucide-react';

/* ═══ RENKLER ═══
   Beyaz:  #FFFFFF
   Sarı:   #FACC15
   Turuncu: #FB923C
   Açık Mavi: #38BDF8
   Koyu:   #1a1a1a
   Gri:    #6b7280
   ══════════════════ */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = useCallback((id: string) => {
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px, 4vw, 60px)',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #f3f4f6' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #FACC15 0%, #FB923C 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#fff' }}>EY</span>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: scrolled ? '#1a1a1a' : '#1a1a1a', transition: 'color 0.3s' }}>
            ELİT <span style={{ color: '#FB923C' }}>YAPI</span>
          </span>
        </div>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 32 }}>
          {['Hakkımızda', 'Hizmetler', 'Projeler', 'İletişim'].map(label => (
            <span key={label} style={{
              fontSize: 13, fontWeight: 500, color: '#6b7280', cursor: 'pointer', transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#FB923C'}
              onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
            >{label}</span>
          ))}
        </div>

        <button onClick={() => setOpen(true)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a', padding: 4 }}>
          <Menu size={22} strokeWidth={2} />
        </button>
      </nav>

      {/* Mobil Menü */}
      <div onClick={() => setOpen(false)} style={{
        position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(20px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 0.3s',
      }}>
        <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 18, right: 20, background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a' }}>
          <X size={24} strokeWidth={2} />
        </button>
        {['Hakkımızda', 'Hizmetler', 'Projeler', 'İletişim'].map(label => (
          <span key={label} onClick={e => { e.stopPropagation(); setOpen(false); }} style={{
            fontSize: 20, fontWeight: 700, color: '#1a1a1a', cursor: 'pointer',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#FB923C'}
            onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}
          >{label}</span>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════
   HERO — Beyaz / Sarı / Turuncu / Açık Mavi
   ═══════════════════════════ */
function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#fff' }}>

      {/* ── Dekoratif Arka Plan ── */}

      {/* Büyük açık mavi daire — sağ üst */}
      <div style={{
        position: 'absolute', top: '-12%', right: '-8%',
        width: 'clamp(350px, 50vw, 650px)', height: 'clamp(350px, 50vw, 650px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(56,189,248,0.02) 60%, transparent 100%)',
        animation: 'pulse 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Sarı blob — sol alt */}
      <div style={{
        position: 'absolute', bottom: '-6%', left: '-10%',
        width: 'clamp(300px, 40vw, 500px)', height: 'clamp(300px, 40vw, 500px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(250,204,21,0.1) 0%, rgba(251,146,60,0.04) 60%, transparent 100%)',
        animation: 'pulse 10s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Turuncu blob — sağ orta */}
      <div style={{
        position: 'absolute', top: '30%', right: '10%',
        width: 'clamp(180px, 22vw, 320px)', height: 'clamp(180px, 22vw, 320px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,146,60,0.07) 0%, transparent 70%)',
        animation: 'float 6s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Küçük dekoratif noktalar */}
      <div style={{
        position: 'absolute', top: '20%', right: '30%', width: 10, height: 10,
        borderRadius: '50%', background: '#FACC15', opacity: 0.5,
        animation: 'float 4s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '45%', left: '12%', width: 7, height: 7,
        borderRadius: '50%', background: '#38BDF8', opacity: 0.4,
        animation: 'float2 5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '25%', right: '22%', width: 8, height: 8,
        borderRadius: '50%', background: '#FB923C', opacity: 0.45,
        animation: 'float 3.5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '65%', left: '25%', width: 6, height: 6,
        borderRadius: '50%', background: '#FACC15', opacity: 0.35,
        animation: 'float2 4.5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '15%', left: '35%', width: 5, height: 5,
        borderRadius: '50%', background: '#38BDF8', opacity: 0.3,
        animation: 'float 5.5s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* ── İçerik ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1180, width: '100%', margin: '0 auto',
        padding: '90px clamp(20px, 4vw, 60px) 60px',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 4vw, 70px)', alignItems: 'center',
        }} className="[grid-template-columns:1fr] md:!grid-cols-2">

          {/* ── SOL: Metin ── */}
          <div>
            {/* Üst etiket çizgisi */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, animation: 'slideUp 0.6s ease-out both' }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: 'linear-gradient(90deg, #38BDF8, #FACC15)' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#FB923C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Premium İnşaat Çözümleri
              </span>
            </div>

            {/* Başlık */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800,
              lineHeight: 1.08, color: '#1a1a1a', marginBottom: 22, letterSpacing: '-0.03em',
              animation: 'slideUp 0.7s ease-out 0.1s both',
            }}>
              Hayallerinizi{' '}
              <span style={{
                background: 'linear-gradient(135deg, #FACC15 0%, #FB923C 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800,
              }}>
                Gerçeğe
              </span>
              <br />
              Dönüştürüyoruz
            </h1>

            {/* Açıklama */}
            <p style={{
              fontSize: 16, lineHeight: 1.8, color: '#6b7280', fontWeight: 400,
              maxWidth: 420, marginBottom: 32,
              animation: 'slideUp 0.7s ease-out 0.2s both',
            }}>
              25 yıllık deneyimimizle İstanbul&apos;da lüks konut, ticari yapı ve restorasyon
              projelerinde sektörün öncüsüyüz.
            </p>

            {/* CTA Butonları */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40, animation: 'slideUp 0.7s ease-out 0.3s both' }}>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 30px',
                background: 'linear-gradient(135deg, #FB923C 0%, #F97316 100%)',
                color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em',
                border: 'none', borderRadius: 12, cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.3s',
                boxShadow: '0 4px 20px rgba(251,146,60,0.3)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(251,146,60,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(251,146,60,0.3)'; }}
              >
                Projelerimiz <ArrowRight size={16} strokeWidth={2.5} />
              </button>

              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 30px', background: '#fff',
                color: '#1a1a1a', fontSize: 13, fontWeight: 600,
                border: '2px solid #e5e7eb', borderRadius: 12, cursor: 'pointer',
                transition: 'border-color 0.3s, background 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#38BDF8'; e.currentTarget.style.background = 'rgba(56,189,248,0.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#fff'; }}
              >
                <Phone size={15} strokeWidth={2} /> İletişime Geçin
              </button>
            </div>

            {/* Güven Rozetleri */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', animation: 'slideUp 0.7s ease-out 0.4s both' }}>
              {[
                { label: '25+ Yıl', color: '#FACC15' },
                { label: '200+ Proje', color: '#FB923C' },
                { label: '%98 Memnuniyet', color: '#38BDF8' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%', background: b.color,
                    boxShadow: `0 0 8px ${b.color}50`,
                  }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── SAĞ: Görsel ── */}
          <div style={{ position: 'relative', animation: 'fadeIn 1s ease-out 0.3s both' }}>
            {/* Ana görsel */}
            <div style={{
              position: 'relative', borderRadius: 20, overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
              animation: 'float 8s ease-in-out infinite',
            }}>
              <div style={{ aspectRatio: '4/3' }}>
                <Image src="/images/construction/hero.png" alt="ELİT YAPI" fill unoptimized priority
                  style={{ objectFit: 'cover', objectPosition: 'center 25%' }} />
              </div>
              {/* Alt gradient */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
                background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
              }} />
            </div>

            {/* Floating kart — Proje sayısı */}
            <div style={{
              position: 'absolute', top: -14, left: -14, zIndex: 20,
              background: '#fff', borderRadius: 14, padding: '14px 18px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid #f3f4f6',
              display: 'flex', alignItems: 'center', gap: 12,
              animation: 'float2 5s ease-in-out infinite',
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>200+</span>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>Tamamlanan</div>
                <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>Proje</div>
              </div>
            </div>

            {/* Floating kart — Müşteri puanı */}
            <div style={{
              position: 'absolute', bottom: -10, right: -10, zIndex: 20,
              background: '#fff', borderRadius: 14, padding: '14px 18px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)', border: '1px solid #f3f4f6',
              display: 'flex', alignItems: 'center', gap: 12,
              animation: 'float 6s ease-in-out infinite',
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: 'linear-gradient(135deg, #FACC15, #F59E0B)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>★</span>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2 }}>4.9 / 5.0</div>
                <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500 }}>Müşteri Puanı</div>
              </div>
            </div>

            {/* Dekoratif halka */}
            <div style={{
              position: 'absolute', top: 20, right: -16,
              width: 70, height: 70, borderRadius: '50%',
              border: '2px solid rgba(251,146,60,0.2)',
              animation: 'pulse 4s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: 40, left: -12,
              width: 50, height: 50, borderRadius: '50%',
              border: '2px solid rgba(56,189,248,0.2)',
              animation: 'pulse 5s ease-in-out infinite',
              pointerEvents: 'none',
            }} />
          </div>
        </div>
      </div>

      {/* Aşağı scroll göstergesi */}
      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        cursor: 'pointer', animation: 'float 3s ease-in-out infinite',
      }}>
        <span style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Aşağı Kaydır</span>
        <ChevronDown size={16} color="#9ca3af" />
      </div>
    </section>
  );
}

/* ═══════════════════════════
   FOOTER
   ═══════════════════════════ */
function Footer() {
  return (
    <footer style={{
      marginTop: 'auto', borderTop: '1px solid #f3f4f6',
      padding: '28px clamp(20px, 4vw, 60px)', background: '#fff',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: 'linear-gradient(135deg, #FACC15 0%, #FB923C 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: '#fff' }}>EY</span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af' }}>© 2025 ELİT YAPI</span>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Gizlilik', 'Koşullar'].map(l => (
            <span key={l} style={{
              fontSize: 11, fontWeight: 500, color: '#9ca3af', cursor: 'pointer', transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#FB923C'}
              onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
            >{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════
   PAGE
   ═══════════════════════════ */
export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
