import { mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

const baseUrl = process.env.SCREENSHOT_BASE_URL ?? 'http://127.0.0.1:3000/';
const out = 'screenshots/header-sp-375x667.png';

mkdirSync('screenshots', { recursive: true });

execSync(
  `npx --yes playwright@1.51.0 screenshot --viewport-size=375,667 --wait-for-timeout=1500 "${baseUrl}" "${out}"`,
  { stdio: 'inherit' },
);

console.log(`OK: ${out}`);
