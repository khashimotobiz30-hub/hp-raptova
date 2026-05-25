'use client';

import Image from 'next/image';
import Link from 'next/link';
import RevealAnimation from '@/components/ui/RevealAnimation';
import RaptovaWebsiteOutputShowcase from '@/components/projects/case-study/RaptovaWebsiteOutputShowcase';
import { handleContactClick } from '@/lib/contact';
import type {
  CaseStudyContent,
  CaseStudyDetailIcon,
  CaseStudyDetailItem,
  CaseStudyOverviewRow,
} from '@/lib/projects/case-study-types';
function chunkOverviewPairs(rows: readonly CaseStudyOverviewRow[]) {
  const pairs: { left: CaseStudyOverviewRow; right?: CaseStudyOverviewRow }[] = [];
  for (let i = 0; i < rows.length; i += 2) {
    const left = rows[i];
    if (!left) continue;
    const right = rows[i + 1];
    pairs.push(right ? { left, right } : { left });
  }
  return pairs;
}

function OverviewGridCell({ row }: { row: CaseStudyOverviewRow }) {
  const rowLeading = row.label.toUpperCase() === 'ROLE' ? 'leading-[1.66]' : 'leading-[1.76]';
  const labelClasses = [
    'copy-ja text-[13px] font-normal tracking-[0.02em] text-black/[0.66] md:text-[14px]',
    rowLeading,
  ].join(' ');
  const valueClasses = [
    'copy-ja text-[13px] font-normal tracking-[0.02em] text-black/[0.76] md:text-[14px]',
    rowLeading,
  ].join(' ');
  return (
    <div className="flex min-w-0 flex-col gap-1 px-4 py-2.5 md:flex-row md:items-start md:gap-6 md:px-5 md:py-3 lg:px-6 lg:py-3.5">
      <p className={['w-[7.25rem] shrink-0 uppercase md:w-[7.5rem]', labelClasses].join(' ')}>{row.label}</p>
      {row.href ? (
        <a
          href={row.href}
          target="_blank"
          rel="noopener noreferrer"
          className={['min-w-0 flex-1 transition-opacity hover:opacity-70', valueClasses].join(' ')}
        >
          {row.value}
          <span className="text-black/[0.45]"> →</span>
        </a>
      ) : (
        <p className={['min-w-0 flex-1', valueClasses].join(' ')}>{row.value}</p>
      )}
    </div>
  );
}

function DetailGlyph({ icon }: { icon: CaseStudyDetailIcon }) {
  const stroke = '#c9a962';
  const common = { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' as const, 'aria-hidden': true };
  switch (icon) {
    case 'layers':
      return (
        <svg {...common}>
          <path d="M3 8l8 4 8-4M3 12l8 4 8-4" stroke={stroke} strokeWidth="1" opacity="0.85" />
          <path d="M3 4l8 4 8-4-8-4-8 4z" stroke={stroke} strokeWidth="1" opacity="0.85" />
        </svg>
      );
    case 'chat':
      return (
        <svg {...common}>
          <path
            d="M4.5 6.5h13a1 1 0 011 1v6a1 1 0 01-1 1H9l-3.5 3v-3H4.5a1 1 0 01-1-1v-6a1 1 0 011-1z"
            stroke={stroke}
            strokeWidth="1"
            opacity="0.85"
          />
        </svg>
      );
    case 'split':
      return (
        <svg {...common}>
          <path d="M11 3v16M4 6h6M12 14h6" stroke={stroke} strokeWidth="1" opacity="0.85" />
        </svg>
      );
    case 'link':
      return (
        <svg {...common}>
          <path d="M8 9a3 3 0 014.2-4.2l1.1 1.1M14 13a3 3 0 01-4.2 4.2l-1.1-1.1M9.5 12.5l3-3" stroke={stroke} strokeWidth="1" opacity="0.85" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...common}>
          <path d="M4 17V5M4 17h14" stroke={stroke} strokeWidth="1" opacity="0.5" />
          <path d="M7 14v-4M11 14V7M15 14v-7" stroke={stroke} strokeWidth="1" opacity="0.85" />
        </svg>
      );
    case 'code':
      return (
        <svg {...common}>
          <rect x="4.5" y="5" width="13" height="12" rx="1.25" stroke={stroke} strokeWidth="1" opacity="0.85" />
          <path d="M7.5 8.5h7M7.5 11h5.5M7.5 13.5h6" stroke={stroke} strokeWidth="1" opacity="0.72" strokeLinecap="round" />
          <path d="M8 4.5 6.5 5.5v11L8 17.5M14 4.5 15.5 5.5v11L14 17.5" stroke={stroke} strokeWidth="1" opacity="0.55" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'compass':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" stroke={stroke} strokeWidth="1" opacity="0.85" />
          <path d="M11 7l1.2 4L16 12l-4 .8L11 17l-1.2-4L6 12l4-.8z" stroke={stroke} strokeWidth="1" opacity="0.7" />
        </svg>
      );
    default:
      return null;
  }
}

