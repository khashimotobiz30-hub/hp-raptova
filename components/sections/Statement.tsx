'use client';

import RevealAnimation from '@/components/ui/RevealAnimation';
import Image from 'next/image';

const STATEMENT_LINES = [
  'AIの変化を、',
  '遠い未来の話にしない。',
  'まだ手が届いていない力を、',
  '目の前の仕事へ届ける。',
];

const BODY_LINES = [
  '構想や課題、情報を整理し、',
  'AIと人の思考を掛け合わせて、',
  '実行できる形へ変えていく。',
  'RAPTOVAは、仕事を前に進めるパートナーです。',
];

export default function Statement() {
  return (
    <section
      id="statement"
      className="overflow-hidden bg-[#050505] text-white"
      aria-label="ステートメント"
    >
      <div className="mx-auto max-w-[1440px] px-7 py-24 md:px-14 md:py-32 lg:px-20 lg:py-40">
        <div className="grid gap-14 border-t border-white/15 pt-10 md:grid-cols-[31%_1fr] md:gap-16 md:pt-14 lg:gap-24">
          <RevealAnimation>
            <div>
              <p className="text-[10px] font-semibold tracking-[0.42em] text-white/38">
                STATEMENT
              </p>
              <div className="mt-8 hidden h-24 w-px bg-white/20 md:block" aria-hidden="true" />
            </div>
          </RevealAnimation>

          <div>
            <RevealAnimation delay={0.08}>
              <h2 className="copy-ja text-[clamp(28px,4.4vw,64px)] font-light leading-[1.45] tracking-[0.08em] text-white">
                {STATEMENT_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </RevealAnimation>

            <RevealAnimation delay={0.18} className="mt-12 md:mt-16">
              <p className="copy-ja max-w-[620px] text-[14px] font-light leading-[2.15] tracking-[0.16em] text-white/58 md:text-[15px]">
                {BODY_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </RevealAnimation>
          </div>
        </div>
      </div>

      <RevealAnimation delay={0.12} className="relative mx-auto max-w-[1440px]">
        <div className="relative h-[300px] overflow-hidden bg-black md:h-[460px] lg:h-[560px]">
          <Image
            src="/images/raptova-statement-visual.png"
            alt=""
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-[50%_44%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-black/20"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 top-0 h-px bg-white/10"
            aria-hidden="true"
          />
        </div>
      </RevealAnimation>
    </section>
  );
}
