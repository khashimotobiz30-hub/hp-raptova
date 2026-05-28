'use client';

import {
  FileText,
  LayoutPanelLeft,
  MessageSquare,
  Route,
  type LucideIcon,
} from 'lucide-react';
import { RECRUITING_COMMON_ISSUES } from '@/lib/business/recruiting-content';
import {
  BUSINESS_PAGE_CONTAINER_CLASS,
  SectionReveal,
  serifStyle,
} from '@/components/business/shared';

const ISSUE_ICONS: Record<
  (typeof RECRUITING_COMMON_ISSUES.items)[number]['icon'],
  LucideIcon
> = {
  charm: MessageSquare,
  'job-posting': FileText,
  materials: LayoutPanelLeft,
  funnel: Route,
};

export default function RecruitingCommonIssues() {
  const { title, body, items } = RECRUITING_COMMON_ISSUES;

  return (
    <section
      className="border-b border-black/[0.12] bg-[#f2f0e9] py-8 md:py-10 lg:py-11"
      aria-labelledby="recruiting-issues-heading"
    >
      <div className={BUSINESS_PAGE_CONTAINER_CLASS}>
        <SectionReveal>
          <div className="mx-auto max-w-[40rem] text-center lg:max-w-[44rem]">
            <h2
              id="recruiting-issues-heading"
              className="copy-ja font-serif text-[clamp(26px,3.2vw,38px)] font-medium leading-[1.45] tracking-[0.06em] text-[#0a0a0a]"
              style={serifStyle}
            >
              {title}
            </h2>
            <p className="copy-ja mx-auto mt-4 max-w-[38rem] text-[13px] leading-[1.95] tracking-[0.06em] text-black/[0.62] sm:mt-5 sm:text-sm sm:leading-[2]">
              {body}
            </p>
          </div>
        </SectionReveal>

        <div className="mx-auto mt-8 grid w-full max-w-[1240px] auto-rows-fr grid-cols-1 items-stretch gap-4 sm:mt-9 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          {items.map((item, index) => {
            const Icon = ISSUE_ICONS[item.icon];

            return (
              <SectionReveal key={item.id} delay={0.06 + index * 0.06} fill className="h-full min-w-0">
                <article className="flex h-full min-h-0 items-center rounded-lg border border-black/[0.12] bg-white p-5 sm:p-6">
                  <div className="flex w-full items-center gap-4 sm:gap-5">
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#f0eeea] sm:h-[4.125rem] sm:w-[4.125rem]"
                      aria-hidden
                    >
                      <Icon className="h-8 w-8 text-black/50" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="copy-ja font-serif text-base font-medium leading-snug tracking-[0.05em] text-[#0a0a0a] md:text-[17px]"
                        style={serifStyle}
                      >
                        {item.title}
                      </h3>
                      <p className="copy-ja mt-2.5 text-[12px] leading-[1.85] tracking-[0.05em] text-black/[0.58] sm:text-[13px] sm:leading-[1.9]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
