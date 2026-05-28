'use client';

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
import { RECRUITING_APPROACH } from '@/lib/business/recruiting-content';
import {
  BUSINESS_PAGE_CONTAINER_CLASS,
  SectionReveal,
  serifStyle,
} from '@/components/business/shared';

const STEP_ICONS: LucideIcon[] = [
  MessageCircle,
  ListChecks,
  Pencil,
  Monitor,
  RefreshCw,
];

const STEP_ICON_STROKE = 1;
const STEP_ICON_CLASS =
  'h-10 w-10 shrink-0 text-black/[0.88] lg:h-14 lg:w-14 xl:h-16 xl:w-16';

function ApproachStepDivider() {
  return (
    <div className="relative w-6 shrink-0 self-stretch xl:w-7" aria-hidden>
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/[0.12]" />
      <div className="absolute left-1/2 top-1/2 z-[1] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-[#f2f0e9] px-0.5 py-1">
        <ChevronRight strokeWidth={1.5} className="h-6 w-6 text-black/70 xl:h-7 xl:w-7" />
      </div>
    </div>
  );
}

function ApproachStepCell({
  step,
  stepIndex,
}: {
  step: (typeof RECRUITING_APPROACH.steps)[number];
  stepIndex: number;
}) {
  const Icon = STEP_ICONS[stepIndex] ?? MessageCircle;

  return (
    <div className="relative flex h-full w-full min-h-0 flex-col lg:min-h-0">
      <p
        className="absolute left-0 top-0 z-[1] font-serif font-light leading-none tracking-[0.06em] text-black/[0.88]"
        style={{ ...serifStyle, fontSize: 'clamp(18px, 1.6vw, 24px)' }}
      >
        {step.index}
      </p>
      <div
        className={[
          'grid h-full w-full text-center',
          'grid-rows-[3.5rem_auto_minmax(0,auto)] gap-y-2.5 pt-7',
          'sm:pt-8',
          'lg:grid-rows-[4rem_auto_4.5em] lg:gap-y-2.5 lg:px-1 lg:pt-8',
          'xl:grid-rows-[5rem_auto_4.5em] xl:pt-9',
        ].join(' ')}
      >
        <div className="flex items-center justify-center">
          <Icon aria-hidden strokeWidth={STEP_ICON_STROKE} className={STEP_ICON_CLASS} />
        </div>
        <h3 className="copy-ja text-center text-[14px] font-semibold leading-snug tracking-[0.02em] text-black/[0.88] lg:text-[13px]">
          {step.title}
        </h3>
        <p className="copy-ja w-full text-center text-[12px] leading-[1.75] tracking-[0.02em] text-black/[0.58] lg:min-h-[4.5em]">
          {step.body}
        </p>
      </div>
    </div>
  );
}

export default function RecruitingApproach() {
  const { headingLines, steps } = RECRUITING_APPROACH;

  return (
    <section
      className="bg-[#f2f0e9] pt-14 pb-10 md:pt-16 md:pb-12 lg:pb-12"
      aria-labelledby="recruiting-approach-heading"
    >
      <div className={BUSINESS_PAGE_CONTAINER_CLASS}>
        <SectionReveal>
          <h2
            id="recruiting-approach-heading"
            className="copy-ja font-serif text-[clamp(26px,3.2vw,38px)] font-medium leading-[1.45] tracking-[0.04em] text-[#0a0a0a]"
            style={serifStyle}
          >
            {headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </SectionReveal>

        <div className="mt-10 border-t border-black/[0.12] pt-8 md:mt-12 lg:pt-10">
          <div className="flex flex-col divide-y divide-black/[0.12] lg:hidden">
            {steps.map((step, i) => (
              <SectionReveal key={step.index} delay={0.04 * i} className="flex min-w-0">
                <div className="flex h-full w-full py-7">
                  <ApproachStepCell step={step} stepIndex={i} />
                </div>
              </SectionReveal>
            ))}
          </div>
          <div className="hidden lg:flex lg:w-full lg:items-stretch">
            {steps.map((step, i) => (
              <Fragment key={step.index}>
                {i > 0 ? <ApproachStepDivider /> : null}
                <SectionReveal delay={0.04 * i} className="flex min-w-0 flex-[1_1_0%] basis-0">
                  <div className="flex h-full w-full min-w-0 flex-col px-2 xl:px-3">
                    <ApproachStepCell step={step} stepIndex={i} />
                  </div>
                </SectionReveal>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
