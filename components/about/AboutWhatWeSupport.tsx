'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Monitor,
  SlidersHorizontal,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import { SectionReveal } from '@/components/about/shared';

const INTRO = 'RAPTOVAは、止まっている仕事を前へ進めるために、現在は主に3つの領域から支援しています。';

const ICON_SIZE = 64;
const ICON_STROKE = 1.25;

const COLUMNS: ReadonlyArray<{
  number: string;
  title: string;
  body: string;
  Icon: LucideIcon;
}> = [
  {
    number: '01',
    title: 'Recruiting',
    body: '採用コンセプト、求人原稿、採用LP、説明資料などを、採用活動に必要な言葉と導線として整える。',
    Icon: UserRound,
  },
  {
    number: '02',
    title: 'Web / Creative',
    body: 'コーポレートサイト、LP、会社資料、営業資料などを、伝えたい価値が届く形に整える。',
    Icon: Monitor,
  },
  {
    number: '03',
    title: 'Workflow / AI',
    body: '業務フロー、情報整理、AI活用の設計などを、日々の仕事が進みやすい仕組みに整える。',
    Icon: SlidersHorizontal,
  },
] as const;

export default function AboutWhatWeSupport() {
  return (
    <section
      className="relative overflow-hidden bg-[#080808] px-7 pt-12 pb-10 text-white md:px-14 md:pt-14 md:pb-11 lg:px-20 lg:pt-14 lg:pb-12"
      aria-labelledby="about-support-heading"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="relative h-full min-h-[1px] w-full">
          <Image
            src="/images/about/about-support-dark-city.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
      <div className="absolute inset-0 z-[1] bg-black/45" aria-hidden />
      <div
        className="absolute inset-0 z-[2] bg-gradient-to-r from-[#080808]/78 via-[#080808]/62 to-[#080808]/48"
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 z-[3] h-px bg-white/10" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[1240px]">
        <SectionReveal>
          <p className="text-[18px] font-semibold tracking-[0.28em] text-white/72 md:text-[22px]">
            <span className="tracking-[0.30em]">WHAT WE SUPPORT</span>
          </p>
          <h2 id="about-support-heading" className="sr-only">
            What We Support
          </h2>
          <p className="copy-ja copy-ja-prose mt-7 max-w-3xl text-[13px] font-medium leading-[1.9] tracking-[0.07em] text-white/[0.76] md:mt-8 md:text-sm md:tracking-[0.1em] lg:whitespace-nowrap">
            {INTRO}
          </p>
        </SectionReveal>

        <div className="mt-5 md:mt-6">
          <div className="grid divide-y divide-white/[0.14] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {COLUMNS.map((col, index) => {
              const Icon = col.Icon;
              return (
                <SectionReveal key={col.number} delay={0.06 + index * 0.06} className="min-w-0">
                  <article className="flex flex-col items-center px-5 py-5 sm:px-6 md:py-6 lg:px-8 lg:py-6 xl:px-10">
                    <p className="mb-4 text-sm font-medium tracking-[0.2em] text-white/36 md:mb-5">
                      {col.number}
                    </p>
                    <div className="flex w-full max-w-[19rem] items-start gap-4 sm:max-w-[21rem] sm:gap-5 lg:max-w-none lg:gap-5 xl:gap-6">
                      <Icon
                        aria-hidden
                        size={ICON_SIZE}
                        strokeWidth={ICON_STROKE}
                        className="h-16 w-16 shrink-0 text-neutral-100"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/[0.9]">
                          {col.title}
                        </h3>
                        <p className="copy-ja mt-2 text-[12px] leading-[1.85] tracking-[0.06em] text-white/[0.58] md:text-[13px]">
                          {col.body}
                        </p>
                      </div>
                    </div>
                  </article>
                </SectionReveal>
              );
            })}
          </div>
        </div>
        <SectionReveal delay={0.16} className="mt-8 flex justify-end md:mt-9">
          <Link
            href="/business"
            className="group inline-flex items-center gap-4 text-[11px] font-semibold tracking-[0.28em] text-white/72 transition hover:text-white"
          >
            <span className="h-px w-10 bg-white/50 transition-all group-hover:w-14 group-hover:bg-white" />
            VIEW BUSINESS →
          </Link>
        </SectionReveal>


      </div>
    </section>
  );
}
