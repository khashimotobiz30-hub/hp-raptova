'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

export type DrawPoint = {
  x: number;
  y: number;
  pressure?: number;
  time: number;
};

export type DrawStroke = {
  points: DrawPoint[];
};

type HeroState = 'idle' | 'drawing' | 'structuring' | 'collapsing' | 'revealed';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  opacity: number;
};

type Size = { w: number; h: number; dpr: number };

type StructureNode = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
};

type StructureEdge = [number, number];

const INK = '#0a0a0a';
const INK_SOFT = '#555555';

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function dist(ax: number, ay: number, bx: number, by: number) {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.hypot(dx, dy);
}

function createParticle(w: number, h: number): Particle {
  const baseVx = (Math.random() - 0.5) * 0.18;
  const baseVy = (Math.random() - 0.5) * 0.18;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: baseVx,
    vy: baseVy,
    baseVx,
    baseVy,
    radius: 0.6 + Math.random() * 1.2,
    opacity: 0.14 + Math.random() * 0.28,
  };
}

function getPointerPressure(e: PointerEvent) {
  const p = typeof e.pressure === 'number' ? e.pressure : undefined;
  return p && p > 0 ? p : undefined;
}

function getStrokeLength(strokes: DrawStroke[]) {
  let total = 0;
  for (const s of strokes) {
    for (let i = 1; i < s.points.length; i++) {
      const a = s.points[i - 1]!;
      const b = s.points[i]!;
      total += dist(a.x, a.y, b.x, b.y);
    }
  }
  return total;
}

function getStrokePointCount(strokes: DrawStroke[]) {
  let c = 0;
  for (const s of strokes) c += s.points.length;
  return c;
}

