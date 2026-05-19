'use client';

import Image from 'next/image';
import { SectionReveal, serifStyle } from '@/components/about/shared';

const TAGLINE =
  '整理されていない構想を、前へ進められる形へ。';

const HERO_IMAGE = '/images/about/about-hero-light-space.png';

const HERO_CONTENT_CLASS = [
  'relative z-[2] mx-auto flex w-full max-w-[1440px] flex-col',
  'min-h-[100svh] justify-start px-7 pb-[10svh] pt-[calc(72px+26vh)]',
  'md:px-14',
  'lg:min-h-[760px] lg:justify-center lg:px-20 lg:pb-24 lg:pt-[72px]',
  'min-[1440px]:min-h-[760px]',
].join(' ');

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
              'object-[42%_38%]',
              'sm:object-[45%_36%]',
              'lg:object-[50%_40%]',
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

      <div className={HERO_CONTENT_CLASS}>
        <SectionReveal>
          <div className="max-w-lg max-lg:pt-[3.25rem] lg:max-w-[28rem] lg:pt-0 lg:translate-y-[clamp(1rem,3vh,2.5rem)] min-[1440px]:max-w-[30rem]">
            <h1
              id="about-hero-title"
              className="font-serif text-[clamp(40px,6.65vw,79px)] font-medium leading-[1.04] tracking-[0.04em] text-[#0a0a0a]"
              style={serifStyle}
            >
              <span className="block">ABOUT</span>
              <span className="block">RAPTOVA</span>
            </h1>
            <p
              className="mt-4 text-xs font-medium tracking-[0.2em] text-black/[0.58] md:mt-5 md:text-[13px]"
              style={serifStyle}
            >
              Thoughts Into Motion.
            </p>
            <div className="mt-7 h-px w-10 bg-black/[0.32] md:mt-8 md:w-12" aria-hidden />
            <p
              className="copy-ja mt-6 max-w-md whitespace-normal text-[14px] leading-[2.22] tracking-[0.08em] text-black/[0.74] md:mt-7 md:leading-[2.28] lg:max-w-none lg:text-[16px] lg:leading-[1.78] lg:tracking-[0.07em] lg:text-black/[0.78] lg:whitespace-nowrap"
              style={serifStyle}
            >
              <span className="lg:hidden">
                整理されていない構想を、
                <br />
                前へ進められる形へ。
              </span>
              <span className="hidden lg:inline">{TAGLINE}</span>
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
