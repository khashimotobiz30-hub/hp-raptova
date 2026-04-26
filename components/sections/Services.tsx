'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, Fragment } from 'react';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { SERVICES_ITEMS } from '@/lib/config';

function renderDescription(text: string) {
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const isLast = idx === lines.length - 1;
    if (isLast) {
      const dotIdx = line.lastIndexOf('。');
      if (dotIdx !== -1) {
        const lastCommaIdx = line.lastIndexOf('、', dotIdx - 1);
        const splitAt =
          lastCommaIdx !== -1 && lastCommaIdx > dotIdx - 15
            ? lastCommaIdx + 1
            : Math.max(0, dotIdx - 8);
        return (
          <Fragment key={idx}>
            {idx > 0 && <br />}
            {line.substring(0, splitAt)}<span style={{ whiteSpace: 'nowrap' }}>{line.substring(splitAt)}</span>
          </Fragment>
        );
      }
    }
    return (
      <Fragment key={idx}>
        {idx > 0 && <br />}
        {line}
      </Fragment>
    );
  });
}

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
      className="bg-white py-28 md:py-44 border-t border-[#e5e5e5]"
      aria-labelledby="services-heading"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-20">
        {/* ヘッダー（説明文の開始位置を本文カラムに揃える） */}
        <div className="mb-12 md:mb-14">
          <div className="flex flex-col md:grid md:items-start md:gap-x-5 lg:gap-x-6 md:grid-cols-[40px_minmax(0,2.7fr)_1px_minmax(0,3fr)_minmax(200px,2.2fr)]">
            <RevealAnimation className="md:col-span-2">
              <h2
                id="services-heading"
                className="text-[#0a0a0a] tracking-[0.12em] leading-[1.1]"
                style={{ fontSize: 'clamp(40px, 3.8vw, 64px)', fontWeight: 500 }}
              >
                SERVICES
              </h2>
            </RevealAnimation>

            <div className="hidden md:block md:col-start-3" aria-hidden="true" />

            <RevealAnimation delay={0.1} className="md:col-start-4">
              <p
                className="text-[#555555] leading-[2.0] copy-ja max-w-[720px] mt-6 md:mt-1 md:-ml-6 lg:-ml-8"
                style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 300 }}
              >
                RAPTOVAは、AIを使うことそのものではなく、
                <br className="hidden md:inline" />
                思考や構想が、実際に動き出す状態をつくるために支援します。
              </p>
            </RevealAnimation>
          </div>
        </div>

        {SERVICES_ITEMS.map((item, i) => (
          <div key={item.number}>
            <RevealAnimation delay={0.05 + i * 0.08}>
              <div className="group transition-colors duration-300 hover:bg-[#fafafa]">
                <div className="py-11 md:py-12 min-h-[200px] md:min-h-[220px]">
                  <div className="flex flex-col md:grid md:items-start md:gap-x-5 lg:gap-x-6 md:grid-cols-[40px_minmax(0,2.7fr)_1px_minmax(0,3fr)_minmax(200px,2.2fr)]">
                    {/* 番号 */}
                    <div className="flex-shrink-0 md:self-start mt-0.5 md:mt-1">
                      <span className="text-[#7f7f7f] text-[12px] tracking-[0.1em] font-medium transition-colors duration-300 group-hover:text-[#0a0a0a]">
                        {item.number}
                      </span>
                    </div>

                    {/* 巨大コピー（主役） */}
                    <div className="mt-4 md:mt-0 max-w-full min-w-0 md:self-center md:pr-8 lg:pr-10">
                      <div
                        className="text-[#0a0a0a] tracking-[-0.015em] leading-[1.0] transform transition-transform duration-300 group-hover:translate-x-0.5"
                        style={{
                          fontSize: 'clamp(40px, 4.0vw, 80px)',
                          fontWeight: 400,
                        }}
                      >
                        <span className="block">{item.transformCopy[0]}</span>
                        <span className="block">{item.transformCopy[1]}</span>
                      </div>
                    </div>

                    {/* 縦罫線（PCのみ） */}
                    <div
                      className="hidden md:block w-px bg-[#e5e5e5] justify-self-center self-center h-[65%] md:self-center"
                      aria-hidden="true"
                    />

                    {/* 右本文（可読性優先） */}
                    <div className="mt-8 md:mt-0 max-w-full min-w-0 pr-2 lg:pr-3 md:self-center">
                      <div className="flex flex-col gap-1">
                        <p className="text-[#0a0a0a] text-sm tracking-[0.14em] font-medium">
                          {item.titleEn}
                        </p>
                        <p
                          className="text-[#3a3a3a] copy-ja"
                          style={{
                            fontSize: 'clamp(14px, 1.1vw, 16px)',
                            fontWeight: 400,
                          }}
                        >
                          {item.titleJa}
                        </p>
                      </div>

                      <p
                        className="text-[#606060] leading-[1.95] copy-ja mt-5"
                        style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', fontWeight: 300 }}
                      >
                        {renderDescription(item.description)}
                      </p>

                      <p className="text-[#777777] text-xs tracking-[0.18em] mt-6">
                        {item.tags}
                      </p>
                    </div>

                    {/* 右端アイコン（PCのみ） */}
                    <div className="hidden md:block justify-self-start md:self-center pl-1 lg:pl-1">
                      <div className="w-[230px] lg:w-[240px] flex items-center justify-start">
                        <Image
                          src={item.iconSrc}
                          alt=""
                          width={240}
                          height={240}
                          sizes="(max-width: 1024px) 200px, 230px"
                          className="h-auto w-[200px] lg:w-[230px] opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </RevealAnimation>
            {/* 各サービス下の罫線（01/02/03の下線のみ） */}
            <AnimatedRule index={i} />
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
