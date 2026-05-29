import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/lib/config';

const FOOTER_MAIN_LINKS = [
  { label: 'ABOUT', href: '/about' },
  { label: 'BUSINESS', href: '/business/recruiting' },
  { label: 'PROJECTS', href: '/projects/raptova-website' },
  { label: 'CONTACT', href: '/contact', ariaLabel: 'お問い合わせページへ' },
] as const;

const FOOTER_LEGAL_LINKS = [
  { label: 'PRIVACY POLICY', href: '/privacy' },
  { label: 'SITE POLICY', href: '/site-policy' },
] as const;

const mainNavClass =
  'flex min-w-0 flex-wrap items-center justify-center gap-x-8 gap-y-2.5 text-[11px] font-semibold tracking-[0.24em] text-white/75 md:gap-x-10 md:text-[12px] lg:gap-x-12';

const legalNavClass =
  'flex min-w-0 flex-wrap items-center justify-center gap-x-9 gap-y-2 text-[10px] font-medium tracking-[0.26em] text-white/50 md:gap-x-11 md:text-[10px]';

const linkHoverClass = 'transition-colors duration-200 hover:text-white';

export default function Footer() {
  return (
    <footer id="footer" className="w-full min-w-0 max-w-full overflow-x-clip border-t border-white/10 bg-[#080808] text-white">
      <div className="min-w-0 px-7 py-9 md:px-14 lg:px-20">
        <div className="flex min-w-0 flex-col gap-8 md:grid md:grid-cols-[auto_1fr_auto] md:items-center md:gap-x-8 lg:gap-x-10">
          <div className="flex min-w-0 shrink-0 items-center">
            <Link
              href="/"
              className="transition-opacity duration-200 hover:opacity-60"
              aria-label={`${SITE_CONFIG.siteName} ホームへ`}
            >
              <span className="relative block h-[16px] w-[115px] md:h-[18px] md:w-[140px]">
                <Image
                  src="/logos/raptova-logotype-small-white.svg"
                  alt="RAPTOVA"
                  fill
                  sizes="(max-width: 767px) 115px, 140px"
                  className="object-contain object-left"
                />
              </span>
            </Link>
          </div>

          <nav
            className="flex w-full min-w-0 flex-col items-center justify-center md:translate-y-px md:px-5 lg:px-8"
            aria-label="フッターナビゲーション"
          >
            <div className={mainNavClass}>
              {FOOTER_MAIN_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={linkHoverClass}
                  {...('ariaLabel' in link ? { 'aria-label': link.ariaLabel } : {})}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className={`${legalNavClass} mt-5 md:mt-6`} aria-label="フッター規約リンク">
              {FOOTER_LEGAL_LINKS.map(({ label, href }) => (
                <Link key={href} href={href} className={linkHoverClass}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          <p className="flex min-w-0 shrink-0 items-center justify-center text-[10px] tracking-[0.18em] text-white/45 md:justify-end">
            © {new Date().getFullYear()} {SITE_CONFIG.siteName}
          </p>
        </div>
      </div>
    </footer>
  );
}
