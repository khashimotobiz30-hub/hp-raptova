'use client';

import Link from 'next/link';
import RevealAnimation from '@/components/ui/RevealAnimation';

const PROJECTS = [
  {
    number: '01',
    title: 'RAPTOVA Official Website',
    category: 'Brand Site / Direction / Web Design',
    status: 'VIEW',
    href: '/works/raptova-website',
  },
  {
    number: '02',
    title: 'AI SKILL DIAGNOSIS QUESTORIA',
    category: 'Web Browser App / AI Diagnosis',
    status: 'VIEW',
    href: '/works/questoria',
  },
  {
    number: '03',
    title: 'Recruiting Support Package',
    category: 'LP / Presentation / Copywriting',
    status: 'COMING SOON',
    href: null,
  },
  {
    number: '04',
    title: 'Workflow Design Prototype',
    category: 'AI Workflow / Operation Design',
    status: 'COMING SOON',
    href: null,
  },
] as const;

export default function Projects() {
  return (
    <aside
      id="projects"
      className="w-full bg-[#080808] px-7 py-24 text-white md:px-14 lg:px-16"
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
        <div className="mt-12 divide-y divide-white/14 border-y border-white/14 md:mt-14">
          {PROJECTS.map((project) => {
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
                key={project.number}
                className="py-7 text-white/78 min-[1440px]:grid min-[1440px]:grid-cols-[42px_minmax(0,1fr)_auto] min-[1440px]:gap-5"
              >
                <p className="text-sm tracking-[0.14em] text-white/32">
                  {project.number}
                </p>
                <div className="mt-4 min-[1440px]:mt-0">
                  <h3 className="text-sm font-medium leading-relaxed tracking-[0.08em] text-white/84">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-loose tracking-[0.12em] text-white/40">
                    {project.category}
                  </p>
                </div>
                <div className="mt-5 text-[10px] font-semibold tracking-[0.24em] min-[1440px]:mt-1">
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
