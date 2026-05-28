import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const additionalComponent = `'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Calendar,
  ChevronRight,
  CircleHelp,
  FileText,
  GraduationCap,
  Mail,
  MessageCircle,
  Mic,
  Newspaper,
  Presentation,
  RefreshCw,
  Send,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import {
  RECRUITING_ADDITIONAL_SUPPORT,
  type RecruitingAdditionalSupportId,
  type RecruitingAdditionalSupportItem,
} from '@/lib/business/recruiting-additional-support';
import { SectionReveal, serifStyle } from '@/components/business/shared';

const ICONS: Record<RecruitingAdditionalSupportItem['icon'], LucideIcon> = {
  send: Send,
  mail: Mail,
  calendar: Calendar,
  presentation: Presentation,
  users: Users,
  'graduation-cap': GraduationCap,
  'file-text': FileText,
  mic: Mic,
  newspaper: Newspaper,
  'refresh-cw': RefreshCw,
  'circle-help': CircleHelp,
  'message-circle': MessageCircle,
};

function DetailCard({ item }: { item: RecruitingAdditionalSupportItem }) {
  return (
    <article className="overflow-hidden rounded-lg border border-black/[0.12] bg-white">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eceae4]">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(max-width: 1023px) 100vw, 58vw"
          className="object-cover object-center"
        />
      </div>
      <div className="px-5 py-6 md:px-7 md:py-7">
        <h3
          className="copy-ja font-serif text-xl font-medium tracking-[0.04em] text-[#0a0a0a] md:text-2xl"
          style={serifStyle}
        >
          {item.label}
        </h3>
        <p className="copy-ja mt-4 text-[13px] leading-[1.9] tracking-[0.03em] text-black/[0.62] md:text-sm md:leading-[1.95]">
          {item.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {item.serviceTags.map((tag) => (
            <li key={tag}>
              <span className="inline-block rounded-sm border border-black/[0.12] bg-[#f7f7f6] px-2.5 py-1 text-[10px] tracking-[0.02em] text-black/[0.55] md:text-[11px]">
                {tag}
              </span>
            </li>
          ))}
        </ul>
        {(item.concerns?.length || item.effects?.length) && (
          <div className="mt-6 grid gap-4 border-t border-black/[0.08] pt-6 sm:grid-cols-2 sm:gap-5">
            {item.concerns?.length ? (
              <div className="rounded-md bg-[#f7f7f6] px-4 py-4">
                <p className="text-[10px] font-semibold tracking-[0.12em] text-black/45">
                  \u3053\u3093\u306a\u304a\u60a9\u307f\u306b
                </p>
                <ul className="copy-ja mt-3 space-y-2 text-[12px] leading-[1.75] tracking-[0.02em] text-black/[0.62]">
                  {item.concerns.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full bg-black/35" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {item.effects?.length ? (
              <div className="rounded-md bg-[#f7f7f6] px-4 py-4">
                <p className="text-[10px] font-semibold tracking-[0.12em] text-black/45">
                  \u671f\u5f85\u3067\u304d\u308b\u52b9\u679c
                </p>
                <ul className="copy-ja mt-3 space-y-2 text-[12px] leading-[1.75] tracking-[0.02em] text-black/[0.62]">
                  {item.effects.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full bg-black/35" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}

export default function RecruitingAdditionalSupport() {
  const { title, body, defaultId, items } = RECRUITING_ADDITIONAL_SUPPORT;
  const shouldReduceMotion = useReducedMotion();
  const itemMap = useMemo(() => new Map(items.map((item) => [item.id, item])), [items]);

  const [activeId, setActiveId] = useState<RecruitingAdditionalSupportId>(defaultId);
  const [hoverId, setHoverId] = useState<RecruitingAdditionalSupportId | null>(null);

  const displayId = hoverId ?? activeId;
  const displayItem = itemMap.get(displayId) ?? items[0];

  const handleEnter = useCallback((id: RecruitingAdditionalSupportId) => {
    setHoverId(id);
  }, []);

  const handleLeave = useCallback(() => {
    setHoverId(null);
  }, []);

  const handleSelect = useCallback((id: RecruitingAdditionalSupportId) => {
    setActiveId(id);
    setHoverId(null);
  }, []);

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
          <p className="copy-ja mt-4 text-[13px] leading-[1.9] tracking-[0.03em] text-black/[0.62] sm:text-sm">
            {body}
          </p>
        </div>
      </SectionReveal>

      <div className="mt-8 lg:mt-10">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] xl:gap-10">
          <nav
            className="overflow-hidden rounded-lg border border-black/[0.12] bg-white"
            aria-label={\`\\$\{title}\u306e\u30e1\u30cb\u30e5\u30fc\`}
            onMouseLeave={handleLeave}
          >
            <ul>
              {items.map((item) => {
                const Icon = ICONS[item.icon];
                const isActive = activeId === item.id;
                const isPreview = hoverId === item.id;

                return (
                  <li key={item.id} className="border-b border-black/[0.08] last:border-b-0">
                    <button
                      type="button"
                      className={[
                        'copy-ja flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors duration-200',
                        'sm:px-5 sm:py-4',
                        isActive
                          ? 'bg-[#0a0a0a] text-white'
                          : isPreview
                            ? 'bg-black/[0.05] text-[#0a0a0a]'
                            : 'bg-white text-[#0a0a0a] hover:bg-black/[0.04]',
                      ].join(' ')}
                      aria-current={isActive ? 'true' : undefined}
                      onMouseEnter={() => handleEnter(item.id)}
                      onFocus={() => handleEnter(item.id)}
                      onBlur={handleLeave}
                      onClick={() => handleSelect(item.id)}
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
              \u203b \u4e0a\u8a18\u4ee5\u5916\u306e\u3054\u76f8\u8ac7\u3082\u304a\u6c17\u8efd\u306b\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044\u3002
            </p>
          </nav>

          <div className="min-w-0 lg:sticky lg:top-24">
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
            <p className="copy-ja mt-4 hidden text-[11px] leading-[1.7] tracking-[0.02em] text-black/42 lg:block">
              \u203b PC\u3067\u306f\u30bf\u30b0\u306b\u30de\u30a6\u30b9\u3092\u5408\u308f\u305b\u308b\u3068\u53f3\u5074\u304c\u5207\u308a\u63db\u308f\u308a\u307e\u3059\u3002\u30af\u30ea\u30c3\u30af\u3067\u56fa\u5b9a\u3057\u307e\u3059\u3002
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

const mainSupport = `'use client';

