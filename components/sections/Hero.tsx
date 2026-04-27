'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { SITE_CONFIG } from '@/lib/config';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

const COLORS = ['#999999', '#bbbbbb', '#666666'];

function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.18,
    vy: (Math.random() - 0.5) * 0.18,
    radius: 0.6 + Math.random() * 1.4,
    opacity: 0.2 + Math.random() * 0.4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ width: 0, height: 0 });

  const [entered, setEntered] = useState(false);
  const [entrancePhase, setEntrancePhase] = useState<
    'gate' | 'seed' | 'ripple' | 'copy' | 'done'
  >('gate');
  const [ripple, setRipple] = useState<{ x: number; y: number; size: number } | null>(null);
  const [reduceMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const prevBodyOverflowRef = useRef<string | null>(null);

  const entranceTimersRef = useRef<number[]>([]);

  const tagline = useMemo(
    () => ({
      ja: '思考を、次の現実へ。',
      en: SITE_CONFIG.taglineEn,
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = () => window.innerWidth < 768;

    const applyResize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      sizeRef.current = { width: w, height: h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      // リセット後に再スケール（累積防止）
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = isMobile()
        ? Math.floor(40 + Math.random() * 60)
        : Math.floor(80 + Math.random() * 120);
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(w, h)
      );
    };

    applyResize();

    // リサイズをスロットリング（resize頻発時のパーティクル再生成を防ぐ）
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyResize, 150);
    });
    resizeObserver.observe(canvas);

    const drawOnce = () => {
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);
      for (const p of particlesRef.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    // prefers-reduced-motion: 1回描画して終了（rAF不使用）
    if (reduceMotion) {
      drawOnce();
      return () => {
        clearTimeout(resizeTimer);
        resizeObserver.disconnect();
      };
    }

    const animate = () => {
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animFrameRef.current = requestAnimationFrame(animate);
    };

    // タブ非表示時にアニメーション停止
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameRef.current);
      } else {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [reduceMotion]);

  useEffect(() => {
    return () => {
      for (const t of entranceTimersRef.current) window.clearTimeout(t);
      entranceTimersRef.current = [];
    };
  }, []);

  // Lock body scroll and interactions until entrance completes.
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const shouldLock = entrancePhase !== 'done';
    if (shouldLock) {
      if (prevBodyOverflowRef.current === null) {
        prevBodyOverflowRef.current = document.body.style.overflow ?? '';
      }
      document.body.style.overflow = 'hidden';
    } else {
      if (prevBodyOverflowRef.current !== null) {
        document.body.style.overflow = prevBodyOverflowRef.current;
        prevBodyOverflowRef.current = null;
      } else {
        document.body.style.overflow = '';
      }
    }

    return () => {
      // ensure cleanup restores overflow even if component unmounts mid-animation
      if (prevBodyOverflowRef.current !== null) {
        document.body.style.overflow = prevBodyOverflowRef.current;
        prevBodyOverflowRef.current = null;
      }
    };
  }, [entrancePhase]);

  const startEntrance = () => {
    if (entered) return;
    setEntered(true);

    if (reduceMotion) {
      setEntrancePhase('done');
      return;
    }

    const w = typeof window !== 'undefined' ? window.innerWidth : sizeRef.current.width;
    const h = typeof window !== 'undefined' ? window.innerHeight : sizeRef.current.height;

    // Ripple origin is always screen center (overlay is fixed)
    const x = w * 0.5;
    const y = h * 0.5;
    const maxR = Math.hypot(w, h) * 1.05;
    setRipple({ x, y, size: maxR * 2 });

    // A brief "birth" before expansion
    setEntrancePhase('seed');
    const seedT = window.setTimeout(() => setEntrancePhase('ripple'), 180);

    // Timeline:
    // 0.00s click
    // 0.18s ripple starts (duration 2.5s)
    // 3.60s copy starts (after logo mostly fades)
    // 4.25s done
    const t1 = window.setTimeout(() => setEntrancePhase('copy'), 3600);
    const t2 = window.setTimeout(() => setEntrancePhase('done'), 4250);
    entranceTimersRef.current.push(seedT, t1, t2);
  };

  return (
    <section
      id="hero"
      className="relative w-full bg-white flex items-center justify-center overflow-hidden"
      style={{ height: '100svh' }}
      aria-label="Hero"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
      <div
        className={[
          'relative z-10 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-700',
          entrancePhase === 'done' ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      >
        <p
          className="text-[#0a0a0a] leading-tight copy-ja"
          style={{ fontSize: 'clamp(36px, 6vw, 88px)', fontWeight: 500, letterSpacing: '-0.01em' }}
        >
          <span className="whitespace-nowrap">{tagline.ja.split('。')[0]}。</span>
          <br className="md:hidden" />
          <span className="whitespace-nowrap">{tagline.ja.split('。')[1] ? `${tagline.ja.split('。')[1]}。` : ''}</span>
        </p>
        <p
          className="text-[#8a8a8a] mt-4 tracking-[0.18em]"
          style={{ fontSize: 'clamp(12px, 1.2vw, 18px)', fontWeight: 400 }}
        >
          {tagline.en}
        </p>
      </div>

      {/* Entrance overlay */}
      {entrancePhase !== 'done' && (
        <div
          className="fixed inset-0 z-[80] cursor-pointer group"
          style={{
            background:
              entrancePhase === 'gate' || entrancePhase === 'seed' || entrancePhase === 'ripple'
                ? '#0a0a0a'
                : '#ffffff',
          }}
          role="button"
          tabIndex={0}
          aria-label="Enter RAPTOVA"
          onClick={() => startEntrance()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') startEntrance();
          }}
        >
          {/* Ripple (black → white) */}
          {(entrancePhase === 'seed' ||
            entrancePhase === 'ripple' ||
            entrancePhase === 'copy') &&
            ripple && (
              <>
                {/* Seed dot (a short "breath" before expansion) */}
                {entrancePhase === 'seed' && (
                  <div
                    className="absolute rounded-full"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: 14,
                      height: 14,
                      transform: 'translate(-50%, -50%) scale(0.75)',
                      background: '#ffffff',
                      opacity: 0,
                      filter: 'blur(0.15px)',
                      animation: 'raptovaSeed 0.18s ease-out forwards',
                    }}
                    aria-hidden="true"
                  />
                )}
                {/* White fill */}
                <div
                  className="absolute"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                    transform: 'translate(-50%, -50%) scale(0)',
                    background: '#ffffff',
                    borderRadius: '50%',
                    filter: 'blur(0.3px)',
                    animation:
                      entrancePhase === 'ripple'
                        ? 'raptovaRipple 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
                        : 'none',
                  }}
                  aria-hidden="true"
                />
                {/* Subtle ring ripples */}
                <div
                  className="absolute"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                    transform: 'translate(-50%, -50%) scale(0)',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.62)',
                    filter: 'blur(0.35px)',
                    opacity: 0,
                    animation:
                      entrancePhase === 'ripple'
                        ? 'raptovaRingRipple 2.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) 260ms forwards'
                        : 'none',
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                    transform: 'translate(-50%, -50%) scale(0)',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.4)',
                    filter: 'blur(0.5px)',
                    opacity: 0,
                    animation:
                      entrancePhase === 'ripple'
                        ? 'raptovaRingRipple 2.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 420ms forwards'
                        : 'none',
                  }}
                  aria-hidden="true"
                />
                {/* Edge shimmer (subtle gray wavering line) */}
                <div
                  className="absolute"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                    transform: 'translate(-50%, -50%) scale(0)',
                    borderRadius: '50%',
                    border: '1px solid rgba(210,210,210,0.32)',
                    filter: 'blur(0.2px)',
                    opacity: 0,
                    animation:
                      entrancePhase === 'ripple'
                        ? 'raptovaEdgeWaver 2.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) 360ms forwards'
                        : 'none',
                  }}
                  aria-hidden="true"
                />
              </>
            )}

          {/* Gate text */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: entered ? 0 : 1, pointerEvents: entered ? 'none' : 'auto' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center select-none">
                <p
                  className="text-white tracking-[0.14em]"
                  style={{ fontSize: 'clamp(16px, 1.35vw, 20px)', fontWeight: 400 }}
                >
                  <span
                    className="inline-block"
                    style={{ animation: 'raptovaGatePulse 1.65s ease-in-out infinite' }}
                  >
                    Enter RAPTOVA
                  </span>
                </p>
                <p
                  className="text-[#bdbdbd] mt-3 tracking-[0.16em] transition-opacity duration-200 group-hover:opacity-100"
                  style={{ fontSize: 'clamp(10px, 0.95vw, 12px)', fontWeight: 400, opacity: 0.88 }}
                >
                  Click to begin
                </p>

                <div className="mt-5 flex items-center justify-center" aria-hidden="true">
                  <div
                    className="relative"
                    style={{ width: 84, height: 84 }}
                  >
                    <div
                      className="absolute inset-0 rounded-full border border-white/25"
                      style={{ animation: 'raptovaRing 1.85s ease-in-out infinite' }}
                    />
                    <div
                      className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-white/70"
                      style={{ transform: 'translate(-50%, -50%)', animation: 'raptovaDot 1.25s ease-in-out infinite' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RAPTOVA logo: always centered, revealed by white ripple */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p
              className="text-[#0a0a0a] tracking-[0.18em]"
              style={{
                fontSize: 'clamp(42px, 4.8vw, 84px)',
                fontWeight: 500,
                // Logo exists from the start; becomes visible as the white ripple reaches it.
                // Fade schedule: hold ~1.2s, then fade out until ~3.6s.
                opacity: entered ? 0.98 : 0.08,
                filter: 'blur(0px)',
                animation: entered && !reduceMotion ? 'raptovaLogoLife 3.6s ease-out both' : 'none',
              }}
              aria-hidden="true"
            >
              RAPTOVA
            </p>
          </div>

          {/* Copy fade hint (overlay stage) */}
          {entrancePhase === 'copy' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="text-center"
                style={{
                  opacity: 0,
                  filter: 'blur(2px)',
                  transform: 'translateY(12px)',
                  animation: 'raptovaCopyRise 0.9s ease-out forwards',
                }}
                aria-hidden="true"
              >
                <p
                  className="text-[#0a0a0a] leading-tight copy-ja"
                  style={{ fontSize: 'clamp(36px, 6vw, 88px)', fontWeight: 500, letterSpacing: '-0.01em' }}
                >
                  {tagline.ja}
                </p>
                <p
                  className="text-[#8a8a8a] mt-4 tracking-[0.18em]"
                  style={{ fontSize: 'clamp(12px, 1.2vw, 18px)', fontWeight: 400 }}
                >
                  {tagline.en}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes raptovaSeed {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
          60% { opacity: 0.95; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0.85; transform: translate(-50%, -50%) scale(0.95); }
        }
        @keyframes raptovaRipple {
          0% { transform: translate(-50%, -50%) scale(0); border-radius: 50%; opacity: 1; }
          30% { border-radius: 49% 51% 50% 50% / 50% 50% 49% 51%; }
          55% { border-radius: 50% 50% 49% 51% / 51% 49% 50% 50%; }
          78% { border-radius: 49.5% 50.5% 50% 50% / 50% 50% 49.5% 50.5%; }
          100% { transform: translate(-50%, -50%) scale(1); border-radius: 50%; opacity: 1; }
        }
        @keyframes raptovaRingRipple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; border-radius: 50%; }
          15% { opacity: 0.55; }
          40% { border-radius: 49% 51% 50% 50% / 50% 50% 49% 51%; }
          70% { opacity: 0.18; border-radius: 50% 50% 49% 51% / 51% 49% 50% 50%; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; border-radius: 50%; }
        }
        @keyframes raptovaEdgeWaver {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; border-radius: 50%; }
          18% { opacity: 0.42; }
          38% { border-radius: 49% 51% 50% 50% / 50% 50% 49% 51%; }
          62% { border-radius: 50% 50% 49% 51% / 51% 49% 50% 50%; opacity: 0.18; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; border-radius: 50%; }
        }
        @keyframes raptovaGatePulse {
          0%, 100% { opacity: 0.78; }
          50% { opacity: 1; }
        }
        @keyframes raptovaRing {
          0%, 100% { transform: scale(1); opacity: 0.22; }
          50% { transform: scale(1.06); opacity: 0.32; }
        }
        @keyframes raptovaDot {
          0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.95; transform: translate(-50%, -50%) scale(1.12); }
        }
        @keyframes raptovaFlicker {
          0% { opacity: 0.06; filter: blur(0px); transform: translateX(0); }
          20% { opacity: 0.22; filter: blur(0.2px); transform: translateX(-1px); }
          40% { opacity: 0.12; filter: blur(0px); transform: translateX(1px); }
          60% { opacity: 0.26; filter: blur(0.3px); transform: translateX(0); }
          80% { opacity: 0.14; filter: blur(0px); transform: translateX(-1px); }
          100% { opacity: 0.18; filter: blur(0px); transform: translateX(0); }
        }
        @keyframes raptovaLogoLife {
          0% { opacity: 0.98; filter: blur(0px); }
          33% { opacity: 0.98; filter: blur(0px); }
          92% { opacity: 0.12; filter: blur(0.3px); }
          100% { opacity: 0; filter: blur(0.9px); }
        }
        @keyframes raptovaCopyRise {
          0% { opacity: 0; transform: translateY(12px); filter: blur(2px); }
          70% { opacity: 1; transform: translateY(0px); filter: blur(0.25px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
      `}</style>
    </section>
  );
}
