'use client';

import Link from 'next/link';
import RevealAnimation from '@/components/ui/RevealAnimation';
import { TOP_PROJECTS } from '@/lib/projects/top-projects';

export default function Projects() {
  return (
    <aside
      id="projects"
      className="w-full min-w-0 max-w-full overflow-x-clip bg-[#080808] px-7 py-24 text-white md:px-14 lg:px-10 lg:py-16 xl:px-12 xl:py-20 min-[1440px]:px-16 min-[1440px]:py-24"
      aria-labelledby="projects-heading"
    >
      <RevealAnimation>
        <p
          id="projects-heading"
          className="text-[10px] font-semibold tracking-[0.42em] text-white/34"
        >
          PROJECTS
        </p>
      </RevealAnimation>

      <RevealAnimation delay={0.1}>
        <div className="mt-10 min-w-0 divide-y divide-white/14 border-y border-white/14 lg:mt-11 min-[1440px]:mt-14">
          {TOP_PROJECTS.map((project) => {
            const statusClass =
              project.status === 'VIEW'
                ? 'group inline-flex items-center gap-2 text-white/82 transition hover:text-white'
                : 'text-white/34';
            const status = project.href ? (
              <Link href={project.href} className={statusClass}>
                {project.status}
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            ) : (
              <span className={statusClass}>{project.status}</span>
            );

            return (
              <article
                key={project.id}
                className="min-w-0 py-6 text-white/78 lg:grid lg:grid-cols-[36px_minmax(0,1fr)_auto] lg:items-start lg:gap-4 lg:py-5 xl:gap-5 min-[1440px]:grid-cols-[42px_minmax(0,1fr)_auto] min-[1440px]:gap-5 min-[1440px]:py-7"
              >
                <p className="text-sm tracking-[0.14em] text-white/32">
                  {project.number}
                </p>
                <div className="mt-4 min-w-0 lg:mt-0">
                  <h3 className="text-[13px] font-medium leading-relaxed tracking-[0.08em] text-white/84 lg:text-sm min-[1440px]:text-sm">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-loose tracking-[0.12em] text-white/40">
                    {project.category}
                  </p>
                </div>
                <div className="mt-5 text-[10px] font-semibold tracking-[0.22em] lg:mt-1 lg:tracking-[0.24em]">
                  {status}
                </div>
              </article>
            );
          })}
        </div>
      </RevealAnimation>
    </aside>
  );
}
