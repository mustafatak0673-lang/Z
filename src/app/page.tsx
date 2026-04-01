'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowRight, Phone, Mail, MapPin, Clock, ChevronDown, Shield, Award, Users, Star, CheckCircle } from 'lucide-react';

/* ═══ RENK PALETİ ═══
   Sarı: #EAB308
   Koyu: #1C1917
   Gri: #78716C
   Açık: #FAFAF9
   Bej: #F5F5F4
   Kahve: #A8A29E
   ═══════════════════ */

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

  const links = [['about','Hakkımızda'],['services','Hizmetler'],['projects','Projeler'],['contact','İletişim']];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px, 4vw, 60px)',
        background: scrolled ? 'rgba(250,250,249,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #E7E5E4' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{ width: 36, height: 36, background: '#EAB308', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#1C1917', letterSpacing: '-0.02em' }}>EY</span>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: scrolled ? '#1C1917' : '#fff', letterSpacing: '0.02em', transition: 'color 0.3s' }}>
            ELİT <span style={{ color: '#EAB308' }}>YAPI</span>
          </span>
        </div>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 32 }}>
          {links.map(([id, label]) => (
            <span key={id} onClick={() => go(id)} style={{
              fontSize: 13, fontWeight: 500, letterSpacing: '0.01em',
              color: scrolled ? '#57534E' : 'rgba(255,255,255,0.85)',
              cursor: 'pointer', transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#EAB308'}
              onMouseLeave={e => e.currentTarget.style.color = scrolled ? '#57534E' : 'rgba(255,255,255,0.85)'}
            >{label}</span>
          ))}
          <span onClick={() => go('contact')} style={{
            fontSize: 13, fontWeight: 600, color: '#1C1917',
            background: '#EAB308', padding: '10px 22px', borderRadius: 8,
            cursor: 'pointer', transition: 'background 0.3s, transform 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#CA8A04'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#EAB308'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >Teklif Alın</span>
        </div>

        <button onClick={() => setOpen(true)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: scrolled ? '#1C1917' : '#fff', padding: 4 }}>
          <Menu size={22} strokeWidth={2} />
        </button>
      </nav>

      {/* Mobil Menü */}
      <div onClick={() => setOpen(false)} style={{
        position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(250,250,249,0.98)',
        backdropFilter: 'blur(20px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 0.3s ease',
      }}>
        <button onClick={() => setOpen(false)} style={{ position: 'absolute', top: 18, right: 20, background: 'none', border: 'none', cursor: 'pointer', color: '#1C1917' }}>
          <X size={24} strokeWidth={2} />
        </button>
        {links.map(([id, label]) => (
          <span key={id} onClick={e => { e.stopPropagation(); go(id); }} style={{
            fontSize: 20, fontWeight: 600, color: '#1C1917', cursor: 'pointer',
            letterSpacing: '0.04em',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#EAB308'}
            onMouseLeave={e => e.currentTarget.style.color = '#1C1917'}
          >{label}</span>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════
   HERO
   ═══════════════════════ */
function Hero() {
  return (
    <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Arka Plan */}
      <div className="hidden md:block" style={{ position: 'absolute', inset: 0 }}>
        <Image src="/images/construction/hero.png" alt="" fill unoptimized priority style={{ objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(28,25,23,0.85) 0%, rgba(28,25,23,0.4) 60%, rgba(28,25,23,0.6) 100%)' }} />
      </div>
      <div className="md:hidden" style={{ position: 'absolute', inset: 0 }}>
        <Image src="/images/construction/hero.png" alt="" fill unoptimized priority style={{ objectFit: 'cover', opacity: 0.15 }} />
        <div style={{ position: 'absolute', inset: 0, background: '#1C1917' }} />
      </div>

      {/* Sarı çizgi */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'flex', alignItems: 'center',
        padding: '0 clamp(20px, 5vw, 60px)',
      }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, width: '100%' }}>
          <div style={{ maxWidth: 640 }}>
            {/* Etiket */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
              <div style={{ width: 40, height: 3, background: '#EAB308', borderRadius: 2 }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#EAB308', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                2000&apos;den beri İstanbul&apos;da
              </span>
            </div>

            {/* Başlık */}
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800,
              lineHeight: 1.12, color: '#fff', marginBottom: 20, letterSpacing: '-0.03em',
            }}>
              Hayalinizdeki<br />
              Yapıyı <span style={{ color: '#EAB308' }}>Birlikte</span><br />
              İnşa Edelim
            </h1>

            {/* Açıklama */}
            <p style={{
              fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.65)',
              fontWeight: 400, maxWidth: 420, marginBottom: 36,
            }}>
              25 yıllık tecrübemizle konut, ticari yapı ve restorasyon projelerinde
              kaliteli, zamanında ve güvenilir çözümler sunuyoruz.
            </p>

            {/* Butonlar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 30px', background: '#EAB308', color: '#1C1917',
                fontSize: 13, fontWeight: 700, letterSpacing: '0.02em',
                border: 'none', borderRadius: 10, cursor: 'pointer',
                transition: 'background 0.3s, transform 0.2s, box-shadow 0.3s',
                boxShadow: '0 4px 20px rgba(234,179,8,0.3)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#CA8A04'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(234,179,8,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#EAB308'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(234,179,8,0.3)'; }}
              >
                Projelerimiz <ArrowRight size={16} strokeWidth={2} />
              </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 30px', background: 'rgba(255,255,255,0.1)',
                color: '#fff', fontSize: 13, fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10, cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.3s, border-color 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              >
                <Phone size={15} strokeWidth={2} /> İletişim
              </button>
            </div>

            {/* Rakamlar */}
            <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap' }}>
              {[
                { n: '25+', t: 'Yıl Deneyim' },
                { n: '200+', t: 'Proje' },
                { n: '%98', t: 'Memnuniyet' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#EAB308', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 500, marginTop: 2 }}>{s.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Aşağı scroll */}
      <div style={{
        position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        cursor: 'pointer', animation: 'float 3s ease-in-out infinite',
      }} onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Keşfet</span>
        <ChevronDown size={18} color="rgba(255,255,255,0.4)" />
      </div>
    </section>
  );
}

/* ═══════════════════════
   HAKKIMIZDA
   ═══════════════════════ */
function About() {
  return (
    <section id="about" style={{ padding: 'clamp(60px,10vw,100px) clamp(20px,4vw,60px)', background: '#fff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,5vw,80px)', alignItems: 'center',
        }} className="[grid-template-columns:1fr] md:!grid-cols-2">

          <div>
            <span style={{
              fontSize: 11, fontWeight: 700, color: '#EAB308', letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>Hakkımızda</span>
            <h2 style={{
              fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#1C1917',
              margin: '10px 0 20px', lineHeight: 1.2, letterSpacing: '-0.02em',
            }}>
              25 Yılda <span style={{ color: '#EAB308' }}>500&apos;den Fazla</span><br />Proje Teslim Ettik
            </h2>
            <div style={{ width: 50, height: 3, background: '#E7E5E4', borderRadius: 2, marginBottom: 24 }} />

            <p style={{ fontSize: 15, lineHeight: 1.85, color: '#78716C', marginBottom: 16 }}>
              ELİT YAPI, 2000 yılında İstanbul&apos;da kurulmuş olup, bugüne kadar premium konut projeleri,
              ticari yapılar, otel ve restorasyon alanlarında yüzlerce başarılı projeye imza atmıştır.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: '#78716C', marginBottom: 28 }}>
              Müşterilerimize sadece bina değil, yaşam kalitesi sunuyoruz. Modern mimari anlayış,
              kaliteli malzeme ve zamanında teslim ilkemizle sektörde fark yaratıyoruz.
            </p>

            {/* Özellikler */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
              {[
                'ISO 9001 Kalite Yönetim Sertifikası',
                'Zamanında teslim garantisi',
                '7/24 teknik destek',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle size={16} color="#EAB308" strokeWidth={2} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#1C1917' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}>
              <Image src="/images/construction/about-team.png" alt="ELİT YAPI Ekip" width={600} height={450} unoptimized
                style={{ objectFit: 'cover', width: '100%', height: 'auto', display: 'block' }} />
            </div>
            {/* Badge */}
            <div style={{
              position: 'absolute', bottom: -16, left: -16,
              background: '#1C1917', borderRadius: 14, padding: '18px 24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#EAB308', lineHeight: 1 }}>25+</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginTop: 2 }}>Yıllık Tecrübe</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════
   HİZMETLER
   ═══════════════════════ */
function Services() {
  const items = [
    { title: 'Konut İnşaatı', desc: 'Lüks villa, rezidans ve apartman projeleri tasarımı ve inşaatı.', img: 'service-residential.png' },
    { title: 'Ticari Yapılar', desc: 'Ofis binası, AVM, iş merkezi ve ticari yapı projeleri.', img: 'service-commercial.png' },
    { title: 'İç Tasarım', desc: 'Premium malzemelerle modern ve fonksiyonel mekan tasarımı.', img: 'service-interior.png' },
    { title: 'Restorasyon', desc: 'Tarihi ve eski yapıların özgün dokuya uygun restore edilmesi.', img: 'service-renovation.png' },
  ];

  return (
    <section id="services" style={{ padding: 'clamp(60px,10vw,100px) clamp(20px,4vw,60px)', background: '#F5F5F4' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#EAB308', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Hizmetlerimiz</span>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#1C1917', margin: '10px 0', lineHeight: 1.2 }}>
            Uzmanlık Alanlarımız
          </h2>
          <p style={{ fontSize: 15, color: '#78716C', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Her projede kalite, güven ve zamanında teslim ilkesiyle hareket ediyoruz.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
          {items.map((s, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              border: '1px solid #E7E5E4',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
            >
              <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                <Image src={`/images/construction/${s.img}`} alt={s.title} fill unoptimized
                  style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                  sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div style={{ padding: '22px' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1C1917', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: '#78716C' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════
   PROJELER
   ═══════════════════════ */
function Projects() {
  const items = [
    { title: 'Vista Premium Konutları', cat: 'Konut', img: 'project-villa.png' },
    { title: 'Grand Otel Merkez', cat: 'Otel', img: 'project-hotel.png' },
    { title: 'Skyline İş Merkezi', cat: 'Ticari', img: 'project-office.png' },
    { title: 'Metropol AVM', cat: 'AVM', img: 'project-mall.png' },
  ];

  return (
    <section id="projects" style={{ padding: 'clamp(60px,10vw,100px) clamp(20px,4vw,60px)', background: '#fff' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#EAB308', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Projelerimiz</span>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#1C1917', margin: '10px 0', lineHeight: 1.2 }}>
            Tamamlanan Projeler
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {items.map((p, i) => (
            <div key={i} style={{
              position: 'relative', aspectRatio: '16/10', overflow: 'hidden',
              borderRadius: 14, cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <Image src={`/images/construction/${p.img}`} alt={p.title} fill unoptimized
                style={{ objectFit: 'cover', transition: 'transform 0.5s' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(28,25,23,0.75) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 22 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#EAB308', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{p.cat}</span>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginTop: 4 }}>{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════
   SÜREÇ
   ═══════════════════════ */
function Process() {
  const steps = [
    { num: '01', title: 'Keşif & Planlama', desc: 'İhtiyaçlarınızı dinler, detaylı proje planlaması yaparız.' },
    { num: '02', title: 'Tasarım', desc: 'Mimari tasarım ve 3D görselleştirme ile projeyi canlandırırız.' },
    { num: '03', title: 'İnşaat', desc: 'Profesyonel ekiplerimizle güvenli ve hızlı inşaat süreci.' },
    { num: '04', title: 'Teslim', desc: 'Kalite kontrol ve anahtar teslim projenizi teslim ediyoruz.' },
  ];

  return (
    <section style={{ padding: 'clamp(60px,10vw,100px) clamp(20px,4vw,60px)', background: '#F5F5F4' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#EAB308', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Süreç</span>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#1C1917', margin: '10px 0', lineHeight: 1.2 }}>
            Nasıl Çalışırız
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 20 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 14, padding: '28px 22px',
              textAlign: 'center', border: '1px solid #E7E5E4',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: '#EAB308', display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#1C1917' }}>{s.num}</span>
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1C1917', marginBottom: 8 }}>{s.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: '#78716C' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════
   EKİP
   ═══════════════════════ */
function Team() {
  const members = [
    { name: 'Murat Özkan', role: 'Kurucu & CEO', img: 'team-ceo.png' },
    { name: 'Ayşe Arslan', role: 'Baş Mimari', img: 'team-architect.png' },
    { name: 'Can Yıldırım', role: 'Baş Mühendis', img: 'team-engineer.png' },
    { name: 'Deniz Şahin', role: 'Proje Müdürü', img: 'team-manager.png' },
  ];

  return (
    <section style={{ padding: 'clamp(60px,10vw,100px) clamp(20px,4vw,60px)', background: '#fff' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#EAB308', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Ekibimiz</span>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#1C1917', margin: '10px 0', lineHeight: 1.2 }}>
            Uzman Kadromuz
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24 }}>
          {members.map((m, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: 120, height: 120, borderRadius: '50%', overflow: 'hidden',
                margin: '0 auto 14px', border: '3px solid #E7E5E4',
                transition: 'border-color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#EAB308'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#E7E5E4'}
              >
                <Image src={`/images/construction/${m.img}`} alt={m.name} width={120} height={120} unoptimized
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1C1917', marginBottom: 2 }}>{m.name}</h3>
              <span style={{ fontSize: 12, color: '#EAB308', fontWeight: 600 }}>{m.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════
   İLETİŞİM
   ═══════════════════════ */
function Contact() {
  return (
    <section id="contact" style={{ padding: 'clamp(60px,10vw,100px) clamp(20px,4vw,60px)', background: '#F5F5F4' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#EAB308', letterSpacing: '0.15em', textTransform: 'uppercase' }}>İletişim</span>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#1C1917', margin: '10px 0', lineHeight: 1.2 }}>
            Bizimle İletişime Geçin
          </h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(28px,4vw,60px)', alignItems: 'start',
        }} className="[grid-template-columns:1fr] md:!grid-cols-2">

          {/* Form */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: 28,
            border: '1px solid #E7E5E4', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            {[
              { placeholder: 'Adınız Soyadınız', type: 'text' },
              { placeholder: 'E-posta Adresiniz', type: 'email' },
              { placeholder: 'Telefon Numaranız', type: 'tel' },
            ].map((f, i) => (
              <input key={i} placeholder={f.placeholder} type={f.type} style={{
                width: '100%', padding: '14px 16px', background: '#FAFAF9',
                border: '1px solid #E7E5E4', borderRadius: 10,
                color: '#1C1917', fontSize: 14, outline: 'none', fontFamily: 'inherit',
                transition: 'border-color 0.3s',
              }}
                onFocus={e => e.currentTarget.style.borderColor = '#EAB308'}
                onBlur={e => e.currentTarget.style.borderColor = '#E7E5E4'}
              />
            ))}
            <textarea placeholder="Mesajınızı yazın..." rows={4} style={{
              width: '100%', padding: '14px 16px', background: '#FAFAF9',
              border: '1px solid #E7E5E4', borderRadius: 10,
              color: '#1C1917', fontSize: 14, outline: 'none', resize: 'vertical', fontFamily: 'inherit',
              transition: 'border-color 0.3s',
            }}
              onFocus={e => e.currentTarget.style.borderColor = '#EAB308'}
              onBlur={e => e.currentTarget.style.borderColor = '#E7E5E4'}
            />
            <button style={{
              padding: '14px 28px', background: '#EAB308', color: '#1C1917',
              fontSize: 13, fontWeight: 700, border: 'none', borderRadius: 10,
              cursor: 'pointer', transition: 'background 0.3s, transform 0.2s',
              boxShadow: '0 4px 15px rgba(234,179,8,0.2)',
              alignSelf: 'flex-start',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#CA8A04'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#EAB308'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >Mesaj Gönder</button>
          </div>

          {/* Bilgiler */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: Phone, label: '+90 212 555 00 00', title: 'Telefon' },
              { icon: Mail, label: 'info@elityapi.com', title: 'E-posta' },
              { icon: MapPin, label: 'Levent, Beşiktaş, İstanbul', title: 'Adres' },
              { icon: Clock, label: 'Pazartesi — Cumartesi: 09:00 — 18:00', title: 'Çalışma Saatleri' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', gap: 14, padding: '18px 20px',
                background: '#fff', borderRadius: 12, border: '1px solid #E7E5E4',
                transition: 'transform 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 10, background: '#FEF9C3',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <item.icon size={18} color="#EAB308" strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#A8A29E', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#1C1917' }}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════
   FOOTER
   ═══════════════════════ */
function Footer() {
  return (
    <footer style={{
      marginTop: 'auto', borderTop: '1px solid #E7E5E4',
      padding: '32px clamp(20px,4vw,60px)', background: '#1C1917',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, background: '#EAB308', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#1C1917' }}>EY</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
            © 2025 ELİT YAPI
          </span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Gizlilik', 'Koşullar', 'İletişim'].map(l => (
            <span key={l} style={{
              fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer', transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#EAB308'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════
   PAGE
   ═══════════════════════ */
export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FAFAF9' }}>
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
