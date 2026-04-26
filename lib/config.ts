export const SITE_CONFIG = {
  url: 'https://raptova.com', // 公開ドメイン確定後に更新
  email: 'k.hashimoto.biz30@gmail.com',
  twitter: '@hako_freework30',
  twitterUrl: 'https://x.com/hako_freework30',
  taglineJa: '思考を、次の現実へ。',
  taglineEn: 'Evolve Your Reality.',
  siteName: 'RAPTOVA',
  title: 'RAPTOVA | 思考を、次の現実へ。',
  description:
    'RAPTOVAは、AIを活用してアイデアの整理、設計、実装、改善までを一貫して支援し、個人や組織の構想を現実に動かせる状態へ導きます。',
  ogDescription:
    'AIと実装の力で、まだ形になっていない可能性を、使われる仕組みへ。',
} as const;

export const MAILTO_HREF = `mailto:${SITE_CONFIG.email}?subject=RAPTOVA%E3%81%B8%E3%81%AE%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B&body=%E3%81%8A%E5%90%8D%E5%89%8D%EF%BC%9A%0D%0A%0D%0A%E3%81%94%E7%9B%B8%E8%AB%87%E5%86%85%E5%AE%B9%EF%BC%9A%0D%0A`;

export const WORKS_ITEMS = [
  {
    id: 'questoria',
    number: '01',
    titleEn: 'QUESTORIA',
    titleJa: 'AIスキル診断アプリ',
    description:
      'AI活用力をタイプ別に可視化し、\nユーザーごとに次の行動を提示する診断プロダクト。',
    tags: ['#AI Diagnosis', '#Web App', '#UX Design'],
    href: '/works/questoria',
    thumbnail: '/images/works/questoria-thumbnail.svg',
  },
  {
    id: 'raptova-website',
    number: '02',
    titleEn: 'RAPTOVA OFFICIAL WEBSITE',
    titleJa: 'ブランドサイト / インタラクティブWebサイト',
    description:
      '粒子によるインタラクション、NOVAによる対話型Contact UIを備えた、\nRAPTOVAの思想と技術力を体現する公式Webサイト。',
    tags: ['#Brand Site', '#Interaction Design', '#Web Experience'],
    href: '/works/raptova-website',
    thumbnail: '/images/works/raptova-website-thumbnail.svg',
  },
  {
    id: 'ai-sns-operation',
    number: '03',
    titleEn: 'AI SNS OPERATION SYSTEM',
    titleJa: 'AI活用型SNS運用支援',
    description:
      '投稿企画、文章生成、改善提案を通じて、\n個人の発信活動を継続可能な仕組みへと整える運用支援システム。',
    tags: ['#AI Writing', '#SNS Operation', '#Workflow'],
    href: '/works/ai-sns-operation',
    thumbnail: '/images/works/ai-sns-operation-thumbnail.svg',
  },
] as const;

export const SERVICES_ITEMS = [
  {
    number: '01',
    titleEn: 'AI PRODUCT DEVELOPMENT',
    titleJa: 'AIプロダクト開発支援',
    description:
      '診断アプリ、チャットボット、業務支援ツール、Webアプリなど、\nアイデアを実際に使えるプロダクトへと落とし込みます。',
  },
  {
    number: '02',
    titleEn: 'AI CONSULTING & DESIGN',
    titleJa: 'AI活用設計・コンサルティング',
    description:
      '事業、業務、発信、サービス設計の中に、\nAIをどのように組み込むべきかを整理し、実行可能な形へ導きます。',
  },
  {
    number: '03',
    titleEn: 'AI SKILL EXPANSION',
    titleJa: 'AIスキル拡張・講座',
    description:
      '個人やチームがAIを使いこなし、\n自分たちの思考やアイデアを形にできる状態をつくります。',
  },
] as const;
