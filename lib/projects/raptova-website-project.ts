import type { CaseStudyContent } from '@/lib/projects/case-study-types';

export const RAPTOVA_WEBSITE_PROJECT = {
  slug: 'raptova-website',
  hero: {
    label: '',
    title: 'RAPTOVA',
    subtitle: 'Official Website',
    tagline: 'Brand Website / Information Design',
    leadLines: ['ブランド・事業・制作実績を、', '一つの体験として整理する。'],
    body:
      'RAPTOVA公式サイトは、\n思想・事業・制作実績・相談導線を整理し、\n初見でも自然に理解できる構造を目指して設計しました。\nブランドサイトとしての空気感を保ちながら、\n情報設計と体験設計の両立を行ったWebサイトです。',
    singleVisual: {
      src: '/images/projects/raptova-website/raptova-website-hero-visual.png',
      alt: 'RAPTOVA official website brand structure and atmosphere',
    },
    visualStyle: 'brand',
  },
  overview: {
    rows: [
      { label: 'Project', value: 'RAPTOVA Official Website' },
      { label: 'Type', value: 'Original Project' },
      { label: 'Experience', value: 'ブランドサイト / コーポレートサイト / UIデザイン' },
      {
        label: 'Design Scope',
        value: '情報設計 / ビジュアル設計 / UI設計 / フロントエンド実装',
      },
      { label: 'Status', value: 'Active' },
      { label: 'Release', value: '2026.05' },
    ],
  },
  background: {
    title: 'Background',
    paragraphs: [
      `RAPTOVAを立ち上げるにあたり、
まず必要だったのは、
「何をするブランドなのか」を明確にすることでした。`,
      `単に制作物をつくるのではなく、
構想や課題を整理し、実行できる形へ落とし込む存在として、
事業領域・制作実績・相談導線を一つのサイトに整理しました。`,
      `この公式サイト自体も、
RAPTOVAの考え方や制作力を示す実績のひとつです。`,
      `AIに任せきりにするのではなく、
人の思考と判断を通して、
伝わる形へ整えていく姿勢を表現しています。`,
    ],
  },
  approach: {
    title: 'Approach',
    items: [
      {
        index: '01',
        title: 'Information Structure',
        body: `事業領域・制作実績・相談導線を整理し、
初見でも迷わず理解できる構造を設計しました。`,
      },
      {
        index: '02',
        title: 'Visual Balance',
        body: `余白・タイポグラフィ・モノトーンの構成で、
静かに信頼感が伝わる表現へ整えました。`,
      },
      {
        index: '03',
        title: 'Content Design',
        body: `抽象的な思想だけで終わらせず、
「何ができるか」が伝わる言葉と順番を設計しました。`,
      },
      {
        index: '04',
        title: 'Implementation',
        body: 'Next.jsを用いて、レスポンシブ表示と更新しやすい構成を両立しました。',
      },
    ],
  },
  output: {
    title: 'Output',
    lead:
      'ブランドの入口から相談導線まで、RAPTOVAの情報が自然に流れる構造へ整理しました。',
    browserShowcase: {
      cards: [
        {
          label: 'TOP',
          imageSrc: '/images/projects/raptova-website/output-top.png',
          imageAlt: 'RAPTOVA公式サイト — TOPページ',
          imageWidth: 1362,
          imageHeight: 766,
        },
        {
          label: 'ABOUT',
          imageSrc: '/images/projects/raptova-website/output-about.png',
          imageAlt: 'RAPTOVA公式サイト — ABOUTページ',
          imageWidth: 1204,
          imageHeight: 677,
        },
        {
          label: 'ORIGIN',
          imageSrc: '/images/projects/raptova-website/output-about2.png',
          imageAlt: 'RAPTOVA公式サイト — ORIGINセクション',
          imageWidth: 1296,
          imageHeight: 729,
        },
        {
          label: 'BUSINESS',
          imageSrc: '/images/projects/raptova-website/output-business.png',
          imageAlt: 'RAPTOVA公式サイト — BUSINESSページ',
          imageWidth: 1200,
          imageHeight: 675,
        },
        {
          label: 'BUSINESS AREAS',
          imageSrc: '/images/projects/raptova-website/output-business2.png',
          imageAlt: 'RAPTOVA公式サイト — BUSINESS AREAS',
          imageWidth: 1295,
          imageHeight: 729,
        },
        {
          label: 'QUESTORIA',
          imageSrc: '/images/projects/raptova-website/output-questoria.png',
          imageAlt: 'RAPTOVA公式サイト — QUESTORIA案件ページ',
          imageWidth: 1342,
          imageHeight: 755,
        },
      ],
    },
    items: [],
    disclaimer:
      '※ 画面は2026年5月時点のものです。今後、内容やデザインは変更される可能性があります。',
    showDisclaimerWithFlow: true,
  },
  detail: {
    title: 'Detail',
    items: [
      {
        icon: 'layers',
        title: 'Information Architecture',
        body: '事業・実績・About・Contactへ自然に進める構成を整理し、迷わず理解できる情報設計を行いました。',
      },
      {
        icon: 'chat',
        title: 'Japanese Typography',
        body: '日本語の改行や余白を調整し、長文でも読み進めやすいタイポグラフィを設計しました。',
      },
      {
        icon: 'compass',
        title: 'Visual Tone',
        body: 'ベージュと黒の対比、余白とラベル表現を統一し、静かな信頼感を整えました。',
      },
      {
        icon: 'split',
        title: 'Motion & Navigation',
        body: 'スクロール表示やHeader挙動、Projects導線を整理し、動きと回遊性を両立しました。',
      },
      {
        icon: 'code',
        title: 'Technical Foundation',
        body: 'Next.js App Router、metadata・OGP・JSON-LDを整備し、更新性と共有性を両立しました。',
      },
    ],
  },
  next: {
    title: 'Next',
    paragraphs: [
      '構想を、実行できる形へ。',
      'RAPTOVAは、情報を整理し、実装まで伴走します。',
    ],
    backLabel: '← Back to Projects',
    backHref: '/projects',
    nextProject: {
      eyebrow: '→ Next Project',
      title: 'AI Skill Diagnosis QUESTORIA',
      href: '/projects/questoria',
    },
    ctaLabel: 'お問い合わせする',
    ctaVariant: 'outline',
  },
} as const satisfies CaseStudyContent;
