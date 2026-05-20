import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'PROJECTS | RAPTOVA',
  description:
    'RAPTOVAの制作実績。ブランドサイト、AI診断アプリ、Web体験設計などのプロジェクト一覧。',
  alternates: {
    canonical: '/#projects',
  },
};

export default function ProjectsPage() {
  redirect('/#projects');
}
