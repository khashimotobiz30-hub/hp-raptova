import { readFileSync, writeFileSync } from 'node:fs';

const path = 'components/about/AboutStatement.tsx';
let file = readFileSync(path, 'utf8');

file = file.replace(
  `'text-[clamp(12px,calc((min(100vw,34rem)-3.5rem)/23.5),26px)]',`,
  `'max-md:text-[clamp(12px,calc((min(100vw,34rem)-3.5rem)/23.5),17px)] md:text-[clamp(18px,2.4vw,26px)]',`,
);

file = file.replace(
  `className="block w-max max-w-none whitespace-nowrap"`,
  `className="block w-max max-w-none whitespace-nowrap md:w-auto md:whitespace-normal"`,
);

if (!file.includes('md:text-[clamp(18px,2.4vw,26px)]')) {
  throw new Error('PC font size not applied');
}

writeFileSync(path, file, 'utf8');
console.log(`OK: ${path}`);
