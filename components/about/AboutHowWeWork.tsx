'use client';

import { Box, ListChecks, MessageCircle, type LucideIcon } from 'lucide-react';
import { SectionReveal, serifStyle } from '@/components/about/shared';

const INTRO = '不確かな構想を、実行できる形に変えるために。';

const ICON_SIZE = 52;
const ICON_STROKE = 1;

const COLUMNS: ReadonlyArray<{
  number: string;
  title: string;
  body: string;
  Icon: LucideIcon;
}> = [
  {
    number: '01',
    title: 'Listen',
    body: 'まだ言葉になっていない違和感や課題を聞く。',
    Icon: MessageCircle,
  },
  {
    number: '02',
    title: 'Organize',
    body: '情報・目的・優先順位を整理し、進められる状態に整える。',
    Icon: ListChecks,
  },
  {
    number: '03',
    title: 'Shape',
    body: 'Web、資料、文章、仕組みとして、実行できる形にする。',
    Icon: Box,
  },
] as const;

export default function AboutHowWeWork() {
  return (
    <section
      className="border-b border-black/[0.08] bg-[#f2f0e9] px-7 pt-12 pb-10 md:px-14 md:pt-14 md:pb-11 lg:px-20 lg:pt-14 lg:pb-12"
      aria-labelledby="about-how-heading"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        <SectionReveal>
          <p className="text-[18px] font-semibold tracking-[0.28em] text-black/90 md:text-[22px]">
            <span className="tracking-[0.30em]">HOW WE WORK</span>
          </p>
          <h2 id="about-how-heading" className="sr-only">
            How We Work
          </h2>
          <p
            className="copy-ja copy-ja-prose mt-7 text-[15px] font-medium leading-[1.9] md:mt-8 tracking-[0.06em] text-black/[0.86] md:text-base md:tracking-[0.08em] lg:whitespace-nowrap"
            style={serifStyle}
          >
            {INTRO}
          </p>
        </SectionReveal>

        <div className="mt-5 md:mt-6">
          <div className="grid divide-y divide-black/[0.12] lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {COLUMNS.map((col, index) => {
              const Icon = col.Icon;
              return (
                <SectionReveal key={col.number} delay={0.06 + index * 0.06} className="min-w-0">
                  <article className="flex flex-col items-stretch px-5 py-4 sm:px-6 md:py-5 lg:items-center lg:px-8 lg:py-5 xl:px-10">
                    <p className="mb-2.5 text-center text-sm font-medium tracking-[0.18em] text-black/50 md:mb-3">
                      {col.number}
                    </p>
                    <div className="flex w-full items-start gap-2.5 sm:gap-3 lg:max-w-none lg:gap-3.5">
                      <Icon
                        aria-hidden
                        size={ICON_SIZE}
                        strokeWidth={ICON_STROKE}
                        className="mt-0.5 h-[52px] w-[52px] shrink-0 text-black/[0.78]"
                      />
                      <div className="min-w-0 flex-1">
                        <h3
                          className="font-serif text-[clamp(23px,2.35vw,30px)] font-medium leading-[1.22] tracking-[0.05em] text-black/[0.92]"
                          style={serifStyle}
                        >
                          {col.title}
                        </h3>
                        <p className="copy-ja copy-ja-prose mt-2 text-[13px] leading-[1.86] tracking-[0.04em] text-black/[0.74] md:text-[13px] md:leading-[1.9] md:tracking-[0.055em]">
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
      </div>
    </section>
  );
}