import Image from 'next/image';
import { RECRUITING_MAIN_SUPPORT } from '@/lib/business/recruiting-content';
import {
  BUSINESS_AREAS_CARDS_CLASS,
  BUSINESS_PAGE_CONTAINER_CLASS,
  SectionReveal,
  serifStyle,
} from '@/components/business/shared';
import RecruitingAdditionalSupport from '@/components/business/recruiting/RecruitingAdditionalSupport';

export default function RecruitingMainSupport() {
  const { title, body, items } = RECRUITING_MAIN_SUPPORT;

  return (
    <section
      className="border-b border-black/[0.12] bg-[#f2f0e9] pt-10 pb-14 md:pt-12 md:pb-16 lg:pt-14 lg:pb-20"
      aria-labelledby="recruiting-main-support-heading"
    >
      <div className={BUSINESS_PAGE_CONTAINER_CLASS}>
        <SectionReveal>
          <div className="max-w-[44rem]">
            <h2
              id="recruiting-main-support-heading"
              className="copy-ja font-serif text-[clamp(26px,3.2vw,38px)] font-medium leading-[1.45] tracking-[0.04em] text-[#0a0a0a]"
              style={serifStyle}
            >
              {title}
            </h2>
            <p className="copy-ja mt-4 text-[13px] leading-[1.9] tracking-[0.03em] text-black/[0.62] sm:mt-5 sm:text-sm sm:leading-[1.95]">
              {body}
            </p>
          </div>
        </SectionReveal>

        <div className={['mt-10 md:mt-12', BUSINESS_AREAS_CARDS_CLASS].join(' ')}>
          <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 xl:gap-8">
            {items.map((item, index) => (
              <SectionReveal key={item.id} delay={0.06 + index * 0.06} fill className="h-full min-w-0">
                <article className="flex h-full min-h-0 flex-col border border-black/[0.12] bg-white">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e8e6df]">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center opacity-92"
                    />
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col px-5 py-6 md:px-6 md:py-7">
                    <h3
                      className="copy-ja font-serif text-lg font-medium tracking-[0.04em] text-[#0a0a0a] md:text-xl"
                      style={serifStyle}
                    >
                      {item.title}
                    </h3>
                    <p className="copy-ja mt-4 flex-1 text-[13px] leading-[1.85] tracking-[0.03em] text-black/[0.62]">
                      {item.description}
                    </p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                      {item.tags.map((tag) => (
                        <li key={tag}>
                          <span className="inline-block border border-black/[0.14] bg-[#f2f0e9] px-2.5 py-1 text-[10px] tracking-[0.02em] text-black/[0.55]">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>

        <RecruitingAdditionalSupport />
      </div>
    </section>
  );
}
`;

const pageView = `import RecruitingHero from '@/components/business/recruiting/RecruitingHero';
import RecruitingMainSupport from '@/components/business/recruiting/RecruitingMainSupport';
import RecruitingCommonIssues from '@/components/business/recruiting/RecruitingCommonIssues';
import RecruitingApproach from '@/components/business/recruiting/RecruitingApproach';
import RecruitingContact from '@/components/business/recruiting/RecruitingContact';

export default function RecruitingPageView() {
  return (
    <article className="bg-white text-[#0a0a0a]">
      <RecruitingHero />
      <RecruitingCommonIssues />
      <RecruitingMainSupport />
      <RecruitingApproach />
      <RecruitingContact />
    </article>
  );
}
`;

writeFileSync(
  join(root, 'components/business/recruiting/RecruitingAdditionalSupport.tsx'),
  additionalComponent.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16)),
  ),
  'utf8',
);

writeFileSync(join(root, 'components/business/recruiting/RecruitingMainSupport.tsx'), mainSupport, 'utf8');
writeFileSync(join(root, 'components/business/recruiting/RecruitingPageView.tsx'), pageView, 'utf8');

console.log('OK: components written');
