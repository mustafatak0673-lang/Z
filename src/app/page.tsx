'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowRight, Phone, Mail, MapPin, Clock, ChevronRight, Building2, Shield, Award, Users, Star, Hammer, HardHat, Ruler } from 'lucide-react';

/* ─────────────────────────────────
   COLOR PALETTE
   --blue: #7EC8E3  (light blue)
   --yellow: #F5B041 (sarı)
   --peach: #F2C09E  (ten rengi)
   --cream: #FFFBF7  (bg)
   --dark: #1B2A4A   (text)
   ───────────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = useCallback((id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px, 5vw, 80px)',
        background: scrolled ? 'rgba(255,251,247,0.95)' : 'linear-gradient(180deg, rgba(255,251,247,0.9) 0%, rgba(255,251,247,0) 100%)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease',
        boxShadow: scrolled ? '0 1px 20px rgba(27,42,74,0.06)' : 'none',
      }}>
        <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1B2A4A', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ELİT <span style={{ color: '#F5B041' }}>YAPI</span>
        </span>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 36 }}>
          {[
            ['about', 'Hakkımızda'],
            ['services', 'Hizmetler'],
            ['projects', 'Projeler'],
            ['contact', 'İletişim'],
          ].map(([id, label]) => (
            <span key={id} onClick={() => go(id)} style={{
              fontSize: 13, letterSpacing: '0.04em', color: '#6B7B8D',
              cursor: 'pointer', transition: 'color 0.3s', fontWeight: 500,
              position: 'relative',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1B2A4A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B7B8D')}
            >{label}</span>
          ))}
          <span onClick={() => go('contact')} style={{
            fontSize: 12, letterSpacing: '0.06em', color: '#fff',
            background: 'linear-gradient(135deg, #F5B041 0%, #F2C09E 100%)',
            padding: '10px 22px', borderRadius: 8, cursor: 'pointer',
            fontWeight: 600, transition: 'transform 0.3s, box-shadow 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(245,176,65,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >Teklif Al</span>
        </div>

        <button onClick={() => setOpen(true)} className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1B2A4A', padding: 8 }}>
          <Menu size={22} strokeWidth={2} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div onClick={() => setOpen(false)} style={{
        position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(255,251,247,0.98)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 0.4s ease',
        backdropFilter: 'blur(20px)',
      }}>
        <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: '#1B2A4A', padding: 8 }}>
          <X size={26} strokeWidth={2} />
        </button>
        {['about', 'services', 'projects', 'contact'].map((id, i) => (
          <span key={id} onClick={e => { e.stopPropagation(); go(id); }} style={{
            fontSize: 22, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1B2A4A',
            cursor: 'pointer', fontWeight: 500, opacity: open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s, color 0.3s`,
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5B041')}
            onMouseLeave={e => (e.currentTarget.style.color = '#1B2A4A')}
          >{id === 'about' ? 'Hakkımızda' : id === 'services' ? 'Hizmetler' : id === 'projects' ? 'Projeler' : 'İletişim'}</span>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════
   HERO — Açık Mavi / Sarı / Ten
   ═══════════════════════════════ */
