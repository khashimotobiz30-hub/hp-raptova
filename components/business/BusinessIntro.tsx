'use client';

import { Users, FileText, TrendingUp } from 'lucide-react';
import { BusinessLabel, SectionReveal, serifStyle } from '@/components/business/shared';

const BODY_BLOCKS = [
  [
    'RAPTOVAが支援しているのは、',
    '単にWebサイトや資料を作ることではありません。',
  ],
  [
    'まだ言語化されていない課題、',
    '伝わりきっていない魅力、',
    '整理されていない業務や情報を、',
    '実行できる形へ変えていくこと。',
  ],
  [
    '採用、Web・資料制作、業務整理・AI活用は、',
    'そのための入口であり、手段です。',
  ],
] as const;

const PILLAR_ITEMS = [
  {
    Icon: Users,
    lines: ['人と組織の魅力を', '正しく伝える'] as const,
  },
  {
    Icon: FileText,
    lines: ['情報を整理し', '伝わる形にする'] as const,
  },
  {
    Icon: TrendingUp,
    lines: ['仕事の流れを整え', '前に進めやすくする'] as const,
  },
] as const;

export default function BusinessIntro() {
  return (
    <section
      className="relative overflow-hidden border-b border-white/10 bg-[#080808] text-white"
      aria-labelledby="business-intro-heading"
    >
      <div
        className="absolute inset-0 bg-[#070707]"
        style={{
          background:
            'linear-gradient(125deg, #0a0a0a 0%, #121212 48%, #080808 100%)',
        }}
        aria-hidden
      />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-7 py-12 md:px-14 md:py-14 lg:px-20 lg:py-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,13fr)] lg:items-stretch lg:gap-14 xl:gap-16">
          <div className="min-w-0">
            <SectionReveal>
              <BusinessLabel tone="dark">ABOUT OUR BUSINESS</BusinessLabel>
              <h2
                id="business-intro-heading"
                className="copy-ja mt-8 font-serif text-[clamp(26px,3.6vw,40px)] font-medium leading-[1.5] tracking-[0.06em] text-white/[0.94] ![overflow-wrap:normal] ![word-break:keep-all] ![line-break:strict]"
                style={serifStyle}
              >
                課題を整理し、
                <br />
                <span className="lg:whitespace-nowrap">実行できる形へ変える。</span>
              </h2>
            </SectionReveal>
            <div className="mt-10 space-y-8 md:mt-12">
              {BODY_BLOCKS.map((block, index) => (
                <SectionReveal key={block.join('')} delay={0.05 + index * 0.05}>
                  <p className="copy-ja max-w-xl text-[13px] leading-[2.1] tracking-[0.08em] text-white/[0.58] md:text-sm">
                    {block.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </SectionReveal>
              ))}
            </div>
          </div>

          {/* 右側（lg〜 約 65%）：コピー列より広く取り、アイコン下キャプションの行長を確保 */}
          <div className="flex h-full min-h-0 flex-col justify-center border-t border-white/[0.14] pt-14 lg:min-h-0 lg:border-t-0 lg:pt-0">
            <div className="mx-auto grid w-full max-w-[560px] grid-cols-1 gap-y-12 sm:max-w-xl md:mx-0 md:max-w-none md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-x-5 md:gap-y-10 lg:gap-x-6 xl:gap-x-7">
                {PILLAR_ITEMS.map((item, index) => {
                  const Icon = item.Icon;
                  return (
                    <SectionReveal key={item.lines[0]} delay={0.08 + index * 0.06} className="min-w-0">
                      <div
                        className={[
                          'relative flex min-h-[240px] flex-col items-center justify-center gap-6 px-2 text-center md:min-h-[280px] md:gap-8 md:px-2 lg:min-h-[300px] lg:px-3 xl:px-3',
                          // SP: 区切り
                          index > 0 ? 'border-t border-white/[0.15] pt-12 md:border-t-0 md:pt-0' : '',
                          // md+: 縦線は全高より短め（約80% の高さ）
                          index > 0
                            ? 'md:before:pointer-events-none md:before:absolute md:before:left-0 md:before:top-1/2 md:before:h-[80%] md:before:w-px md:before:-translate-y-1/2 md:before:bg-white/[0.15]'
                            : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        <Icon
                          aria-hidden
                          strokeWidth={1}
                          className="h-10 w-10 shrink-0 text-[#b9a16a] md:h-16 md:w-16"
                        />
                        <p className="copy-ja w-full max-w-[14rem] text-sm font-light leading-[1.8] tracking-[0.08em] text-white/[0.78] md:max-w-none md:text-[18px] md:leading-[1.85] lg:text-[19px]">
                          <span className="block">{item.lines[0]}</span>
                          <span className="block">{item.lines[1]}</span>
                        </p>
                      </div>
                    </SectionReveal>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
