'use client';

import Image from 'next/image';
import { BusinessLabel, SectionReveal, serifStyle } from '@/components/business/shared';

const INTRO_LINES = [
  '採用 / Web / 資料制作 / 業務整理 / AI活用',
  'RAPTOVAは、まだ整理されていない課題や情報を、',
  '実行可能な形へ落とし込んでいきます。',
] as const;

const HERO_IMAGE = '/images/business/business-hero-structured-space.webp';

const HERO_CONTENT_CLASS = [
  'relative z-[2] mx-auto flex w-full max-w-[1440px] flex-col',
  'min-h-[100svh] justify-start px-7 pb-[10svh] pt-[calc(72px+26vh)]',
  'se-short:!justify-start',
  'se-short:!pt-[calc(72px+14vh)]',
  'se-short:!pb-[6svh]',
  'md:justify-center md:!pt-28 md:pb-16 md:px-14',
  'lg:min-h-[min(92svh,680px)] lg:justify-center lg:px-20 lg:pb-20 lg:pt-24',
  'xl:min-h-[720px] xl:pt-[72px] xl:pb-22',
  'min-[1440px]:min-h-[760px] min-[1440px]:pb-24',
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
              'md:object-[68%_36%]',
              'lg:object-[70%_38%]',
              'xl:object-[74%_40%]',
            ].join(' ')}
          />
        </div>
        <div
                    className={[
            'absolute inset-y-0 left-0 z-[1]',
            'w-[min(94%,560px)] sm:w-[min(90%,600px)]',
            'md:w-[min(88%,640px)]',
            'lg:w-[min(72%,620px)]',
            'xl:w-[min(50%,560px)] min-[1440px]:w-[min(42%,620px)]',
            'bg-gradient-to-r from-white/88 via-white/42 to-transparent',
            'lg:from-white/72 lg:via-white/32',
            'xl:from-white/58 xl:via-white/22 xl:to-transparent',
          ].join(' ')}
          aria-hidden
        />
      </div>

      <div
        className={HERO_CONTENT_CLASS}
      >
        <SectionReveal>
          <div className="max-w-lg max-md:pt-[3.25rem] se-short:!pt-0 md:max-w-md md:pt-0 lg:max-w-[26rem] xl:max-w-[28rem] xl:pt-0 xl:translate-y-[clamp(1rem,3vh,2.5rem)] min-[1440px]:max-w-[30rem]">
            <BusinessLabel>BUSINESS</BusinessLabel>
            <h1
              id="business-hero-title"
              className="copy-ja mt-7 font-serif font-medium leading-[1.14] tracking-[0.058em] text-[#0a0a0a] text-[clamp(28px,7.5vw,40px)] md:text-[clamp(30px,4.8vw,46px)] lg:text-[clamp(32px,3.4vw,50px)] xl:text-[clamp(34px,3.8vw,54px)] min-[1440px]:text-[clamp(32px,5vw,56px)] se-short:mt-5 md:mt-8 md:leading-[1.12]"
              style={serifStyle}
            >
              <span className="block">構想を、</span>
              <span className="block whitespace-nowrap tracking-[0.042em]">
                実行できる形へ。
              </span>
            </h1>
            <div className="mt-8 h-px w-10 bg-black/[0.32] se-short:mt-6 md:mt-9 md:w-12" aria-hidden />
            <p className="copy-ja mt-10 max-w-xl text-[13px] leading-[2.1] tracking-[0.1em] text-black/[0.68] se-short:mt-6 se-short:leading-[1.95] md:mt-8 md:max-w-lg lg:mt-9 lg:text-[13px] xl:mt-12 xl:text-sm">
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
