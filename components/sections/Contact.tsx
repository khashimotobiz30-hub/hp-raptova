'use client';

import RevealAnimation from '@/components/ui/RevealAnimation';
import { handleContactClick } from '@/lib/contact';

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-white pt-28 pb-24 md:pt-40 md:pb-32 border-t border-[#e5e5e5]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] md:gap-20 lg:gap-24 md:items-start">
          <RevealAnimation>
            <h2
              id="contact-heading"
              className="text-[#0a0a0a] tracking-[0.12em] leading-[1.1]"
              style={{ fontSize: 'clamp(40px, 3.8vw, 64px)', fontWeight: 500 }}
            >
              CONTACT
            </h2>
          </RevealAnimation>

          <RevealAnimation delay={0.1}>
            <div className="max-w-[720px] mt-6 md:mt-1 md:pl-8 lg:pl-10">
              <p
                className="text-[#0a0a0a] leading-[2.0] copy-ja"
                style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', fontWeight: 300 }}
              >
                アイデア段階のご相談、AI活用に関するご相談、
                <br className="hidden md:inline" />
                プロダクト開発・講座・コンサルティングの<span style={{ whiteSpace: 'nowrap' }}>ご依頼まで。</span>
              </p>

              <p
                className="text-[#555555] mt-8 leading-[2.0] copy-ja"
                style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', fontWeight: 300 }}
              >
                まだ言葉になりきっていなくても構いません。
                <br className="hidden md:inline" />
                RAPTOVAが、形にするための対話から始めます。
              </p>

              <button
                onClick={handleContactClick}
                className="mt-10 inline-flex items-center gap-2 text-[#0a0a0a] text-sm tracking-[0.12em] hover:opacity-60 transition-opacity duration-200 group cursor-pointer"
                aria-label="メールで問い合わせる"
              >
                Contact{' '}
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </button>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
}
