import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RAPTOVA | 構想を、実行できる形へ。',
  description: 'RAPTOVAは、採用・クリエイティブ・業務設計の領域で、構想や課題を整理し、Web・資料・AI活用などの実行可能なアウトプットへ変えていきます。',
  openGraph: {
    title: 'RAPTOVA | 構想を、実行できる形へ。',
    description: 'RAPTOVAは、採用・クリエイティブ・業務設計の領域で、構想や課題を整理し、Web・資料・AI活用などの実行可能なアウトプットへ変えていきます。',
  },
  twitter: {
    title: 'RAPTOVA | 構想を、実行できる形へ。',
    description: 'RAPTOVAは、採用・クリエイティブ・業務設計の領域で、構想や課題を整理し、Web・資料・AI活用などの実行可能なアウトプットへ変えていきます。',
  },
};

import Hero from '@/components/sections/Hero';
import Business from '@/components/sections/Business';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

export default function TopPage() {
  return (
    <>
      <Hero />
      <div className="top-page-split grid w-full min-w-0 max-w-full grid-cols-1 overflow-x-clip">
        <Business />
        <Projects />
      </div>
      <About />
      <Contact />
    </>
  );
}
