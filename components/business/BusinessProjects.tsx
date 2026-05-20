'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BusinessLabel, SectionReveal, serifStyle } from '@/components/business/shared';

const BODY_LINES = [
  'RAPTOVAがどのように情報を整理し、',
  'Webや資料、サービスとして形にしているのか。',
  '具体的な事例をご覧ください。',
];

const PREVIEW_PROJECTS = [
  {
    src: '/images/business/raptova-website.png',
    title: 'RAPTOVA Official Website',
    alt: 'RAPTOVA Official Website project preview',
    href: '/projects/raptova-website',
  },
  {
    src: '/images/business/questoria.png',
    title: 'AI Skill Diagnosis QUESTORIA',
    alt: 'AI Skill Diagnosis QUESTORIA project preview',
    href: '/projects/questoria',
  },
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
        <SectionReveal>
          <BusinessLabel tone="dark">PROJECTS</BusinessLabel>
        </SectionReveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-start lg:gap-14">
          <div className="min-w-0">
            <SectionReveal delay={0.04}>
              <h2
                id="business-projects-heading"
                className="copy-ja font-serif text-[clamp(26px,3.4vw,40px)] font-medium leading-[1.45] tracking-[0.06em] text-white/[0.94]"
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
                href="/#projects"
                className="group mt-10 inline-flex items-center gap-4 border border-white/35 px-6 py-4 text-[11px] font-semibold tracking-[0.22em] text-white transition hover:bg-white hover:text-zinc-950"
              >
                VIEW PROJECTS
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </SectionReveal>
          </div>

          <div className="min-w-0 pt-3 lg:pt-6">
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:gap-8">
              {PREVIEW_PROJECTS.map((project, index) => (
                <SectionReveal key={project.href} delay={0.06 + index * 0.06}>
                  <Link href={project.href} className="group block min-w-0">
                    <div className="relative aspect-video overflow-hidden bg-[#1a1a1a]">
                      <Image
                        src={project.src}
                        alt={project.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 28vw"
                        className="object-cover object-center opacity-90 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                      />
                      <div
                        className="absolute inset-0 bg-black/20 transition duration-500 group-hover:bg-black/12"
                        aria-hidden
                      />
                    </div>
                    <p className="mt-3 text-[11px] font-medium leading-snug tracking-[0.14em] text-white/52 transition duration-300 group-hover:text-white/78">
                      {project.title}
                    </p>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
