export type TopProjectCard = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  href: string;
};

/** TOP #projects section and Header case-study dropdown */
export const TOP_PROJECTS: readonly TopProjectCard[] = [
  {
    id: 'raptova-website',
    number: '01',
    title: 'RAPTOVA Official Website',
    category: 'Brand Site / Direction / Web Design',
    description: 'RAPTOVAのブランド・事業・制作実績を、一つの体験として整理した公式サイト。',
    imageSrc: '/images/business/raptova-website.png',
    imageAlt: 'RAPTOVA Official Website project preview',
    imageWidth: 1357,
    imageHeight: 763,
    href: '/projects/raptova-website',
  },
  {
    id: 'questoria',
    number: '02',
    title: 'AI SKILL DIAGNOSIS QUESTORIA',
    category: 'Web Browser App / AI Diagnosis',
    description: 'AI活用力を、目的定義・設計・判断の観点から可視化する診断アプリ。',
    imageSrc: '/images/business/questoria.png',
    imageAlt: 'AI Skill Diagnosis QUESTORIA project preview',
    imageWidth: 1342,
    imageHeight: 755,
    href: '/projects/questoria',
  },
] as const;

export const CASE_STUDY_NAV_LINKS = TOP_PROJECTS.map((project) => ({
  label: project.title,
  href: project.href,
}));
