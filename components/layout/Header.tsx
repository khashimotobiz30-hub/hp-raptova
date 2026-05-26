'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useCallback, useRef } from 'react';
import { SITE_CONFIG } from '@/lib/config';
import { CASE_STUDY_NAV_LINKS } from '@/lib/projects/top-projects';

const NAV_LINKS = [
  { label: 'ABOUT', href: '/about' },
  { label: 'BUSINESS', href: '/business' },
] as const;

const PROJECTS_HREF = '/#projects';

function NavUnderline({ contrast }: { contrast: boolean }) {
  return (
    <span
      className={[
        'absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full',
        contrast ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a]',
      ].join(' ')}
    />
  );
}

function navLinkClass(contrast: boolean) {
  return [
    'text-xs font-normal tracking-[0.18em] transition-colors duration-200 relative group',
    contrast
      ? 'text-[#555555] hover:text-[#0a0a0a]'
      : 'text-[#555555] hover:text-[#0a0a0a]',
  ].join(' ');
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    const main = document.getElementById('site-main');
    if (!main) return;
    if (menuOpen) {
      main.setAttribute('inert', '');
      main.setAttribute('aria-hidden', 'true');
    } else {
      main.removeAttribute('inert');
      main.removeAttribute('aria-hidden');
    }
    return () => {
      main.removeAttribute('inert');
      main.removeAttribute('aria-hidden');
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    if (!menu) return;

    const focusables = Array.from(
      menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || focusables.length === 0) return;
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        return;
      }
      if (document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (menuOpen) setMenuOpen(false);
        if (projectsOpen) setProjectsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, projectsOpen]);

  useEffect(() => {
    if (!projectsOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (projectsRef.current && !projectsRef.current.contains(e.target as Node)) {
        setProjectsOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [projectsOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const handleLogoClick = useCallback(() => {
    if (menuOpen) closeMenu();
  }, [menuOpen, closeMenu]);
  const closeProjectsMenu = useCallback(() => setProjectsOpen(false), []);

  const headerNavContrast = scrolled || projectsOpen || menuOpen;
  const headerSolidBg = scrolled || projectsOpen;

  return (
    <>
      <header
        suppressHydrationWarning
        onMouseLeave={() => setProjectsOpen(false)}
        className={[
          'fixed left-0 right-0 top-0 z-50 w-full max-w-full overflow-x-clip transition-all duration-300 ease-out',
          projectsOpen ? 'pb-[5.25rem]' : '',
          menuOpen
            ? 'border-b border-transparent bg-white backdrop-blur-none'
            : headerSolidBg
              ? 'border-b border-black/10 bg-[#f2f0e9]/96 backdrop-blur-md'
              : 'border-b border-transparent bg-transparent backdrop-blur-none',
        ].join(' ')}
      >
        <div className="top-header-split flex w-full min-w-0 items-center justify-between px-7 md:items-start md:px-12 lg:grid lg:items-center lg:px-0 min-[1440px]:px-0">
          <Link
            href="/"
            onClick={handleLogoClick}
            className={[
              'flex h-[72px] items-center transition-opacity duration-200 hover:opacity-60 lg:pl-10 xl:pl-14 min-[1440px]:pl-20',
              'text-[#0a0a0a]',
            ].join(' ')}
            aria-label={`${SITE_CONFIG.siteName} ホームへ`}
          >
            <span className="relative block h-[18px] w-[137px] md:h-[20px] md:w-[152px]">
              <Image
                src="/logos/raptova-logotype-small.svg"
                alt="RAPTOVA"
                fill
                priority
                sizes="(max-width: 767px) 137px, 152px"
                className="object-contain object-left"
              />
            </span>
          </Link>

          <nav className="hidden md:flex items-start gap-10 lg:justify-end lg:pr-9 xl:pr-11 min-[1440px]:pr-14" aria-label="メインナビゲーション">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={[navLinkClass(headerNavContrast), 'flex h-[72px] items-center'].join(' ')}
              >
                {label}
                <NavUnderline contrast={headerNavContrast} />
              </Link>
            ))}

            <div
              ref={projectsRef}
              className="relative w-fit shrink-0"
              onMouseEnter={() => setProjectsOpen(true)}
            >
              <div className="flex h-[72px] items-center gap-1">
                <Link
                  href={PROJECTS_HREF}
                  className={[navLinkClass(headerNavContrast), 'flex h-full items-center'].join(' ')}
                  onClick={closeProjectsMenu}
                >
                  PROJECTS
                  <NavUnderline contrast={headerNavContrast} />
                </Link>
                <button
                  type="button"
                  className={[
                    'flex h-6 w-5 items-center justify-center transition-colors duration-200',
                    headerNavContrast
                      ? 'text-[#555555] hover:text-[#0a0a0a]'
                      : 'text-[#555555] hover:text-[#0a0a0a]',
                  ].join(' ')}
                  aria-expanded={projectsOpen}
                  aria-haspopup="true"
                  aria-controls="projects-subnav"
                  aria-label="Open projects menu"
                  onClick={() => setProjectsOpen((v) => !v)}
                >
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    aria-hidden
                    className={[
                      'transition-transform duration-300',
                      projectsOpen ? 'rotate-180' : '',
                    ].join(' ')}
                  >
                    <path
                      d="M1 1.25L5 4.75L9 1.25"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div
                id="projects-subnav"
                role="menu"
                className={[
                  'absolute left-0 top-full z-10 min-w-max overflow-hidden transition-all duration-300 ease-out',
                  projectsOpen
                    ? 'max-h-28 opacity-100 pt-3'
                    : 'pointer-events-none max-h-0 opacity-0 pt-0',
                ].join(' ')}
              >
                <div className="flex flex-col gap-2.5">
                  {CASE_STUDY_NAV_LINKS.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      role="menuitem"
                      className={[navLinkClass(headerNavContrast), 'block whitespace-nowrap'].join(' ')}
                      onClick={closeProjectsMenu}
                    >
                      {label}
                      <NavUnderline contrast={headerNavContrast} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className={[
                navLinkClass(headerNavContrast),
                'flex h-[72px] cursor-pointer items-center',
              ].join(' ')}
              aria-label="お問い合わせページへ"
            >
              CONTACT
              <NavUnderline contrast={headerNavContrast} />
            </Link>
          </nav>

          <button
            className="mr-2.5 flex h-[72px] w-10 shrink-0 flex-col items-center justify-center gap-1.5 md:hidden md:mr-0"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            aria-expanded={menuOpen}
            aria-controls="sp-menu"
          >
            <span
              className={[
                'block h-px w-6 origin-center bg-[#0a0a0a] transition-all duration-300',
                menuOpen ? 'translate-y-[5px] rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px w-6 bg-[#0a0a0a] transition-all duration-300',
                menuOpen ? 'opacity-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-px w-6 origin-center bg-[#0a0a0a] transition-all duration-300',
                menuOpen ? '-translate-y-[5px] -rotate-45' : '',
              ].join(' ')}
            />
          </button>
        </div>
      </header>

      <div
        id="sp-menu"
        ref={menuRef}
        role="dialog"
        aria-modal={menuOpen}
        aria-hidden={!menuOpen}
        inert={!menuOpen || undefined}
        aria-label="ナビゲーションメニュー"
        className={[
          'fixed inset-0 z-40 flex max-w-full flex-col items-center justify-center overflow-x-clip bg-white transition-all duration-300',
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      >
        <nav className="flex flex-col items-center gap-10" aria-label="スマートフォンメニュー">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={closeMenu}
              className="text-sm tracking-[0.2em] text-[#0a0a0a] transition-opacity duration-200 hover:opacity-50"
            >
              {label}
            </Link>
          ))}

          <div className="flex flex-col items-center gap-5">
            <Link
              href={PROJECTS_HREF}
              onClick={closeMenu}
              className="text-sm tracking-[0.2em] text-[#0a0a0a] transition-opacity duration-200 hover:opacity-50"
            >
              PROJECTS
            </Link>
            <div className="flex flex-col items-center gap-3 border-l border-black/12 pl-5">
              {CASE_STUDY_NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="max-w-[16rem] text-center text-[10px] leading-relaxed tracking-[0.12em] text-[#555555] transition-opacity duration-200 hover:text-[#0a0a0a] hover:opacity-80"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            onClick={closeMenu}
            className="cursor-pointer text-sm tracking-[0.2em] text-[#0a0a0a] transition-opacity duration-200 hover:opacity-50"
            aria-label="\u304A\u554F\u3044\u5408\u308F\u305B\u30DA\u30FC\u30B8\u3078"
          >
            CONTACT
          </Link>
        </nav>
      </div>
    </>
  );
}
