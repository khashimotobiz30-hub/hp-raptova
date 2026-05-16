import BusinessPageView from '@/components/business/BusinessPageView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BUSINESS | RAPTOVA',
  description:
    '採用活動支援、Web・資料制作、業務整理・AI活用。RAPTOVAの事業概要と、課題を整理して実行できる形へ変えるアプローチをご紹介します。',
};

export default function BusinessPage() {
  return <BusinessPageView />;
}
