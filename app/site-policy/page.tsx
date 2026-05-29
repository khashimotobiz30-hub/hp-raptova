import LegalPolicyView from '@/components/legal/LegalPolicyView';
import { SITE_POLICY_CONTENT } from '@/lib/legal/site-policy-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "SITE POLICY | RAPTOVA",
  description: "RAPTOVA（ラプトーバ）のサイトポリシー・免責事項です。当サイトの利用条件、著作権、成果保証ではないこと等を定めています。",
};

export default function SitePolicyPage() {
  return <LegalPolicyView content={SITE_POLICY_CONTENT} />;
}
