import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  twitter: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
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
