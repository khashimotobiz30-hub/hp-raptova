export type TopProjectListItem = {
  id: string;
  number: string;
  title: string;
  category: string;
  status: 'VIEW' | 'COMING SOON';
  href: string | null;
};

/** TOP #projects section and nav dropdown — single source of truth */
export const TOP_PROJECTS: readonly TopProjectListItem[] = [
  {
    id: 'raptova-website',
    number: '01',
    title: 'RAPTOVA Official Website',
    category: 'Brand Site / Direction / Web Design',
    status: 'VIEW',
    href: '/projects/raptova-website',
  },
  {
    id: 'questoria',
    number: '02',
    title: 'AI SKILL DIAGNOSIS QUESTORIA',
    category: 'Web Browser App / AI Diagnosis',
    status: 'VIEW',
    href: '/projects/questoria',
  },
  {
    id: 'recruiting-support',
    number: '03',
    title: 'Recruiting Support Package',
    category: 'LP / Presentation / Copywriting',
    status: 'COMING SOON',
    href: null,
  },
  {
    id: 'workflow-design',
    number: '04',
    title: 'Workflow Design Prototype',
    category: 'AI Workflow / Operation Design',
    status: 'COMING SOON',
    href: null,
  },
] as const;

export const CASE_STUDY_NAV_LINKS = TOP_PROJECTS.filter(
  (project): project is TopProjectListItem & { href: string } =>
    project.status === 'VIEW' && project.href !== null,
).map((project) => ({
  label: project.title,
  href: project.href,
}));
