import AboutPageView from '@/components/about/AboutPageView';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: 'ABOUT | RAPTOVA',
  description: SITE_CONFIG.description,
};

export default function AboutPage() {
  return <AboutPageView />;
}
