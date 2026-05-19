import type { Metadata } from 'next';
import ProjectCaseStudyView from '@/components/projects/case-study/ProjectCaseStudyView';
import { RAPTOVA_WEBSITE_PROJECT } from '@/lib/projects/raptova-website-project';

const description =
  'RAPTOVA official website case study. Brand site structure, interaction design, and implementation overview.';

export const metadata: Metadata = {
  title: 'RAPTOVA Official Website | PROJECTS | RAPTOVA',
  description,
  openGraph: {
    title: 'RAPTOVA Official Website | PROJECTS | RAPTOVA',
    description,
    type: 'article',
  },
};

export default function RaptovaWebsitePage() {
  return <ProjectCaseStudyView content={RAPTOVA_WEBSITE_PROJECT} />;
}