function DetailItemIcon({ item }: { item: CaseStudyDetailItem }) {
  const iconBox =
    'h-16 w-16 shrink-0 object-contain opacity-95 sm:h-20 sm:w-20 lg:h-[84px] lg:w-[84px]';
  if ('iconSrc' in item) {
    return (
      <Image
        src={item.iconSrc}
        alt=""
        width={168}
        height={168}
        className={iconBox}
        sizes="(max-width:640px) 64px, (max-width:1024px) 80px, 84px"
      />
    );
  }
  return (
    <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center sm:h-20 sm:w-20 lg:h-[84px] lg:w-[84px] [&>svg]:origin-center [&>svg]:scale-[2.91] sm:[&>svg]:scale-[3.64] lg:[&>svg]:scale-[3.82]">
      <DetailGlyph icon={item.icon} />
    </span>
  );
}

/** Output: 共通の iPhone 風モック枠（同一比率）＋枠内は object-contain で全体表示（トリミングなし） */
function OutputPhone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-[200px] lg:mx-0 lg:max-w-none">
      {/* 外殻：濃いグレー・大きめ角丸・控えめな縁 */}
      <div className="relative w-full rounded-[1.85rem] border border-black/[0.32] bg-[#1a1a1a] p-[6px] lg:rounded-[2rem] lg:p-[7px]">
        {/* 内側リム＋画面くぼみ */}
        <div className="relative overflow-hidden rounded-[1.35rem] border border-black/[0.28] bg-[#050505] lg:rounded-[1.5rem]">
          <div
            className="pointer-events-none absolute left-1/2 top-[6px] z-10 h-[5px] w-[36px] -translate-x-1/2 rounded-full bg-[#0a0a0a] md:top-2 md:h-[5px] md:w-[42px]"
            aria-hidden
          />
          <div className="relative aspect-[9/19.5] w-full">
            <Image
              src={src}
              alt={alt}
              fill
              className="h-full w-full object-contain object-center px-2 pb-2 pt-7 md:px-2.5 md:pb-2.5 md:pt-8"
              sizes="(max-width:640px) 42vw, (max-width:1024px) 22vw, 18vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Output: 横長フロー1枚（全体表示・SP は横スクロール可・枠線なし） */
function OutputFlowVisual({ flow }: { flow: { src: string; alt: string; tone?: 'default' | 'flat'; scale?: number } }) {
  const flatTone = flow.tone === 'flat';
  const scaled = (flow.scale ?? 1) > 1;
  return (
    <div className="flex flex-col">
      <div
        className={[
          'max-lg:bg-[#f2f0e9] max-lg:overflow-x-auto max-lg:pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:thin] [scrollbar-color:rgba(10,10,10,0.16)_transparent]',
          scaled ? 'overflow-visible' : '',
        ].join(' ')}
      >
        <RevealAnimation className={scaled ? 'block origin-top-left scale-[1.05] lg:scale-[1.1]' : undefined}>
          <Image
            src={flow.src}
            alt={flow.alt}
            width={1672}
            height={941}
            className={[
              'block h-auto w-auto max-w-none object-contain',
              flatTone
                ? 'min-w-[480px] lg:min-w-0 lg:w-full lg:max-w-full'
                : 'min-w-[560px] rounded-sm lg:min-w-0 lg:w-full lg:max-w-full',
            ].join(' ')}
            sizes="(max-width:1024px) 560px, (max-width:1440px) 80vw, 1100px"
          />
        </RevealAnimation>
      </div>
      <p className="mt-1.5 text-[10px] font-normal uppercase tracking-[0.18em] text-black/[0.42] lg:hidden">
        VIEW FULL FLOW →
      </p>
    </div>
  );
}

