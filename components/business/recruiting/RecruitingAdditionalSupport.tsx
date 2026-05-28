'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  BookOpen,
  Briefcase,
  Check,
  ChevronRight,
  GraduationCap,
  Mail,
  Megaphone,
  Monitor,
  Presentation,
  Sparkles,
  Target,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  RECRUITING_ADDITIONAL_SUPPORT,
  type RecruitingAdditionalSupportId,
  type RecruitingAdditionalSupportItem,
} from '@/lib/business/recruiting-additional-support';
import { SectionReveal, serifStyle } from '@/components/business/shared';

const ICONS: Record<RecruitingAdditionalSupportItem['icon'], LucideIcon> = {
  monitor: Monitor,
  'graduation-cap': GraduationCap,
  presentation: Presentation,
  megaphone: Megaphone,
  'book-open': BookOpen,
  mail: Mail,
  briefcase: Briefcase,
};

const EFFECT_ICONS = [TrendingUp, Sparkles, Target] as const;

function DetailCard({ item }: { item: RecruitingAdditionalSupportItem }) {
  return (
    <article className="overflow-hidden rounded-lg border border-black/[0.1] bg-white shadow-[0_8px_32px_rgba(10,10,10,0.06)]">
      <div className="relative h-[11.25rem] w-full overflow-hidden bg-[#eceae4] sm:h-[12.5rem] lg:hidden">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="100vw"
          className="object-contain object-center p-2"
        />
      </div>

      <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(10rem,38%)] md:items-start md:gap-7 md:p-7 lg:gap-8 lg:p-8">
        <div className="min-w-0">
          <h3
            className="copy-ja font-serif text-[clamp(20px,2.4vw,26px)] font-medium leading-snug tracking-[0.03em] text-[#0a0a0a]"
            style={serifStyle}
          >
            {item.label}
          </h3>
          <p className="copy-ja mt-3 text-[13px] leading-[1.85] tracking-[0.02em] text-black/[0.62] md:mt-4 md:text-sm md:leading-[1.95]">
            {item.description}
          </p>
          <p className="mt-5 text-[10px] font-semibold tracking-[0.12em] text-black/45 md:mt-6 md:text-[11px]">
            対応内容の例
          </p>
          <ul className="mt-2.5 flex flex-wrap gap-2 md:mt-3">
            {item.serviceTags.map((tag) => (
              <li key={tag}>
                <span className="inline-block rounded-full bg-[#f0eeea] px-3 py-1 text-[10px] tracking-[0.02em] text-black/[0.58] md:text-[11px]">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto hidden aspect-[3/2] w-full max-w-[18rem] overflow-hidden rounded-md bg-[#eceae4] md:mx-0 md:max-w-none md:justify-self-end lg:block">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 1023px) 72vw, 280px"
            className="object-contain object-center p-1.5 md:p-2"
          />
        </div>
      </div>

      <div className="mx-5 mb-5 grid gap-4 rounded-md bg-[#f7f7f6] p-5 sm:mx-6 sm:mb-6 sm:grid-cols-2 sm:gap-5 sm:p-6 md:mx-7 md:mb-7 md:p-6 lg:mx-8 lg:mb-8">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] text-black/45 md:text-[11px]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-black/12 bg-white" aria-hidden>
              <Check className="h-3 w-3 text-black/45" strokeWidth={2} />
            </span>
            こんなお悩みに
          </p>
          <ul className="copy-ja mt-4 space-y-2.5 text-[12px] leading-[1.75] tracking-[0.02em] text-black/[0.62] md:text-[13px]">
            {item.concerns.map((line) => (
              <li key={line} className="flex gap-2.5">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-black/35" strokeWidth={2} aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-semibold tracking-[0.12em] text-black/45 md:text-[11px]">
            期待できる効果
          </p>
          <ul className="mt-4 grid grid-cols-3 gap-3">
            {item.effects.map((line, index) => {
              const EffectIcon = EFFECT_ICONS[index] ?? Sparkles;
              return (
                <li key={line} className="flex flex-col items-center text-center">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.1] bg-white"
                    aria-hidden
                  >
                    <EffectIcon className="h-4 w-4 text-black/45" strokeWidth={1.5} />
                  </span>
                  <span className="copy-ja mt-2.5 text-[10px] leading-[1.55] tracking-[0.02em] text-black/[0.58] md:text-[11px]">
                    {line}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function RecruitingAdditionalSupport() {
  const { title, defaultId, items } = RECRUITING_ADDITIONAL_SUPPORT;
  const shouldReduceMotion = useReducedMotion();
  const itemMap = useMemo(() => new Map(items.map((item) => [item.id, item])), [items]);

  const [activeId, setActiveId] = useState<RecruitingAdditionalSupportId>(defaultId);
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);

  const displayItem = itemMap.get(activeId) ?? items[0];

  const handleSelect = (id: RecruitingAdditionalSupportId) => {
    setActiveId(id);
    setIsMobileListOpen(false);
  };

  const handleToggleMobileList = () => {
    setIsMobileListOpen((prev) => !prev);
  };

  return (
    <div className="mt-14 border-t border-black/[0.1] pt-12 md:mt-16 md:pt-14 lg:mt-20 lg:pt-16">
      <SectionReveal>
        <div className="max-w-[44rem]">
          <h3
            className="copy-ja font-serif text-[clamp(22px,2.8vw,30px)] font-medium leading-[1.4] tracking-[0.04em] text-[#0a0a0a]"
            style={serifStyle}
          >
            {title}
          </h3>
        </div>
      </SectionReveal>

      <div className="relative mt-5 lg:hidden">
        <button
          type="button"
          className="copy-ja flex w-full items-center justify-between gap-3 rounded-lg border border-black/[0.12] bg-white px-4 py-3.5 text-left shadow-[0_2px_8px_rgba(10,10,10,0.04)] transition-colors hover:border-black/20"
          aria-expanded={isMobileListOpen}
          aria-haspopup="listbox"
          aria-controls="recruiting-additional-mobile-list"
          onClick={handleToggleMobileList}
        >
          <span className="min-w-0 flex-1 text-[14px] font-medium leading-snug tracking-[0.02em] text-[#0a0a0a]">
            {displayItem.label}
          </span>
          <span className="shrink-0 text-[10px] leading-none text-black/40" aria-hidden>
            {isMobileListOpen ? '\u25b2' : '\u25bc'}
          </span>
        </button>

        {isMobileListOpen ? (
          <ul
            id="recruiting-additional-mobile-list"
            role="listbox"
            aria-label={`${title}の選択リスト`}
            className="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-lg border border-black/[0.12] bg-white shadow-[0_8px_24px_rgba(10,10,10,0.08)]"
          >
            {items.map((item) => {
              const isActive = activeId === item.id;

              return (
                <li key={item.id} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    className={[
                      'copy-ja flex w-full items-center px-4 py-3 text-left transition-colors duration-150',
                      isActive
                        ? 'bg-[#f0eeea] font-medium text-[#0a0a0a]'
                        : 'bg-white text-[#0a0a0a] hover:bg-black/[0.03]',
                    ].join(' ')}
                    onClick={() => handleSelect(item.id)}
                  >
                    <span className="text-[13px] leading-snug tracking-[0.02em]">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      <div className="mt-5 lg:mt-10">
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] xl:gap-10">
          <nav
            className="hidden overflow-hidden rounded-lg border border-black/[0.12] bg-white lg:block"
            aria-label={`${title}のメニュー`}
          >
            <ul>
              {items.map((item) => {
                const Icon = ICONS[item.icon];
                const isActive = activeId === item.id;

                return (
                  <li key={item.id} className="border-b border-black/[0.08] last:border-b-0">
                    <button
                      type="button"
                      className={[
                        'copy-ja flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors duration-200',
                        'sm:px-5 sm:py-4',
                        isActive
                          ? 'bg-[#0a0a0a] text-white'
                          : 'bg-white text-[#0a0a0a] hover:bg-black/[0.04]',
                      ].join(' ')}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => setActiveId(item.id)}
                    >
                      <span
                        className={[
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                          isActive ? 'bg-white/12' : 'bg-[#f0eeea]',
                        ].join(' ')}
                        aria-hidden
                      >
                        <Icon
                          className={[
                            'h-4 w-4',
                            isActive ? 'text-white/85' : 'text-black/50',
                          ].join(' ')}
                          strokeWidth={1.5}
                        />
                      </span>
                      <span className="min-w-0 flex-1 text-[13px] font-medium leading-snug tracking-[0.02em] sm:text-sm">
                        {item.label}
                      </span>
                      <ChevronRight
                        className={[
                          'h-4 w-4 shrink-0',
                          isActive ? 'text-white/55' : 'text-black/30',
                        ].join(' ')}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="copy-ja border-t border-black/[0.08] px-4 py-3 text-[11px] leading-[1.7] tracking-[0.02em] text-black/45 sm:px-5">
              ※ 上記以外のご相談もお気軽にお問い合わせください。
            </p>
          </nav>

          <div
            className={[
              'min-w-0 lg:sticky lg:top-24',
              isMobileListOpen ? 'hidden lg:block' : 'block',
            ].join(' ')}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={displayItem.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <DetailCard item={displayItem} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
