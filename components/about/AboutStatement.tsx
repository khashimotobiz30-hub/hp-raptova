'use client';

import Image from 'next/image';
import { SectionReveal, serifStyle } from '@/components/about/shared';

const STATEMENT_BLOCKS = [
  {
    lines: ['AIの力で、', 'すべてが一瞬で変わるわけではない。'],
    large: true,
  },
  {
    lines: ['けれど、これまで手が届かなかったことに、', '少しずつ手が届く時代になった。'],
    large: true,
  },
  {
    lines: [
      'RAPTOVAは、構想や課題を置き去りにせず、',
      'AIと人の思考を掛け合わせ、',
      '実行できる形へ変えていく。',
    ],
    large: false,
  },
] as const;

export default function AboutStatement() {
  return (
    <section
      className="relative min-h-[80svh] overflow-hidden bg-[#070707] text-white md:min-h-[85svh] lg:min-h-[88svh]"
      aria-labelledby="about-statement-heading"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/about/about-statement-light.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-black/58" aria-hidden />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            'linear-gradient(118deg, rgba(8,8,8,0.88) 0%, rgba(18,18,18,0.72) 42%, rgba(6,6,6,0.92) 100%)',
        }}
        aria-hidden
      />
      <div
        className="absolute -left-[20%] top-[-10%] h-[130%] w-[55%] rotate-[18deg] bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent blur-3xl"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_72%_40%,rgba(255,255,255,0.06),transparent_55%)]"
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden />

      <div className="relative mx-auto flex min-h-[inherit] max-w-[900px] flex-col items-center justify-center px-7 py-24 text-center md:px-14 md:py-28 lg:px-20 lg:py-32">
        <h2 id="about-statement-heading" className="sr-only">
          ステートメント
        </h2>

        <div className="w-full max-w-[640px]">
          {STATEMENT_BLOCKS.map((block, blockIndex) => (
            <SectionReveal key={block.lines.join('')} delay={0.06 + blockIndex * 0.08}>
              <p
                className={[
                  'copy-ja',
                  block.large
                    ? 'text-[clamp(18px,2.4vw,26px)] font-light leading-[1.92] tracking-[0.06em] text-white/[0.9]'
                    : 'mt-10 text-[14px] font-light leading-[2.05] tracking-[0.1em] text-white/[0.58] md:mt-12 md:text-[15px]',
                  blockIndex > 0 && block.large ? 'mt-8 md:mt-9' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={serifStyle}
              >
                {block.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
