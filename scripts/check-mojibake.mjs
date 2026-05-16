import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** @type {{ path: string; mustInclude: string[] }[]} */
const targets = [
  {
    path: 'components/business/BusinessApproach.tsx',
    mustInclude: ['RAPTOVA\u306F\u3001', '\u6574\u7406\u3057\u3066\u3001'],
  },
  {
    path: 'components/business/BusinessAreas.tsx',
    mustInclude: [
      '\u63A1\u7528\u6D3B\u52D5\u652F\u63F4',
      '\u696D\u52D9\u6574\u7406\u30FBAI\u6D3B\u7528\u652F\u63F4',
    ],
  },
  {
    path: 'components/business/BusinessContact.tsx',
    mustInclude: [
      '\u304A\u554F\u3044\u5408\u308F\u305B\u3059\u308B',
      '\u76EE\u306E\u524D\u306E\u4ED5\u4E8B\u3092\u3001',
    ],
  },
  {
    path: 'components/business/BusinessHero.tsx',
    mustInclude: [
      '\u69CB\u60F3\u3092\u3001',
      '\u5B9F\u884C\u3067\u304D\u308B\u5F62\u3078\u3002',
    ],
  },
  {
    path: 'components/business/BusinessIntro.tsx',
    mustInclude: [
      '\u8AB2\u984C\u3092\u6574\u7406\u3057\u3001',
      '\u5B9F\u884C\u3067\u304D\u308B\u5F62\u3078\u5909\u3048\u308B\u3002',
    ],
  },
  {
    path: 'components/business/BusinessProjects.tsx',
    mustInclude: [
      '\u5B9F\u969B\u306E\u53D6\u308A\u7D44\u307F\u3092\u898B\u308B\u3002',
      '\u3059\u3079\u3066\u306E\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3092\u898B\u308B',
    ],
  },
];

function checkOne(relativePath, mustInclude) {
  const abs = join(root, relativePath);
  const content = readFileSync(abs, 'utf8');

  if (/\?{4,}/.test(content)) {
    throw new Error(
      `Mojibake detected in ${relativePath}: contains "????" sequence`,
    );
  }

  for (const phrase of mustInclude) {
    if (!content.includes(phrase)) {
      throw new Error(
        `Missing expected phrase in ${relativePath}: ${JSON.stringify(phrase)}`,
      );
    }
  }

  console.log(`OK: ${relativePath}`);
}

let failed = false;

for (const { path, mustInclude } of targets) {
  try {
    checkOne(path, mustInclude);
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}

console.log('All mojibake checks passed.');
