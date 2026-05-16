'use client';

import RevealAnimation from '@/components/ui/RevealAnimation';
import { handleContactClick } from '@/lib/contact';

export default function AboutContact() {
  return (
    <section
      id="contact"
      className="w-full min-w-0 max-w-full overflow-x-clip border-t border-white/10 bg-[#080808] px-7 py-16 text-white md:px-14 lg:px-20"
      aria-labelledby="about-contact-heading"
    >
      <div className="mx-auto grid min-w-0 max-w-[1240px] gap-10 min-[1440px]:grid-cols-[360px_minmax(500px,1fr)_280px] min-[1440px]:items-center min-[1440px]:gap-16">
        <div className="min-w-0">
          <RevealAnimation>
            <p className="mb-5 text-[10px] font-semibold tracking-[0.42em] text-white/34">
              CONTACT
            </p>
            <h2
              id="about-contact-heading"
              className="copy-ja max-w-full font-serif text-[26px] leading-relaxed tracking-[0.03em] text-white min-[430px]:text-3xl min-[430px]:tracking-[0.12em] md:tracking-[0.18em] min-[1440px]:whitespace-nowrap"
            >
              目の前の仕事を、
              <br />
              前に進めるきっかけを。
            </h2>
          </RevealAnimation>
        </div>

        <RevealAnimation delay={0.1} className="min-w-0">
          <p className="copy-ja max-w-full text-xs leading-[2.15] tracking-[0.12em] text-white/58 min-[430px]:tracking-[0.14em]">
            採用活動の立ち上げ、Web・資料・文章の整理、
            <br className="hidden md:inline" />
            業務効率化など、まだ整理しきれていない段階からご相談ください。
          </p>
        </RevealAnimation>

        <RevealAnimation delay={0.16} className="min-w-0">
          <button
            type="button"
            onClick={handleContactClick}
            className="flex w-full min-w-0 max-w-full items-center justify-between border border-white/35 px-6 py-5 text-xs font-semibold tracking-[0.18em] text-white transition hover:bg-white hover:text-zinc-950 min-[430px]:px-7 min-[430px]:tracking-[0.22em]"
            aria-label="メールで問い合わせる"
          >
            <span className="min-w-0">お問い合わせする</span>
            <span className="shrink-0">→</span>
          </button>
        </RevealAnimation>
      </div>
    </section>
  );
}
