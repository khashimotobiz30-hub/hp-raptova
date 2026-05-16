'use client';

import Image from 'next/image';
import { BusinessLabel, SectionReveal, serifStyle } from '@/components/business/shared';

const INTRO_LINES = [
  '採用、Web・資料制作、業務整理・AI活用。',
  'RAPTOVAは、人や組織の中にある課題や情報を整理し、',
  '現実に動くアウトプットへ変えていきます。',
];

const HERO_IMAGE = '/images/business/business-hero-structured-space.png';

const HERO_MIN_H =
  'min-h-[min(72svh,680px)] lg:min-h-[min(76svh,800px)] min-[1440px]:min-h-[min(74svh,820px)]';

export default function BusinessHero() {
  return (
    <section
      className="relative -mt-[72px] overflow-x-clip border-b border-black/[0.07]"
      aria-labelledby="business-hero-title"
      style={{
        backgroundColor: '#f7f7f6',
      }}
    >
      {/* 画像は画面上端（ヘッダー背面まで）〜セクション下端 */}
      {/* fill 画像の親は next/image 要件として relative を明示（absolute 親だけだと warning / height 0 になる環境がある） */}
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
              'object-[60%_50%]',
              'sm:object-[58%_center]',
              'lg:object-right lg:object-center',
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
        className={[
          'relative z-[2] mx-auto flex w-full max-w-[1440px] flex-col justify-center',
          // ABOUT OUR BUSINESS と同じコンテナ基準（max-width / 横 padding）
          'px-7 pt-[72px] pb-20 md:px-14 md:pb-22 lg:px-20 lg:pb-24',
          HERO_MIN_H,
        ].join(' ')}
      >
        <SectionReveal>
          <div className="max-w-lg translate-y-[clamp(0.75rem,2.5vh,2rem)] lg:max-w-[28rem] lg:translate-y-[clamp(1rem,3vh,2.5rem)] min-[1440px]:max-w-[30rem]">
            <BusinessLabel>BUSINESS</BusinessLabel>
            <h1
              id="business-hero-title"
              className="copy-ja mt-7 font-serif text-[clamp(32px,5vw,56px)] font-medium leading-[1.14] tracking-[0.058em] text-[#0a0a0a] md:mt-8 md:leading-[1.12]"
              style={serifStyle}
            >
              <span className="block">構想を、</span>
              <span className="block whitespace-nowrap tracking-[0.042em]">
                実行できる形へ。
              </span>
            </h1>
            <div className="mt-8 h-px w-10 bg-black/[0.32] md:mt-9 md:w-12" aria-hidden />
            <p className="copy-ja mt-8 max-w-xl text-[13px] leading-[2.1] tracking-[0.1em] text-black/[0.68] md:text-sm">
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
