'use client';

import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';
import { handleContactClick } from '@/lib/contact';

const FOOTER_LINKS = [
  { label: 'ABOUT', href: '/about' },
  { label: 'SERVICES', href: '/services' },
  { label: 'WORKS', href: '/works' },
] as const;

export default function Footer() {
  return (
    <footer id="footer" className="bg-white border-t border-[#e5e5e5]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 lg:px-20 py-14 md:py-16">
        {/* PC: 左右分割 / SP: 縦積み */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-0">

          {/* 左：ロゴ + タグライン */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-[#0a0a0a] text-sm font-medium tracking-[0.2em] hover:opacity-60 transition-opacity duration-200"
              aria-label={`${SITE_CONFIG.siteName} ホームへ`}
            >
              {SITE_CONFIG.siteName}
            </Link>
            <div className="flex flex-col gap-1">
              <p className="text-[#0a0a0a] text-sm copy-ja">{SITE_CONFIG.taglineJa}</p>
              <p className="text-[#8a8a8a] text-xs tracking-[0.12em]">{SITE_CONFIG.taglineEn}</p>
            </div>
          </div>

          {/* 右：ナビ + コピーライト */}
          <div className="flex flex-col items-start md:items-end gap-5">
            <nav
              className="flex flex-wrap gap-x-6 gap-y-2 md:gap-x-8"
              aria-label="フッターナビゲーション"
            >
              {FOOTER_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[#555555] text-xs tracking-[0.16em] hover:text-[#0a0a0a] transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={handleContactClick}
                className="text-[#555555] text-xs tracking-[0.16em] hover:text-[#0a0a0a] transition-colors duration-200 cursor-pointer"
                aria-label="メールで問い合わせる"
              >
                CONTACT
              </button>
            </nav>
            <p className="text-[#8a8a8a] text-xs">
              © {new Date().getFullYear()} {SITE_CONFIG.siteName}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
