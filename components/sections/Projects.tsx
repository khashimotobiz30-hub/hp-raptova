'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BusinessLabel, SectionReveal } from '@/components/business/shared';
import { TOP_PROJECTS } from '@/lib/projects/top-projects';

export default function Projects() {
  return (
    <aside
      id="projects"
      className="relative w-full min-w-0 max-w-full overflow-x-clip bg-[#080808] text-white"
      aria-labelledby="projects-heading"
    >
      <div className="absolute inset-0 bg-[#070707]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" aria-hidden />
      <div className="relative px-7 py-24 md:px-14 lg:px-10 lg:py-16 xl:px-12 xl:py-20 min-[1440px]:px-14 min-[1440px]:py-24">
        <SectionReveal>
          <p id="projects-heading" className="sr-only">
            Selected projects
          </p>
          <BusinessLabel tone="dark">SELECTED PROJECTS</BusinessLabel>
        </SectionReveal>

        <div className="mt-6 flex min-w-0 flex-col lg:mt-7">
          {TOP_PROJECTS.map((project, index) => (
            <SectionReveal key={project.id} delay={0.06 + index * 0.06}>
              <article
                className={[
                  'min-w-0',
                  index === 0 ? 'pb-0' : 'mt-8 border-t border-white/14 pt-8 lg:mt-9 lg:pt-9 min-[1440px]:mt-10 min-[1440px]:pt-10',
                ].join(' ')}
              >
                <Link
                  href={project.href}
                  className="group grid min-w-0 grid-cols-[auto_1fr] gap-x-3 gap-y-2 transition-colors duration-300 hover:bg-white/[0.03]"
                >
                  <span className="shrink-0 text-[15px] tracking-[0.14em] text-white/40 transition-colors duration-300 group-hover:text-white/60">
                    {project.number}
                  </span>
                  <h3 className="min-w-0 text-[15px] font-semibold leading-snug tracking-[0.12em] text-white/92 transition-colors duration-300 group-hover:text-white">
                    {project.title}
                  </h3>

                  <div className="relative col-start-2 w-[60%] max-w-full overflow-hidden bg-[#1a1a1a] ring-0 ring-white/0 transition duration-500 group-hover:ring-1 group-hover:ring-white/25">
                    <Image
                      src={project.imageSrc}
                      alt={project.imageAlt}
                      width={project.imageWidth}
                      height={project.imageHeight}
                      sizes="(max-width: 1023px) 60vw, 23vw"
                      className="block h-auto w-full brightness-[0.92] transition duration-500 group-hover:brightness-100"
                    />
                  </div>

                  <p className="copy-ja col-start-2 mt-1 text-[11px] leading-[1.8] tracking-[0.06em] text-white/58 lg:text-[12px]">
                    {project.description}
                  </p>
                  <p className="col-start-2 mt-2 text-[9px] font-semibold tracking-[0.22em] text-white/78 transition-colors duration-300 group-hover:text-white lg:text-[10px]">
                    VIEW MORE{' '}
                    <span
                      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </p>
                </Link>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </aside>
  );
}
