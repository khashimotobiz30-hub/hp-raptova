/**
 * Regenerate app/favicon.ico from public/logos/raptova-icon-favicon.svg
 * Light background (#f2f0e9) — matches apple-touch-icon / site tone.
 * Requires: npm install --no-save sharp to-ico
 * Usage: node scripts/generate-favicon-ico.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
import toIco from 'to-ico';

const svgPath = 'public/logos/raptova-icon-favicon.svg';
const outPath = 'app/favicon.ico';
const sizes = [16, 32, 48];
/** Site background tone — same as generate-apple-touch-icon.mjs */
const BG = { r: 242, g: 240, b: 233 };

const svg = readFileSync(svgPath);

async function renderFaviconPng(size) {
  const iconSize = Math.max(12, Math.round(size * 0.78));
  const iconPng = await sharp(svg, { density: Math.max(144, size * 6) })
    .resize(iconSize, iconSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: BG,
    },
  })
    .composite([{ input: iconPng, gravity: 'center' }])
    .png()
    .toBuffer();
}

const pngBuffers = await Promise.all(sizes.map((size) => renderFaviconPng(size)));
const ico = await toIco(pngBuffers);
writeFileSync(outPath, ico);

console.log(`OK: ${outPath} (${ico.length} bytes, sizes: ${sizes.join(', ')}, bg #f2f0e9)`);
