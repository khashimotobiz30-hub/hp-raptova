'use client';

import Link from 'next/link';
import { RECRUITING_CONTACT } from '@/lib/business/recruiting-content';
import { trackContactClick } from '@/lib/analytics';
import { BusinessLabel, BUSINESS_PAGE_CONTAINER_CLASS, SectionReveal, serifStyle } from '@/components/business/shared';

export default function RecruitingContact() {
  const { label, headingLines, bodyLines, ctaLabel } = RECRUITING_CONTACT;

  return (
    <section
      id="contact"
      className="w-full min-w-0 max-w-full overflow-x-clip border-b border-black/[0.08] bg-white text-[#0a0a0a]"
      aria-labelledby="recruiting-contact-heading"
    >
      <div className={`${BUSINESS_PAGE_CONTAINER_CLASS} py-12 md:py-14 lg:py-16`}>
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="min-w-0">
            <SectionReveal>
              <BusinessLabel>{label}</BusinessLabel>
              <h2
                id="recruiting-contact-heading"
                className="copy-ja mt-5 font-serif text-[clamp(22px,3vw,32px)] font-medium leading-[1.45] tracking-[0.04em] text-[#0a0a0a]"
                style={serifStyle}
              >
                {headingLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.08} className="mt-5">
              <p className="copy-ja max-w-xl text-[13px] leading-[1.9] tracking-[0.02em] text-black/[0.55]">
                {bodyLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.12} className="shrink-0">
            <Link
              href="/contact"
              onClick={() => trackContactClick('business-recruiting')}
              className="group inline-flex w-full items-center justify-between gap-6 border border-black/20 bg-white px-6 py-3.5 text-[12px] font-semibold tracking-[0.12em] text-[#0a0a0a] transition hover:border-black/40 hover:bg-[#0a0a0a] hover:text-white sm:w-auto sm:min-w-[15rem]"
              aria-label="お問い合わせページへ"
            >
              <span>{ctaLabel}</span>
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </Link>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
