import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** @type {{ path: string; mustInclude: string[] }[]} */
const targets = [
  {
    path: 'components/business/BusinessApproach.tsx',
    mustInclude: [
      'RAPTOVA\u306F\u3001',
      '\u6574\u7406\u3057\u3066\u3001',
      '\u73FE\u72B6\u30FB\u8AB2\u984C',
      '\u79C1\u305F\u3061\u306E\u8003\u3048\u65B9',
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