function Hero() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: '#FFFBF7' }}>

      {/* Background decorative elements */}
      {/* Large blue circle - top right */}
      <div className="animate-float-slow" style={{
        position: 'absolute', top: '-8%', right: '-5%',
        width: 'clamp(300px, 45vw, 600px)', height: 'clamp(300px, 45vw, 600px)',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(126,200,227,0.15) 0%, rgba(126,200,227,0.05) 60%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      {/* Peach circle - bottom left */}
      <div className="animate-float-medium" style={{
        position: 'absolute', bottom: '5%', left: '-8%',
        width: 'clamp(250px, 35vw, 450px)', height: 'clamp(250px, 35vw, 450px)',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(242,192,158,0.18) 0%, rgba(242,192,158,0.05) 60%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      {/* Yellow blob - center */}
      <div className="animate-pulse-glow" style={{
        position: 'absolute', top: '40%', left: '45%',
        width: 'clamp(200px, 30vw, 400px)', height: 'clamp(200px, 30vw, 400px)',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,176,65,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Small decorative dots */}
      <div className="animate-float-fast" style={{ position: 'absolute', top: '18%', right: '25%', width: 8, height: 8, borderRadius: '50%', background: '#F5B041', opacity: 0.6 }} />
      <div className="animate-float-slow" style={{ position: 'absolute', top: '30%', left: '15%', width: 6, height: 6, borderRadius: '50%', background: '#7EC8E3', opacity: 0.5 }} />
      <div className="animate-float-medium" style={{ position: 'absolute', bottom: '35%', right: '15%', width: 10, height: 10, borderRadius: '50%', background: '#F2C09E', opacity: 0.5 }} />
      <div className="animate-float-fast" style={{ position: 'absolute', top: '60%', left: '30%', width: 5, height: 5, borderRadius: '50%', background: '#F5B041', opacity: 0.4 }} />
      <div className="animate-float-slow" style={{ position: 'absolute', bottom: '20%', right: '35%', width: 7, height: 7, borderRadius: '50%', background: '#7EC8E3', opacity: 0.4 }} />

      {/* Content wrapper */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1280, width: '100%', margin: '0 auto',
        padding: '100px clamp(20px, 5vw, 80px) 60px',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'center',
        }}
          className="[grid-template-columns:1fr] md:!grid-cols-2"
        >

          {/* LEFT — Text */}
          <div className="animate-slide-left" style={{ animationDelay: '0.1s' }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '8px 18px', borderRadius: 50,
              background: 'linear-gradient(135deg, rgba(126,200,227,0.12) 0%, rgba(245,176,65,0.12) 100%)',
              marginBottom: 28, border: '1px solid rgba(126,200,227,0.15)',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F5B041' }} />
              <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2D3E5F', fontWeight: 600 }}>
                Est. 2000 — İstanbul
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800,
              lineHeight: 1.1, color: '#1B2A4A', marginBottom: 20, letterSpacing: '-0.03em',
            }}>
              Hayallerinizi{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7EC8E3 0%, #F5B041 50%, #F2C09E 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                fontWeight: 800,
              }}>
                İnşa
              </span>
              <br />
              Ediyoruz
            </h1>

            <p style={{
              fontSize: 16, lineHeight: 1.8, color: '#6B7B8D', fontWeight: 400,
              maxWidth: 420, marginBottom: 36,
            }}>
              25 yıllık tecrübemizle İstanbul&apos;da premium konut, ticari yapı
              ve restorasyon projelerinde sektörün lideriyiz.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #1B2A4A 0%, #2D3E5F 100%)',
                color: '#fff',
                fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
                border: 'none', borderRadius: 12, cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 4px 20px rgba(27,42,74,0.15)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(27,42,74,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(27,42,74,0.15)'; }}
              >
                Projelerimiz <ArrowRight size={16} />
              </button>

              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '16px 32px',
                background: 'transparent', color: '#1B2A4A',
                fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
                border: '2px solid #E8E0D8', borderRadius: 12, cursor: 'pointer',
                transition: 'border-color 0.3s, background 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#7EC8E3'; e.currentTarget.style.background = 'rgba(126,200,227,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E0D8'; e.currentTarget.style.background = 'transparent'; }}
              >
                <Phone size={15} /> İletişime Geçin
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: 24, marginTop: 40, alignItems: 'center' }}>
              {[
                { icon: Shield, color: '#7EC8E3', label: 'Garantili' },
                { icon: Award, color: '#F5B041', label: 'Ödüllü' },
                { icon: Users, color: '#F2C09E', label: '200+ Müşteri' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `${b.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <b.icon size={16} style={{ color: b.color }} strokeWidth={2} />
                  </div>
                  <span style={{ fontSize: 11, color: '#6B7B8D', fontWeight: 500 }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Image composition */}
          <div className="animate-slide-right" style={{ animationDelay: '0.3s', position: 'relative' }}>
            {/* Main image container */}
            <div style={{
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(27,42,74,0.12)',
            }}>
              <div style={{ aspectRatio: '4/3' }}>
                <Image src="/images/construction/hero.png" alt="ELİT YAPI İnşaat" fill unoptimized priority
                  style={{ objectFit: 'cover', objectPosition: 'center 30%' }} />
              </div>
              {/* Overlay gradient */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
                background: 'linear-gradient(0deg, rgba(27,42,74,0.4) 0%, transparent 100%)',
              }} />
            </div>

            {/* Floating card — top left of image */}
            <div className="animate-float-medium" style={{
              position: 'absolute', top: -16, left: -16, zIndex: 20,
              background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
              borderRadius: 14, padding: '14px 18px',
              boxShadow: '0 8px 30px rgba(27,42,74,0.1)',
              border: '1px solid rgba(126,200,227,0.15)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'linear-gradient(135deg, #7EC8E3 0%, #B8E4F5 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Building2 size={18} color="#fff" strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1B2A4A', lineHeight: 1.2 }}>200+</div>
                <div style={{ fontSize: 10, color: '#6B7B8D', fontWeight: 500, letterSpacing: '0.04em' }}>Tamamlanan Proje</div>
              </div>
            </div>

            {/* Floating card — bottom right of image */}
            <div className="animate-float-slow" style={{
              position: 'absolute', bottom: -12, right: -12, zIndex: 20,
              background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
              borderRadius: 14, padding: '14px 18px',
              boxShadow: '0 8px 30px rgba(27,42,74,0.1)',
              border: '1px solid rgba(245,176,65,0.15)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'linear-gradient(135deg, #F5B041 0%, #F2C09E 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Star size={18} color="#fff" strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1B2A4A', lineHeight: 1.2 }}>4.9/5</div>
                <div style={{ fontSize: 10, color: '#6B7B8D', fontWeight: 500, letterSpacing: '0.04em' }}>Müşteri Puanı</div>
              </div>
            </div>

            {/* Decorative ring */}
            <div className="animate-pulse-glow" style={{
              position: 'absolute', top: 20, right: -20,
              width: 80, height: 80, borderRadius: '50%',
              border: '2px solid rgba(242,192,158,0.3)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="animate-slide-up [grid-template-columns:repeat(2,1fr)] md:!grid-cols-4" style={{
          marginTop: 'clamp(48px, 6vw, 80px)',
          background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px)',
          borderRadius: 16, padding: '24px 32px',
          boxShadow: '0 4px 24px rgba(27,42,74,0.06)',
          border: '1px solid rgba(232,224,216,0.6)',
          display: 'grid', gap: 24,
        }}>
          {[
            { n: '25+', t: 'Yıl Tecrübe', color: '#7EC8E3' },
            { n: '200+', t: 'Tamamlanan Proje', color: '#F5B041' },
            { n: '₺2B+', t: 'Proje Değeri', color: '#F2C09E' },
            { n: '%98', t: 'Müşteri Memnuniyeti', color: '#7EC8E3' },
          ].map((s, i) => (
            <div key={i} className="hidden md:block" style={{
              textAlign: 'center', padding: '8px 0',
              borderRight: i < 3 ? '1px solid #E8E0D8' : 'none',
            }}>
              <span style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', color: s.color, fontWeight: 700, lineHeight: 1.2 }}>{s.n}</span>
              <div style={{ fontSize: 11, color: '#6B7B8D', fontWeight: 500, marginTop: 4, letterSpacing: '0.02em' }}>{s.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   ABOUT
   ═══════════════════════════════ */
function About() {
  return (
    <section id="about" style={{ padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }}
          className="[grid-template-columns:1fr] md:!grid-cols-2">

          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 50px rgba(27,42,74,0.08)' }}>
              <Image src="/images/construction/about-team.png" alt="Ekip" width={600} height={450} unoptimized
                style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block' }} />
            </div>
            {/* Experience badge */}
            <div style={{
              position: 'absolute', bottom: -20, right: -12,
              background: 'linear-gradient(135deg, #1B2A4A 0%, #2D3E5F 100%)',
              borderRadius: 14, padding: '20px 24px', color: '#fff',
              boxShadow: '0 10px 30px rgba(27,42,74,0.2)',
            }}>
              <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1, color: '#F5B041' }}>25+</div>
              <div style={{ fontSize: 10, fontWeight: 500, marginTop: 2, letterSpacing: '0.06em', opacity: 0.8 }}>Yıl Tecrübe</div>
            </div>
          </div>

          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 24, height: 3, borderRadius: 2, background: 'linear-gradient(90deg, #7EC8E3, #F5B041)' }} />
              <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5B041', fontWeight: 600 }}>Hakkımızda</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: '#1B2A4A', margin: '12px 0 20px', lineHeight: 1.3 }}>
              Güvenilir Yapı<br />Çözümleri
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: '#6B7B8D', fontWeight: 400, marginBottom: 16 }}>
              ELİT YAPI olarak 25 yılı aşkın süredir inşaat sektöründe faaliyet gösteriyoruz.
              İstanbul merkezli şirketimiz, premium konutlardan ticari yapılara, iç tasarımdan
              restorasyona kadar geniş bir yelpazede hizmet sunmaktadır.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: '#6B7B8D', fontWeight: 400, marginBottom: 28 }}>
              Kaliteli malzeme kullanımı, modern tasarım anlayışı ve zamanında teslim
              ilkeleriyle sektörde öncü konumdayız.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
              {[
                { n: '100%', t: 'Zamanında Teslim' },
                { n: 'ISO 9001', t: 'Kalite Sertifikası' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '14px 16px', borderRadius: 12,
                  background: i === 0 ? 'rgba(126,200,227,0.08)' : 'rgba(245,176,65,0.08)',
                  border: `1px solid ${i === 0 ? 'rgba(126,200,227,0.15)' : 'rgba(245,176,65,0.15)'}`,
                }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1B2A4A' }}>{item.n}</div>
                  <div style={{ fontSize: 11, color: '#6B7B8D', fontWeight: 500 }}>{item.t}</div>
                </div>
              ))}
            </div>

            <span onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} style={{
              fontSize: 13, fontWeight: 600, color: '#1B2A4A', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
              borderBottom: '2px solid #F5B041', paddingBottom: 2, transition: 'gap 0.3s',
            }}
              onMouseEnter={e => (e.currentTarget.style.gap = '10px')}
              onMouseLeave={e => (e.currentTarget.style.gap = '6px')}
            >Daha Fazla <ChevronRight size={14} /></span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   SERVICES
   ═══════════════════════════════ */
function Services() {
  const services = [
    { title: 'Konut İnşaatı', desc: 'Lüks villa ve rezidans projeleri ile hayalinizdeki evi inşa ediyoruz.', img: 'service-residential.png', icon: Building2, color: '#7EC8E3' },
    { title: 'Ticari Yapılar', desc: 'Modern ofis binaları, AVM ve ticari yapılar tasarlıyoruz.', img: 'service-commercial.png', icon: Hammer, color: '#F5B041' },
    { title: 'İç Tasarım', desc: 'Premium malzemelerle estetik ve fonksiyonel mekanlar oluşturuyoruz.', img: 'service-interior.png', icon: Ruler, color: '#F2C09E' },
    { title: 'Restorasyon', desc: 'Tarihi yapıları özgün detayları korunarak restore ediyoruz.', img: 'service-renovation.png', icon: HardHat, color: '#7EC8E3' },
  ];

  return (
    <section id="services" style={{ padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,80px)', background: '#F7F3EE' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 24, height: 3, borderRadius: 2, background: 'linear-gradient(90deg, #7EC8E3, #F5B041)' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5B041', fontWeight: 600 }}>Hizmetlerimiz</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: '#1B2A4A', margin: '12px 0', lineHeight: 1.3 }}>
            Uzmanlık Alanlarımız
          </h2>
          <p style={{ fontSize: 15, color: '#6B7B8D', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Her projede mükemmelliği hedefleyerek, müşterilerimize en iyi hizmeti sunuyoruz.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {services.map((s, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 2px 12px rgba(27,42,74,0.04)',
              border: '1px solid #E8E0D8',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(27,42,74,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(27,42,74,0.04)'; }}
            >
              <div style={{ aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
                <Image src={`/images/construction/${s.img}`} alt={s.title} fill unoptimized
                  style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                  sizes="(max-width: 768px) 100vw, 50vw" />
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <s.icon size={16} style={{ color: s.color }} strokeWidth={2} />
                </div>
              </div>
              <div style={{ padding: '20px 22px 24px' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1B2A4A', marginBottom: 8, letterSpacing: '0.01em' }}>{s.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: '#6B7B8D', fontWeight: 400 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   PROJECTS
   ═══════════════════════════════ */
function Projects() {
  const projects = [
    { title: 'Vista Premium Konutları', cat: 'Konut', img: 'project-villa.png' },
    { title: 'Grand Otel Merkez', cat: 'Otel', img: 'project-hotel.png' },
    { title: 'Skyline Plaza', cat: 'Ticari', img: 'project-office.png' },
    { title: 'Metropol AVM', cat: 'AVM', img: 'project-mall.png' },
  ];

  return (
    <section id="projects" style={{ padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 24, height: 3, borderRadius: 2, background: 'linear-gradient(90deg, #7EC8E3, #F5B041)' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5B041', fontWeight: 600 }}>Projelerimiz</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: '#1B2A4A', margin: '12px 0', lineHeight: 1.3 }}>
            Tamamlanan Projeler
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {projects.map((p, i) => (
            <div key={i} style={{
              position: 'relative', aspectRatio: '16/10', overflow: 'hidden', cursor: 'pointer',
              borderRadius: 16,
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(27,42,74,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <Image src={`/images/construction/${p.img}`} alt={p.title} fill unoptimized
                style={{ objectFit: 'cover', transition: 'transform 0.5s' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(27,42,74,0.7) 0%, transparent 50%)', borderRadius: 16 }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24 }}>
                <span style={{
                  fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600,
                  color: '#F5B041',
                }}>{p.cat}</span>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginTop: 4, letterSpacing: '0.01em' }}>{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   PROCESS
   ═══════════════════════════════ */
function Process() {
  const steps = [
    { num: '01', title: 'Planlama', desc: 'İhtiyaç analizi ve detaylı proje planlaması', color: '#7EC8E3' },
    { num: '02', title: 'Tasarım', desc: 'Mimari tasarım ve 3D görselleştirme', color: '#F5B041' },
    { num: '03', title: 'İnşaat', desc: 'Profesyonel inşaat süreci yönetimi', color: '#F2C09E' },
    { num: '04', title: 'Teslim', desc: 'Kalite kontrol ve anahtar teslim', color: '#7EC8E3' },
  ];

  return (
    <section style={{ padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,80px)', background: '#F7F3EE' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 24, height: 3, borderRadius: 2, background: 'linear-gradient(90deg, #7EC8E3, #F5B041)' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5B041', fontWeight: 600 }}>Süreç</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: '#1B2A4A', margin: '12px 0', lineHeight: 1.3 }}>
            Nasıl Çalışırız
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              textAlign: 'center', padding: '28px 20px',
              background: '#fff', borderRadius: 16,
              boxShadow: '0 2px 12px rgba(27,42,74,0.04)',
              border: '1px solid #E8E0D8',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(27,42,74,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(27,42,74,0.04)'; }}
            >
              <div style={{
                width: 50, height: 50, borderRadius: 14,
                background: `${s.color}15`, border: `1px solid ${s.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.num}</span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1B2A4A', marginBottom: 6, letterSpacing: '0.02em' }}>{s.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: '#6B7B8D', fontWeight: 400 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   TEAM
   ═══════════════════════════════ */
function Team() {
  const team = [
    { name: 'Murat Özkan', role: 'CEO', img: 'team-ceo.png' },
    { name: 'Ayşe Arslan', role: 'Baş Mimari', img: 'team-architect.png' },
    { name: 'Can Yıldırım', role: 'Baş Mühendis', img: 'team-engineer.png' },
    { name: 'Deniz Şahin', role: 'Proje Müdürü', img: 'team-manager.png' },
  ];

  return (
    <section style={{ padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,80px)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 24, height: 3, borderRadius: 2, background: 'linear-gradient(90deg, #7EC8E3, #F5B041)' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5B041', fontWeight: 600 }}>Ekibimiz</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: '#1B2A4A', margin: '12px 0', lineHeight: 1.3 }}>
            Uzman Kadromuz
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {team.map((t, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: 130, height: 130, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px',
                border: '3px solid #E8E0D8', padding: 3,
                transition: 'border-color 0.3s',
              }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#7EC8E3')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#E8E0D8')}
              >
                <Image src={`/images/construction/${t.img}`} alt={t.name} width={130} height={130} unoptimized
                  style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }} />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1B2A4A', marginBottom: 4 }}>{t.name}</h3>
              <span style={{ fontSize: 12, color: '#F5B041', fontWeight: 600, letterSpacing: '0.04em' }}>{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   CONTACT
   ═══════════════════════════════ */
function Contact() {
  return (
    <section id="contact" style={{ padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,80px)', background: '#F7F3EE' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 24, height: 3, borderRadius: 2, background: 'linear-gradient(90deg, #7EC8E3, #F5B041)' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#F5B041', fontWeight: 600 }}>İletişim</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 700, color: '#1B2A4A', margin: '12px 0', lineHeight: 1.3 }}>
            Bizimle İletişime Geçin
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}
          className="[grid-template-columns:1fr] md:!grid-cols-2">

          {/* Form */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: 28,
            boxShadow: '0 2px 12px rgba(27,42,74,0.04)',
            border: '1px solid #E8E0D8',
            display: 'flex', flexDirection: 'column', gap: 18,
          }}>
            <input placeholder="Ad Soyad" style={{
              width: '100%', padding: '14px 16px', background: '#FAFAF8',
              border: '1px solid #E8E0D8', borderRadius: 10,
              color: '#1B2A4A', fontSize: 14, fontWeight: 400, outline: 'none',
              transition: 'border-color 0.3s', fontFamily: 'inherit',
            }}
              onFocus={e => (e.currentTarget.style.borderColor = '#7EC8E3')}
              onBlur={e => (e.currentTarget.style.borderColor = '#E8E0D8')}
            />
            <input placeholder="E-posta" type="email" style={{
              width: '100%', padding: '14px 16px', background: '#FAFAF8',
              border: '1px solid #E8E0D8', borderRadius: 10,
              color: '#1B2A4A', fontSize: 14, fontWeight: 400, outline: 'none',
              transition: 'border-color 0.3s', fontFamily: 'inherit',
            }}
              onFocus={e => (e.currentTarget.style.borderColor = '#7EC8E3')}
              onBlur={e => (e.currentTarget.style.borderColor = '#E8E0D8')}
            />
            <input placeholder="Telefon" type="tel" style={{
              width: '100%', padding: '14px 16px', background: '#FAFAF8',
              border: '1px solid #E8E0D8', borderRadius: 10,
              color: '#1B2A4A', fontSize: 14, fontWeight: 400, outline: 'none',
              transition: 'border-color 0.3s', fontFamily: 'inherit',
            }}
              onFocus={e => (e.currentTarget.style.borderColor = '#7EC8E3')}
              onBlur={e => (e.currentTarget.style.borderColor = '#E8E0D8')}
            />
            <textarea placeholder="Mesajınız" rows={4} style={{
              width: '100%', padding: '14px 16px', background: '#FAFAF8',
              border: '1px solid #E8E0D8', borderRadius: 10,
              color: '#1B2A4A', fontSize: 14, fontWeight: 400, outline: 'none', resize: 'vertical',
              transition: 'border-color 0.3s', fontFamily: 'inherit',
            }}
              onFocus={e => (e.currentTarget.style.borderColor = '#7EC8E3')}
              onBlur={e => (e.currentTarget.style.borderColor = '#E8E0D8')}
            />
            <button style={{
              alignSelf: 'flex-start', padding: '14px 32px',
              background: 'linear-gradient(135deg, #1B2A4A 0%, #2D3E5F 100%)',
              color: '#fff',
              fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
              border: 'none', borderRadius: 10, cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 4px 15px rgba(27,42,74,0.15)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(27,42,74,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(27,42,74,0.15)'; }}
            >Gönder</button>
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 4 }}>
            {[
              { icon: Phone, label: '+90 212 555 00 00', title: 'Telefon', color: '#7EC8E3' },
              { icon: Mail, label: 'info@elityapi.com', title: 'E-posta', color: '#F5B041' },
              { icon: MapPin, label: 'Levent, Beşiktaş, İstanbul', title: 'Adres', color: '#F2C09E' },
              { icon: Clock, label: 'Pzt — Cmt  09:00 — 18:00', title: 'Çalışma Saatleri', color: '#7EC8E3' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', gap: 14, padding: '16px 18px',
                background: '#fff', borderRadius: 12,
                border: '1px solid #E8E0D8',
                boxShadow: '0 1px 6px rgba(27,42,74,0.03)',
                transition: 'transform 0.3s',
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(4px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 10,
                  background: `${item.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <item.icon size={18} style={{ color: item.color }} strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7B8D', marginBottom: 2, fontWeight: 600 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: '#1B2A4A', fontWeight: 500 }}>{item.label}</div>
                </div>
              </div>
            ))}
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
      marginTop: 'auto', borderTop: '1px solid #E8E0D8',
      padding: '36px clamp(20px,5vw,80px)',
      background: '#FFFBF7',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1B2A4A', letterSpacing: '0.06em' }}>
          ELİT <span style={{ color: '#F5B041' }}>YAPI</span>
          <span style={{ fontSize: 10, fontWeight: 400, color: '#6B7B8D', marginLeft: 12 }}>© 2025 Tüm hakları saklıdır.</span>
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Gizlilik', 'Koşullar', 'İletişim'].map((l) => (
            <span key={l} style={{ fontSize: 12, fontWeight: 500, color: '#6B7B8D', cursor: 'pointer', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1B2A4A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B7B8D')}
            >{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════
   PAGE
   ═══════════════════════════════ */
export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FFFBF7' }}>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Process />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
