'use client';

import RevealAnimation from '@/components/ui/RevealAnimation';
import { handleContactClick } from '@/lib/contact';

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-[#080808] px-7 py-16 text-white md:px-14 lg:px-20"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-[1240px] gap-10 xl:grid-cols-[360px_minmax(500px,1fr)_280px] xl:items-center xl:gap-16">
        <div>
          <RevealAnimation>
            <p className="mb-5 text-[10px] font-semibold tracking-[0.42em] text-white/34">
              CONTACT
            </p>
            <h2
              id="contact-heading"
              className="copy-ja font-serif text-[26px] leading-relaxed tracking-[0.03em] text-white min-[430px]:text-3xl min-[430px]:tracking-[0.12em] md:tracking-[0.18em] xl:whitespace-nowrap"
            >
              目の前の仕事を、
              <br />
              前に進めるきっかけを。
            </h2>
          </RevealAnimation>
        </div>

        <RevealAnimation delay={0.1}>
          <p className="copy-ja max-w-none text-xs leading-[2.15] tracking-[0.14em] text-white/58">
            採用活動の立ち上げ、Web・資料・文章の整理、
            <br className="hidden md:inline" />
            業務効率化など、まだ整理しきれていない段階からご相談ください。
          </p>
        </RevealAnimation>

        <RevealAnimation delay={0.16}>
          <button
            onClick={handleContactClick}
            className="flex w-full items-center justify-between border border-white/35 px-7 py-5 text-xs font-semibold tracking-[0.22em] text-white transition hover:bg-white hover:text-zinc-950"
            aria-label="メールで問い合わせる"
          >
            お問い合わせする <span>→</span>
          </button>
        </RevealAnimation>
      </div>
    </section>
  );
}
