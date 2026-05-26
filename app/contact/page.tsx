import ContactPageView from '@/components/contact/ContactPageView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CONTACT | RAPTOVA',
  description:
    'RAPTOVA（ラプトーバ）へのお問い合わせページです。採用・クリエイティブ・業務設計に関するご相談はこちらからお問い合わせください。',
};

export default function ContactPage() {
  return <ContactPageView />;
}
