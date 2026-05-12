import Hero from '@/components/sections/Hero';
import Business from '@/components/sections/Business';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

export default function TopPage() {
  return (
    <>
      <Hero />
      <div className="grid grid-cols-1 xl:grid-cols-[62%_38%]">
        <Business />
        <Projects />
      </div>
      <About />
      <Contact />
    </>
  );
}
