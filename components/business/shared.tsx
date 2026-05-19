'use client';

export { SectionReveal, serifStyle } from '@/components/about/shared';

/** /business section labels: same width and horizontal padding as BusinessHero */
export const BUSINESS_PAGE_CONTAINER_CLASS =
  'mx-auto w-full max-w-[1440px] px-7 md:px-14 lg:px-20';

/** BUSINESS AREAS card grid: narrower centered column inside page container */
export const BUSINESS_AREAS_CARDS_CLASS = 'mx-auto w-full max-w-[1240px]';

export function BusinessLabel({
  children,
  tone = 'light',
}: {
  children: string;
  tone?: 'light' | 'dark';
}) {
  const className =
    tone === 'dark'
      ? 'text-[10px] font-semibold tracking-[0.42em] text-white/38 md:text-[11px]'
      : 'text-[10px] font-semibold tracking-[0.42em] text-black/55 md:text-[11px]';

  return <p className={className}>{children}</p>;
}
