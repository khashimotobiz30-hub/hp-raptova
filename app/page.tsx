import Hero from '@/components/sections/Hero';
import Statement from '@/components/sections/Statement';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Works from '@/components/sections/Works';
import Contact from '@/components/sections/Contact';

export default function TopPage() {
  return (
    <>
      <Hero />
      <Statement />
      <About />
      <Services />
      <Works />
      <Contact />
    </>
  );
}
