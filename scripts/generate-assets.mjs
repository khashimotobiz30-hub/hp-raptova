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

// ICO ファイル生成（複数サイズの PNG を ICO コンテナに埋め込む）
function buildIco(entries) {
  // entries: [{ size, buffer }]
  const n = entries.length;
  const dataOffset = 6 + 16 * n;
  const totalSize = dataOffset + entries.reduce((s, e) => s + e.buffer.length, 0);
  const buf = Buffer.alloc(totalSize);

  buf.writeUInt16LE(0, 0);  // reserved
  buf.writeUInt16LE(1, 2);  // type: ICO
  buf.writeUInt16LE(n, 4);  // image count

  let offset = dataOffset;
  entries.forEach(({ size, buffer }, i) => {
    const base = 6 + 16 * i;
    buf.writeUInt8(size >= 256 ? 0 : size, base);      // width
    buf.writeUInt8(size >= 256 ? 0 : size, base + 1);  // height
    buf.writeUInt8(0, base + 2);                        // color count
    buf.writeUInt8(0, base + 3);                        // reserved
    buf.writeUInt16LE(1, base + 4);                     // planes
    buf.writeUInt16LE(32, base + 6);                    // bpp
    buf.writeUInt32LE(buffer.length, base + 8);         // data size
    buf.writeUInt32LE(offset, base + 12);               // data offset
    buffer.copy(buf, offset);
    offset += buffer.length;
  });

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

// -------- Icon SVG factory --------
function iconSvg(size, fontSize) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#0a0a0a"/>
  <text x="50%" y="50%" font-family="Helvetica Neue, Arial, sans-serif"
    font-size="${fontSize}" font-weight="500"
    text-anchor="middle" dominant-baseline="middle" fill="#f5f5f5">R</text>
</svg>`;
}

// -------- Apple Touch Icon SVG (180x180) --------
const APPLE_SVG = iconSvg(180, 80);

async function main() {
  await ensureDir(path.join(ROOT, 'public/images/ogp'));
  await ensureDir(path.join(ROOT, 'public'));

  // OGP PNG
  console.log('Generating OGP PNG...');
  const ogpPng = await svgToPng(OGP_SVG, 1200, 630);
  await writeFile(path.join(ROOT, 'public/images/ogp/ogp-default.png'), ogpPng);
  console.log(`  -> ogp-default.png (${ogpPng.length} bytes)`);

  // Favicon ICO (16x16 + 32x32 + 48x48)
  console.log('Generating favicon.ico (16/32/48)...');
  const [ico16, ico32, ico48] = await Promise.all([
    svgToPng(iconSvg(16, 9),  16, 16),
    svgToPng(iconSvg(32, 18), 32, 32),
    svgToPng(iconSvg(48, 26), 48, 48),
  ]);
  const icoBuffer = buildIco([
    { size: 16, buffer: ico16 },
    { size: 32, buffer: ico32 },
    { size: 48, buffer: ico48 },
  ]);
  await writeFile(path.join(ROOT, 'public/favicon.ico'), icoBuffer);
  console.log(`  -> favicon.ico (${icoBuffer.length} bytes)`);

  // Apple Touch Icon 180x180 PNG
  console.log('Generating apple-touch-icon.png...');
  const applePng = await svgToPng(APPLE_SVG, 180, 180);
  await writeFile(path.join(ROOT, 'public/apple-touch-icon.png'), applePng);
  console.log(`  -> apple-touch-icon.png (${applePng.length} bytes)`);

  // icon.png 512x512 (PWA / manifest)
  console.log('Generating icon.png (512x512)...');
  const iconPng512 = await svgToPng(iconSvg(512, 230), 512, 512);
  await writeFile(path.join(ROOT, 'public/icon.png'), iconPng512);
  console.log(`  -> icon.png (${iconPng512.length} bytes)`);

  console.log('All assets generated successfully.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
