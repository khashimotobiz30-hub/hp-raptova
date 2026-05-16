'use client';

export { SectionReveal, serifStyle } from '@/components/about/shared';

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
