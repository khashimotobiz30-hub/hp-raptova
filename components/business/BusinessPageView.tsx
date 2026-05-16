'use client';

import BusinessHero from '@/components/business/BusinessHero';
import BusinessIntro from '@/components/business/BusinessIntro';
import BusinessAreas from '@/components/business/BusinessAreas';
import BusinessApproach from '@/components/business/BusinessApproach';
import BusinessProjects from '@/components/business/BusinessProjects';
import BusinessContact from '@/components/business/BusinessContact';

export default function BusinessPageView() {
  return (
    <article className="bg-white text-[#0a0a0a]">
      <BusinessHero />
      <BusinessIntro />
      <BusinessAreas />
      <BusinessApproach />
      <BusinessProjects />
      <BusinessContact />
    </article>
  );
}
