import LegalPolicyView from '@/components/legal/LegalPolicyView';
import { PRIVACY_POLICY_CONTENT } from '@/lib/legal/privacy-policy-content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "PRIVACY POLICY | RAPTOVA",
  description: "RAPTOVA（ラプトーバ）のプライバシーポリシーです。お問い合わせ、営業、商談、受託業務における個人情報の取扱いについて定めています。",
};

export default function PrivacyPage() {
  return <LegalPolicyView content={PRIVACY_POLICY_CONTENT} />;
}
