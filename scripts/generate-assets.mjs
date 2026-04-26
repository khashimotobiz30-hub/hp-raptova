/**
 * sharp を使って OGP PNG / favicon.ico / apple-touch-icon.png を生成するスクリプト
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

// ICO ファイル生成（PNG を ICO コンテナに埋め込む方式）
function wrapPngInIco(pngBuffer) {
  const numImages = 1;
  const dataOffset = 6 + 16 * numImages; // ICO header (6) + directory entry (16)
  const pngSize = pngBuffer.length;

  const buf = Buffer.alloc(dataOffset + pngSize);

  // ICO Header
  buf.writeUInt16LE(0, 0);        // reserved
  buf.writeUInt16LE(1, 2);        // type: ICO
  buf.writeUInt16LE(numImages, 4); // count

  // Directory entry (16 bytes)
  buf.writeUInt8(32, 6);          // width (0 = 256)
  buf.writeUInt8(32, 7);          // height
  buf.writeUInt8(0, 8);           // color count (0 = 256+)
  buf.writeUInt8(0, 9);           // reserved
  buf.writeUInt16LE(1, 10);       // color planes
  buf.writeUInt16LE(32, 12);      // bits per pixel
  buf.writeUInt32LE(pngSize, 14); // image data size
  buf.writeUInt32LE(dataOffset, 18); // offset

  pngBuffer.copy(buf, dataOffset);
  return buf;
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

// -------- Favicon / Icon SVG (32x32) --------
const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#0a0a0a"/>
  <text x="16" y="22" font-family="Helvetica Neue, Arial, sans-serif"
    font-size="18" font-weight="500" text-anchor="middle" fill="#ffffff">R</text>
</svg>`;

// -------- Apple Touch Icon SVG (180x180) --------
const APPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="40" fill="#0a0a0a"/>
  <text x="90" y="118" font-family="Helvetica Neue, Arial, sans-serif"
    font-size="100" font-weight="500" text-anchor="middle" fill="#ffffff">R</text>
</svg>`;

async function main() {
  await ensureDir(path.join(ROOT, 'public/images/ogp'));
  await ensureDir(path.join(ROOT, 'public'));

  // OGP PNG
  console.log('Generating OGP PNG...');
  const ogpPng = await svgToPng(OGP_SVG, 1200, 630);
  await writeFile(path.join(ROOT, 'public/images/ogp/ogp-default.png'), ogpPng);
  console.log(`  -> ogp-default.png (${ogpPng.length} bytes)`);

  // Favicon 32x32 PNG → ICO
  console.log('Generating favicon.ico...');
  const iconPng32 = await svgToPng(ICON_SVG, 32, 32);
  const icoBuffer = wrapPngInIco(iconPng32);
  await writeFile(path.join(ROOT, 'public/favicon.ico'), icoBuffer);
  console.log(`  -> favicon.ico (${icoBuffer.length} bytes)`);

  // Apple Touch Icon 180x180 PNG
  console.log('Generating apple-touch-icon.png...');
  const applePng = await svgToPng(APPLE_SVG, 180, 180);
  await writeFile(path.join(ROOT, 'public/apple-touch-icon.png'), applePng);
  console.log(`  -> apple-touch-icon.png (${applePng.length} bytes)`);

  // icon.png 512x512 (PWA)
  console.log('Generating icon.png (512x512)...');
  const ICON_SVG_512 = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <rect width="512" height="512" fill="#0a0a0a"/>
    <text x="256" y="330" font-family="Helvetica Neue, Arial, sans-serif"
      font-size="280" font-weight="500" text-anchor="middle" fill="#ffffff">R</text>
  </svg>`;
  const iconPng512 = await svgToPng(ICON_SVG_512, 512, 512);
  await writeFile(path.join(ROOT, 'public/icon.png'), iconPng512);
  console.log(`  -> icon.png (${iconPng512.length} bytes)`);

  console.log('All assets generated successfully.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
