import type { CaseStudyContent } from '@/lib/works/case-study-types';

export const QUESTORIA_CASE_STUDY = {
  slug: 'questoria',
  hero: {
    label: 'WORKS / PROJECT',
    title: 'QUESTORIA',
    subtitle: 'AI Skill Diagnosis Application',
    leadLines: ['AI活用力という曖昧な概念を、', '診断できる体験へ変える。'],
    body:
      'QUESTORIAは、AIリテラシーを測定するスキル診断体験を提供し、\n個人が自身の現在地を正しく把握できる診断を可能にします。\nゲーム性と診断ロジックの両立により、楽しみながら学び、\n課題と強みを発見するきっかけを創出します。',
    singleVisual: {
      src: '/images/works/questoria/hero-visual-composite.png',
      alt: 'QUESTORIA hero visual',
    },
  },
  overview: {
    rows: [
      { label: 'Project', value: 'AI Skill Diagnosis QUESTORIA' },
      { label: 'Type', value: 'Original Project' },
      { label: 'Category', value: 'AI Diagnosis / Web Application / UX Design' },
      {
        label: 'Role',
        value:
          'Concept Design / Skill Definition / Question Design / UX Design / UI Direction / Analytics Design',
      },
      { label: 'Status', value: 'Completed' },
      { label: 'Year', value: '2025' },
    ],
  },
  background: {
    title: 'Background',
    paragraphs: [
      `AIを使えるとはどういうことか。
人によって、組織によって、その基準は揺らいでいます。
しかし、その曖昧さを「診断可能な形」にすることは、学びの起点であり、改善の第一歩です。`,
      `QUESTORIAは、AI活用力を構成するスキルを定義し、診断可能な形式に分解することで、
誰もが自分の強みや課題を可視化し、次の一歩を踏み出せる体験をつくりました。`,
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
      src: '/images/works/questoria/output-diagnosis-flow-light.png',
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
        iconSrc: '/images/works/questoria/icons/detail-skill-definition.png',
        title: 'Skill Definition',
        body: 'AI活用力を5つの観点に分解し、診断ロジックの基盤を設計しました。',
      },
      {
        icon: 'chat',
        iconSrc: '/images/works/questoria/icons/detail-question-design.png',
        title: 'Question Design',
        body: '行動ベースの設問設計で、バイアスを抑えつつ実態に近い診断を実現しました。',
      },
      {
        icon: 'split',
        iconSrc: '/images/works/questoria/icons/detail-two-step-diagnosis.png',
        title: 'Two-Step Diagnosis',
        body: 'ライトな入口と本診断の二段構成で、離脱を抑えつつ診断精度を高めました。',
      },
      {
        icon: 'link',
        iconSrc: '/images/works/questoria/icons/detail-line-cta.png',
        title: 'LINE CTA',
        body: 'LINE連携で結果閲覧や特典提供を最適化。拡散と再訪を促す導線設計を行いました。',
      },
      {
        icon: 'chart',
        iconSrc: '/images/works/questoria/icons/detail-google-analytics.png',
        title: 'Google Analytics',
        body: 'ユーザー行動を可視化し、継続的な改善サイクルを回せる計測設計を実施しました。',
      },
      {
        icon: 'compass',
        iconSrc: '/images/works/questoria/icons/detail-market-insight.png',
        title: 'Market Insight',
        body: '市場・ユーザーニーズを分析し、診断体験の価値と位置づけを明確化しました。',
      },
    ],
  },
  next: {
    title: 'Next',
    paragraphs: [
      'アイデアを、動く形にしたいときがある。',
      'RAPTOVAは、コンセプト設計から外部デザイン、実装・改善まで伴走します。',
    ],
    backLabel: '← Back to Projects',
    backHref: '/works',
    ctaLabel: 'CONTACT →',
    ctaHref: '/#contact',
  },
} as const satisfies CaseStudyContent;
