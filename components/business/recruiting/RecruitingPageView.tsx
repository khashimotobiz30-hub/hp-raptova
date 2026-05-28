import RecruitingHero from '@/components/business/recruiting/RecruitingHero';
import RecruitingMainSupport from '@/components/business/recruiting/RecruitingMainSupport';
import RecruitingCommonIssues from '@/components/business/recruiting/RecruitingCommonIssues';
import RecruitingApproach from '@/components/business/recruiting/RecruitingApproach';
import RecruitingProjects from '@/components/business/recruiting/RecruitingProjects';

export default function RecruitingPageView() {
  return (
    <article className="bg-white text-[#0a0a0a]">
      <RecruitingHero />
      <RecruitingCommonIssues />
      <RecruitingMainSupport />
      <RecruitingApproach />
      <RecruitingProjects />
    </article>
  );
}
