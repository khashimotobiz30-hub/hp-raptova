import RecruitingPageView from '@/components/business/recruiting/RecruitingPageView';
import { RECRUITING_PAGE_METADATA } from '@/lib/business/recruiting-content';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';
import { OGP_DEFAULT_IMAGE } from '@/lib/og-images';

export const metadata: Metadata = {
  title: RECRUITING_PAGE_METADATA.title,
  description: RECRUITING_PAGE_METADATA.description ?? SITE_CONFIG.description,
  openGraph: {
    title: RECRUITING_PAGE_METADATA.title,
    description: RECRUITING_PAGE_METADATA.description ?? SITE_CONFIG.description,
    type: 'website',
  },
  twitter: {
    title: RECRUITING_PAGE_METADATA.title,
    description: RECRUITING_PAGE_METADATA.description ?? SITE_CONFIG.description,
  },
};

export default function RecruitingPage() {
  return <RecruitingPageView />;
}
