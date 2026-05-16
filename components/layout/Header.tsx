'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { SITE_CONFIG } from '@/lib/config';

const NAV_LINKS = [
  { label: 'ABOUT', href: '/about' },
  { label: 'BUSINESS', href: '/business' },
  { label: 'PROJECTS', href: '/#projects' },
] as const;

export default function Header() {
  const pathname = usePathname();
  const isBusinessHero = pathname === '/business';

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // メニュー表示中は背景スクロール抑制
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // ESCキーでメニューを閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const headerNavContrast = scrolled || (!scrolled && isBusinessHero);

  return (
    <>
      <header
        suppressHydrationWarning
        className={[
          'fixed left-0 right-0 top-0 z-50 w-full max-w-full overflow-x-clip transition-all duration-300',
          scrolled
            ? 'bg-[#f4f3ef]/80 backdrop-blur-md border-b border-black/10'
            : [
                // 画面上部では背景になじませる（/business は明るいHEROなので blend は使わない）
                'border-b border-transparent bg-transparent backdrop-blur-none',
                isBusinessHero ? '' : 'md:mix-blend-difference',
              ].join(' '),
        ].join(' ')}
        style={{ height: '72px' }}
      >
        <div className="flex h-full w-full min-w-0 items-center justify-between px-7 md:px-12 lg:px-20 min-[1440px]:px-24">
          {/* ロゴ */}
          <Link
            href="/"
            className={[
              'text-sm font-medium tracking-[0.38em] hover:opacity-60 transition-opacity duration-200',
              headerNavContrast ? 'text-[#0a0a0a]' : 'text-[#0a0a0a] md:text-white',
            ].join(' ')}
            aria-label={`${SITE_CONFIG.siteName} ホームへ`}
          >
            {SITE_CONFIG.siteName}
          </Link>

          {/* PCナビ */}
          <nav className="hidden md:flex items-center gap-10" aria-label="メインナビゲーション">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={[
                  'text-xs font-normal tracking-[0.18em] transition-colors duration-200 relative group',
                  headerNavContrast
                    ? 'text-[#555555] hover:text-[#0a0a0a]'
                    : 'text-[#555555] hover:text-[#0a0a0a] md:text-white/82 md:hover:text-white',
                ].join(' ')}
              >
                {label}
                <span
                  className={[
                    'absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300',
                    headerNavContrast ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a] md:bg-white',
                  ].join(' ')}
                />
              </Link>
            ))}
            <Link
              href="/#contact"
              className={[
                'text-xs font-normal tracking-[0.18em] transition-colors duration-200 relative group cursor-pointer',
                headerNavContrast
                  ? 'text-[#555555] hover:text-[#0a0a0a]'
                  : 'text-[#555555] hover:text-[#0a0a0a] md:text-white/82 md:hover:text-white',
              ].join(' ')}
              aria-label="CONTACTセクションへ移動"
            >
              CONTACT
              <span
                className={[
                  'absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300',
                  headerNavContrast ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a] md:bg-white',
                ].join(' ')}
              />
            </Link>
          </nav>

          {/* ハンバーガーボタン（SP） */}
          <button
            className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={menuOpen}
            aria-controls="sp-menu"
          >
            <span
              className={[
                'block w-6 h-px bg-[#0a0a0a] transition-all duration-300 origin-center',
                menuOpen ? 'rotate-45 translate-y-[5px]' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-6 h-px bg-[#0a0a0a] transition-all duration-300',
                menuOpen ? 'opacity-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-6 h-px bg-[#0a0a0a] transition-all duration-300 origin-center',
                menuOpen ? '-rotate-45 -translate-y-[5px]' : '',
              ].join(' ')}
            />
          </button>
        </div>
      </header>

      {/* SPフルスクリーンメニュー */}
      <div
        id="sp-menu"
        role="dialog"
        aria-modal="true"
        aria-label="ナビゲーションメニュー"
        className={[
          'fixed inset-0 z-40 flex max-w-full flex-col items-center justify-center overflow-x-clip bg-white transition-all duration-300',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <nav className="flex flex-col items-center gap-10" aria-label="スマートフォンメニュー">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={closeMenu}
              className="text-[#0a0a0a] text-sm tracking-[0.2em] hover:opacity-50 transition-opacity duration-200"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={closeMenu}
            className="text-[#0a0a0a] text-sm tracking-[0.2em] hover:opacity-50 transition-opacity duration-200 cursor-pointer"
            aria-label="CONTACTセクションへ移動"
          >
            CONTACT
          </Link>
        </nav>
      </div>
    </>
  );
}
