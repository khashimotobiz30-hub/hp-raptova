'use client';

import Image from 'next/image';
import { SectionReveal, serifStyle } from '@/components/about/shared';

const TAGLINE =
  '整理されていない構想を、前へ進められる形へ。';

const HERO_IMAGE = '/images/about/about-hero-light-space.png';

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
            alt="RAPTOVA（ラプトーバ） about visual"
            fill
            priority
            sizes="100vw"
                        className={[
              'object-cover',
              'object-[42%_38%]',
              'md:object-[44%_36%]',
              'lg:object-[48%_38%]',
              'xl:object-[50%_40%]',
            ].join(' ')}
          />
        </div>
        <div
                    className={[
            'absolute inset-y-0 left-0 z-[1]',
            'w-[min(94%,560px)] sm:w-[min(90%,600px)]',
            'md:w-[min(88%,640px)]',
            'lg:w-[min(72%,620px)]',
            'xl:w-[min(58%,580px)] min-[1440px]:w-[min(46%,640px)]',
            'bg-gradient-to-r from-[#f4f3ef]/92 via-[#f4f3ef]/48 to-transparent',
            'lg:from-[#f4f3ef]/80 lg:via-[#f4f3ef]/36',
            'xl:from-[#f4f3ef]/72 xl:via-[#f4f3ef]/28 xl:to-transparent',
          ].join(' ')}
          aria-hidden
        />
      </div>

      <div className={HERO_CONTENT_CLASS}>
        <SectionReveal>
          <div className="max-w-lg max-md:pt-[3.25rem] se-short:!pt-0 md:max-w-md md:pt-0 lg:max-w-[26rem] xl:max-w-[28rem] xl:pt-0 xl:translate-y-[clamp(1rem,3vh,2.5rem)] min-[1440px]:max-w-[30rem]">
            <h1
              id="about-hero-title"
              className="font-serif font-medium leading-[1.04] tracking-[0.04em] text-[#0a0a0a] text-[clamp(36px,9vw,48px)] md:text-[clamp(38px,5.5vw,56px)] lg:text-[clamp(42px,4.2vw,62px)] xl:text-[clamp(44px,4.8vw,72px)] min-[1440px]:text-[clamp(48px,5.5vw,79px)]"
              style={serifStyle}
            >
              <span className="block">ABOUT</span>
              <span className="block">RAPTOVA</span>
            </h1>
            <p className="copy-ja mt-2 text-[11px] tracking-[0.28em] text-black/[0.45] md:mt-2.5 md:text-[12px]">
              ラプトーバ
            </p>
            <p
              className="mt-4 text-xs font-medium tracking-[0.2em] text-black/[0.58] md:mt-5 md:text-[13px]"
              style={serifStyle}
            >
              Thoughts Into Motion.
            </p>
            <div className="mt-7 h-px w-10 bg-black/[0.32] se-short:mt-5 md:mt-8 md:w-12" aria-hidden />
            <p
              className="copy-ja mt-6 max-w-md whitespace-normal text-[14px] se-short:mt-5 se-short:leading-[2.0] leading-[2.22] tracking-[0.08em] text-black/[0.74] md:mt-7 md:max-w-lg md:leading-[2.15] lg:max-w-xl lg:text-[15px] lg:leading-[1.9] xl:max-w-none xl:text-[16px] xl:leading-[1.78] xl:tracking-[0.07em] xl:text-black/[0.78] xl:whitespace-nowrap"
              style={serifStyle}
            >
              <span className="xl:hidden">
                整理されていない構想を、
                <br />
                前へ進められる形へ。
              </span>
              <span className="hidden xl:inline">{TAGLINE}</span>
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
