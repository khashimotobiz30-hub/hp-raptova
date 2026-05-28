'use client';

import Link from 'next/link';
import Image from 'next/image';
import RevealAnimation from '@/components/ui/RevealAnimation';

const BUSINESS_COPY = [
  'RAPTOVAは、採用・クリエイティブ・業務設計の領域で、',
  '人や組織の中にある構想・課題・情報を整理し、',
  '現実に動くアウトプットへ変えていきます。',
];

const BUSINESS_SECTION_CARDS = [
  {
    number: '01',
    titleEn: 'RECRUITING SUPPORT',
    titleJa: '採用活動支援',
    description:
      '採用戦略の設計から、LP・サイト・説明資料など採用活動で必要になる各種ツールの提供を含め企業の魅力を最大限発信する支援を行います。',
    imageSrc: '/images/business/business-recruiting-support.png',
    numberTone: 'light',
    status: null,
    viewMoreHref: '/business/recruiting',
  },
  {
    number: '02',
    titleEn: 'BUSINESS CREATIVE',
    titleJa: 'Web・資料等制作支援',
    description:
      'WebサイトやLP、会社資料、チラシ、営業資料、文章コンテンツなど、伝わるクリエイティブを制作します。',
    imageSrc: '/images/business/business-creative.png',
    numberTone: 'dark',
    status: 'COMING SOON',
    statusOnImage: true,
  },
  {
    number: '03',
    titleEn: 'WORKFLOW DESIGN',
    titleJa: '業務整理・AI活用支援',
    description:
      '日々の業務や情報の流れを整理し、AIを活用できる仕組みへ変えていく支援を準備しています。',
    imageSrc: '/images/business/business-workflow-design.png',
    numberTone: 'light',
    status: 'COMING SOON',
    statusOnImage: true,
  },
] as const;

export default function Business() {
  return (
    <section
      id="business"
      className="w-full min-w-0 max-w-full overflow-x-clip bg-[#f2f0e9] px-7 py-24 md:px-14 lg:px-10 lg:py-16 xl:px-14 xl:py-20 min-[1440px]:px-20 min-[1440px]:py-24"
      aria-labelledby="business-heading"
    >
      <div className="min-w-0 max-w-[980px]">
        <RevealAnimation>
          <p className="mb-8 text-[10px] font-semibold tracking-[0.42em] text-zinc-500">
            BUSINESS
          </p>
          <h2
            id="business-heading"
            className="copy-ja font-serif text-3xl leading-relaxed tracking-[0.14em] text-zinc-950 md:text-[1.85rem] lg:text-[1.65rem] xl:text-4xl min-[1440px]:text-4xl"
          >
            構想を、実行できる形へ。
          </h2>
          <p className="copy-ja mt-8 max-w-xl text-[13px] leading-[2.25] tracking-[0.14em] text-zinc-600">
            {BUSINESS_COPY.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </RevealAnimation>

        <div className="mt-10 grid min-w-0 gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5 xl:mt-14 xl:gap-6 min-[1440px]:gap-8">
          {BUSINESS_SECTION_CARDS.map((item, index) => {
            const isComingSoon = Boolean(item.status);

            return (
              <RevealAnimation key={item.number} delay={0.08 + index * 0.06}>
                <article
                  className={[
                    'flex h-full min-w-0 flex-col',
                    isComingSoon ? 'cursor-default' : 'group',
                  ].join(' ')}
                  {...(isComingSoon ? { 'aria-disabled': true } : {})}
                >
                  <div className="relative mb-5 h-32 overflow-hidden bg-zinc-900 lg:mb-6 lg:h-[7.25rem] xl:mb-7 xl:h-36 min-[1440px]:mb-7 min-[1440px]:h-40">
                    <Image
                      src={item.imageSrc}
                      alt=""
                      fill
                      sizes="(max-width: 1023px) 50vw, (max-width: 1439px) 22vw, 260px"
                      className={[
                        'object-cover opacity-90 grayscale',
                        isComingSoon
                          ? ''
                          : 'transition duration-500 group-hover:scale-[1.03]',
                      ].join(' ')}
                    />
                    <div
                      className={[
                        'absolute inset-0',
                        item.numberTone === 'dark' ? 'bg-white/8' : 'bg-black/18',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                    <div
                      className={[
                        'absolute left-5 top-5 text-sm font-medium tracking-[0.18em]',
                        item.numberTone === 'dark'
                          ? 'text-zinc-950 drop-shadow-[0_1px_8px_rgba(255,255,255,0.42)]'
                          : 'text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]',
                      ].join(' ')}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    {'statusOnImage' in item && item.statusOnImage ? (
                      <p className="pointer-events-none absolute inset-0 z-10 flex cursor-default select-none items-center justify-center px-3 text-center text-[15px] font-semibold leading-none tracking-[0.26em] text-white/95 drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)]">
                        {item.status}
                      </p>
                    ) : null}
                  </div>

                  <p className="mb-3 min-h-[12px] text-[10px] font-semibold tracking-[0.28em] text-zinc-500">
                    {item.titleEn}
                  </p>
                  <h3 className="copy-ja min-h-0 font-serif text-lg leading-snug tracking-[0.08em] text-zinc-950 lg:min-h-[34px] lg:text-[1.05rem] xl:text-xl min-[1440px]:min-h-[38px] min-[1440px]:text-[22px]">
                    {item.titleJa}
                  </h3>
                  <p className="copy-ja mt-2 min-h-0 text-[11px] leading-loose tracking-[0.08em] text-zinc-600 lg:min-h-[84px] lg:text-xs xl:min-h-[96px]">
                    {item.description}
                  </p>
                  <div className="mt-auto pt-2">
                    {'viewMoreHref' in item ? (
                      <Link
                        href={item.viewMoreHref}
                        className="copy-ja group flex w-44 items-center justify-between border border-zinc-950 px-6 py-4 text-xs font-semibold tracking-[0.18em] text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
                      >
                        VIEW MORE{' '}
                        <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    ) : null}
                  </div>
                </article>
              </RevealAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
