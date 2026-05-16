'use client';

import { Box, ListChecks, MessageCircle, type LucideIcon } from 'lucide-react';
import { SectionLabel, SectionReveal, serifStyle } from '@/components/about/shared';

const INTRO = '不確かな構想を、実行できる形に変えるために。';

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
    title: 'Listen',
    body: 'まだ言葉になっていない違和感や課題を聞く。',
    Icon: MessageCircle,
  },
  {
    number: '02',
    title: 'Organize',
    body: '情報・目的・優先順位を整理する。',
    Icon: ListChecks,
  },
  {
    number: '03',
    title: 'Shape',
    body: 'Web、資料、文章、仕組みとして実行できる形にする。',
    Icon: Box,
  },
] as const;

export default function AboutHowWeWork() {
  return (
    <section
      className="border-b border-black/[0.08] bg-[#f4f3ef] px-7 pt-12 pb-10 md:px-14 md:pt-14 md:pb-11 lg:px-20 lg:pt-14 lg:pb-12"
      aria-labelledby="about-how-heading"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        <SectionReveal>
          <SectionLabel title="HOW WE WORK" />
          <h2 id="about-how-heading" className="sr-only">
            How We Work
          </h2>
          <p
            className="copy-ja mt-5 text-[15px] leading-[1.9] md:mt-6 tracking-[0.08em] text-black/[0.78] md:text-base lg:whitespace-nowrap"
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
                  <article className="flex flex-col items-center px-5 py-5 sm:px-6 md:py-6 lg:px-8 lg:py-6 xl:px-10">
                    <p className="mb-4 text-sm font-medium tracking-[0.2em] text-black/40 md:mb-5">
                      {col.number}
                    </p>
                    <div className="flex w-full max-w-[19rem] items-start gap-4 sm:max-w-[21rem] sm:gap-5 lg:max-w-none lg:gap-5 xl:gap-6">
                      <Icon
                        aria-hidden
                        size={ICON_SIZE}
                        strokeWidth={ICON_STROKE}
                        className="h-16 w-16 shrink-0 text-neutral-900"
                      />
                      <div className="min-w-0 flex-1">
                        <h3
                          className="font-serif text-[clamp(22px,2.2vw,28px)] font-medium leading-[1.2] tracking-[0.04em] text-[#0a0a0a]"
                          style={serifStyle}
                        >
                          {col.title}
                        </h3>
                        <p className="copy-ja mt-2 text-[12px] leading-[1.85] tracking-[0.06em] text-black/[0.62] md:text-[13px]">
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
