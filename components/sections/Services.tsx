'use client';

import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { SERVICES_ITEMS } from '@/lib/config';

function AnimatedRule({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className="w-full h-px bg-[#e5e5e5]" aria-hidden="true" />;
  }

  return (
    <div ref={ref} className="w-full h-px bg-[#e5e5e5] overflow-hidden" aria-hidden="true">
      <motion.div
        className="h-full bg-[#e5e5e5]"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="bg-white py-32 md:py-48 border-t border-[#e5e5e5]"
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 lg:px-20">
        {/* ヘッダー */}
        <RevealAnimation>
          <h2
            id="services-heading"
            className="text-[#0a0a0a] tracking-[0.22em] text-xs font-medium mb-8"
          >
            SERVICES
          </h2>
        </RevealAnimation>

        <RevealAnimation delay={0.1}>
          <p
            className="text-[#555555] leading-[1.9] copy-ja max-w-[600px] mb-16 md:mb-20"
            style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 300 }}
          >
            RAPTOVAは、AIを使うことそのものではなく、
            <br className="hidden md:inline" />
            思考や構想が、実際に動き出す状態をつくるために支援します。
          </p>
        </RevealAnimation>

        {/* 罫線1（最上部） */}
        <AnimatedRule index={0} />

        {SERVICES_ITEMS.map((item, i) => (
          <div key={item.number}>
            <RevealAnimation delay={0.05 + i * 0.08}>
              <div className="py-10 md:py-14 flex flex-col md:flex-row md:gap-16 lg:gap-24 group hover:opacity-80 transition-opacity duration-300">
                {/* 番号 */}
                <div className="flex-shrink-0 w-12">
                  <span className="text-[#8a8a8a] text-xs tracking-[0.16em]">
                    {item.number}
                  </span>
                </div>

                {/* テキスト */}
                <div className="flex-1 mt-4 md:mt-0">
                  <div className="flex flex-col gap-1 mb-4">
                    <p className="text-[#0a0a0a] text-sm tracking-[0.14em] font-medium">
                      {item.titleEn}
                    </p>
                    <p
                      className="text-[#555555] copy-ja"
                      style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', fontWeight: 400 }}
                    >
                      {item.titleJa}
                    </p>
                  </div>
                  <p
                    className="text-[#555555] leading-[1.9] copy-ja whitespace-pre-line"
                    style={{ fontSize: 'clamp(14px, 1.1vw, 15px)', fontWeight: 300 }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </RevealAnimation>
            {/* 各サービス下の罫線（4本合計：1本目はサービス上、2-4本目は各サービス下） */}
            <AnimatedRule index={i + 1} />
          </div>
        ))}

        {/* View Services リンク */}
        <RevealAnimation delay={0.2}>
          <div className="mt-12">
            <Link
              href="/services"
              className="text-[#0a0a0a] text-sm tracking-[0.1em] hover:opacity-50 transition-opacity duration-200 inline-flex items-center gap-2 group"
            >
              View Services{' '}
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </Link>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
}
