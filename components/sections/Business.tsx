'use client';

import Link from 'next/link';
import Image from 'next/image';
import RevealAnimation from '@/components/ui/RevealAnimation';

const BUSINESS_COPY = [
  'RAPTOVAは、採用・クリエイティブ・業務設計の領域で、',
  '人や組織の中にある構想・課題・情報を整理し、',
  '現実に動くアウトプットへ変えていきます。',
];

const BUSINESS_ITEMS = [
  {
    number: '01',
    titleEn: 'RECRUITING SUPPORT',
    titleJa: '採用活動支援',
    description:
      '採用戦略の設計から、LP・サイト・説明資料など\n採用活動で必要になる各種ツールの提供を含め\n企業の魅力を最大限発信する支援を行います。',
    imageSrc: '/images/services/service-recruiting-support.png',
    numberTone: 'light',
    status: null,
  },
  {
    number: '02',
    titleEn: 'BUSINESS CREATIVE',
    titleJa: 'Web・資料等制作支援',
    description:
      'WebサイトやLP、会社資料、チラシ、\n営業資料、文章コンテンツなど、\n伝わるクリエイティブを制作します。',
    imageSrc: '/images/services/service-business-creative.png',
    numberTone: 'dark',
    status: null,
  },
  {
    number: '03',
    titleEn: 'WORKFLOW DESIGN',
    titleJa: '業務整理・AI活用支援',
    description:
      '日々の業務や情報の流れを整理し、\nAIを活用できる仕組みへ変えていく支援を\n準備しています。',
    imageSrc: '/images/services/service-workflow-design.png',
    numberTone: 'light',
    status: 'COMING SOON',
  },
] as const;

export default function Business() {
  return (
    <section
      id="business"
      className="w-full min-w-0 max-w-full overflow-x-clip bg-[#f4f3ef] px-7 py-24 md:px-14 lg:px-20"
      aria-labelledby="business-heading"
    >
      <div className="min-w-0 max-w-[980px]">
        <RevealAnimation>
          <p className="mb-8 text-[10px] font-semibold tracking-[0.42em] text-zinc-500">
            BUSINESS
          </p>
          <h2
            id="business-heading"
            className="copy-ja font-serif text-3xl leading-relaxed tracking-[0.14em] text-zinc-950 md:text-4xl"
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

        <div className="mt-14 grid min-w-0 gap-8 min-[1440px]:grid-cols-3">
          {BUSINESS_ITEMS.map((item, index) => (
            <RevealAnimation key={item.number} delay={0.08 + index * 0.06}>
              <article className="group flex h-full min-w-0 flex-col">
                <div className="relative mb-7 h-40 overflow-hidden bg-zinc-900">
                  <Image
                    src={item.imageSrc}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 260px"
                    className="object-cover opacity-90 grayscale transition duration-500 group-hover:scale-[1.03]"
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
                </div>

                <p className="mb-3 min-h-[12px] text-[10px] font-semibold tracking-[0.28em] text-zinc-500">
                  {item.titleEn}
                </p>
                <h3 className="copy-ja min-h-[38px] font-serif text-xl leading-snug tracking-[0.08em] text-zinc-950 lg:text-[22px]">
                  {item.titleJa}
                </h3>
                <p className="copy-ja mt-2 min-h-[96px] whitespace-pre-line text-xs leading-loose tracking-[0.08em] text-zinc-600">
                  {item.description}
                </p>
                <div className="mt-auto pt-2">
                  {item.status ? (
                    <p className="text-[10px] font-semibold tracking-[0.28em] text-zinc-500">
                      {item.status}
                    </p>
                  ) : (
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-4 text-xs tracking-[0.18em] text-zinc-950"
                    >
                      <span className="h-px w-10 bg-zinc-950 transition-all group-hover:w-16" />
                      VIEW MORE
                    </Link>
                  )}
                </div>
              </article>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
