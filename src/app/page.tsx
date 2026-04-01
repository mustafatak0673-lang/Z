'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react';

/* ─────────────────────────────────
   COLORS
   #111  bg
   #c4a350  gold accent
   #e0dcd4  text
   #777  text muted
   #333  text very muted
   #1a1a1a  card bg
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
        background: scrolled ? '#111' : 'linear-gradient(180deg, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0) 100%)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
      }}>
        <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#e0dcd4', cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ELİT <span style={{ color: '#c4a350' }}>YAPI</span>
        </span>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 36 }}>
          {[
            ['about', 'Hakkımızda'],
            ['services', 'Hizmetler'],
            ['projects', 'Projeler'],
            ['contact', 'İletişim'],
          ].map(([id, label]) => (
            <span key={id} onClick={() => go(id)} style={{
              fontSize: 12, letterSpacing: '0.08em', color: '#666',
              cursor: 'pointer', transition: 'color 0.3s', fontWeight: 400,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c4a350')}
              onMouseLeave={e => (e.currentTarget.style.color = '#666')}
            >{label}</span>
          ))}
        </div>

        <button onClick={() => setOpen(true)} className="md:hidden"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: 8 }}>
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div onClick={() => setOpen(false)} style={{
        position: 'fixed', inset: 0, zIndex: 200, background: '#111',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 0.4s ease',
      }}>
        <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: '#555', padding: 8 }}>
          <X size={28} strokeWidth={1.5} />
        </button>
        {['about', 'services', 'projects', 'contact'].map(id => (
          <span key={id} onClick={e => { e.stopPropagation(); go(id); }} style={{
            fontSize: 20, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555',
            cursor: 'pointer', transition: 'color 0.3s', fontWeight: 300,
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#c4a350')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >{id === 'about' ? 'Hakkımızda' : id === 'services' ? 'Hizmetler' : id === 'projects' ? 'Projeler' : 'İletişim'}</span>
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
    <section id="hero" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', background: '#111', overflow: 'hidden' }}>

      {/* Image right half */}
      <div className="hidden lg:block" style={{
        position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
      }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image src="/images/construction/hero.png" alt="" fill unoptimized priority
            style={{ objectFit: 'cover', objectPosition: 'center 25%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #111 0%, #111 8%, rgba(17,17,17,0.2) 40%, rgba(17,17,17,0.1) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(17,17,17,0.3) 0%, transparent 30%, transparent 70%, rgba(17,17,17,0.5) 100%)' }} />
        </div>
      </div>

      {/* Mobile bg */}
      <div className="lg:hidden" style={{ position: 'absolute', inset: 0 }}>
        <Image src="/images/construction/hero.png" alt="" fill unoptimized priority
          style={{ objectFit: 'cover', opacity: 0.1 }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1200, width: '100%', margin: '0 auto',
        padding: '0 clamp(20px, 5vw, 80px)',
      }}>
        <div style={{ maxWidth: 600 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <div style={{ width: 40, height: 1, background: '#c4a350' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c4a350', fontWeight: 400 }}>
              Est. 2000 — İstanbul
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300,
            lineHeight: 1.1, color: '#f0ece4', marginBottom: 24, letterSpacing: '-0.02em',
          }}>
            Geleceği İnşa
            <br />
            <span style={{ color: '#c4a350' }}>Ediyoruz.</span>
          </h1>

          <p style={{ fontSize: 15, lineHeight: 1.9, color: '#777', fontWeight: 300, maxWidth: 380, marginBottom: 48 }}>
            25 yıllık tecrübemizle İstanbul&apos;da premium konut, ticari yapı
            ve restorasyon projelerinde sektörün lideriyiz.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 28px', background: '#c4a350', color: '#111',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer', transition: 'background 0.3s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#d4b360')}
              onMouseLeave={e => (e.currentTarget.style.background = '#c4a350')}
            >
              Projelerimiz <ArrowRight size={14} />
            </button>

            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 28px', background: 'transparent', color: '#e0dcd4',
              fontSize: 11, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase',
              border: '1px solid #333', cursor: 'pointer', transition: 'border-color 0.3s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#c4a350')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#333')}
            >
              İletişim
            </button>
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        borderTop: '1px solid #1a1a1a', background: 'rgba(17,17,17,0.7)',
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px, 5vw, 80px)',
          height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {[
            { n: '25+', t: 'Yıl Tecrübe' },
            { n: '200+', t: 'Proje' },
            { n: '₺2B+', t: 'Değer' },
            { n: '%98', t: 'Memnuniyet' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 18, color: '#c4a350', fontWeight: 400 }}>{s.n}</span>
              <span style={{ fontSize: 10, color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.t}</span>
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
    <section id="about" style={{ padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,80px)', borderTop: '1px solid #1a1a1a' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'center' }}
          className="[grid-template-columns:1fr] md:!grid-cols-2">

          <div>
            <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c4a350', fontWeight: 400 }}>Hakkımızda</span>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, color: '#e0dcd4', margin: '12px 0 24px', lineHeight: 1.3 }}>
              25 Yıllık Tecrübe ve<br />Güven
            </h2>
            <div style={{ width: 40, height: 1, background: '#c4a350', marginBottom: 24 }} />
            <p style={{ fontSize: 14, lineHeight: 1.9, color: '#777', fontWeight: 300, marginBottom: 16 }}>
              ELİT YAPI olarak 25 yılı aşkın süredir inşaat sektöründe faaliyet gösteriyoruz.
              İstanbul merkezli şirketimiz, premium konutlardan ticari yapılara, iç tasarımdan
              restorasyona kadar geniş bir yelpazede hizmet sunmaktadır.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: '#777', fontWeight: 300, marginBottom: 32 }}>
              Kaliteli malzeme kullanımı, modern tasarım anlayışı ve zamanında teslim
              ilkeleriyle sektörde öncü konumdayız.
            </p>
            <span onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} style={{
              fontSize: 12, letterSpacing: '0.08em', color: '#c4a350', cursor: 'pointer',
              borderBottom: '1px solid rgba(196,163,80,0.3)', paddingBottom: 2, transition: 'border-color 0.3s',
              display: 'inline-block',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#c4a350')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(196,163,80,0.3)')}
            >Daha Fazla →</span>
          </div>

          <div style={{ overflow: 'hidden', borderRadius: 2 }}>
            <Image src="/images/construction/about-team.png" alt="Ekip" width={600} height={450} unoptimized
              style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block' }} />
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
    { title: 'Konut İnşaatı', desc: 'Lüks villa ve rezidans projeleri.', img: 'service-residential.png' },
    { title: 'Ticari Yapılar', desc: 'Ofis, AVM ve ticari yapılar.', img: 'service-commercial.png' },
    { title: 'İç Tasarım', desc: 'Premium mekan tasarımı.', img: 'service-interior.png' },
    { title: 'Restorasyon', desc: 'Tarihi yapı restorasyonu.', img: 'service-renovation.png' },
  ];

  return (
    <section id="services" style={{ padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,80px)', background: '#0d0d0d' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c4a350', fontWeight: 400 }}>Hizmetlerimiz</span>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, color: '#e0dcd4', margin: '12px 0', lineHeight: 1.3 }}>
            Uzmanlık Alanlarımız
          </h2>
          <div style={{ width: 40, height: 1, background: '#c4a350', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {services.map((s, i) => (
            <div key={i} style={{ background: '#1a1a1a', border: '1px solid #1f1f1f', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.4s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(196,163,80,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#1f1f1f')}
            >
              <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                <Image src={`/images/construction/${s.img}`} alt={s.title} fill unoptimized
                  style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                  sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div style={{ padding: '24px' }}>
                <span style={{ fontSize: 10, color: '#444', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 400 }}>0{i + 1}</span>
                <h3 style={{ fontSize: 16, fontWeight: 400, color: '#e0dcd4', margin: '8px 0 8px', letterSpacing: '0.02em' }}>{s.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: '#666', fontWeight: 300 }}>{s.desc}</p>
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
    <section id="projects" style={{ padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,80px)', borderTop: '1px solid #1a1a1a' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c4a350', fontWeight: 400 }}>Projelerimiz</span>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, color: '#e0dcd4', margin: '12px 0', lineHeight: 1.3 }}>
            Tamamlanan Projeler
          </h2>
          <div style={{ width: 40, height: 1, background: '#c4a350', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {projects.map((p, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', cursor: 'pointer' }}>
              <Image src={`/images/construction/${p.img}`} alt={p.title} fill unoptimized
                style={{ objectFit: 'cover', transition: 'transform 0.5s' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(17,17,17,0.8) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24 }}>
                <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c4a350', fontWeight: 400 }}>{p.cat}</span>
                <h3 style={{ fontSize: 15, fontWeight: 400, color: '#e0dcd4', marginTop: 4, letterSpacing: '0.02em' }}>{p.title}</h3>
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
    { num: '01', title: 'Planlama', desc: 'İhtiyaç analizi ve proje planlaması' },
    { num: '02', title: 'Tasarım', desc: 'Mimari tasarım ve görselleştirme' },
    { num: '03', title: 'İnşaat', desc: 'Profesyonel inşaat süreci' },
    { num: '04', title: 'Teslim', desc: 'Kalite kontrol ve anahtar teslim' },
  ];

  return (
    <section style={{ padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,80px)', background: '#0d0d0d' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c4a350', fontWeight: 400 }}>Süreç</span>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, color: '#e0dcd4', margin: '12px 0', lineHeight: 1.3 }}>
            Nasıl Çalışırız
          </h2>
          <div style={{ width: 40, height: 1, background: '#c4a350', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 28, color: '#222', fontWeight: 200, fontFamily: 'Georgia, serif' }}>{s.num}</span>
              <h3 style={{ fontSize: 14, fontWeight: 400, color: '#e0dcd4', margin: '12px 0 6px', letterSpacing: '0.04em' }}>{s.title}</h3>
              <p style={{ fontSize: 12, lineHeight: 1.7, color: '#555', fontWeight: 300 }}>{s.desc}</p>
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
    <section style={{ padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,80px)', borderTop: '1px solid #1a1a1a' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c4a350', fontWeight: 400 }}>Ekibimiz</span>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, color: '#e0dcd4', margin: '12px 0', lineHeight: 1.3 }}>
            Uzman Kadromuz
          </h2>
          <div style={{ width: 40, height: 1, background: '#c4a350', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
          {team.map((t, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 16px', border: '1px solid #1f1f1f' }}>
                <Image src={`/images/construction/${t.img}`} alt={t.name} width={120} height={120} unoptimized
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 400, color: '#e0dcd4', marginBottom: 2 }}>{t.name}</h3>
              <span style={{ fontSize: 11, color: '#c4a350', letterSpacing: '0.05em', fontWeight: 300 }}>{t.role}</span>
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
    <section id="contact" style={{ padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,80px)', background: '#0d0d0d' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c4a350', fontWeight: 400 }}>İletişim</span>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 300, color: '#e0dcd4', margin: '12px 0', lineHeight: 1.3 }}>
            Bizimle İletişime Geçin
          </h2>
          <div style={{ width: 40, height: 1, background: '#c4a350', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}
          className="[grid-template-columns:1fr] md:!grid-cols-2">

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <input placeholder="Ad Soyad" style={{
              width: '100%', padding: '14px 0', background: 'transparent',
              borderBottom: '1px solid #222', borderLeft: 'none', borderRight: 'none', borderTop: 'none',
              color: '#e0dcd4', fontSize: 14, fontWeight: 300, outline: 'none',
              transition: 'border-color 0.3s', fontFamily: 'inherit',
            }}
              onFocus={e => (e.currentTarget.style.borderColor = '#c4a350')}
              onBlur={e => (e.currentTarget.style.borderColor = '#222')}
            />
            <input placeholder="E-posta" type="email" style={{
              width: '100%', padding: '14px 0', background: 'transparent',
              borderBottom: '1px solid #222', borderLeft: 'none', borderRight: 'none', borderTop: 'none',
              color: '#e0dcd4', fontSize: 14, fontWeight: 300, outline: 'none',
              transition: 'border-color 0.3s', fontFamily: 'inherit',
            }}
              onFocus={e => (e.currentTarget.style.borderColor = '#c4a350')}
              onBlur={e => (e.currentTarget.style.borderColor = '#222')}
            />
            <input placeholder="Telefon" type="tel" style={{
              width: '100%', padding: '14px 0', background: 'transparent',
              borderBottom: '1px solid #222', borderLeft: 'none', borderRight: 'none', borderTop: 'none',
              color: '#e0dcd4', fontSize: 14, fontWeight: 300, outline: 'none',
              transition: 'border-color 0.3s', fontFamily: 'inherit',
            }}
              onFocus={e => (e.currentTarget.style.borderColor = '#c4a350')}
              onBlur={e => (e.currentTarget.style.borderColor = '#222')}
            />
            <textarea placeholder="Mesajınız" rows={4} style={{
              width: '100%', padding: '14px 0', background: 'transparent',
              borderBottom: '1px solid #222', borderLeft: 'none', borderRight: 'none', borderTop: 'none',
              color: '#e0dcd4', fontSize: 14, fontWeight: 300, outline: 'none', resize: 'vertical',
              transition: 'border-color 0.3s', fontFamily: 'inherit',
            }}
              onFocus={e => (e.currentTarget.style.borderColor = '#c4a350')}
              onBlur={e => (e.currentTarget.style.borderColor = '#222')}
            />
            <button style={{
              alignSelf: 'flex-start', padding: '14px 32px', background: '#c4a350', color: '#111',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer', transition: 'background 0.3s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = '#d4b360')}
              onMouseLeave={e => (e.currentTarget.style.background = '#c4a350')}
            >Gönder</button>
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingTop: 4 }}>
            {[
              { icon: Phone, label: '+90 212 555 00 00', title: 'Telefon' },
              { icon: Mail, label: 'info@elityapi.com', title: 'E-posta' },
              { icon: MapPin, label: 'Levent, Beşiktaş, İstanbul', title: 'Adres' },
              { icon: Clock, label: 'Pazartesi — Cumartesi 09:00 — 18:00', title: 'Çalışma Saatleri' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 16 }}>
                <div style={{
                  width: 40, height: 40, border: '1px solid #1f1f1f',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <item.icon size={16} style={{ color: '#c4a350', strokeWidth: 1.5 }} />
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444', marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 14, color: '#e0dcd4', fontWeight: 300 }}>{item.label}</div>
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
      marginTop: 'auto', borderTop: '1px solid #1a1a1a',
      padding: '40px clamp(20px,5vw,80px)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: 16,
    }}>
      <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#333' }}>
        © 2025 ELİT YAPI
      </span>
      <div style={{ display: 'flex', gap: 24 }}>
        {['Gizlilik', 'Koşullar', 'İletişim'].map((l) => (
          <span key={l} style={{ fontSize: 10, letterSpacing: '0.1em', color: '#444', cursor: 'pointer', transition: 'color 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#c4a350')}
            onMouseLeave={e => (e.currentTarget.style.color = '#444')}
          >{l}</span>
        ))}
      </div>
    </footer>
  );
}

/* ═══════════════════════════════
   PAGE
   ═══════════════════════════════ */
export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
