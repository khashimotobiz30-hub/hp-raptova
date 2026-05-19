'use client';

import Image from 'next/image';
import { BusinessLabel, SectionReveal, serifStyle } from '@/components/business/shared';

const INTRO_LINES = [
  '採用 / Web / 資料制作 / 業務整理 / AI活用',
  'RAPTOVAは、まだ整理されていない課題や情報を、',
  '実行可能な形へ落とし込んでいきます。',
] as const;

const HERO_IMAGE = '/images/business/business-hero-structured-space.png';

const HERO_CONTENT_CLASS = [
  'relative z-[2] mx-auto flex w-full max-w-[1440px] flex-col',
  'min-h-[100svh] justify-start px-7 pb-[10svh] pt-[calc(72px+26vh)]',
  'se-short:!justify-start',
  'se-short:!pt-[calc(72px+14vh)]',
  'se-short:!pb-[6svh]',
  'md:px-14',
  'lg:min-h-[760px] lg:justify-center lg:px-20 lg:pb-24 lg:pt-[72px]',
  'min-[1440px]:min-h-[760px]',
].join(' ');

export default function BusinessHero() {
  return (
    <section
      className="relative -mt-[72px] overflow-x-clip border-b border-black/[0.07]"
      aria-labelledby="business-hero-title"
      style={{
        backgroundColor: '#f7f7f6',
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-[-72px] bottom-0 z-0 overflow-hidden">
        <div className="relative h-full min-h-[1px] w-full">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className={[
              'object-cover',
              'object-[72%_38%]',
              'sm:object-[70%_36%]',
              'lg:object-[74%_40%]',
            ].join(' ')}
          />
        </div>
        <div
          className={[
            'absolute inset-y-0 left-0 z-[1]',
            'w-[min(94%,560px)] sm:w-[min(90%,600px)]',
            'lg:w-[min(46%,560px)] min-[1440px]:w-[min(42%,620px)]',
            'bg-gradient-to-r from-white/88 via-white/42 to-transparent',
            'lg:from-white/58 lg:via-white/22 lg:to-transparent',
          ].join(' ')}
          aria-hidden
        />
      </div>

      <div
        className={HERO_CONTENT_CLASS}
      >
        <SectionReveal>
          <div className="max-w-lg max-lg:pt-[3.25rem] se-short:!pt-0 lg:max-w-[28rem] lg:pt-0 lg:translate-y-[clamp(1rem,3vh,2.5rem)] min-[1440px]:max-w-[30rem]">
            <BusinessLabel>BUSINESS</BusinessLabel>
            <h1
              id="business-hero-title"
              className="copy-ja mt-7 font-serif text-[clamp(32px,5vw,56px)] font-medium leading-[1.14] tracking-[0.058em] text-[#0a0a0a] se-short:mt-5 md:mt-8 md:leading-[1.12]"
              style={serifStyle}
            >
              <span className="block">構想を、</span>
              <span className="block whitespace-nowrap tracking-[0.042em]">
                実行できる形へ。
              </span>
            </h1>
            <div className="mt-8 h-px w-10 bg-black/[0.32] se-short:mt-6 md:mt-9 md:w-12" aria-hidden />
            <p className="copy-ja mt-10 max-w-xl text-[13px] leading-[2.1] tracking-[0.1em] text-black/[0.68] se-short:mt-6 se-short:leading-[1.95] md:mt-12 md:text-sm">
              {INTRO_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
