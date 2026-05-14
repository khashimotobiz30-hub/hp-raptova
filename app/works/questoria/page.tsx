import type { Metadata } from 'next';
import WorkCaseStudyView from '@/components/works/case-study/WorkCaseStudyView';
import { QUESTORIA_CASE_STUDY } from '@/lib/works/questoria-case-study';

const description =
  'AI活用力を診断可能な体験へ。QUESTORIAにおけるコンセプト設計、スキル定義、設問設計、UX/UIディレクション、計測設計までの実績詳細。';

export const metadata: Metadata = {
  title: 'QUESTORIA | WORKS | RAPTOVA',
  description,
  openGraph: {
    title: 'QUESTORIA | WORKS | RAPTOVA',
    description,
    type: 'article',
  },
};

export default function QuestoriaPage() {
  return <WorkCaseStudyView content={QUESTORIA_CASE_STUDY} />;
}
