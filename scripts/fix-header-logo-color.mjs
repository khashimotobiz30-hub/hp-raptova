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

function replaceAllOrThrow(path, replacements) {
  const before = readFileSync(path, 'utf8');
  let after = before;

  for (const { from, to, label } of replacements) {
    if (!after.includes(from)) {
      throw new Error(`Replace target not found (${label}) in ${path}`);
    }
    after = after.replace(from, to);
  }

  if (after === before) {
    throw new Error(`No changes applied to ${path}`);
  }

  writeFileSync(path, after, 'utf8');
}

const headerPath = 'components/layout/Header.tsx';

// Make header logo + nav stay dark on light heroes:
// - Remove md:mix-blend-difference (inverts on light backgrounds)
// - Remove md:text-white* branches so nav stays dark pre-scroll too
replaceAllOrThrow(headerPath, [
  {
    label: 'remove mix-blend-difference',
    from: "              : 'border-b border-transparent bg-transparent backdrop-blur-none md:mix-blend-difference',",
    to: "              : 'border-b border-transparent bg-transparent backdrop-blur-none',",
  },
  {
    label: 'logo link color (no md:white)',
    from: "              headerNavContrast ? 'text-[#0a0a0a]' : 'text-[#0a0a0a] md:text-white',",
    to: "              'text-[#0a0a0a]',",
  },
  {
    label: 'nav link class (no md:white)',
    from: "      : 'text-[#555555] hover:text-[#0a0a0a] md:text-white/82 md:hover:text-white',",
    to: "      : 'text-[#555555] hover:text-[#0a0a0a]',",
  },
  {
    label: 'nav underline (no md:white bg)',
    from: "        contrast ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a] md:bg-white',",
    to: "        contrast ? 'bg-[#0a0a0a]' : 'bg-[#0a0a0a]',",
  },
  {
    label: 'projects chevron button color (no md:white)',
    from: "                      : 'text-[#555555] hover:text-[#0a0a0a] md:text-white/82 md:hover:text-white',",
    to: "                      : 'text-[#555555] hover:text-[#0a0a0a]',",
  },
]);

assertUtf8Content(headerPath, {
  mustInclude: ['\u30e1\u30cb\u30e5\u30fc\u3092\u958b\u304f', '\u30e1\u30a4\u30f3\u30ca\u30d3\u30b2\u30fc\u30b7\u30e7\u30f3'],
});

console.log('OK: fixed Header logo/nav color behavior');

