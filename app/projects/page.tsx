import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: 'PROJECTS | RAPTOVA',
  description: SITE_CONFIG.description,
  alternates: {
    canonical: '/#projects',
  },
};

export default function ProjectsPage() {
  redirect('/#projects');
}