function centroidFromStrokes(strokes: DrawStroke[]) {
  let sx = 0;
  let sy = 0;
  let n = 0;
  for (const s of strokes) {
    for (const p of s.points) {
      sx += p.x;
      sy += p.y;
      n++;
    }
  }
  if (!n) return { x: 0, y: 0 };
  return { x: sx / n, y: sy / n };
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const sizeRef = useRef<Size>({ w: 0, h: 0, dpr: 1 });
  const particlesRef = useRef<Particle[]>([]);
  const strokesRef = useRef<DrawStroke[]>([]);
  const activeStrokeRef = useRef<DrawStroke | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const lastInputAtRef = useRef<number>(0);
  const isPointerDownRef = useRef(false);
  const structTimerRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  const structureRef = useRef<{
    nodes: StructureNode[];
    edges: StructureEdge[];
    anchor: { x: number; y: number };
    t: number;
  } | null>(null);

  const phaseRef = useRef<{
    state: HeroState;
    startedAt: number;
  }>({ state: 'idle', startedAt: 0 });

  const [heroState, setHeroState] = useState<HeroState>('idle');

  const headerOffset = 72; // Header.tsx height
  const copy = useMemo(() => {
    const idle = {
      ja: 'まだ形のない思考を、描いてください。',
      en: 'Draw your thought.',
    };
    const revealed = {
      ja: '思考を、次の現実へ。',
      en: 'Evolve Your Reality.',
    };
    return { idle, revealed };
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reducedMotionRef.current = prefersReduced;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = () => window.innerWidth < 768;

    const applyResize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      sizeRef.current = { w, h, dpr };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      // リセット後に再スケール（累積防止）
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = prefersReduced
        ? isMobile()
          ? 60
          : 110
        : isMobile()
          ? 110
          : 190;
      particlesRef.current = Array.from({ length: count }, () => createParticle(w, h));
    };

    applyResize();

    // リサイズをスロットリング（resize頻発時のパーティクル再生成を防ぐ）
    let resizeTimer: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyResize, 150);
    });
    resizeObserver.observe(canvas);

    const scheduleStructuring = () => {
      if (structTimerRef.current) window.clearTimeout(structTimerRef.current);
      const wait = prefersReduced ? 400 : 950;
      structTimerRef.current = window.setTimeout(() => {
        if (phaseRef.current.state !== 'drawing') return;
        if (isPointerDownRef.current) return;
        const len = getStrokeLength(strokesRef.current);
        const pts = getStrokePointCount(strokesRef.current);
        const enough = len > 520 || pts > 120;
        if (!enough) return;

        if (prefersReduced) {
          phaseRef.current = { state: 'revealed', startedAt: performance.now() };
          setHeroState('revealed');
          return;
        }

        const anchor = centroidFromStrokes(strokesRef.current);
        const nodes = buildStructureNodes(strokesRef.current, anchor, sizeRef.current);
        const edges = buildStructureEdges(nodes, 3);
        structureRef.current = { nodes, edges, anchor, t: 0 };

        phaseRef.current = { state: 'structuring', startedAt: performance.now() };
        setHeroState('structuring');
      }, wait);
    };

    const onPointerDown = (e: PointerEvent) => {
      // ヘッダー操作を邪魔しない（Hero内のみ）
      isPointerDownRef.current = true;
      lastInputAtRef.current = performance.now();

      if (phaseRef.current.state === 'idle') {
        phaseRef.current = { state: 'drawing', startedAt: performance.now() };
        setHeroState('drawing');
      }

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      activeStrokeRef.current = { points: [{ x, y, pressure: getPointerPressure(e), time: Date.now() }] };
      strokesRef.current = [...strokesRef.current, activeStrokeRef.current];
      lastPointerRef.current = { x, y, t: performance.now() };
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDownRef.current) return;
      lastInputAtRef.current = performance.now();
      const stroke = activeStrokeRef.current;
      if (!stroke) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const last = stroke.points[stroke.points.length - 1];
      if (last && dist(last.x, last.y, x, y) < 1.2) return;
      stroke.points.push({ x, y, pressure: getPointerPressure(e), time: Date.now() });
      lastPointerRef.current = { x, y, t: performance.now() };
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isPointerDownRef.current) return;
      isPointerDownRef.current = false;
      activeStrokeRef.current = null;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // no-op
      }
      scheduleStructuring();
    };

    const onPointerCancel = () => {
      isPointerDownRef.current = false;
      activeStrokeRef.current = null;
      scheduleStructuring();
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerCancel);

    const tick = () => {
      const now = performance.now();
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const state = phaseRef.current.state;
      const cx = w * 0.5;
      const cy = h * 0.5;
      const r = clamp(Math.min(w, h) * 0.28, 220, 320);
      const mask =
        state === 'revealed'
          ? { cx, cy, r, insideAlpha: 0.22 }
          : state === 'collapsing'
            ? { cx, cy, r: r * 0.92, insideAlpha: 0.35 }
            : state === 'structuring'
              ? { cx, cy, r: r * 0.78, insideAlpha: 0.55 }
              : undefined;

      drawParticles(
        ctx,
        particlesRef.current,
        state,
        structureRef.current?.anchor ?? null,
        w,
        h,
        prefersReduced,
        mask,
      );
      drawInputResponse(ctx, strokesRef.current, state, prefersReduced, mask);

      if (state === 'structuring' && structureRef.current) {
        const t = clamp((now - phaseRef.current.startedAt) / 1400, 0, 1);
        structureRef.current.t = t;
        drawStructure(ctx, structureRef.current, t, mask);
        if (t >= 1) {
          phaseRef.current = { state: 'collapsing', startedAt: now };
          setHeroState('collapsing');
        }
      }

      if (state === 'collapsing') {
        const t = clamp((now - phaseRef.current.startedAt) / 1500, 0, 1);
        if (structureRef.current) {
          drawCollapsingStructure(ctx, structureRef.current, t, mask);
        }
        if (t >= 1) {
          // 残像として薄く残す
          phaseRef.current = { state: 'revealed', startedAt: now };
          setHeroState('revealed');
        }
      }

      // idle / drawing / revealed は継続描画
      rafRef.current = requestAnimationFrame(tick);
    };

    // タブ非表示時にアニメーション停止
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      if (structTimerRef.current) window.clearTimeout(structTimerRef.current);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerCancel);
    };
  }, []);

  const handleSkip = () => {
    structureRef.current = null;
    phaseRef.current = { state: 'revealed', startedAt: performance.now() };
    setHeroState('revealed');
  };

  return (
    <section
      id="hero"
      className="relative w-full bg-white overflow-hidden"
      style={{ height: `calc(100svh - ${headerOffset}px)`, paddingTop: headerOffset }}
      aria-label="Hero"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ touchAction: 'none' }}
        aria-label="思考を描けるキャンバス"
      />
      <div className="relative z-10 h-full w-full flex items-center justify-center px-6 pointer-events-none">
        <div className="text-center max-w-[900px]">
          {heroState !== 'revealed' ? (
            <>
              <p
                className="text-[#0a0a0a] copy-ja leading-[1.15]"
                style={{
                  fontSize: 'clamp(28px, 3.8vw, 56px)',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                }}
              >
                {copy.idle.ja}
                <br />
                {copy.idle.en}
              </p>
              <p
                className="text-[#8a8a8a] mt-5 tracking-[0.14em]"
                style={{ fontSize: 'clamp(11px, 1.0vw, 14px)', fontWeight: 400 }}
              >
                Drag or write on this space
              </p>
            </>
          ) : (
            <>
              <p
                className="text-[#0a0a0a] leading-tight copy-ja"
                style={{
                  fontSize: 'clamp(36px, 6vw, 88px)',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                }}
              >
                <span className="whitespace-nowrap">{copy.revealed.ja}</span>
              </p>
              <p
                className="text-[#8a8a8a] mt-4 tracking-[0.18em]"
                style={{ fontSize: 'clamp(12px, 1.2vw, 18px)', fontWeight: 400 }}
              >
                {copy.revealed.en}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Skip */}
      {heroState !== 'revealed' && (
        <button
          type="button"
          onClick={handleSkip}
          className="absolute bottom-6 right-6 text-[#555555] text-xs tracking-[0.12em] hover:text-[#0a0a0a] transition-colors duration-200 z-20"
        >
          Skip intro →
        </button>
      )}
    </section>
  );
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  state: HeroState,
  anchor: { x: number; y: number } | null,
  w: number,
  h: number,
  reduced: boolean,
  mask?: { cx: number; cy: number; r: number; insideAlpha: number },
) {
  const attract = state === 'drawing' || state === 'structuring' || state === 'collapsing';
  const target = anchor ?? { x: w * 0.5, y: h * 0.5 };

  const drawOnce = (alphaMul: number) => {
    for (const p of particles) {
      if (!reduced) {
        // base drift
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        if (attract) {
          const dx = target.x - p.x;
          const dy = target.y - p.y;
          const d = Math.max(60, Math.hypot(dx, dy));
          const k = state === 'collapsing' ? 0.012 : 0.006;
          p.vx += (dx / d) * k;
          p.vy += (dy / d) * k;
        }

        p.x += p.vx;
        p.y += p.vy;
      }

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = INK;
      ctx.globalAlpha = p.opacity * alphaMul;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  if (mask) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.arc(mask.cx, mask.cy, mask.r, 0, Math.PI * 2, true);
    ctx.clip('evenodd');
    drawOnce(1);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(mask.cx, mask.cy, mask.r, 0, Math.PI * 2);
    ctx.clip();
    drawOnce(mask.insideAlpha);
    ctx.restore();
  } else {
    drawOnce(1);
  }
}

function drawInputResponse(
  ctx: CanvasRenderingContext2D,
  strokes: DrawStroke[],
  state: HeroState,
  reduced: boolean,
  mask?: { cx: number; cy: number; r: number; insideAlpha: number },
) {
  const showInk = state === 'drawing' || state === 'structuring' || state === 'collapsing' || state === 'revealed';
  if (!showInk) return;

  const fade = state === 'drawing' ? 0.74 : state === 'structuring' ? 0.3 : state === 'collapsing' ? 0.18 : 0.09;

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = INK;
  ctx.lineWidth = reduced ? 2.5 : 2.2;

  const drawOnce = (alphaMul: number) => {
    ctx.globalAlpha = fade * alphaMul;
    for (const s of strokes) {
      if (s.points.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(s.points[0]!.x, s.points[0]!.y);
      for (let i = 1; i < s.points.length; i++) {
        const p = s.points[i]!;
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  if (mask) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.arc(mask.cx, mask.cy, mask.r, 0, Math.PI * 2, true);
    ctx.clip('evenodd');
    drawOnce(1);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(mask.cx, mask.cy, mask.r, 0, Math.PI * 2);
    ctx.clip();
    drawOnce(mask.insideAlpha);
    ctx.restore();
  } else {
    drawOnce(1);
  }
}

function buildStructureNodes(strokes: DrawStroke[], anchor: { x: number; y: number }, size: Size) {
  const pts: DrawPoint[] = [];
  for (const s of strokes) {
    for (let i = 0; i < s.points.length; i += 2) pts.push(s.points[i]!);
  }

  const targetCount = size.w < 768 ? 42 : 64;
  const nodes: StructureNode[] = [];
  const pick = (idx: number) => pts[idx % pts.length] ?? { x: anchor.x, y: anchor.y, time: 0 };
  for (let i = 0; i < targetCount; i++) {
    const p = pick(Math.floor((i / targetCount) * Math.max(1, pts.length)));
    const z = (Math.random() - 0.5) * 160;
    nodes.push({
      x: p.x + (Math.random() - 0.5) * 22,
      y: p.y + (Math.random() - 0.5) * 22,
      z,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      vz: (Math.random() - 0.5) * 0.7,
    });
  }
  return nodes;
}

function buildStructureEdges(nodes: StructureNode[], k: number): StructureEdge[] {
  const edges: StructureEdge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const ni = nodes[i]!;
    const neighbors: Array<{ j: number; d: number }> = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const nj = nodes[j]!;
      const d = dist(ni.x, ni.y, nj.x, nj.y) + Math.abs(ni.z - nj.z) * 0.3;
      neighbors.push({ j, d });
    }
    neighbors.sort((a, b) => a.d - b.d);
    for (let t = 0; t < Math.min(k, neighbors.length); t++) {
      const j = neighbors[t]!.j;
      if (j > i) edges.push([i, j]);
    }
  }
  return edges;
}

function project(node: StructureNode, anchor: { x: number; y: number }) {
  const depth = 520;
  const scale = depth / (depth + node.z);
  return {
    x: anchor.x + (node.x - anchor.x) * scale,
    y: anchor.y + (node.y - anchor.y) * scale,
    a: scale,
  };
}

function drawStructure(
  ctx: CanvasRenderingContext2D,
  structure: { nodes: StructureNode[]; edges: StructureEdge[]; anchor: { x: number; y: number } },
  t: number,
  mask?: { cx: number; cy: number; r: number; insideAlpha: number },
) {
  const { nodes, edges, anchor } = structure;
  const appear = t * t;

  ctx.save();
  const drawOnce = (alphaMul: number) => {
    ctx.globalAlpha = 0.55 * appear * alphaMul;
    ctx.strokeStyle = INK_SOFT;
    ctx.lineWidth = 1;

    // Straight connections (blueprint wires)
    for (const [a, b] of edges) {
      const pa = project(nodes[a]!, anchor);
      const pb = project(nodes[b]!, anchor);
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    }

    // Subtle triangle mesh (very low alpha)
    ctx.globalAlpha = 0.085 * appear * alphaMul;
    ctx.fillStyle = INK;
    for (let i = 0; i < nodes.length; i++) {
      // pick two nearest neighbors via edges (cheap)
      const neighbors: number[] = [];
      for (const [a, b] of edges) {
        if (a === i) neighbors.push(b);
        else if (b === i) neighbors.push(a);
        if (neighbors.length >= 2) break;
      }
      if (neighbors.length < 2) continue;
      const p0 = project(nodes[i]!, anchor);
      const p1 = project(nodes[neighbors[0]]!, anchor);
      const p2 = project(nodes[neighbors[1]]!, anchor);
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.closePath();
      ctx.fill();
    }

    // Coordinate-like points
    ctx.globalAlpha = 0.7 * appear * alphaMul;
    ctx.fillStyle = INK;
    for (const n of nodes) {
      const p = project(n, anchor);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2 * p.a, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  if (mask) {
    // outside circle
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.arc(mask.cx, mask.cy, mask.r, 0, Math.PI * 2, true);
    ctx.clip('evenodd');
    drawOnce(1);
    ctx.restore();

    // inside circle (reduced alpha)
    ctx.save();
    ctx.beginPath();
    ctx.arc(mask.cx, mask.cy, mask.r, 0, Math.PI * 2);
    ctx.clip();
    drawOnce(mask.insideAlpha);
    ctx.restore();
  } else {
    drawOnce(1);
  }
  ctx.restore();
}

function drawCollapsingStructure(
  ctx: CanvasRenderingContext2D,
  structure: { nodes: StructureNode[]; edges: StructureEdge[]; anchor: { x: number; y: number } },
  t: number,
  mask?: { cx: number; cy: number; r: number; insideAlpha: number },
) {
  const { nodes, edges, anchor } = structure;
  const ease = 1 - Math.pow(1 - t, 3);
  const alpha = 0.55 * (1 - ease);

  ctx.save();
  const drawOnce = (alphaMul: number) => {
    ctx.globalAlpha = alpha * alphaMul;
    ctx.strokeStyle = INK_SOFT;
    ctx.lineWidth = 1;

    for (const [a, b] of edges) {
      const na = nodes[a]!;
      const nb = nodes[b]!;
      const aa = project(
        {
          ...na,
          x: na.x + (anchor.x - na.x) * ease,
          y: na.y + (anchor.y - na.y) * ease,
          z: na.z * (1 - ease),
          vx: 0,
          vy: 0,
          vz: 0,
        },
        anchor,
      );
      const bb = project(
        {
          ...nb,
          x: nb.x + (anchor.x - nb.x) * ease,
          y: nb.y + (anchor.y - nb.y) * ease,
          z: nb.z * (1 - ease),
          vx: 0,
          vy: 0,
          vz: 0,
        },
        anchor,
      );
      ctx.beginPath();
      ctx.moveTo(aa.x, aa.y);
      ctx.lineTo(bb.x, bb.y);
      ctx.stroke();
    }
  };

  if (mask) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.arc(mask.cx, mask.cy, mask.r, 0, Math.PI * 2, true);
    ctx.clip('evenodd');
    drawOnce(1);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(mask.cx, mask.cy, mask.r, 0, Math.PI * 2);
    ctx.clip();
    drawOnce(mask.insideAlpha);
    ctx.restore();
  } else {
    drawOnce(1);
  }
  ctx.restore();
}
