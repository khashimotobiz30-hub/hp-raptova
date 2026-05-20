'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { CaseStudyBrowserShowcaseCard } from '@/lib/projects/case-study-types';
import OutputGalleryCard from '@/components/projects/case-study/OutputGalleryCard';

/** Seconds for one loop (6 cards). Slightly longer = quieter drift. */
export const GALLERY_PAN_DURATION_SEC = 54;

/** Cap rAF delta (tab background) to avoid visible jumps. */
const MAX_FRAME_DT_SEC = 0.05;

type Props = {
  cards: readonly CaseStudyBrowserShowcaseCard[];
};

export default function RaptovaWebsiteOutputShowcase({ cards }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const [loopPx, setLoopPx] = useState(0);
  const duplicated = [...cards, ...cards];

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      const half = el.scrollWidth / 2;
      if (half > 0) setLoopPx(half);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const onImageLoad = () => measure();
    el.querySelectorAll('img').forEach((img) => {
      if (img.complete) return;
      img.addEventListener('load', onImageLoad, { once: true });
    });

    return () => ro.disconnect();
  }, [cards]);

  const viewportStyle = {
    '--gallery-gap': '20px',
    '--gallery-card-width': 'min(82vw, 420px)',
  } as CSSProperties;

  const shouldAnimate = loopPx > 0 && shouldReduceMotion !== true;

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    if (!shouldAnimate) {
      offsetRef.current = 0;
      el.style.transform = 'translate3d(0, 0, 0)';
      return;
    }

    const pxPerSec = loopPx / GALLERY_PAN_DURATION_SEC;
    let last = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, MAX_FRAME_DT_SEC);
      last = now;

      offsetRef.current += pxPerSec * dt;
      if (offsetRef.current >= loopPx) {
        offsetRef.current %= loopPx;
      }

      el.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [loopPx, shouldAnimate]);

  return (
    <div className="relative min-w-0 max-w-full overflow-x-clip -mx-4 sm:-mx-5 lg:-mx-8">
      <div
        className="output-gallery-viewport output-gallery-viewport-fade w-full overflow-hidden lg:[--gallery-card-width:min(38vw,480px)]"
        style={viewportStyle}
      >
        <div
          ref={trackRef}
          className="output-gallery-track flex w-max max-w-none flex-nowrap items-start gap-[var(--gallery-gap)]"
          style={{ width: 'max-content' }}
          aria-label="RAPTOVA website page gallery"
        >
          {duplicated.map((card, index) => (
            <OutputGalleryCard
              key={`${card.label}-${index}`}
              label={card.label}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              imageWidth={card.imageWidth}
              imageHeight={card.imageHeight}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
