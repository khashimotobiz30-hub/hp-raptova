import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: '404 | RAPTOVA',
  description: SITE_CONFIG.description,
};

export default function NotFound() {
  return (
    <div className="min-h-[calc(100svh-72px)] flex items-center justify-center bg-[#f2f0e9] px-5 py-32 md:py-36">
      <div className="text-center max-w-md -translate-y-6 md:-translate-y-8">
        <p className="text-[#0a0a0a] text-3xl md:text-4xl tracking-[0.32em] font-medium mb-10 md:mb-12">
          404
        </p>
        <p className="text-[#8a8a8a] text-sm md:text-[15px] tracking-[0.12em] mb-5 md:mb-6">
          This page could not be found.
        </p>
        <p className="text-[#555555] text-base md:text-lg leading-[1.9] copy-ja mb-14 md:mb-16">
          お探しのページは見つかりませんでした。
        </p>
        <Link
          href="/"
          className="text-[#111111] font-medium text-sm md:text-[15px] tracking-[0.1em] underline-offset-4 decoration-[#111]/35 hover:underline hover:opacity-80 transition-[opacity,text-decoration] duration-200 inline-flex items-center gap-2.5 py-1 group"
          aria-label="ホームに戻る"
        >
          Back to Home{' '}
          <span className="transform group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
