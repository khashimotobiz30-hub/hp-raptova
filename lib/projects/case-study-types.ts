/** プロジェクト詳細（ケーススタディ）横展開用の共通型 */

export type CaseStudyOverviewRow = {
  label: string;
  value: string;
  /** External URL for the value (renders value with a trailing arrow). */
  href?: string;
};

export type CaseStudyApproachItem = {
  index: string;
  title: string;
  body: string;
};

export type CaseStudyOutputItem = {
  label: string;
  imageSrc: string;
  imageAlt: string;
};

/** 診断フロー等の横長1枚表示用（指定時はグリッド `items` より優先） */
export type CaseStudyOutputFlowImage = {
  src: string;
  alt: string;
  tone?: 'default' | 'flat';
  scale?: number;
};

export type CaseStudyBrowserShowcaseCard = {
  label: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export type CaseStudyBrowserShowcase = {
  cards: readonly CaseStudyBrowserShowcaseCard[];
};

export type CaseStudyDetailIcon =
  | 'layers'
  | 'chat'
  | 'split'
  | 'link'
  | 'chart'
  | 'compass'
  | 'code';

type CaseStudyDetailItemBase = {
  title: string;
  body: string;
};

/** PNG 等。指定時は画像を表示 */
export type CaseStudyDetailItemWithImage = CaseStudyDetailItemBase & {
  iconSrc: string;
};

/** `iconSrc` 未指定時は SVG グリフにフォールバック */
export type CaseStudyDetailItemWithGlyph = CaseStudyDetailItemBase & {
  icon: CaseStudyDetailIcon;
};

export type CaseStudyDetailItem = CaseStudyDetailItemWithImage | CaseStudyDetailItemWithGlyph;

export type CaseStudyContent = {
  /** ページメタ（必要なら layout 側で利用） */
  slug: string;
  hero: {
    label: string;
    title: string;
    subtitle: string;
    /** brand hero: English meta line under title block (e.g. Brand Site / Direction / Web Design) */
    tagline?: string;
    leadLines: readonly string[];
    body: string;
    /**
     * 右カラム：合成済みヒーロービジュアル（端末レイアウトは画像内で完結させる）
     * 例: 静的アセット `/images/projects/questoria/hero-visual-composite.png`（ページ URL の `/projects` とは別）
     */
    singleVisual: {
      src: string;
      alt: string;
      /** When set, hero visual links to the live product (external). */
      href?: string;
    };
    /** brand = wider hero visual for brand-site atmosphere; default = product mockup style */
    visualStyle?: 'default' | 'brand';
  };
  overview: {
    rows: readonly CaseStudyOverviewRow[];
  };
  background: {
    title: string;
    paragraphs: readonly string[];
  };
  approach: {
    title: string;
    items: readonly CaseStudyApproachItem[];
  };
  output: {
    title: string;
    lead?: string;
    /** 横長フロー1枚。指定時は `items` よりこちらを表示 */
    flowImage?: CaseStudyOutputFlowImage;
    /** ブラウザモック＋自動縦スクロール（RAPTOVA公式サイト Output 等） */
    browserShowcase?: CaseStudyBrowserShowcase;
    items: readonly CaseStudyOutputItem[];
    disclaimer: string;
    showDisclaimerWithFlow?: boolean;
  };
  detail: {
    title: string;
    items: readonly CaseStudyDetailItem[];
  };
  next: {
    title: string;
    paragraphs: readonly string[];
    backLabel: string;
    backHref: string;
    /** Optional: two-line link to the previous case study (e.g. QUESTORIA -> RAPTOVA site) */
    previousProject?: {
      eyebrow: string;
      title: string;
      href: string;
    };
    /** Optional: two-line link to the next case study (e.g. RAPTOVA site -> QUESTORIA) */
    nextProject?: {
      eyebrow: string;
      title: string;
      href: string;
    };
    ctaLabel: string;
    /** CTA button style in Next section (default: solid) */
    ctaVariant?: 'solid' | 'outline';
  };
};
