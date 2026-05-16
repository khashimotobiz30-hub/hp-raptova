'use client';

import Image from 'next/image';
import { SectionReveal, serifStyle } from '@/components/about/shared';

const BODY_LINES = [
  '整理されていない構想を、',
  '前へ進められる形へ。',
];

const HERO_IMAGE = '/images/about/about-hero-light-space.png';

const HERO_MIN_H =
  'min-h-[min(72svh,680px)] lg:min-h-[min(76svh,800px)] min-[1440px]:min-h-[min(74svh,820px)]';

export default function AboutHero() {
  return (
    <section
      className="relative -mt-[72px] overflow-x-clip border-b border-black/[0.08]"
      aria-labelledby="about-hero-title"
      style={{
        backgroundColor: '#f4f3ef',
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-[-72px] bottom-0 z-0 overflow-hidden">
        <div className="relative h-full min-h-[1px] w-full">
          <Image
            src={HERO_IMAGE}
            alt="RAPTOVA about visual"
            fill
            priority
            sizes="100vw"
            className={[
              'object-cover',
              'object-[55%_50%]',
              'sm:object-[52%_center]',
              'lg:object-right lg:object-center',
            ].join(' ')}
          />
        </div>
        <div
          className={[
            'absolute inset-y-0 left-0 z-[1]',
            'w-[min(94%,560px)] sm:w-[min(90%,600px)]',
            'lg:w-[min(50%,580px)] min-[1440px]:w-[min(46%,640px)]',
            'bg-gradient-to-r from-[#f4f3ef]/92 via-[#f4f3ef]/48 to-transparent',
            'lg:from-[#f4f3ef]/72 lg:via-[#f4f3ef]/28 lg:to-transparent',
          ].join(' ')}
          aria-hidden
        />
      </div>

      <div
        className={[
          'relative z-[2] mx-auto flex w-full max-w-[1440px] flex-col justify-center',
          'px-7 pt-[72px] pb-20 md:px-14 md:pb-22 lg:px-20 lg:pb-24',
          HERO_MIN_H,
        ].join(' ')}
      >
        <SectionReveal>
          <div className="max-w-lg translate-y-[clamp(0.75rem,2.5vh,2rem)] lg:max-w-[28rem] lg:translate-y-[clamp(1rem,3vh,2.5rem)] min-[1440px]:max-w-[30rem]">
            <h1
              id="about-hero-title"
              className="font-serif text-[clamp(44px,7.4vw,88px)] font-medium leading-[1.02] tracking-[0.04em] text-[#0a0a0a]"
              style={serifStyle}
            >
              <span className="block">ABOUT</span>
              <span className="block">RAPTOVA</span>
            </h1>
            <p
              className="mt-4 text-sm font-medium tracking-[0.22em] text-black/[0.72] md:mt-5 md:text-[15px]"
              style={serifStyle}
            >
              Thoughts Into Motion.
            </p>
            <div className="mt-8 h-px w-10 bg-black/[0.32] md:mt-9 md:w-12" aria-hidden />
            <p className="copy-ja mt-8 max-w-md text-[13px] leading-[2.1] tracking-[0.1em] text-black/[0.68] md:text-sm">
              {BODY_LINES.map((line) => (
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
