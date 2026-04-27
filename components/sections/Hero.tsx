'use client';

import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    if (prefersReduced) {
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
  }, []);

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
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        <p
          className="text-[#0a0a0a] leading-tight copy-ja"
          style={{ fontSize: 'clamp(36px, 6vw, 88px)', fontWeight: 500, letterSpacing: '-0.01em' }}
        >
          <span className="whitespace-nowrap">思考を、</span>
          <br className="md:hidden" />
          <span className="whitespace-nowrap">次の現実へ。</span>
        </p>
        <p
          className="text-[#8a8a8a] mt-4 tracking-[0.18em]"
          style={{ fontSize: 'clamp(12px, 1.2vw, 18px)', fontWeight: 400 }}
        >
          {SITE_CONFIG.taglineEn}
        </p>
      </div>
    </section>
  );
}
