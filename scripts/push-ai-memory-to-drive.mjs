import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DRIVE = 'G:/マイドライブ/RAPTOVA_AI_MEMORY';
const SRC = 'docs/RAPTOVA_AI_MEMORY_DRIVE_SYNC';

const FILES = [
  'README.md',
  '00_core/decision_log.md',
  '00_core/raptova.md',
  '01_projects/raptova_hp.md',
];

function assertUtf8(path, mustInclude = []) {
  const content = readFileSync(path, 'utf8');
  if (/\?{4,}/.test(content)) throw new Error(`Mojibake: ${path}`);
  for (const phrase of mustInclude) {
    if (!content.includes(phrase)) throw new Error(`Missing "${phrase}" in ${path}`);
  }
  return content;
}

for (const rel of FILES) {
  const srcPath = join(SRC, rel);
  const destPath = join(DRIVE, rel);
  copyFileSync(srcPath, destPath);
  const size = statSync(destPath).size;
  console.log(`OK: ${rel} (${size} bytes)`);
}

assertUtf8(join(DRIVE, 'README.md'), ['\u6700\u7d42\u66f4\u65b0', '2026-05-20']);
assertUtf8(join(DRIVE, '01_projects/raptova_hp.md'), [
  'info@raptova.com',
  'app/sitemap.ts',
  '\u30ed\u30b4 / favicon',
]);
assertUtf8(join(DRIVE, '00_core/decision_log.md'), [
  '2026-05-20\uff1aHP \u554f\u3044\u5408\u308f\u305b\u30e1\u30fc\u30eb',
]);

console.log('All files pushed to Google Drive sync folder.');
