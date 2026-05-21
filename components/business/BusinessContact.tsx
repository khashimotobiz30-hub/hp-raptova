'use client';

import { handleContactClick } from '@/lib/contact';
import { BusinessLabel, SectionReveal, serifStyle } from '@/components/business/shared';

const BODY_LINES = [
  '採用活動の立ち上げ、Web・資料・文章の整理、',
  '業務効率化など、まだ整理しきれていない段階からご相談ください。',
] as const;

export default function BusinessContact() {
  return (
    <section
      id="contact"
      className="w-full min-w-0 max-w-full overflow-x-clip border-b border-black/[0.08] bg-[#f2f0e9] px-7 py-16 text-[#0a0a0a] md:px-14 lg:px-20"
      aria-labelledby="business-contact-heading"
    >
      <div className="mx-auto grid min-w-0 max-w-[1240px] gap-10 min-[1440px]:grid-cols-[360px_minmax(500px,1fr)_280px] min-[1440px]:items-center min-[1440px]:gap-16">
        <div className="min-w-0">
          <SectionReveal>
            <div className="mb-5">
              <BusinessLabel>CONTACT</BusinessLabel>
            </div>
            <h2
              id="business-contact-heading"
              className="copy-ja max-w-full font-serif text-[26px] leading-relaxed tracking-[0.03em] text-[#0a0a0a] min-[430px]:text-3xl min-[430px]:tracking-[0.12em] md:tracking-[0.18em] min-[1440px]:tracking-[0.05em] min-[1440px]:whitespace-nowrap"
              style={serifStyle}
            >
              目の前の仕事を、
              <br />
              前に進めるきっかけを。
            </h2>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.1} className="min-w-0">
          <p className="copy-ja max-w-full text-xs leading-[2.15] tracking-[0.12em] text-black/[0.58] min-[430px]:tracking-[0.14em]">
            {BODY_LINES[0]}
            <br className="hidden md:inline" />
            {BODY_LINES[1]}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.16} className="min-w-0">
          <button
            type="button"
            onClick={handleContactClick}
            className="flex w-full min-w-0 max-w-full items-center justify-between border border-black/35 bg-[#f2f0e9] px-6 py-5 text-xs font-semibold tracking-[0.18em] text-[#0a0a0a] transition hover:bg-[#0a0a0a] hover:text-white min-[430px]:px-7 min-[430px]:tracking-[0.22em]"
            aria-label="メールで問い合わせる"
          >
            <span className="min-w-0">お問い合わせする</span>
            <span className="shrink-0">→</span>
          </button>
        </SectionReveal>
      </div>
    </section>
  );
}
