import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: '404 | RAPTOVA',
  description: SITE_CONFIG.description,
};

export default function NotFound() {
  return (
    <div className="min-h-[calc(100svh-72px)] flex items-center justify-center bg-white px-5 py-32">
      <div className="text-center">
        <p className="text-[#0a0a0a] text-xs tracking-[0.28em] font-medium mb-8">404</p>
        <p className="text-[#8a8a8a] text-xs tracking-[0.1em] mb-6">
          This page does not exist yet.
        </p>
        <p className="text-[#555555] text-sm leading-[1.9] copy-ja mb-12">
          お探しのページは見つかりませんでした。
        </p>
        <Link
          href="/"
          className="text-[#0a0a0a] text-sm tracking-[0.1em] hover:opacity-50 transition-opacity duration-200 inline-flex items-center gap-2 group"
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
