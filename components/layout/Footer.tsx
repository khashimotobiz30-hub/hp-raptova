'use client';

import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';

const FOOTER_LINKS = [
  { label: 'ABOUT', href: '/about' },
  { label: 'BUSINESS', href: '/business' },
  { label: 'PROJECTS', href: '/#projects' },
] as const;

export default function Footer() {
  return (
    <footer id="footer" className="w-full min-w-0 max-w-full overflow-x-clip border-t border-white/10 bg-[#080808] text-white">
      <div className="min-w-0 px-7 py-9 md:px-14 lg:px-20">
        <div className="flex min-w-0 flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <Link
              href="/"
              className="text-sm font-medium tracking-[0.38em] text-white hover:opacity-60 transition-opacity duration-200"
              aria-label={`${SITE_CONFIG.siteName} ホームへ`}
            >
              {SITE_CONFIG.siteName}
            </Link>
          </div>

          <nav
            className="flex min-w-0 flex-wrap gap-x-8 gap-y-3 text-[10px] font-semibold tracking-[0.26em] text-white/42"
            aria-label="フッターナビゲーション"
          >
            {FOOTER_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="cursor-pointer transition-colors hover:text-white"
              aria-label="CONTACTセクションへ移動"
            >
              CONTACT
            </Link>
          </nav>

          <p className="min-w-0 text-[10px] tracking-[0.18em] text-white/32">
            © {new Date().getFullYear()} {SITE_CONFIG.siteName}
          </p>

        </div>
      </div>
    </footer>
  );
}
