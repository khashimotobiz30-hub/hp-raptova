import ComingSoon from '@/components/ui/ComingSoon';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: 'AI SNS OPERATION SYSTEM | RAPTOVA',
  description: SITE_CONFIG.description,
};

export default function AiSnsOperationPage() {
  return <ComingSoon />;
}
