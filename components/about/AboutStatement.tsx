'use client';

import Image from 'next/image';
import { SectionReveal, serifStyle } from '@/components/about/shared';

type StatementBlock = {
  lines: string[];
  large?: boolean;
  spacingBefore?: 'md' | 'xl';
};

const SPACING_BEFORE_CLASS: Record<NonNullable<StatementBlock['spacingBefore']>, string> = {
  md: 'mt-10 md:mt-12',
  xl: 'mt-16 md:mt-20',
};

/** 頭の中ある構想。以降のブロック間（10‒20%程減） */
const SPACING_MD_TIGHT = 'mt-8 md:mt-10';

function spacingBeforeClass(blockIndex: number, spacing?: StatementBlock['spacingBefore']) {
  if (!spacing) return '';
  if (spacing === 'xl') return SPACING_BEFORE_CLASS.xl;
  return blockIndex >= 2 ? SPACING_MD_TIGHT : SPACING_BEFORE_CLASS.md;
}

const STATEMENT_BLOCKS: StatementBlock[] = [
  {
    lines: [
      'AIの力で、すべてが一瞬で変わるわけではない。',
      'けれど、これまで手が届かなかったことに、',
      '少しずつ手が届く時代になった。',
    ],
    large: true,
  },
  {
    lines: [
      '頭の中にある構想。',
      '整理されないまま残っている課題。',
      '形にしたいのに、後回しになっている仕事。',
    ],
    large: true,
    spacingBefore: 'xl',
  },
  {
    lines: [
      'RAPTOVAは、それらを置き去りにしない。',
    ],
    large: true,
    spacingBefore: 'md',
  },
  {
    lines: [
      'AIと人の思考を掛け合わせ、',
      '情報を整理し、目的を見つめ直し、',
      '実行できる形へ変えていく。',
    ],
    large: false,
    spacingBefore: 'md',
  },
  {
    lines: [
      '遠い未来の話ではなく、',
      '目の前の仕事を、今日から前に進めるために。',
    ],
    large: false,
    spacingBefore: 'md',
  }
];


export default function AboutStatement() {
  return (
    <section
      className="relative min-h-[82svh] overflow-x-clip bg-[#070707] text-white md:min-h-[88svh] lg:min-h-[92svh]"
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

      <div className="relative mx-auto flex min-h-[inherit] max-w-[900px] flex-col items-center md:max-w-none justify-center px-3 pt-14 pb-12 text-center md:pt-32 md:pb-28 lg:pt-36 lg:pb-32">
        <h2 id="about-statement-heading" className="sr-only">
          ステートメント
        </h2>

        <div className="w-full">
          {STATEMENT_BLOCKS.map((block, blockIndex) => {
            const isLeadBlock = blockIndex === 0;
            const isRaptovaEmphasis = blockIndex === 2;
            return (
            <SectionReveal key={`stmt-${blockIndex}`} delay={0.06 + blockIndex * 0.08}>
              <p
                className={[
                  'copy-ja flex w-full flex-col items-center tracking-[0.06em]',
                  isLeadBlock
                    ? 'font-light leading-[1.92] text-white/[0.9] text-[clamp(13px,calc((100vw-1.75rem)/24),18px)] md:text-[clamp(16px,calc((100vw-1.75rem)/24),25px)]'
                    : isRaptovaEmphasis
                      ? 'font-normal leading-[1.84] text-white/[0.96] text-[clamp(13px,calc((100vw-1.75rem)/26),17px)] md:text-[clamp(15px,calc((100vw-1.75rem)/26),23px)]'
                      : 'font-light leading-[1.84] text-white/[0.9] text-[clamp(12px,calc((100vw-1.75rem)/26),16px)] md:text-[clamp(14px,calc((100vw-1.75rem)/26),22px)]',
                  spacingBeforeClass(blockIndex, block.spacingBefore),
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={serifStyle}
              >
                {block.lines.map((line, lineIndex) =>
                  line === '' ? (
                    <span
                      key={`stmt-${blockIndex}-gap-${lineIndex}`}
                      className="block h-[1.1em] w-full shrink-0"
                      aria-hidden
                    />
                  ) : (
                    <span
                      key={`stmt-${blockIndex}-${lineIndex}-${line}`}
                      className="block w-max max-w-none whitespace-nowrap"
                    >
                      {line}
                    </span>
                  ),
                )}
              </p>
            </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}


