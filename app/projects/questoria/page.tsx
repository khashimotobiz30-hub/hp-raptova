import type { Metadata } from 'next';
import ProjectCaseStudyView from '@/components/projects/case-study/ProjectCaseStudyView';
import { QUESTORIA_PROJECT } from '@/lib/projects/questoria-project';

const description =
  'AI活用力を診断可能な体験へ。QUESTORIAにおけるコンセプト設計、スキル定義、設問設計、UX/UIディレクション、計測設計までの実績詳細。';

export const metadata: Metadata = {
  title: 'QUESTORIA | PROJECTS | RAPTOVA',
  description,
  openGraph: {
    title: 'QUESTORIA | PROJECTS | RAPTOVA',
    description,
    type: 'article',
  },
};

export default function QuestoriaPage() {
  return <ProjectCaseStudyView content={QUESTORIA_PROJECT} />;
}