export default function ProjectCaseStudyView({ content }: { content: CaseStudyContent }) {
  const { hero, overview, background, approach, output, detail, next } = content;
  const detailCount = detail.items.length;
  const detailGridLgCols = detailCount === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-6';
  const brandHero = hero.visualStyle === 'brand';
  const heroGridCols = brandHero
    ? 'xl:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] min-[1440px]:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)]'
    : 'xl:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]';
  const heroGridGap = brandHero
    ? 'gap-6 md:gap-7 xl:gap-8 min-[1440px]:gap-9'
    : 'gap-8 md:gap-9 lg:gap-10';
  const heroGridAlign = brandHero ? 'xl:items-center' : 'xl:items-stretch';
  const heroImageWidth = brandHero ? 1176 : 1111;
  const heroImageHeight = brandHero ? 965 : 784;
  const heroImageClass = brandHero
    ? [
        'pointer-events-none block h-auto w-full max-w-full select-none object-contain',
        'object-[44%_50%] sm:object-[46%_50%] md:object-[48%_50%] xl:object-[50%_50%]',
        'max-h-[min(378px,56vh)] sm:max-h-[min(450px,58vh)] md:max-h-[min(420px,54vh)]',
        'lg:max-h-[min(460px,56vh)] xl:max-h-[min(672px,calc(100vh-11rem))] min-[1440px]:max-h-[min(720px,calc(100vh-10rem))]',
      ].join(' ')
    : [
        'pointer-events-none h-auto w-full max-w-full select-none object-contain',
        '-translate-y-2 sm:-translate-y-2.5 md:-translate-y-2.5 xl:-translate-y-3',
        'max-h-[min(300px,42vh)] object-center sm:max-h-[min(360px,44vh)]',
        'md:max-h-[min(380px,46vh)] lg:max-h-[min(440px,52vh)] lg:object-[52%_center]',
        'xl:max-h-[min(760px,74vh)] xl:object-[54%_center] min-[1440px]:max-h-[min(800px,76vh)] min-[1440px]:object-[55%_center]',
      ].join(' ');

  return (
    <article className="bg-[#f2f0e9] text-[#0a0a0a]">
      {/* Hero + プロジェクト情報テーブル（同一ファーストビュー） */}
      <section
        className="overflow-x-clip overflow-y-visible border-b border-[#e4e2dc] bg-[#f2f0e9] pt-[88px] pb-6 md:pb-8 lg:pb-9 xl:pb-10"
        aria-labelledby="project-case-hero-title"
      >
        <div className="mx-auto max-w-[1440px] px-7 md:px-14 lg:px-20">
          <div className={`grid items-start ${heroGridGap} ${heroGridCols} ${heroGridAlign} xl:gap-10 min-[1440px]:gap-12`}>
            <div className="min-w-0">
              <RevealAnimation>
                {hero.label ? (
                  <p className="text-[10px] font-semibold tracking-[0.34em] text-black/70 md:text-[11px]">{hero.label}</p>
                ) : null}
                {brandHero ? (
                  <>
                    <h1
                      id="project-case-hero-title"
                      className="mt-5 font-serif font-medium text-black md:mt-6 xl:mt-5"
                      style={{ fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif" }}
                    >
                      <span className="block text-[clamp(36px,9vw,48px)] leading-[1.02] tracking-[0.04em] md:text-[clamp(38px,5.5vw,56px)] lg:text-[clamp(42px,4.2vw,62px)] xl:text-[clamp(44px,4.8vw,72px)] min-[1440px]:text-[clamp(48px,5.5vw,78px)]">
                        {hero.title}
                      </span>
                      <span className="mt-1 block max-w-full text-[clamp(34px,8.5vw,46px)] leading-[1.02] tracking-[-0.05em] whitespace-nowrap md:text-[clamp(36px,5.2vw,52px)] lg:text-[clamp(38px,3.8vw,58px)] xl:text-[clamp(40px,4.5vw,68px)] min-[1440px]:text-[clamp(40px,5.9vw,74px)]">
                        {hero.subtitle}
                      </span>
                    </h1>
                    {hero.tagline ? (
                      <p
                        className="mt-3.5 text-[13px] font-normal leading-snug tracking-[0.04em] text-black md:mt-4 lg:max-w-md lg:text-[13px] xl:max-w-none xl:text-sm"
                        style={{ fontFamily: 'var(--font-inter), var(--font-noto-sans-jp), sans-serif' }}
                      >
                        {hero.tagline}
                      </p>
                    ) : null}
                  </>
                ) : (
                  <>
                    <h1
                      id="project-case-hero-title"
                      className="mt-5 font-serif font-medium leading-[1.04] tracking-[0.055em] text-black text-[clamp(36px,9vw,48px)] md:text-[clamp(38px,5.5vw,56px)] lg:text-[clamp(42px,4.2vw,62px)] xl:text-[clamp(44px,4.8vw,72px)] min-[1440px]:text-[clamp(42px,6.2vw,78px)] md:mt-6 xl:mt-5"
                      style={{ fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif" }}
                    >
                      {hero.title}
                    </h1>
                    <p
                      className="copy-ja mt-2.5 text-xs font-medium tracking-[0.12em] text-black/[0.78] md:mt-3 lg:text-[11px] xl:text-xs"
                      style={{ fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif" }}
                    >
                      {hero.subtitle}
                    </p>
                    <div className="mt-6 mb-6 h-px w-10 bg-black/[0.35] md:mb-7 md:w-12 xl:mb-8" aria-hidden />
                  </>
                )}
              </RevealAnimation>

              <RevealAnimation delay={0.08} className={brandHero ? 'mt-6 md:mt-7 lg:mt-6 xl:mt-7' : 'mt-0'}>
                <p
                  className="copy-ja max-w-[520px] text-[17px] font-medium leading-[1.78] tracking-[0.06em] text-black/90 md:text-[18px] md:leading-[1.82] lg:max-w-md lg:text-[17px] lg:leading-[1.8] xl:max-w-[520px] xl:text-[clamp(17px,1.75vw,21px)] min-[1440px]:leading-[1.82]"
                  style={{ fontFamily: "var(--font-noto-serif-jp), serif" }}
                >
                  {hero.leadLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </RevealAnimation>

              <RevealAnimation delay={0.14} className="mt-7 md:mt-8 lg:mt-7 xl:mt-8">
                <p className="copy-ja copy-ja-prose max-w-[460px] whitespace-pre-line text-[14px] font-medium leading-[1.95] tracking-[0.02em] text-black/[0.75] md:text-[15px] md:leading-[1.98] md:tracking-[0.03em] lg:max-w-[400px] lg:text-[14px] lg:leading-[1.92] xl:max-w-[460px] xl:text-[15px] xl:leading-[1.98]">
                  {hero.body}
                </p>
              </RevealAnimation>
            </div>

            <div
              className={[
                'flex w-full min-w-0 flex-col justify-center overflow-visible',
                brandHero
                  ? 'items-center py-0 xl:items-end xl:self-center'
                  : 'min-h-[280px] items-center self-stretch py-3 sm:min-h-[300px] md:min-h-[320px] xl:min-h-0 xl:py-1',
              ].join(' ')}
            >
              <div
                className={[
                  'flex w-full flex-col overflow-visible',
                  brandHero
                    ? 'w-full max-w-full items-center justify-center sm:max-w-[92%] md:max-w-[88%] lg:max-w-[84%] xl:max-w-[min(80%,736px)] xl:items-end xl:justify-end xl:ml-auto xl:mr-14 xl:pr-0 min-[1440px]:mr-[4.5rem]'
                    : 'h-full max-w-full items-center justify-center px-0 sm:px-1 md:max-w-[92%] lg:max-w-[88%] xl:px-3 xl:pr-5',
                ].join(' ')}
              >
                {hero.singleVisual.href ? (
                  <a
                    href={hero.singleVisual.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-[opacity,transform] duration-300 ease-out hover:opacity-[0.94] hover:scale-[1.008] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-black/25"
                    aria-label={`${hero.singleVisual.alt} (外部サイトへ)`}
                  >
                    <Image
                      src={hero.singleVisual.src}
                      alt={hero.singleVisual.alt}
                      width={heroImageWidth}
                      height={heroImageHeight}
                      priority
                      sizes={
                        brandHero
                          ? '(max-width: 640px) 92vw, (max-width: 1024px) 88vw, (max-width: 1280px) 72vw, (max-width: 1440px) 54vw, 768px'
                          : '(max-width: 768px) 92vw, (max-width: 1024px) 88vw, (max-width: 1280px) 72vw, 1200px'
                      }
                      className={heroImageClass}
                    />
                  </a>
                ) : (
                  <Image
                    src={hero.singleVisual.src}
                    alt={hero.singleVisual.alt}
                    width={heroImageWidth}
                    height={heroImageHeight}
                    priority
                    sizes={
                      brandHero
                        ? '(max-width: 640px) 92vw, (max-width: 1024px) 88vw, (max-width: 1280px) 72vw, (max-width: 1440px) 54vw, 768px'
                        : '(max-width: 768px) 92vw, (max-width: 1024px) 88vw, (max-width: 1280px) 72vw, 1200px'
                    }
                    className={heroImageClass}
                  />
                )}
              </div>
            </div>
          </div>

          <h2 id="project-case-overview-title" className="sr-only">
            プロジェクト概要
          </h2>
          <div className="mt-6 w-full md:mt-5">
            <div className="w-full border border-black/[0.14]">
              {chunkOverviewPairs(overview.rows).map((pair) => (
                <div
                  key={`${pair.left.label}-${pair.right?.label ?? 'solo'}`}
                  className={[
                    'grid grid-cols-1 border-b border-black/[0.14] last:border-b-0',
                    pair.right ? 'md:grid-cols-2' : 'md:grid-cols-1',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'min-w-0',
                      pair.right
                        ? 'border-b border-black/[0.14] md:border-b-0 md:border-r md:border-black/[0.14]'
                        : '',
                    ].join(' ')}
                  >
                    <OverviewGridCell row={pair.left} />
                  </div>
                  {pair.right ? (
                    <div className="min-w-0">
                      <OverviewGridCell row={pair.right} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="bg-black text-white" aria-labelledby="project-case-bg-title">
        <div className="mx-auto max-w-[1440px] px-7 py-16 md:px-14 md:py-20 lg:px-20 lg:py-24">
          <div className="grid grid-cols-1 items-start gap-8 text-left md:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)] md:gap-10 lg:gap-12 xl:gap-14">
            <RevealAnimation className="min-w-0 self-start">
              <h2
                id="project-case-bg-title"
                className="font-serif font-medium leading-[1.05] tracking-[0.03em] text-white/[0.92] break-words"
                style={{
                  fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif",
                  fontSize: 'clamp(26px, 2.5vw, 40px)',
                }}
              >
                {background.title}
              </h2>
            </RevealAnimation>
            <div className="min-w-0 max-w-[min(100%,40rem)] space-y-4 md:space-y-[1.125rem]">
              {background.paragraphs.map((p) => (
                <RevealAnimation key={p.slice(0, 24)}>
                  <p className="copy-ja copy-ja-prose whitespace-pre-line text-[14px] font-light leading-7 tracking-[0.03em] text-white/[0.87] md:text-[15px] md:leading-8 md:tracking-[0.035em] md:text-white/88">
                    {p}
                  </p>
                </RevealAnimation>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section
        className="border-b border-black/[0.18] bg-[#f2f0e9] pb-8 pt-10 md:pb-9 md:pt-11 lg:pb-10 lg:pt-12"
        aria-labelledby="project-case-approach-title"
      >
        <div className="mx-auto max-w-[1440px] px-7 md:px-14 lg:px-20">
          <div className="flex flex-col gap-8 text-left lg:grid lg:grid-cols-[minmax(13rem,16rem)_repeat(4,minmax(0,1fr))] lg:items-start lg:gap-x-6 lg:gap-y-0 xl:gap-x-8">
            <RevealAnimation className="self-start shrink-0">
              <h2
                id="project-case-approach-title"
                className="font-serif font-medium whitespace-nowrap leading-[1.05] tracking-[0.03em] text-black/[0.94]"
                style={{
                  fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif",
                  fontSize: 'clamp(26px, 2.3vw, 38px)',
                }}
              >
                {approach.title}
              </h2>
            </RevealAnimation>
            {approach.items.map((item, i) => (
              <RevealAnimation key={item.index} delay={0.05 * i} className="min-w-0">
                <div
                  className={[
                    'h-full',
                    i > 0
                      ? 'mt-7 border-t border-black/[0.18] pt-7 lg:mt-0 lg:border-t-0 lg:border-l lg:border-black/[0.18] lg:pt-0'
                      : 'lg:border-l lg:border-black/[0.18]',
                    'lg:pl-5 xl:pl-7',
                  ].join(' ')}
                >
                  <p
                    className="font-serif font-light leading-none tracking-[0.08em] text-black/[0.9]"
                    style={{
                      fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif",
                      fontSize: 'clamp(19px, 1.9vw, 27px)',
                    }}
                  >
                    {item.index}
                  </p>
                  <h3
                    className="mt-2.5 font-serif text-[13px] font-medium leading-snug tracking-[0.03em] text-black md:mt-3 md:text-[14px]"
                    style={{ fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="copy-ja mt-2 max-w-[280px] ![word-break:normal] ![overflow-wrap:normal] ![line-break:strict] [text-wrap:pretty] text-[12.5px] font-light leading-[1.76] tracking-[-0.005em] text-black/[0.93] md:mt-2.5 md:max-w-none md:leading-[1.78] md:tracking-[-0.005em]">
                    {item.body}
                  </p>
                </div>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Output */}
      <section
        className="border-b border-black/[0.18] bg-[#f2f0e9] pb-10 pt-6 md:pb-14 md:pt-8 lg:pb-16 lg:pt-10"
        aria-labelledby="project-case-output-title"
      >
        <div className="mx-auto max-w-[1440px] px-7 md:px-14 lg:px-20">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(13rem,16rem)_minmax(0,1fr)] lg:items-start lg:gap-x-6 xl:gap-x-8">
            <RevealAnimation className="self-start shrink-0">
              <h2
                id="project-case-output-title"
                className="font-serif font-medium whitespace-nowrap leading-[1.05] tracking-[0.03em] text-black/[0.94]"
                style={{
                  fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif",
                  fontSize: 'clamp(26px, 2.3vw, 38px)',
                }}
              >
                {output.title}
              </h2>
            </RevealAnimation>

            <div className="min-w-0 flex flex-col gap-6 overflow-x-clip overflow-y-visible lg:gap-7">
              {output.browserShowcase ? (
                <>
                  {output.lead ? (
                    <RevealAnimation
                      className={
                        output.showDisclaimerWithFlow
                          ? 'min-w-0 mt-5 pt-3 md:mt-7 md:pt-4'
                          : 'min-w-0'
                      }
                    >
                      <p
                        className={
                          output.showDisclaimerWithFlow
                            ? 'copy-ja max-w-[42rem] text-[14px] font-normal leading-[1.82] tracking-[0.04em] text-black/[0.9] md:text-[15px] md:leading-[1.85]'
                            : 'copy-ja max-w-[42rem] text-[14px] font-light leading-[1.82] tracking-[0.04em] text-black/[0.78] md:text-[15px] md:leading-[1.85]'
                        }
                      >
                        {output.lead}
                      </p>
                    </RevealAnimation>
                  ) : null}
                  <div className="min-w-0">
                    <RaptovaWebsiteOutputShowcase cards={output.browserShowcase.cards} />
                  </div>
                  {output.showDisclaimerWithFlow && output.disclaimer ? (
                    <RevealAnimation delay={0.08} className="min-w-0">
                      <p className="copy-ja text-left text-[10px] font-light leading-[1.65] tracking-[0.03em] text-black/[0.48] md:text-[11px] md:leading-[1.7]">
                        {output.disclaimer}
                      </p>
                    </RevealAnimation>
                  ) : null}
                </>
              ) : output.flowImage ? (
                <>
                  {output.lead ? (
                    <RevealAnimation
                      className={
                        output.showDisclaimerWithFlow
                          ? 'min-w-0 mt-5 pt-3 md:mt-7 md:pt-4'
                          : 'min-w-0'
                      }
                    >
                      <p
                        className={
                          output.showDisclaimerWithFlow
                            ? 'copy-ja max-w-[42rem] text-[14px] font-normal leading-[1.82] tracking-[0.04em] text-black/[0.9] md:text-[15px] md:leading-[1.85]'
                            : 'copy-ja max-w-[42rem] text-[14px] font-light leading-[1.82] tracking-[0.04em] text-black/[0.78] md:text-[15px] md:leading-[1.85]'
                        }
                      >
                        {output.lead}
                      </p>
                    </RevealAnimation>
                  ) : null}
                  <OutputFlowVisual flow={output.flowImage} />
                  {output.showDisclaimerWithFlow && output.disclaimer ? (
                    <RevealAnimation delay={0.08} className="min-w-0">
                      <p className="copy-ja text-left text-[10px] font-light leading-[1.65] tracking-[0.03em] text-black/[0.48] md:text-[11px] md:leading-[1.7]">
                        {output.disclaimer}
                      </p>
                    </RevealAnimation>
                  ) : null}
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-0 xl:gap-x-5">
                    {output.items.map((item, i) => (
                      <RevealAnimation key={item.label} delay={0.05 * i} className="min-w-0">
                        <div
                          className={[
                            'flex h-full min-w-0 flex-col items-center gap-3 text-center',
                            i > 0 ? 'lg:border-l lg:border-black/[0.18] lg:pl-4 xl:pl-5' : '',
                          ].join(' ')}
                        >
                          <p className="copy-ja text-[10px] font-medium leading-snug tracking-[0.1em] text-black/[0.82] md:text-[11px] md:tracking-[0.12em]">
                            {item.label}
                          </p>
                          <div className="w-full">
                            <OutputPhone src={item.imageSrc} alt={item.imageAlt} />
                          </div>
                        </div>
                      </RevealAnimation>
                    ))}
                  </div>

                  <RevealAnimation delay={0.14} className="min-w-0">
                    <p className="copy-ja text-left text-[10px] font-light leading-[1.65] tracking-[0.03em] text-black/[0.48] md:text-[11px] md:leading-[1.7]">
                      {output.disclaimer}
                    </p>
                  </RevealAnimation>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="bg-[#030303] text-white" aria-labelledby="project-case-detail-title">
        <div className="mx-auto max-w-[1440px] px-7 py-10 md:px-14 md:py-12 lg:px-20 lg:py-14">
          <div className={`flex flex-col text-left lg:grid lg:grid-cols-[minmax(11rem,15rem)_minmax(0,1fr)] lg:items-start ${detailCount === 5 ? 'gap-6 md:gap-7 lg:gap-x-10 xl:gap-x-12' : 'gap-5 lg:gap-x-6 xl:gap-x-8'}`}>
            <RevealAnimation className="self-start shrink-0">
              <h2
                id="project-case-detail-title"
                className="font-serif font-medium leading-[1.06] tracking-[0.04em] text-white/[0.92]"
                style={{
                  fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif",
                  fontSize: 'clamp(24px, 2.2vw, 34px)',
                }}
              >
                {detail.title}
              </h2>
            </RevealAnimation>

            <div className={detailCount === 5 ? 'min-w-0 lg:mx-auto lg:max-w-[1180px]' : 'min-w-0'}>
              <div className={`grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-8 ${detailGridLgCols} lg:gap-x-0 lg:gap-y-0`}>
                {detail.items.map((item, i) => (
                  <RevealAnimation key={item.title} delay={0.04 * i} className="min-w-0">
                    <div
                      className={[
                        detailCount === 5 ? 'flex min-h-0 min-w-0 flex-col items-center text-center lg:px-4 xl:px-5' : 'flex min-h-0 min-w-0 flex-col items-center text-center lg:px-3 xl:px-4',
                        i < detailCount - 1 ? 'max-sm:border-b max-sm:border-white/[0.1] max-sm:pb-6 last:max-sm:border-b-0' : '',
                        detailCount === 5 && i === 4 ? 'sm:col-span-2 sm:mx-auto sm:max-w-[17rem]' : '',
                        i > 0 && i % 2 === 1 ? 'max-lg:border-l max-lg:border-white/[0.16] max-lg:pl-4 max-lg:pr-2' : '',
                        i > 0 ? 'lg:border-l lg:border-white/[0.16]' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <div className="mb-4 flex w-full justify-center sm:mb-5">
                        <DetailItemIcon item={item} />
                      </div>
                      <h3 className="mb-2.5 inline-block whitespace-nowrap text-center text-[12.5px] font-medium tracking-[0.08em] text-[#c8b56f] md:text-[13px] lg:text-[13px] lg:tracking-[0.06em]">
                        {item.title}
                      </h3>
                      <p className={detailCount === 5 ? 'copy-ja w-full max-w-[13.5rem] text-[11px] font-light leading-[1.78] tracking-[0.03em] text-white/[0.76] ![word-break:normal] ![overflow-wrap:normal] ![line-break:strict] [text-wrap:pretty] md:max-w-[12.75rem]' : 'copy-ja w-full max-w-[15.5rem] text-[11px] font-light leading-[1.7] tracking-[0.03em] text-white/[0.76] ![word-break:normal] ![overflow-wrap:normal] ![line-break:strict] [text-wrap:pretty]'}>
                        {item.body}
                      </p>
                    </div>
                  </RevealAnimation>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next */}
      <section
        className="border-b border-black/[0.16] border-t border-[#e4e2dc] bg-[#f2f0e9] pt-9 pb-7 md:pt-10 md:pb-8 lg:pt-10 lg:pb-8"
        aria-labelledby="project-case-next-title"
      >
        <div className="mx-auto max-w-[1440px] px-7 md:px-14 lg:px-20">
          <div className="flex flex-col gap-5 text-left lg:grid lg:grid-cols-[minmax(11rem,15rem)_minmax(0,1fr)] lg:items-stretch lg:gap-x-6 xl:gap-x-8">
            <RevealAnimation className="flex shrink-0 lg:h-full lg:items-center">
              <h2
                id="project-case-next-title"
                className="font-serif font-medium leading-[1.05] tracking-[0.03em] text-black"
                style={{
                  fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif",
                  fontSize: 'clamp(26px, 2.2vw, 36px)',
                }}
              >
                {next.title}
              </h2>
            </RevealAnimation>

            <div className="flex min-h-0 flex-col gap-5 sm:gap-6 lg:h-full lg:flex-row lg:items-center lg:justify-between lg:gap-x-6 lg:gap-y-0">
              <RevealAnimation delay={0.08} className="min-w-0 max-w-[36rem] shrink lg:pr-2">
                <p className="copy-ja text-left text-[15px] font-light leading-[1.78] tracking-[0.06em] text-black/[0.88] md:text-[15.5px] md:leading-[1.76]">
                  {next.paragraphs.map((line, lineIndex) => (
                    <span
                      key={line}
                      className={lineIndex === 1 ? 'block lg:whitespace-nowrap' : 'block'}
                    >
                      {line}
                    </span>
                  ))}
                </p>
              </RevealAnimation>

              <RevealAnimation delay={0.1} className="w-full shrink-0 lg:ml-4 lg:w-auto lg:max-w-[260px]">
                <button
                  type="button"
                  onClick={() => handleContactClick('project', { projectSlug: content.slug })}
                  aria-label="メールで問い合わせる"
                  className={
                    next.ctaVariant === 'outline'
                      ? 'flex h-[54px] w-full min-w-0 items-center justify-between border border-black/[0.28] bg-transparent px-6 text-[11px] font-semibold tracking-[0.26em] text-[#111] transition-colors duration-200 hover:border-[#111] hover:bg-[#111] hover:text-white lg:h-[56px] lg:w-[240px]'
                      : 'flex h-[54px] w-full min-w-0 items-center justify-between bg-[#111] px-6 text-[11px] font-semibold tracking-[0.26em] text-white transition-opacity hover:opacity-85 lg:h-[56px] lg:w-[240px]'
                  }
                >
                  <span className="min-w-0">{next.ctaLabel}</span>
                  <span className="shrink-0">→</span>
                </button>
              </RevealAnimation>
            </div>
          </div>

          <RevealAnimation delay={0.12} className="mt-4 border-t border-black/[0.16] pt-3 md:mt-4 md:pt-3.5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                {next.previousProject ? (
                  <Link
                    href={next.previousProject.href}
                    className="group inline-block transition-opacity hover:opacity-60"
                  >
                    <span className="block text-[10px] font-normal tracking-[0.2em] text-black/[0.42] md:text-[11px]">
                      {next.previousProject.eyebrow}
                    </span>
                    <span className="mt-1 block text-xs font-normal tracking-[0.14em] text-[#555555] md:text-[13px]">
                      {next.previousProject.title}
                    </span>
                  </Link>
                ) : next.nextProject ? null : (
                  <Link
                    href={next.backHref}
                    className="text-xs font-normal tracking-[0.2em] text-[#555555] transition-opacity hover:opacity-60"
                  >
                    {next.backLabel}
                  </Link>
                )}
              </div>
              {next.nextProject ? (
                <Link
                  href={next.nextProject.href}
                  className="group inline-block transition-opacity hover:opacity-60 sm:ml-auto sm:text-right"
                >
                  <span className="block text-[10px] font-normal tracking-[0.2em] text-black/[0.42] md:text-[11px]">
                    {next.nextProject.eyebrow}
                  </span>
                  <span className="mt-1 block text-xs font-normal tracking-[0.14em] text-[#555555] md:text-[13px]">
                    {next.nextProject.title}
                  </span>
                </Link>
              ) : null}
            </div>
          </RevealAnimation>
        </div>
      </section>
    </article>
  );
}
