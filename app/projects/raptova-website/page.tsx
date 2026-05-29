import type { Metadata } from 'next';
import ProjectCaseStudyView from '@/components/projects/case-study/ProjectCaseStudyView';
import { RAPTOVA_WEBSITE_PROJECT } from '@/lib/projects/raptova-website-project';
import { SITE_CONFIG } from '@/lib/config';
import { OGP_DEFAULT_IMAGE } from '@/lib/og-images';

export const metadata: Metadata = {
  title: 'RAPTOVA Official Website | PROJECTS | RAPTOVA',
  description: SITE_CONFIG.description,
  openGraph: {
    title: 'RAPTOVA Official Website | PROJECTS | RAPTOVA',
    description: SITE_CONFIG.description,
    type: 'article',
  },
  twitter: {
    title: 'RAPTOVA Official Website | PROJECTS | RAPTOVA',
    description: SITE_CONFIG.description,
  },
};

export default function RaptovaWebsitePage() {
  return <ProjectCaseStudyView content={RAPTOVA_WEBSITE_PROJECT} />;
}
