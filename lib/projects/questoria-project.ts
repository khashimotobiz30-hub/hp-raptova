import type { CaseStudyContent } from '@/lib/projects/case-study-types';

export const QUESTORIA_PROJECT = {
  slug: 'questoria',
  hero: {
    label: '',
    title: 'QUESTORIA',
    subtitle: 'AI Skill Diagnosis Application',
    leadLines: ['AI活用力という曖昧な概念を、', '診断できる体験へ変える。'],
    body:
      'QUESTORIAは、\nAI活用に必要なスキルを質問形式で可視化し、\n自分の強みや課題を把握できる診断コンテンツです。\nゲームのように進められる体験設計により、\n楽しみながらAI活用の現在地を理解できる構成にしました。',
    singleVisual: {
      src: '/images/projects/questoria/hero-visual-composite.png',
      alt: 'QUESTORIA hero visual',
      href: 'https://questoria.raptova.com/',
    },
  },
  overview: {
    rows: [
      { label: 'Project', value: 'AI Skill Diagnosis QUESTORIA', href: 'https://questoria.raptova.com/' },
      { label: 'Type', value: 'Original Project' },
      { label: 'Experience', value: 'AI診断 / Webアプリケーション / UX設計' },
      {
        label: 'Design Scope',
        value: 'コンセプト設計 / 質問設計 / UX/UI設計 / 分析設計',
      },
      { label: 'Status', value: 'Completed' },
      { label: 'Release', value: '2026.05' },
    ],
  },
  background: {
    title: 'Background',
    paragraphs: [
      `AIが当たり前に使われる時代において、
差が生まれるのは、どれだけ知っているかではありません。

目的を定め、情報を整理し、AIに任せる部分と
自分で判断する部分を見極めながら進められるか。

その違いは、仕事の進め方や学び方に
大きく影響していくと考えました。`,
      `QUESTORIAは、AI活用に必要な力を
「目的定義力」「設計力」「判断力」の3つのスキル軸に整理し、
自分の現在地を診断できる体験として設計したアプリです。`,
      `知識問題ではなく、実際の場面でどう考え、どう進めるかを見ることで、
AIをより深く活用するために、次に何を磨くべきかが見えるきっかけをつくりました。`,
    ],
  },
  approach: {
    title: 'Approach',
    items: [
      {
        index: '01',
        title: 'Skill Definition',
        body: 'AI活用力を構成するスキルを定義し、診断可能な形に構造化しました。',
      },
      {
        index: '02',
        title: 'Question Design',
        body: 'スキルを正しく測るために、行動ベースの設問を設計。答えやすい体験設計にこだわりました。',
      },
      {
        index: '03',
        title: 'Two-Step Diagnosis',
        body: 'ライトな入口で参加のハードルを下げ、本診断でスキルレベルを可視化。二段構成で精度と体験を両立しました。',
      },
      {
        index: '04',
        title: 'SNS-Oriented Experience',
        body: '結果をシェアしやすく、会話が生まれる設計に。LINE連携で、継続的にリーチできる導線を設計しました。',
      },
    ],
  },
  output: {
    title: 'Output',
    flowImage: {
      src: '/images/projects/questoria/output-diagnosis-flow-light.png',
      alt: 'QUESTORIA 診断体験フロー（診断開始からLINE特典案内まで）',
    },
    items: [],
    disclaimer: '※ 画面デザイン・内容は開発中のものを含みます。',
  },
  detail: {
    title: 'Detail',
    items: [
      {
        icon: 'layers',
        iconSrc: '/images/projects/questoria/icons/detail-skill-definition.png',
        title: 'Skill Definition',
        body: 'AI活用力を3つの観点に分解し、診断ロジックの基盤を設計しました。',
      },
      {
        icon: 'chat',
        iconSrc: '/images/projects/questoria/icons/detail-question-design.png',
        title: 'Question Design',
        body: '行動ベースの設問設計で、バイアスを抑えつつ実態に近い診断を実現しました。',
      },
      {
        icon: 'split',
        iconSrc: '/images/projects/questoria/icons/detail-two-step-diagnosis.png',
        title: 'Two-Step Diagnosis',
        body: 'ライトな入口と本診断の二段構成で、離脱を抑えつつ診断精度を高めました。',
      },
      {
        icon: 'link',
        iconSrc: '/images/projects/questoria/icons/detail-line-cta.png',
        title: 'LINE CTA',
        body: 'LINE連携で結果閲覧や特典提供を最適化。拡散と再訪を促す導線設計を行いました。',
      },
      {
        icon: 'chart',
        iconSrc: '/images/projects/questoria/icons/detail-google-analytics.png',
        title: 'Google Analytics',
        body: 'ユーザー行動を可視化し、継続的な改善サイクルを回せる計測設計を実施しました。',
      },
      {
        icon: 'compass',
        iconSrc: '/images/projects/questoria/icons/detail-market-insight.png',
        title: 'Market Insight',
        body: '市場・ユーザーニーズを分析し、診断体験の価値と位置づけを明確化しました。',
      },
    ],
  },
  next: {
    title: 'Next',
    paragraphs: [
      '構想を、伝わる体験へ。',
      'RAPTOVAは、コンセプト設計からUX設計、実装・改善まで伴走します。',
    ],
    backLabel: '← Back to Projects',
    backHref: '/projects',
    previousProject: {
      eyebrow: '← Previous Project',
      title: 'RAPTOVA Official Website',
      href: '/projects/raptova-website',
    },
    ctaLabel: 'CONTACT →',
    ctaHref: '/#contact',
    ctaVariant: 'outline',
  },
} as const satisfies CaseStudyContent;
