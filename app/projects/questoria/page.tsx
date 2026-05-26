import type { Metadata } from 'next';
import ProjectCaseStudyView from '@/components/projects/case-study/ProjectCaseStudyView';
import { QUESTORIA_PROJECT } from '@/lib/projects/questoria-project';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: 'QUESTORIA | PROJECTS | RAPTOVA',
  description: SITE_CONFIG.description,
  openGraph: {
    title: 'QUESTORIA | PROJECTS | RAPTOVA',
    description: SITE_CONFIG.description,
    type: 'article',
  },
  twitter: {
    title: 'QUESTORIA | PROJECTS | RAPTOVA',
    description: SITE_CONFIG.description,
  },
};

export default function QuestoriaPage() {
  return <ProjectCaseStudyView content={QUESTORIA_PROJECT} />;
}
