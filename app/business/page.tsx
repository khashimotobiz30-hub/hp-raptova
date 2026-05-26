import BusinessPageView from '@/components/business/BusinessPageView';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: 'BUSINESS | RAPTOVA',
  description: SITE_CONFIG.description,
};

export default function BusinessPage() {
  return <BusinessPageView />;
}
