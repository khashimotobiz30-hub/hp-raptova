'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG } from '@/lib/config';
import { CASE_STUDY_NAV_LINKS } from '@/lib/projects/top-projects';

const NAV_LINKS = [
  { label: 'ABOUT', href: '/about' },
  { label: 'BUSINESS', href: '/business/recruiting' },
] as const;

const PROJECTS_HREF = '/projects/raptova-website';

function NavUnderline({ contrast, active = false }: { contrast: boolean; active?: boolean }) {
  return (
    <span
      className={[
        'absolute -bottom-0.5 left-0 h-px transition-all duration-300',
        active ? 'w-full' : 'w-0 group-hover:w-full',
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
    const handleScroll = () => setScrolled(window.scrollY > 32);
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
  const pathname = usePathname();

  const isScrolled = scrolled;
  const isElevated = isScrolled || projectsOpen || menuOpen;
  const headerNavContrast = isElevated;
  const headerBarHeightClass = 'h-[60px] md:h-[72px]';
  const headerShellClass = menuOpen
    ? 'rounded-md border-black/[0.06] bg-white/95 shadow-[0_10px_32px_rgba(0,0,0,0.05)] backdrop-blur-md'
    : isElevated
      ? 'rounded-md border-black/[0.06] bg-[#f4f3ef]/96 shadow-[0_14px_40px_rgba(0,0,0,0.06)] backdrop-blur-md'
      : 'rounded-none border-transparent bg-transparent shadow-none backdrop-blur-none';

  return (
    <>
      <header
        suppressHydrationWarning
        onMouseLeave={() => setProjectsOpen(false)}
        className={[
          'fixed left-1/2 z-50 -translate-x-1/2 overflow-visible transition-all duration-300 ease-out',
          isElevated
            ? 'top-3 w-[calc(100%-1.25rem)] max-w-[1760px] md:top-4 lg:top-5 lg:w-[calc(100%-112px)] min-[1440px]:top-6 min-[1440px]:w-[calc(100%-120px)]'
            : 'top-0 w-full max-w-none',
        ].join(' ')}
      >
        <div
          className={[
            'overflow-visible border transition-all duration-300 ease-out',
            headerShellClass,
          ].join(' ')}
        >
          <div
            className={[
              'top-header-split flex w-full min-w-0 items-center justify-between md:items-center lg:grid lg:items-center',
              isElevated
                ? 'px-4 md:px-6 lg:px-7 xl:px-8 min-[1440px]:px-9'
                : 'px-7 md:px-12 lg:px-0',
            ].join(' ')}
          >
            <Link
              href="/"
              onClick={handleLogoClick}
              className={[
                'flex items-center transition-opacity duration-200 hover:opacity-60',
                headerBarHeightClass,
                'text-[#0a0a0a]',
                isElevated ? '' : 'lg:pl-10 xl:pl-14 min-[1440px]:pl-20',
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

            <nav
              className={[
                'hidden items-center gap-8 md:flex lg:justify-end lg:gap-10 xl:gap-11',
                isElevated ? '' : 'lg:pr-9 xl:pr-11 min-[1440px]:pr-14',
              ].join(' ')}
              aria-label="メインナビゲーション"
            >
              {NAV_LINKS.map(({ label, href }) => {
                const isActive =
                  label === 'BUSINESS'
                    ? pathname === '/business' || pathname.startsWith('/business/')
                    : pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    className={[
                      navLinkClass(headerNavContrast),
                      'flex items-center',
                      headerBarHeightClass,
                      isActive ? 'text-[#0a0a0a]' : '',
                    ].join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                    <NavUnderline contrast={headerNavContrast} active={isActive} />
                  </Link>
                );
              })}

              <div
                ref={projectsRef}
                className="relative w-fit shrink-0"
                onMouseEnter={() => setProjectsOpen(true)}
              >
                <div className={['flex items-center gap-1', headerBarHeightClass].join(' ')}>
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
                      'text-[#555555] hover:text-[#0a0a0a]',
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
                    'absolute left-0 top-[calc(100%-0.35rem)] z-20 min-w-max transition-all duration-300 ease-out',
                    projectsOpen
                      ? 'pointer-events-auto max-h-40 opacity-100 pt-2'
                      : 'pointer-events-none max-h-0 opacity-0 pt-0',
                  ].join(' ')}
                >
                  <div className="flex flex-col gap-2.5 rounded-sm border border-black/[0.06] bg-[#f4f3ef]/95 px-4 py-3 shadow-[0_10px_28px_rgba(0,0,0,0.07)] backdrop-blur-sm">
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
                  'inline-flex shrink-0 items-center justify-center self-center',
                  'rounded-full px-4 py-2 md:px-6 md:py-2.5',
                  'text-[10px] font-semibold tracking-[0.24em] text-[#0a0a0a] md:text-[11px] md:tracking-[0.26em]',
                  'transition-all duration-300',
                  isElevated
                    ? 'border border-black/10 bg-white/70 shadow-[0_10px_24px_rgba(0,0,0,0.06)] hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white'
                    : 'border border-black/[0.05] bg-white/20 shadow-none hover:border-black/10 hover:bg-white/50',
                ].join(' ')}
                aria-label="お問い合わせページへ"
              >
                CONTACT
              </Link>
            </nav>

            <button
              className={[
                'mr-1 flex w-10 shrink-0 flex-col items-center justify-center gap-1.5 md:hidden',
                headerBarHeightClass,
              ].join(' ')}
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
            className={[
              'inline-flex items-center justify-center rounded-full border border-black/10 bg-white/80',
              'px-6 py-3 text-sm font-semibold tracking-[0.2em] text-[#0a0a0a]',
              'shadow-[0_10px_24px_rgba(0,0,0,0.06)] transition-colors duration-200',
              'hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white',
            ].join(' ')}
            aria-label="お問い合わせページへ"
          >
            CONTACT
          </Link>
        </nav>
      </div>
    </>
  );
}
