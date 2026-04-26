'use client';

import RevealAnimation from '@/components/ui/RevealAnimation';
import { handleContactClick } from '@/lib/contact';

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-white pt-32 pb-24 md:pt-48 md:pb-36 border-t border-[#e5e5e5]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 lg:px-20">
        <RevealAnimation>
          <h2
            id="contact-heading"
            className="text-[#0a0a0a] tracking-[0.22em] text-xs font-medium mb-12"
          >
            CONTACT
          </h2>
        </RevealAnimation>

        <RevealAnimation delay={0.1}>
          <div className="max-w-[560px]">
            <p
              className="text-[#0a0a0a] leading-[1.9] copy-ja"
              style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', fontWeight: 300 }}
            >
              アイデア段階のご相談、AI活用に関するご相談、
              <br className="hidden md:inline" />
              プロダクト開発・講座・コンサルティングの<span style={{ whiteSpace: 'nowrap' }}>ご依頼まで。</span>
            </p>
            <p
              className="text-[#555555] mt-6 leading-[1.9] copy-ja"
              style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', fontWeight: 300 }}
            >
              まだ言葉になりきっていなくても構いません。
              <br className="hidden md:inline" />
              RAPTOVAが、形にするための対話から始めます。
            </p>

            <button
              onClick={handleContactClick}
              className="mt-10 inline-flex items-center gap-2 text-[#0a0a0a] text-sm tracking-[0.1em] hover:opacity-50 transition-opacity duration-200 group cursor-pointer"
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
    </section>
  );
}
