import AboutHero from '@/components/about/AboutHero';
import AboutStatement from '@/components/about/AboutStatement';
import AboutOrigin from '@/components/about/AboutOrigin';
import AboutHowWeWork from '@/components/about/AboutHowWeWork';
import AboutWhatWeSupport from '@/components/about/AboutWhatWeSupport';
import AboutProfile from '@/components/about/AboutProfile';
import Contact from '@/components/sections/Contact';

export default function AboutPageView() {
  return (
    <article className="bg-white text-[#0a0a0a]">
      <AboutHero />
      <AboutStatement />
      <AboutOrigin />
      <AboutHowWeWork />
      <AboutWhatWeSupport />
      <AboutProfile />
      <Contact />
    </article>
  );
}
