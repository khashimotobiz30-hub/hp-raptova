/**
 * sharp を使って OGP PNG (ogp-default.png) を生成するスクリプト
 * 実行: node scripts/generate-assets.mjs
 */
import sharp from 'sharp';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ディレクトリ確保
async function ensureDir(dir) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

// SVG テキストを PNG バッファに変換
async function svgToPng(svgStr, width, height) {
  return sharp(Buffer.from(svgStr))
    .resize(width, height)
    .png()
    .toBuffer();
}

// -------- OGP PNG (1200x630) --------
const OGP_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="2" y="2" width="1196" height="626" fill="none" stroke="#e5e5e5" stroke-width="2"/>

  <!-- dot grid -->
  <defs>
    <pattern id="g" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
      <circle cx="24" cy="24" r="1" fill="#dddddd"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#g)" opacity="0.6"/>

  <!-- RAPTOVA -->
  <text x="80" y="210" font-family="Helvetica Neue, Arial, sans-serif"
    font-size="13" font-weight="400" letter-spacing="10" fill="#aaaaaa">RAPTOVA</text>

  <!-- tagline EN (main for OGP) -->
  <text x="80" y="330" font-family="Helvetica Neue, Arial, sans-serif"
    font-size="58" font-weight="500" letter-spacing="2" fill="#0a0a0a">Evolve Your Reality.</text>

  <!-- tagline JA as latin fallback -->
  <text x="80" y="395" font-family="Helvetica Neue, Arial, sans-serif"
    font-size="22" font-weight="300" letter-spacing="2" fill="#8a8a8a">
    Shaping thought into reality with AI.
  </text>

  <line x1="80" y1="475" x2="340" y2="475" stroke="#e5e5e5" stroke-width="1"/>
</svg>`;

async function main() {
  await ensureDir(path.join(ROOT, 'public/images/ogp'));

  // OGP PNG
  console.log('Generating OGP PNG...');
  const ogpPng = await svgToPng(OGP_SVG, 1200, 630);
  await writeFile(path.join(ROOT, 'public/images/ogp/ogp-default.png'), ogpPng);
  console.log(`  -> ogp-default.png (${ogpPng.length} bytes)`);

  console.log(
    'Icon assets: run generate-favicon-ico.mjs, generate-apple-touch-icon.mjs, generate-icon-png.mjs',
  );
  console.log('OGP asset generated successfully.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
