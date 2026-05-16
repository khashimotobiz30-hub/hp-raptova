'use client';

import Link from 'next/link';
import {
  ChevronRight,
  ListChecks,
  MessageCircle,
  Monitor,
  Pencil,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';
import { Fragment } from 'react';
import { BusinessLabel, SectionReveal, serifStyle } from '@/components/business/shared';

const INTRO_LINES = [
  'RAPTOVAは、最初から完成物だけを作るのではなく、',
  'まずは課題や情報を整理するところから始めます。',
  '何を伝えるべきか。誰に届けるべきか。どの形にすれば前に進むのか。',
  'その前提を整えた上で、Web、資料、文章、AI活用など、必要な形へ落とし込んでいきます。',
] as const;

const STEPS: ReadonlyArray<{
  index: string;
  title: string;
  body: string;
  Icon: LucideIcon;
}> = [
  { index: '01', title: 'HEARING', body: '現状・課題・背景を詳細に聞く', Icon: MessageCircle },
  { index: '02', title: 'ORGANIZE', body: '情報・目的・優先順位を整理する', Icon: ListChecks },
  { index: '03', title: 'DESIGN', body: '構成・導線・表現方法を設計する', Icon: Pencil },
  { index: '04', title: 'CREATE', body: 'Web・資料・文章として形にする', Icon: Monitor },
  { index: '05', title: 'IMPROVE', body: '反応・状況を見ながら改善する', Icon: RefreshCw },
] as const;

const STEP_ICON_STROKE = 1;
const STEP_ICON_CLASS =
  'h-10 w-10 shrink-0 text-black/[0.88] lg:h-14 lg:w-14 xl:h-16 xl:w-16';

function ApproachStepDivider() {
  return (
    <div className="relative w-6 shrink-0 self-stretch xl:w-7" aria-hidden>
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/[0.12]" />
      <div className="absolute left-1/2 top-1/2 z-[1] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#f4f3ef] px-0.5 py-1">
        <ChevronRight strokeWidth={1.5} className="h-6 w-6 text-black/70 xl:h-7 xl:w-7" />
      </div>
    </div>
  );
}

function ApproachStepCell({ step }: { step: (typeof STEPS)[number] }) {
  const Icon = step.Icon;
  return (
    <div className="relative flex h-full w-full min-h-[200px] flex-col sm:min-h-[220px] lg:min-h-0">
      <p
        className="absolute left-0 top-0 z-[1] font-serif font-light leading-none tracking-[0.08em] text-black/[0.88]"
        style={{ ...serifStyle, fontSize: 'clamp(18px, 1.6vw, 24px)' }}
      >
        {step.index}
      </p>
      <div
        className={[
          'grid h-full w-full text-center',
          'grid-rows-[3.5rem_1.375rem_minmax(4.5em,auto)] gap-y-2 pt-7',
          'sm:grid-rows-[3.75rem_1.375rem_minmax(4.5em,auto)] sm:pt-8',
          'lg:grid-rows-[4rem_1.375rem_4.5em] lg:gap-y-2.5 lg:px-1 lg:pt-8',
          'xl:grid-rows-[5rem_1.375rem_4.5em] xl:pt-9',
        ].join(' ')}
      >
        <div className="flex items-center justify-center">
          <Icon aria-hidden strokeWidth={STEP_ICON_STROKE} className={STEP_ICON_CLASS} />
        </div>
        <h3 className="flex items-start justify-center text-[11px] font-semibold leading-none tracking-[0.2em] text-black/[0.82]">
          {step.title}
        </h3>
        <p className="copy-ja flex min-h-[4.5em] w-full items-start justify-center text-[12px] leading-[1.75] tracking-[0.04em] text-black/[0.58]">
          {step.body}
        </p>
      </div>
    </div>
  );
}

export default function BusinessApproach() {
  return (
    <section
      className="border-b border-black/[0.08] bg-[#f4f3ef] px-7 pt-16 pb-14 md:px-14 md:pt-18 md:pb-16 lg:px-20 lg:pt-16 lg:pb-14 xl:pt-18 xl:pb-16"
      aria-labelledby="business-approach-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:items-start lg:gap-10 xl:gap-12">
          <div className="min-w-0">
            <SectionReveal>
              <BusinessLabel>APPROACH</BusinessLabel>
              <h2
                id="business-approach-heading"
                className="copy-ja mt-8 font-serif text-[clamp(26px,3.2vw,38px)] font-medium leading-[1.45] tracking-[0.06em] text-[#0a0a0a]"
                style={serifStyle}
              >
                整理して、
                <br />
                設計して、形にする。
              </h2>
              <p className="copy-ja mt-8 text-[13px] leading-[2.05] tracking-[0.08em] text-black/[0.65] md:text-sm">
                {INTRO_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <Link
                href="/about"
                className="group mt-10 inline-flex items-center gap-4 border border-black/35 px-6 py-4 text-[11px] font-semibold tracking-[0.22em] text-black/[0.88] transition hover:bg-black hover:text-white"
              >
                私たちの考え方を見る
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </SectionReveal>
          </div>
          <div className="min-w-0 border-t border-black/[0.12] pt-8 lg:border-t-0 lg:pl-8 lg:pt-20 xl:pl-10 xl:pt-22">
            <div className="grid divide-y divide-black/[0.12] sm:grid-cols-2 sm:items-stretch sm:divide-y-0 lg:hidden">
              {STEPS.map((step, i) => (
                <SectionReveal key={step.index} delay={0.04 * i} className="flex min-w-0">
                  <div
                    className={[
                      'flex h-full w-full px-0 py-7 sm:px-4 sm:py-0',
                      i >= 2 ? 'max-sm:border-t max-sm:border-black/[0.12]' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <ApproachStepCell step={step} />
                  </div>
                </SectionReveal>
              ))}
            </div>
            <div className="hidden lg:flex lg:w-full lg:items-stretch">
              {STEPS.map((step, i) => (
                <Fragment key={step.index}>
                  {i > 0 ? <ApproachStepDivider /> : null}
                  <SectionReveal delay={0.04 * i} className="flex min-w-0 flex-[1_1_0%] basis-0">
                    <div className="flex h-full w-full min-w-0 flex-col px-2 xl:px-3">
                      <ApproachStepCell step={step} />
                    </div>
                  </SectionReveal>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
