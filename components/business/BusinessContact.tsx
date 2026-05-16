'use client';

import { handleContactClick } from '@/lib/contact';
import { BusinessLabel, SectionReveal, serifStyle } from '@/components/business/shared';

const BODY_LINES = [
  '採用活動の立ち上げ、Web・資料・文章の整理、',
  '業務効率化など、まだ整理しきれていない段階からご相談ください。',
];

export default function BusinessContact() {
  return (
    <section
      id="contact"
      className="w-full min-w-0 max-w-full overflow-x-clip border-b border-black/[0.08] bg-white px-7 py-20 md:px-14 md:py-24 lg:px-20 lg:py-28"
      aria-labelledby="business-contact-heading"
    >
      <div className="mx-auto grid min-w-0 max-w-[1240px] gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
        <div className="min-w-0">
          <SectionReveal>
            <BusinessLabel>CONTACT</BusinessLabel>
            <h2
              id="business-contact-heading"
              className="copy-ja mt-8 font-serif text-[clamp(26px,3.2vw,36px)] leading-relaxed tracking-[0.06em] text-[#0a0a0a]"
              style={serifStyle}
            >
              目の前の仕事を、
              <br />
              前に進めるきっかけを。
            </h2>
            <p className="copy-ja mt-8 max-w-lg text-[13px] leading-[2.1] tracking-[0.1em] text-black/[0.62] md:text-sm">
              {BODY_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </SectionReveal>
        </div>
        <SectionReveal delay={0.1} className="min-w-0 lg:pb-1">
          <button
            type="button"
            onClick={handleContactClick}
            className="flex w-full min-w-[240px] items-center justify-between bg-[#0a0a0a] px-7 py-5 text-xs font-semibold tracking-[0.2em] text-white transition hover:bg-black/85 min-[430px]:min-w-[280px] min-[430px]:tracking-[0.22em]"
            aria-label="メールで問い合わせる"
          >
            <span>お問い合わせする</span>
            <span>→</span>
          </button>
        </SectionReveal>
      </div>
    </section>
  );
}
