import { readFileSync, writeFileSync } from 'node:fs';

function assertUtf8Content(path, options = {}) {
  const content = readFileSync(path, 'utf8');

  if (/\?{4,}/.test(content)) {
    throw new Error(`Mojibake detected in ${path}: contains "????" sequence`);
  }

  const { mustInclude = [] } = options;
  for (const phrase of mustInclude) {
    if (!content.includes(phrase)) {
      throw new Error(`Missing expected phrase "${phrase}" in ${path}`);
    }
  }
}

function replaceOrThrow(path, oldString, newString) {
  const before = readFileSync(path, 'utf8');
  if (!before.includes(oldString)) {
    throw new Error(`Replace target not found in ${path}`);
  }
  const after = before.replace(oldString, newString);
  writeFileSync(path, after, 'utf8');
}

const headerPath = 'components/layout/Header.tsx';
const footerPath = 'components/layout/Footer.tsx';

// 1) Header: swap text logotype -> Image (responsive: md+ full, <md small)
{
  const header = readFileSync(headerPath, 'utf8');

  if (!header.includes("import Link from 'next/link';")) {
    throw new Error(`Unexpected Header import shape: ${headerPath}`);
  }
  if (!header.includes("import Image from 'next/image';")) {
    const next = header.replace(
      "import Link from 'next/link';",
      "import Link from 'next/link';\nimport Image from 'next/image';",
    );
    writeFileSync(headerPath, next, 'utf8');
  }

  const oldLogoBlock = [
    '          <Link',
    '            href="/"',
    '            onClick={handleLogoClick}',
    '            className={[',
    "              'flex h-[72px] items-center text-sm font-medium tracking-[0.38em] transition-opacity duration-200 hover:opacity-60 lg:pl-10 xl:pl-14 min-[1440px]:pl-20',",
    "              headerNavContrast ? 'text-[#0a0a0a]' : 'text-[#0a0a0a] md:text-white',",
    "            ].join(' ')}",
    '            aria-label={`${SITE_CONFIG.siteName} ホームへ`}',
    '          >',
    '            {SITE_CONFIG.siteName}',
    '          </Link>',
  ].join('\n');

  const newLogoBlock = [
    '          <Link',
    '            href="/"',
    '            onClick={handleLogoClick}',
    '            className={[',
    "              'flex h-[72px] items-center transition-opacity duration-200 hover:opacity-60 lg:pl-10 xl:pl-14 min-[1440px]:pl-20',",
    "              headerNavContrast ? 'text-[#0a0a0a]' : 'text-[#0a0a0a] md:text-white',",
    "            ].join(' ')}",
    '            aria-label={`${SITE_CONFIG.siteName} ホームへ`}',
    '          >',
    '            <span className="relative block h-[20px] w-[152px] md:w-[168px]">',
    '              <Image',
    '                src="/logos/raptova-logotype-header.svg"',
    '                alt="RAPTOVA"',
    '                fill',
    '                priority',
    '                sizes="(max-width: 767px) 140px, 168px"',
    '                className="hidden md:block object-contain"',
    '              />',
    '              <Image',
    '                src="/logos/raptova-logotype-small.svg"',
    '                alt="RAPTOVA"',
    '                fill',
    '                priority',
    '                sizes="140px"',
    '                className="block md:hidden object-contain"',
    '              />',
    '            </span>',
    '          </Link>',
  ].join('\n');

  replaceOrThrow(headerPath, oldLogoBlock, newLogoBlock);

  assertUtf8Content(headerPath, {
    mustInclude: [
      '\u30e1\u30cb\u30e5\u30fc\u3092\u958b\u304f',
      '\u30e1\u30a4\u30f3\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3',
    ],
  });
}

// 2) Footer: swap text logotype -> white Image (responsive: md+ full, <md small)
{
  const footer = readFileSync(footerPath, 'utf8');

  if (!footer.includes("import Link from 'next/link';")) {
    throw new Error(`Unexpected Footer import shape: ${footerPath}`);
  }
  if (!footer.includes("import Image from 'next/image';")) {
    const next = footer.replace(
      "import Link from 'next/link';",
      "import Link from 'next/link';\nimport Image from 'next/image';",
    );
    writeFileSync(footerPath, next, 'utf8');
  }

  const oldLogoBlock = [
    '            <Link',
    '              href="/"',
    '              className="text-sm font-medium tracking-[0.38em] text-white hover:opacity-60 transition-opacity duration-200"',
    '              aria-label={`${SITE_CONFIG.siteName} ホームへ`}',
    '            >',
    '              {SITE_CONFIG.siteName}',
    '            </Link>',
  ].join('\n');

  const newLogoBlock = [
    '            <Link',
    '              href="/"',
    '              className="transition-opacity duration-200 hover:opacity-60"',
    '              aria-label={`${SITE_CONFIG.siteName} ホームへ`}',
    '            >',
    '              <span className="relative block h-[22px] w-[152px] md:w-[176px]">',
    '                <Image',
    '                  src="/logos/raptova-logotype-header-white.svg"',
    '                  alt="RAPTOVA"',
    '                  fill',
    '                  sizes="(max-width: 767px) 140px, 176px"',
    '                  className="hidden md:block object-contain"',
    '                />',
    '                <Image',
    '                  src="/logos/raptova-logotype-small.svg"',
    '                  alt="RAPTOVA"',
    '                  fill',
    '                  sizes="140px"',
    '                  className="block md:hidden object-contain"',
    '                />',
    '              </span>',
    '            </Link>',
  ].join('\n');

  replaceOrThrow(footerPath, oldLogoBlock, newLogoBlock);

  assertUtf8Content(footerPath, {
    mustInclude: ['\u30d5\u30c3\u30bf\u30fc\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3'],
  });
}

console.log('OK: swapped Header/Footer logotypes');

