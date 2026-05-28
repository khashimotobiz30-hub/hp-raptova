import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const json = JSON.parse(
  readFileSync(join(root, 'scripts/recruiting-additional-items.json'), 'utf8'),
);

const IMAGE_KEYS = {
  concept: {
    src: '/images/business/recruiting/main-support-concept.webp',
    alt: '\u63a1\u7528\u30b3\u30f3\u30bb\u30d7\u30c8\u6574\u7406\u306e\u8cc7\u6599\u30a4\u30e1\u30fc\u30b8',
  },
  'job-posting': {
    src: '/images/business/recruiting/main-support-job-posting.webp',
    alt: '\u6c42\u4eba\u539f\u7a3f\u306e\u6574\u7406\u30a4\u30e1\u30fc\u30b8',
  },
  lp: {
    src: '/images/business/recruiting/main-support-lp.webp',
    alt: '\u63a1\u7528LP\u306e\u30a4\u30e1\u30fc\u30b8',
  },
  deck: {
    src: '/images/business/recruiting/main-support-deck.webp',
    alt: '\u8aac\u660e\u8cc7\u6599\u306e\u30a4\u30e1\u30fc\u30b8',
  },
};

const items = json.items.map((item) => {
  const image = IMAGE_KEYS[item.imageKey] ?? IMAGE_KEYS.concept;
  const next = {
    id: item.id,
    icon: item.icon,
    label: item.label,
    description: item.description,
    serviceTags: item.serviceTags,
    image,
  };
  if (item.concerns?.length) next.concerns = item.concerns;
  if (item.effects?.length) next.effects = item.effects;
  return next;
});

const additionalTs = `import type { RecruitingImage } from '@/lib/business/recruiting-content';

export type RecruitingAdditionalSupportItem = {
  id: string;
  icon:
    | 'send'
    | 'mail'
    | 'calendar'
    | 'presentation'
    | 'users'
    | 'graduation-cap'
    | 'file-text'
    | 'mic'
    | 'newspaper'
    | 'refresh-cw'
    | 'circle-help'
    | 'message-circle';
  label: string;
  description: string;
  serviceTags: readonly string[];
  concerns?: readonly string[];
  effects?: readonly string[];
  image: RecruitingImage;
};

export const RECRUITING_ADDITIONAL_SUPPORT = {
  title: ${JSON.stringify(json.title)},
  body: ${JSON.stringify(json.body)},
  defaultId: ${JSON.stringify(json.defaultId)},
  items: ${JSON.stringify(items, null, 2)} as const,
} as const;

export type RecruitingAdditionalSupportId =
  (typeof RECRUITING_ADDITIONAL_SUPPORT.items)[number]['id'];
`;

writeFileSync(join(root, 'lib/business/recruiting-additional-support.ts'), additionalTs, 'utf8');

let content = readFileSync(join(root, 'lib/business/recruiting-content.ts'), 'utf8');

content = content.replace(
  `export const RECRUITING_MAIN_SUPPORT = {
  title: '\u4e3b\u306a\u63a1\u7528\u652f\u63f4\u30b5\u30fc\u30d3\u30b9',
  items: [`,
  `export const RECRUITING_MAIN_SUPPORT = {
  title: '\u4e3b\u306a\u63a1\u7528\u652f\u63f4\u30b5\u30fc\u30d3\u30b9',
  body: '\u63a1\u7528\u306b\u5fc5\u8981\u306a\u60c5\u5831\u3092\u6574\u7406\u3057\u3001\u5fdc\u52df\u8005\u306b\u4f1d\u308f\u308b\u5f62\u3078\u6574\u3048\u307e\u3059\u3002',
  items: [`,
);

if (!content.includes("body: '\u63a1\u7528\u306b\u5fc5\u8981")) {
  if (content.includes('主な採用支援サービス')) {
    content = content.replace(
      /export const RECRUITING_MAIN_SUPPORT = \{\r?\n  title: '主な採用支援サービス',\r?\n  items: \[/,
      `export const RECRUITING_MAIN_SUPPORT = {\n  title: '\u4e3b\u306a\u63a1\u7528\u652f\u63f4\u30b5\u30fc\u30d3\u30b9',\n  body: '\u63a1\u7528\u306b\u5fc5\u8981\u306a\u60c5\u5831\u3092\u6574\u7406\u3057\u3001\u5fdc\u52df\u8005\u306b\u4f1d\u308f\u308b\u5f62\u3078\u6574\u3048\u307e\u3059\u3002',\n  items: [`,
    );
  } else {
    throw new Error('RECRUITING_MAIN_SUPPORT header not found');
  }
}

const supportRangeBlock = /export const RECRUITING_SUPPORT_RANGE = \{[\s\S]*?\};\r?\n\r?\n/;
if (!supportRangeBlock.test(content)) throw new Error('RECRUITING_SUPPORT_RANGE not found');
content = content.replace(
  supportRangeBlock,
  "export { RECRUITING_ADDITIONAL_SUPPORT } from '@/lib/business/recruiting-additional-support';\nexport type { RecruitingAdditionalSupportItem, RecruitingAdditionalSupportId } from '@/lib/business/recruiting-additional-support';\n\n",
);

writeFileSync(join(root, 'lib/business/recruiting-content.ts'), content, 'utf8');

console.log('OK: lib/business/recruiting-additional-support.ts');
console.log('OK: lib/business/recruiting-content.ts (patched)');
