/**
 * Regenerate public/apple-touch-icon.png from public/logos/raptova-icon-favicon.svg
 * Requires: sharp (npm install --no-save sharp)
 * Usage: node scripts/generate-apple-touch-icon.mjs
 */
import { readFileSync, statSync } from 'node:fs';
import sharp from 'sharp';

const svgPath = 'public/logos/raptova-icon-favicon.svg';
const outPath = 'public/apple-touch-icon.png';
const SIZE = 180;
/** Site background tone (#f2f0e9) — light, matches TOP/About sections */
const BG = { r: 242, g: 240, b: 233 };
/** ~22% inset → icon ~140px; keeps dot + R readable on iOS home screen */
const ICON_SIZE = 140;

const svg = readFileSync(svgPath);
let oldSize = 0;
try {
  oldSize = statSync(outPath).size;
} catch {
  // no previous file
}

const iconPng = await sharp(svg, { density: 300 })
  .resize(ICON_SIZE, ICON_SIZE, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: SIZE,
    height: SIZE,
    channels: 3,
    background: BG,
  },
})
  .composite([{ input: iconPng, gravity: 'center' }])
  .png({ compressionLevel: 9, effort: 10 })
  .toFile(outPath);

const newSize = statSync(outPath).size;
console.log(`OK: ${outPath}`);
console.log(`Dimensions: ${SIZE}x${SIZE}px, icon ${ICON_SIZE}px, background #f2f0e9`);
console.log(`File size: ${newSize} bytes${oldSize ? ` (was ${oldSize} bytes)` : ''}`);
