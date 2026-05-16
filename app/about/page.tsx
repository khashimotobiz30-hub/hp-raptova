import AboutPageView from '@/components/about/AboutPageView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ABOUT | RAPTOVA',
  description:
    'RAPTOVAの思想・原体験・価値観。構想や課題を、実行できる形へ変えていくパートナーとしての姿勢をお伝えします。',
};

export default function AboutPage() {
  return <AboutPageView />;
}
