/** Works 詳細（ケーススタディ）横展開用の共通型 */

export type CaseStudyOverviewRow = {
  label: string;
  value: string;
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
};

export type CaseStudyDetailItem = {
  title: string;
  body: string;
  /** PNG 等。指定時は画像を表示し、未指定時は `icon` の SVG にフォールバック */
  iconSrc?: string;
  /** `iconSrc` 未指定時のアイコン種別 */
  icon: 'layers' | 'chat' | 'split' | 'link' | 'chart' | 'compass';
};

export type CaseStudyContent = {
  /** ページメタ（必要なら layout 側で利用） */
  slug: string;
  hero: {
    label: string;
    title: string;
    subtitle: string;
    leadLines: readonly string[];
    body: string;
    /**
     * 右カラム：合成済みヒーロービジュアル（端末レイアウトは画像内で完結させる）
     * 例: `/images/works/questoria/hero-visual-composite.png`
     */
    singleVisual: {
      src: string;
      alt: string;
    };
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
    /** 横長フロー1枚。指定時は `items` よりこちらを表示 */
    flowImage?: CaseStudyOutputFlowImage;
    items: readonly CaseStudyOutputItem[];
    disclaimer: string;
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
    ctaLabel: string;
    ctaHref: string;
  };
};
