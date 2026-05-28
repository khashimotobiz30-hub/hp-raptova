'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RECRUITING_PROJECTS } from '@/lib/business/recruiting-content';
import { BUSINESS_PAGE_CONTAINER_CLASS, SectionReveal, serifStyle } from '@/components/business/shared';

export default function RecruitingProjects() {
  const { heading, bodyLines, items } = RECRUITING_PROJECTS;

  return (
    <section
      className="border-t border-black/[0.12] border-b border-black/[0.08] bg-[#f2f0e9] text-[#0a0a0a]"
      aria-labelledby="recruiting-projects-heading"
    >
      <div className={`${BUSINESS_PAGE_CONTAINER_CLASS} pt-10 pb-14 md:pt-12 md:pb-16 lg:pt-14 lg:pb-16 xl:pb-20`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,18.5rem)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] xl:gap-12">
          <div className="min-w-0 lg:max-w-[20rem]">
            <SectionReveal delay={0.04}>
              <h2
                id="recruiting-projects-heading"
                className="copy-ja font-serif text-[clamp(24px,3.2vw,38px)] font-medium leading-[1.45] tracking-[0.04em] text-[#0a0a0a]"
                style={serifStyle}
              >
                {heading}
              </h2>
              <p className="copy-ja mt-5 text-[13px] leading-[1.9] tracking-[0.02em] text-black/[0.58] md:text-sm">
                {bodyLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </SectionReveal>
          </div>

          <div className="min-w-0">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-7">
              {items.map((project, index) => (
                <SectionReveal key={project.href} delay={0.06 + index * 0.06}>
                  <Link
                    href={project.href}
                    className="group block min-w-0 cursor-pointer rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/35"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-[#eceae4] sm:aspect-[5/3] lg:min-h-[11.5rem] lg:aspect-auto xl:min-h-[12.5rem]">
                      <Image
                        src={project.src}
                        alt={project.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 36vw"
                        className="object-contain object-center brightness-[0.92] transition duration-500 ease-out group-hover:brightness-100 sm:object-cover sm:group-hover:scale-[1.01]"
                      />
                    </div>
                    <p className="mt-2.5 flex items-center gap-2 text-[11px] font-medium leading-snug tracking-[0.06em] text-black/55 transition duration-300 group-hover:text-black/85 md:mt-3">
                      <span>{project.title}</span>
                      <span
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden
                      >
                        →
                      </span>
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
