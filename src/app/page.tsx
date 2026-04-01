'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Arka Plan Resmi ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/bg-hero.jpg"
          alt=""
          fill
          unoptimized
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.35) contrast(1.1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)',
        }} />
      </div>

      {/* ── Glow ── */}
      <div className="glow" style={{ top: '20%', left: '30%' }} />
      <div className="glow" style={{ bottom: '15%', right: '20%', animationDelay: '2s' }} />

      {/* ── İçerik ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '0 20px',
      }}>

        {/* Başlık */}
        <h1 style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.9)',
          textAlign: 'center',
          letterSpacing: '-0.02em',
          marginBottom: 16,
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          3D Interactive
        </h1>

        {/* ── 3D Araba ── */}
        <div className="car-scene">
          <div className="car-body">
            {/* Ön */}
            <div className="car-face car-front">
              {/* Far */}
              <div style={{
                position: 'absolute', top: '50%', right: 8,
                width: 6, height: 18, borderRadius: 3,
                background: 'linear-gradient(180deg, #fff 0%, #aaa 100%)',
                boxShadow: '0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.2)',
              }} />
              {/* Radyatör ızgarası */}
              <div style={{
                position: 'absolute', top: '50%', right: 2,
                display: 'flex', flexDirection: 'column', gap: 2,
                transform: 'translateY(-50%)',
              }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} style={{
                    width: 16, height: 1.5,
                    background: 'rgba(255,255,255,0.15)',
                    borderRadius: 1,
                  }} />
                ))}
              </div>
              {/* Ön cam */}
              <div style={{
                position: 'absolute', top: 25, left: 30,
                width: 220, height: 55,
                background: 'linear-gradient(180deg, rgba(100,180,255,0.15) 0%, rgba(100,180,255,0.05) 100%)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px 4px 12px 12px',
                transform: 'skewX(-5deg)',
              }} />
              {/* Kapı çizgisi */}
              <div style={{
                position: 'absolute', bottom: 35, left: 30,
                width: 1, height: 50,
                background: 'rgba(255,255,255,0.06)',
              }} />
              <div style={{
                position: 'absolute', bottom: 35, left: 150,
                width: 1, height: 50,
                background: 'rgba(255,255,255,0.06)',
              }} />
            </div>

            {/* Arka */}
            <div className="car-face car-back">
              {/* Arka far */}
              <div style={{
                position: 'absolute', top: '50%', left: 8,
                width: 8, height: 16, borderRadius: 3,
                background: 'linear-gradient(180deg, #ff3333 0%, #990000 100%)',
                boxShadow: '0 0 12px rgba(255,50,50,0.4)',
              }} />
              {/* Plaka */}
              <div style={{
                position: 'absolute', bottom: 40, left: '50%',
                transform: 'translateX(-50%)',
                width: 60, height: 20,
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 3,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: 1 }}>3D</span>
              </div>
            </div>

            {/* Sol */}
            <div className="car-face car-left">
              {/* Arka tekerlek */}
              <div style={{
                position: 'absolute', bottom: -8, left: 5,
                width: 28, height: 28, borderRadius: '50%',
                background: 'radial-gradient(circle, #333 30%, #111 60%, #222 100%)',
                border: '2px solid #444',
              }}>
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: 12, height: 12, borderRadius: '50%',
                  background: '#555',
                  transform: 'translate(-50%, -50%)',
                }} />
              </div>
              {/* Ön tekerlek */}
              <div style={{
                position: 'absolute', bottom: -8, right: 5,
                width: 28, height: 28, borderRadius: '50%',
                background: 'radial-gradient(circle, #333 30%, #111 60%, #222 100%)',
                border: '2px solid #444',
              }}>
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: 12, height: 12, borderRadius: '50%',
                  background: '#555',
                  transform: 'translate(-50%, -50%)',
                }} />
              </div>
              {/* Cam */}
              <div style={{
                position: 'absolute', top: 20, left: 8,
                width: 60, height: 40,
                background: 'linear-gradient(180deg, rgba(100,180,255,0.12) 0%, rgba(100,180,255,0.04) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '2px 2px 8px 8px',
              }} />
            </div>

            {/* Sağ */}
            <div className="car-face car-right">
              {/* Arka tekerlek */}
              <div style={{
                position: 'absolute', bottom: -8, left: 5,
                width: 28, height: 28, borderRadius: '50%',
                background: 'radial-gradient(circle, #333 30%, #111 60%, #222 100%)',
                border: '2px solid #444',
              }}>
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: 12, height: 12, borderRadius: '50%',
                  background: '#555',
                  transform: 'translate(-50%, -50%)',
                }} />
              </div>
              {/* Ön tekerlek */}
              <div style={{
                position: 'absolute', bottom: -8, right: 5,
                width: 28, height: 28, borderRadius: '50%',
                background: 'radial-gradient(circle, #333 30%, #111 60%, #222 100%)',
                border: '2px solid #444',
              }}>
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: 12, height: 12, borderRadius: '50%',
                  background: '#555',
                  transform: 'translate(-50%, -50%)',
                }} />
              </div>
              {/* Cam */}
              <div style={{
                position: 'absolute', top: 20, right: 8,
                width: 60, height: 40,
                background: 'linear-gradient(180deg, rgba(100,180,255,0.12) 0%, rgba(100,180,255,0.04) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '2px 2px 8px 8px',
              }} />
            </div>

            {/* Üst */}
            <div className="car-face car-top">
              {/* Tavan çizgisi */}
              <div style={{
                position: 'absolute', top: '50%', left: 40,
                width: 240, height: 1,
                background: 'rgba(255,255,255,0.05)',
                transform: 'translateY(-50%)',
              }} />
            </div>

            {/* Alt */}
            <div className="car-face car-bottom" />
          </div>
        </div>

        {/* Gölge */}
        <div className="car-shadow" />

        {/* Yansıma çizgisi */}
        <div className="ground-line" />

        {/* Alt etiket */}
        <p style={{
          marginTop: 24,
          fontSize: 12,
          color: 'rgba(255,255,255,0.35)',
          fontWeight: 500,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          Rotate to explore
        </p>
      </div>
    </div>
  );
}
