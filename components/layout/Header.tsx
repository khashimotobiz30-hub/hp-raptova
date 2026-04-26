'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { handleContactClick } from '@/lib/contact';
import { SITE_CONFIG } from '@/lib/config';

const NAV_LINKS = [
  { label: 'ABOUT', href: '/about' },
  { label: 'SERVICES', href: '/services' },
  { label: 'WORKS', href: '/works' },
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
            : 'bg-white/0',
        ].join(' ')}
        style={{ height: '72px' }}
      >
        <div className="max-w-[1280px] mx-auto px-16 h-full flex items-center justify-between">
          {/* ロゴ */}
          <Link
            href="/"
            className="text-[#0a0a0a] text-sm font-medium tracking-[0.2em] hover:opacity-60 transition-opacity duration-200"
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
                className="text-[#555555] text-xs font-normal tracking-[0.18em] hover:text-[#0a0a0a] transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#0a0a0a] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <button
              onClick={handleContactClick}
              className="text-[#555555] text-xs font-normal tracking-[0.18em] hover:text-[#0a0a0a] transition-colors duration-200 relative group cursor-pointer"
              aria-label="メールで問い合わせる"
            >
              CONTACT
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#0a0a0a] group-hover:w-full transition-all duration-300" />
            </button>
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
          <button
            onClick={() => {
              closeMenu();
              handleContactClick();
            }}
            className="text-[#0a0a0a] text-sm tracking-[0.2em] hover:opacity-50 transition-opacity duration-200 cursor-pointer"
            aria-label="メールで問い合わせる"
          >
            CONTACT
          </button>
        </nav>
      </div>
    </>
  );
}
