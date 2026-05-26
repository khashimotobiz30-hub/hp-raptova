import { readFileSync, writeFileSync } from 'node:fs';

function assertUtf8Content(path, options = {}) {
  const content = readFileSync(path, 'utf8');

  if (/\?{4,}/.test(content)) {
    throw new Error(`Mojibake detected in ${path}: contains \"????\" sequence`);
  }

  const { mustInclude = [] } = options;
  for (const phrase of mustInclude) {
    if (!content.includes(phrase)) {
      throw new Error(`Missing expected phrase \"${phrase}\" in ${path}`);
    }
  }
}

function replaceOnce(path, oldStr, newStr) {
  const before = readFileSync(path, 'utf8');
  if (!before.includes(oldStr)) {
    throw new Error(`Not found in ${path}: ${JSON.stringify(oldStr.slice(0, 80))}`);
  }
  const after = before.replace(oldStr, newStr);
  if (after === before) {
    throw new Error(`Replace failed in ${path}`);
  }
  writeFileSync(path, after, 'utf8');
}

const LAYOUT = 'app/layout.tsx';
const ABOUT = 'components/sections/About.tsx';

const READING = 'RAPTOVA\uFF08\u30E9\u30D7\u30C8\u30FC\u30D0\uFF09';
const TITLE_WITH_READING = `${READING} | \u601D\u8003\u3092\u3001\u6B21\u306E\u73FE\u5B9F\u3078\u3002`;
const DESCRIPTION_WITH_READING =
  `${READING}\u306F\u3001AI\u3092\u6D3B\u7528\u3057\u3066\u30A2\u30A4\u30C7\u30A2\u306E\u6574\u7406\u3001\u8A2D\u8A08\u3001\u5B9F\u88C5\u3001\u6539\u5584\u307E\u3067\u3092\u4E00\u8CAB\u3057\u3066\u652F\u63F4\u3057\u3001\u500B\u4EBA\u3084\u7D44\u7E54\u306E\u69CB\u60F3\u3092\u73FE\u5B9F\u306B\u52D5\u304B\u305B\u308B\u72B6\u614B\u3078\u5C0E\u304D\u307E\u3059\u3002`;

// 1) app/layout.tsx metadata
// First run: replace SITE_CONFIG.* block. If already edited (but escaped), fix the escaped literals.
const layoutContent = readFileSync(LAYOUT, 'utf8');
if (layoutContent.includes("  title: SITE_CONFIG.title,\n  description: SITE_CONFIG.description,\n")) {
  replaceOnce(
    LAYOUT,
    "  title: SITE_CONFIG.title,\n  description: SITE_CONFIG.description,\n",
    `  title: '${TITLE_WITH_READING}',\n  description:\n    '${DESCRIPTION_WITH_READING}',\n`,
  );
} else {
  // Fix accidental literal escape sequences from a previous run.
  replaceOnce(
    LAYOUT,
    "  title: 'RAPTOVA\\uFF08\\u30E9\\u30D7\\u30C8\\u30FC\\u30D0\\uFF09 | \\u601D\\u8003\\u3092\\u3001\\u6B21\\u306E\\u73FE\\u5B9F\\u3078\\u3002',\n  description:\n    'RAPTOVA\\uFF08\\u30E9\\u30D7\\u30C8\\u30FC\\u30D0\\uFF09\\u306F\\u3001AI\\u3092\\u6D3B\\u7528\\u3057\\u3066\\u30A2\\u30A4\\u30C7\\u30A2\\u306E\\u6574\\u7406\\u3001\\u8A2D\\u8A08\\u3001\\u5B9F\\u88C5\\u3001\\u6539\\u5584\\u307E\\u3067\\u3092\\u4E00\\u8CAB\\u3057\\u3066\\u652F\\u63F4\\u3057\\u3001\\u500B\\u4EBA\\u3084\\u7D44\\u7E54\\u306E\\u69CB\\u60F3\\u3092\\u73FE\\u5B9F\\u306B\\u52D5\\u304B\\u305B\\u308B\\u72B6\\u614B\\u3078\\u5C0E\\u304D\\u307E\\u3059\\u3002',\n",
    `  title: '${TITLE_WITH_READING}',\n  description:\n    '${DESCRIPTION_WITH_READING}',\n`,
  );
}

// 2) components/sections/About.tsx first sentence
const aboutContent = readFileSync(ABOUT, 'utf8');
if (aboutContent.includes('            RAPTOVAは、AIを活用して')) {
  replaceOnce(
    ABOUT,
    '            RAPTOVAは、AIを活用して、人や組織の中にある構想・課題・情報を整理し、実行できる形へ変えていくパートナーです。',
    `            ${READING}は、AIを活用して、人や組織の中にある構想・課題・情報を整理し、実行できる形へ変えていくパートナーです。`,
  );
} else {
  // Fix accidental literal escape sequences from a previous run.
  replaceOnce(
    ABOUT,
    '            RAPTOVA\\uFF08\\u30E9\\u30D7\\u30C8\\u30FC\\u30D0\\uFF09\\u306F\\u3001AI\\u3092\\u6D3B\\u7528\\u3057\\u3066\\u3001\\u4EBA\\u3084\\u7D44\\u7E54\\u306E\\u4E2D\\u306B\\u3042\\u308B\\u69CB\\u60F3\\u30FB\\u8AB2\\u984C\\u30FB\\u60C5\\u5831\\u3092\\u6574\\u7406\\u3057\\u3001\\u5B9F\\u884C\\u3067\\u304D\\u308B\\u5F62\\u3078\\u5909\\u3048\\u3066\\u3044\\u304F\\u30D1\\u30FC\\u30C8\\u30CA\\u30FC\\u3067\\u3059\\u3002',
    `            ${READING}は、AIを活用して、人や組織の中にある構想・課題・情報を整理し、実行できる形へ変えていくパートナーです。`,
  );
}

// Verify
assertUtf8Content(LAYOUT, {
  mustInclude: [
    READING,
    '\u601D\u8003\u3092\u3001\u6B21\u306E\u73FE\u5B9F\u3078\u3002',
    'openGraph',
  ],
});

assertUtf8Content(ABOUT, {
  mustInclude: [READING, 'RAPTOVA\u3068\u306F'],
});

console.log('OK: added reading to metadata + About first sentence');

