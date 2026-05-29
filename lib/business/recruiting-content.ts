export type RecruitingImage = {
  src: string;
  alt: string;
};

export const RECRUITING_HERO = {
  label: '採用活動を、戦略から成果へ。',
  titleLines: ['企業の魅力を言語化し、', '人が集まる仕組みを作る。'] as const,
  bodyLines: [
    '採用コンセプト設計から、求人原稿・採用サイト・説明資料まで。',
    '一貫した支援で、企業の採用活動を成功に導きます。',
  ] as const,
  image: {
    src: '/images/business/recruiting/recruiting-hero.webp',
    alt: '打ち合わせの様子。PCと資料が写る写真',
  } satisfies RecruitingImage,
  ctas: {
    downloadLabel: 'サービス資料を受け取る',
    downloadHref: 'https://forms.gle/4ti3dSFKac4mm1Yv7',
    consultLabel: '無料で相談する',
    consultHref: '/contact',
  } as const,
};

export const RECRUITING_COMMON_ISSUES = {
  title: '採用でよくある課題',
  body: '採用に関わる情報を整理し、応募者に伝わる形へ整えます。',
  items: [
    {
      id: 'charm',
      icon: 'charm',
      title: '魅力が伝わらない',
      body: '会社の強みや仕事の魅力があっても、応募者に伝わる言葉になっていない。',
    },
    {
      id: 'job-posting',
      icon: 'job-posting',
      title: '求人原稿が条件だけ',
      body: '給与や条件は書かれていても、応募する理由や仕事の面白さが伝わらない。',
    },
    {
      id: 'materials',
      icon: 'materials',
      title: '採用ページ・資料が不足',
      body: '会社理解を深める情報が少なく、応募前後の判断材料が足りていない。',
    },
    {
      id: 'funnel',
      icon: 'funnel',
      title: '応募までの導線が弱い',
      body: '求人媒体・採用LP・メールなどがつながらず、応募者の流れが途切れやすい。',
    },
  ] as const,
} as const;

export const RECRUITING_MAIN_SUPPORT = {
  title: '主な採用支援サービス',
  body: '採用に必要な情報を整理し、応募者に伝わる形へ整えます。',
  items: [
    {
      id: 'concept',
      title: '採用コンセプト整理',
      description:
        '採用ターゲット、自社の魅力、求める人物像、採用活動の軸となるメッセージを整理します。',
      tags: [
        'ターゲット整理',
        '魅力整理',
        '求める人物像',
        '採用メッセージ',
      ],
      image: {
        src: '/images/business/recruiting/main-support-concept.webp',
        alt: '採用コンセプト整理シートと採用方針をまとめた資料',
      },
    },
    {
      id: 'job-posting',
      title: '求人原稿の整備',
      description:
        '仕事内容や魅力を、応募者目線で伝わる求人原稿へ整えます。条件説明だけで終わらず、応募する理由が伝わる内容へ改善します。',
      tags: ['求人票改善', '職種紹介', '原稿作成', '訴求整理'],
      image: {
        src: '/images/business/recruiting/main-support-job-posting.webp',
        alt: '求人原稿の改善と職種情報を整理した資料',
      },
    },
    {
      id: 'recruiting-lp',
      title: '採用LP',
      description:
        '採用コンセプトをもとに、応募者が会社理解を深められる採用LPを設計・制作します。',
      tags: ['構成設計', 'コピー', 'デザイン', '応募導線'],
      image: {
        src: '/images/business/recruiting/main-support-lp.webp',
        alt: 'PCとスマホに表示された採用LPの画面',
      },
    },
    {
      id: 'slide-deck',
      title: '説明資料',
      description:
        '説明会や面談で使える資料を、伝わる順番に整理して制作します。会社の魅力や仕事内容を、応募者が理解しやすい形へ整えます。',
      tags: [
        'スライド構成',
        '文章作成',
        'デザイン',
        '説明会資料',
      ],
      image: {
        src: '/images/business/recruiting/main-support-deck.webp',
        alt: '会社説明資料と採用ピッチのスライド資料',
      },
    },
  ] as const,
};

export { RECRUITING_ADDITIONAL_SUPPORT } from '@/lib/business/recruiting-additional-support';
export type { RecruitingAdditionalSupportItem, RecruitingAdditionalSupportId } from '@/lib/business/recruiting-additional-support';

export const RECRUITING_APPROACH = {
  headingLines: ['ご相談から納品までの流れ'] as const,
  steps: [
    { index: '01', title: 'ヒアリング', body: '採用状況、募集背景、課題、ターゲットを確認します。' },
    { index: '02', title: '情報整理', body: '会社の魅力、仕事内容、求める人物像を整理します。' },
    { index: '03', title: '構成設計', body: '応募者に伝える順番や、必要な制作物を設計します。' },
    { index: '04', title: '制作', body: '求人原稿、採用LP、説明資料などを制作します。' },
    { index: '05', title: '改善', body: '反応や状況を見ながら、内容を調整・改善します。' },
  ] as const,
};

export const RECRUITING_PROJECTS = {
  heading: '制作事例を見る',
  bodyLines: [
    'RAPTOVAがどのように情報を整理し、',
    'Webや資料、サービスとして形にしているのか。',
    '具体的な制作事例をご覧ください。',
  ] as const,
  items: [
    {
      src: '/images/business/raptova-website.png',
      title: 'RAPTOVA Official Website',
      alt: 'RAPTOVA Official Website project preview',
      href: '/projects/raptova-website',
    },
    {
      src: '/images/business/questoria.png',
      title: 'AI Skill Diagnosis QUESTORIA',
      alt: 'AI Skill Diagnosis QUESTORIA project preview',
      href: '/projects/questoria',
    },
  ] as const,
};

export const RECRUITING_CONTACT = {
  label: 'CONTACT',
  headingLines: ['採用活動を、', '伝わる形から整える。'] as const,
  bodyLines: [
    '求人原稿、採用LP、説明資料など、',
    '何から整えるべきか決まっていない段階でもご相談ください。',
  ] as const,
  ctaLabel: 'お問い合わせする',
};

export const RECRUITING_PAGE_METADATA = {
  title: 'Recruiting Support / 採用活動支援 | BUSINESS | RAPTOVA',
  description:
    '採用に必要な情報を整理し、求人原稿・採用LP・説明資料など、応募者に届く形へ落とし込みます。',
};
