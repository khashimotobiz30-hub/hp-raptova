'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { SITE_CONFIG } from '@/lib/config';

const NAV_LINKS = [
  { label: 'ABOUT', href: '/#about' },
  { label: 'BUSINESS', href: '/#business' },
  { label: 'PROJECTS', href: '/#projects' },
] as const;

export default function Header() {
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

  return (
    <>
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-sm border-b border-[#e5e5e5]'
            : 'bg-white/0 md:mix-blend-difference',
        ].join(' ')}
        style={{ height: '72px' }}
      >
        <div className="h-full px-7 md:px-12 lg:px-16 flex items-center justify-between">
          {/* ロゴ */}
          <Link
            href="/"
            className={[
              'text-sm font-medium tracking-[0.38em] hover:opacity-60 transition-opacity duration-200',
              scrolled ? 'text-[#0a0a0a]' : 'text-[#0a0a0a] md:text-white',
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
                  scrolled
                    ? 'text-[#555555] hover:text-[#0a0a0a]'
                    : 'text-[#555555] hover:text-[#0a0a0a] md:text-white/82 md:hover:text-white',
                ].join(' ')}
              >
                {label}
                <span
                  className={[
                    'absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300',
                    scrolled ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a] md:bg-white',
                  ].join(' ')}
                />
              </Link>
            ))}
            <Link
              href="/#contact"
              className={[
                'text-xs font-normal tracking-[0.18em] transition-colors duration-200 relative group cursor-pointer',
                scrolled
                  ? 'text-[#555555] hover:text-[#0a0a0a]'
                  : 'text-[#555555] hover:text-[#0a0a0a] md:text-white/82 md:hover:text-white',
              ].join(' ')}
              aria-label="CONTACTセクションへ移動"
            >
              CONTACT
              <span
                className={[
                  'absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300',
                  scrolled ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a] md:bg-white',
                ].join(' ')}
              />
            </Link>
          </nav>

          {/* ハンバーガーボタン（SP） */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
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
          'fixed inset-0 z-40 bg-white flex flex-col justify-center items-center transition-all duration-300',
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
