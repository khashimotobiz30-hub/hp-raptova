'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RECRUITING_HERO } from '@/lib/business/recruiting-content';
import { trackContactClick } from '@/lib/analytics';
import { SectionReveal, serifStyle } from '@/components/business/shared';

export default function RecruitingHero() {
  const { label, titleLines, bodyLines, image, ctas } = RECRUITING_HERO;

  return (
    <section
      className="relative -mt-[72px] overflow-x-clip border-b border-black/[0.07] bg-[#f7f7f6]"
      aria-labelledby="recruiting-hero-title"
    >
      <div
        className={[
          'flex w-full flex-col',
          'lg:grid lg:grid-cols-[minmax(min(100%,36rem),46%)_minmax(0,1fr)] lg:items-stretch',
          'lg:min-h-[clamp(23rem,38vw,33rem)]',
        ].join(' ')}
      >
        <div
          className={[
            'relative z-[2] flex min-w-0 flex-col justify-start',
            'px-7 md:px-14',
            'pt-[calc(72px+4.5rem)] pb-5',
            'sm:pt-[calc(72px+5rem)] sm:pb-6',
            'lg:pt-[calc(72px+6rem)] lg:pb-7',
            'xl:pt-[calc(72px+6.5rem)]',
            'lg:min-w-0 lg:pl-[max(1.75rem,calc((100vw-1440px)/2+5rem))] lg:pr-6 xl:pr-8',
          ].join(' ')}
        >
          <SectionReveal>
            <div className="min-w-0 max-w-none lg:max-w-none">
              <p className="copy-ja text-[12px] font-medium leading-relaxed tracking-[0.06em] text-black/[0.58] sm:text-[13px]">
                {label}
              </p>
              <h1
                id="recruiting-hero-title"
                className={[
                  'copy-ja mt-5 font-serif font-medium leading-[1.18] tracking-[0.05em] text-[#0a0a0a]',
                  'text-[clamp(24px,6.2vw,32px)]',
                  'sm:text-[clamp(26px,5.2vw,36px)]',
                  'lg:mt-6 lg:text-[clamp(28px,2.8vw,44px)] lg:leading-[1.16] lg:tracking-[0.048em]',
                  'xl:text-[clamp(30px,2.6vw,48px)]',
                ].join(' ')}
                style={serifStyle}
              >
                {titleLines.map((line) => (
                  <span key={line} className="block lg:whitespace-nowrap">
                    {line}
                  </span>
                ))}
              </h1>
              <p
                className={[
                  'copy-ja mt-6 text-[13px] leading-[1.95] tracking-[0.08em] text-black/[0.68]',
                  'sm:mt-7 sm:text-sm sm:leading-[2]',
                  'lg:mt-7 lg:max-w-none',
                ].join(' ')}
              >
                {bodyLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4 lg:flex-nowrap lg:gap-3">
                <Link
                  href={ctas.downloadHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="copy-ja flex w-full min-w-0 items-center justify-between rounded-full border border-[#0a0a0a] bg-[#0a0a0a] px-5 py-3.5 text-[11px] font-semibold tracking-[0.12em] text-white transition hover:bg-white hover:text-[#0a0a0a] sm:min-w-[15.5rem] sm:flex-1 sm:max-w-[17.5rem] lg:w-auto lg:flex-none lg:max-w-none lg:shrink-0 lg:whitespace-nowrap lg:px-5 min-[430px]:px-6 min-[430px]:tracking-[0.16em]"
                  aria-label="サービス資料を受け取るフォームを開く"
                >
                  <span className="min-w-0 text-left">{ctas.downloadLabel}</span>
                  <span className="shrink-0 pl-3" aria-hidden>
                    →
                  </span>
                </Link>
                <Link
                  href={ctas.consultHref}
                  onClick={() => trackContactClick('business-recruiting')}
                  className="copy-ja flex w-full min-w-0 items-center justify-between rounded-full border border-black/35 bg-white px-5 py-3.5 text-[11px] font-semibold tracking-[0.12em] text-[#0a0a0a] transition hover:border-black/55 hover:bg-[#f7f7f6] sm:min-w-[12.5rem] sm:flex-1 sm:max-w-[14.5rem] lg:w-auto lg:flex-none lg:max-w-none lg:shrink-0 lg:whitespace-nowrap lg:px-5 min-[430px]:px-6 min-[430px]:tracking-[0.16em]"
                  aria-label="無料相談のお問い合わせへ"
                >
                  <span className="min-w-0 text-left">{ctas.consultLabel}</span>
                  <span className="shrink-0 pl-3" aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>

        <div className="relative w-full min-w-0 shrink-0 lg:min-h-0 lg:flex-1 lg:self-stretch">
          <div
            className={[
              'relative w-full overflow-hidden',
              'aspect-[4/3]',
              'lg:h-full lg:w-full lg:aspect-auto lg:min-h-0',
            ].join(' ')}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 58vw"
              className="object-cover object-[68%_42%] lg:object-[72%_40%]"
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#f7f7f6]/15 via-transparent to-transparent lg:hidden"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[min(42%,18rem)] lg:block xl:w-[min(38%,20rem)]"
              style={{
                background:
                  'linear-gradient(to right, #f7f7f6 0%, #f7f7f6 8%, rgba(247, 247, 246, 0.9) 35%, rgba(247, 247, 246, 0.45) 58%, transparent 100%)',
              }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
