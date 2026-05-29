import IntroMotion from '@/components/home/IntroMotion';
import Hero from '@/components/sections/Hero';
import Business from '@/components/sections/Business';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

export default function TopPage() {
  return (
    <>
      <IntroMotion />
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
