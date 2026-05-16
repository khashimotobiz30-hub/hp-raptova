'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BusinessLabel, SectionReveal, serifStyle } from '@/components/business/shared';

const BODY_LINES = [
  'RAPTOVAがどのように情報を整理し、',
  'Webや資料、サービスとして形にしているのか。',
  '具体的な事例をご覧ください。',
];

const PREVIEW_IMAGES = [
  { src: '/images/projects/raptova-website-work-visual.png', alt: '' },
  { src: '/images/projects/questoria-work-visual.png', alt: '' },
  { src: '/images/business/business-system-abstract.png', alt: '' },
] as const;

export default function BusinessProjects() {
  return (
    <section
      className="relative overflow-hidden border-b border-white/10 bg-[#080808] text-white"
      aria-labelledby="business-projects-heading"
    >
      <div className="absolute inset-0 bg-[#070707]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-7 py-20 md:px-14 md:py-24 lg:px-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-end lg:gap-14">
          <div className="min-w-0">
            <SectionReveal>
              <BusinessLabel tone="dark">PROJECTS</BusinessLabel>
              <h2
                id="business-projects-heading"
                className="copy-ja mt-8 font-serif text-[clamp(26px,3.4vw,40px)] font-medium leading-[1.45] tracking-[0.06em] text-white/[0.94]"
                style={serifStyle}
              >
                実際の取り組みを見る。
              </h2>
              <p className="copy-ja mt-8 max-w-md text-[13px] leading-[2.05] tracking-[0.08em] text-white/[0.55] md:text-sm">
                {BODY_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <Link
                href="/projects"
                className="group mt-10 inline-flex items-center gap-4 border border-white/35 px-6 py-4 text-[11px] font-semibold tracking-[0.22em] text-white transition hover:bg-white hover:text-zinc-950"
              >
                VIEW PROJECTS
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </SectionReveal>
          </div>
          <div className="min-w-0">
            <div className="grid gap-3 sm:grid-cols-3">
              {PREVIEW_IMAGES.map((img, index) => (
                <SectionReveal key={img.src} delay={0.06 + index * 0.05}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 22vw"
                      className="object-cover object-center grayscale opacity-85"
                    />
                    <div className="absolute inset-0 bg-black/25" aria-hidden />
                  </div>
                </SectionReveal>
              ))}
            </div>
            <SectionReveal delay={0.2} className="mt-8 flex justify-end">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-4 text-[11px] font-semibold tracking-[0.24em] text-white/55 transition hover:text-white"
              >
                <span className="h-px w-8 bg-white/40 transition-all group-hover:w-12 group-hover:bg-white" />
                すべてのプロジェクトを見る →
              </Link>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
