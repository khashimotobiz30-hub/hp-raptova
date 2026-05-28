/**
 * Regenerate public/icon.png (512×512) for /icon.png requests.
 * Light background + .R motif — replaces legacy black "R" letter icon.
 * Requires: npm install --no-save sharp
 * Usage: node scripts/generate-icon-png.mjs
 */
import { readFileSync, statSync } from 'node:fs';
import sharp from 'sharp';

const svgPath = 'public/logos/raptova-icon-favicon.svg';
const outPath = 'public/icon.png';
const SIZE = 512;
const BG = { r: 255, g: 255, b: 255 };
const ICON_SIZE = 400;

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
console.log(`Dimensions: ${SIZE}x${SIZE}px, icon ${ICON_SIZE}px, background #ffffff`);
console.log(`File size: ${newSize} bytes${oldSize ? ` (was ${oldSize} bytes)` : ''}`);
