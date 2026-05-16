'use client';

import RevealAnimation from '@/components/ui/RevealAnimation';

export const serifStyle = { fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif" } as const;

export function SectionLabel({
  number,
  title,
  tone = 'light',
}: {
  number?: string;
  title: string;
  tone?: 'light' | 'dark';
}) {
  const toneClass =
    tone === 'dark'
      ? 'text-white/38 [&_span:first-child]:text-white/52'
      : 'text-black/55 [&_span:first-child]:text-black/42';

  return (
    <p className={`text-[10px] font-semibold tracking-[0.38em] md:text-[11px] ${toneClass}`}>
      {number ? (
        <>
          <span>{number}</span>
          <span className="mx-2 text-current/30" aria-hidden>
            {' '}
          </span>
        </>
      ) : null}
      <span className="tracking-[0.42em]">{title}</span>
    </p>
  );
}

export function SectionNumberRail({
  number,
  tone = 'light',
}: {
  number: string;
  tone?: 'light' | 'dark';
}) {
  const border = tone === 'dark' ? 'border-white/12' : 'border-black/[0.1]';
  const text = tone === 'dark' ? 'text-white/32' : 'text-black/32';

  return (
    <div
      className={`absolute left-0 top-0 hidden h-full w-9 items-center justify-center border-r ${border} md:flex lg:w-11`}
      aria-hidden
    >
      <span
        className={`text-[10px] font-medium tracking-[0.32em] [writing-mode:vertical-rl] rotate-180 ${text}`}
      >
        {number}
      </span>
    </div>
  );
}

export function SectionReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <RevealAnimation delay={delay} className={className}>
      {children}
    </RevealAnimation>
  );
}
