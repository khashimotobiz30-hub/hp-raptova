import type { RecruitingImage } from '@/lib/business/recruiting-content';

export type RecruitingAdditionalSupportItem = {
  id: string;
  icon:
    | 'monitor'
    | 'graduation-cap'
    | 'presentation'
    | 'megaphone'
    | 'book-open'
    | 'mail'
    | 'briefcase';
  label: string;
  description: string;
  serviceTags: readonly string[];
  concerns: readonly string[];
  effects: readonly string[];
  image: RecruitingImage;
};

export const RECRUITING_ADDITIONAL_SUPPORT = {
  title: 'その他サービス一覧',
  defaultId: 'recruiting-hp',
  items: [
  {
    "id": "recruiting-hp",
    "icon": "monitor",
    "label": "採用HP制作",
    "description": "採用コンセプトをもとに、応募者が会社理解を深められる採用HPを設計・制作します。構成、コピー、デザインまで一貫して整えます。",
    "serviceTags": [
      "構成設計",
      "コピー",
      "デザイン",
      "応募導線"
    ],
    "concerns": [
      "採用ページが古いまま",
      "魅力が伝わらない",
      "応募導線が弱い"
    ],
    "effects": [
      "会社理解の促進",
      "応募率向上",
      "採用ブランド強化"
    ],
    "image": {
      "src": "/images/business/recruiting/recruit-site-production.png",
      "alt": "採用HP制作のイメージ"
    }
  },
  {
    "id": "internship",
    "icon": "graduation-cap",
    "label": "インターンシップ企画・制作",
    "description": "学生が仕事理解を深められる、体験型インターンシップを企画・制作します。WEBツールを活用し、参加後の印象に残るプログラムへ整えます。",
    "serviceTags": [
      "企画設計",
      "WEBツール",
      "ワーク設計",
      "体験導線"
    ],
    "concerns": [
      "内容が説明中心になっている",
      "学生の印象に残らない",
      "仕事理解につながらない"
    ],
    "effects": [
      "仕事理解の促進",
      "参加満足度向上",
      "志望度形成"
    ],
    "image": {
      "src": "/images/business/recruiting/internship-web-tool.png",
      "alt": "インターンシップ企画・制作のイメージ"
    }
  },
  {
    "id": "joint-briefing-tool",
    "icon": "presentation",
    "label": "合同説明会ツール制作",
    "description": "合同説明会や採用イベントで使える資料やツールを制作します。短い時間でも会社の特徴が伝わるよう、見せ方と配布物を整えます。",
    "serviceTags": [
      "ブース装飾",
      "配布資料",
      "リーフレット",
      "ノベルティ"
    ],
    "concerns": [
      "短時間で伝えきれない",
      "資料がバラバラ",
      "印象に残らない"
    ],
    "effects": [
      "訴求力向上",
      "説明の統一",
      "記憶への定着"
    ],
    "image": {
      "src": "/images/business/recruiting/job-fair-tools.png",
      "alt": "合同説明会ツール制作のイメージ"
    }
  },
  {
    "id": "dm-flyer",
    "icon": "megaphone",
    "label": "採用DM・チラシ制作",
    "description": "応募者の興味を引く採用DMやチラシを制作します。会社の魅力や募集内容を、短く分かりやすい紙面に整理します。",
    "serviceTags": [
      "DM",
      "チラシ",
      "コピー",
      "紙面デザイン"
    ],
    "concerns": [
      "読まれずに終わる",
      "何を伝えるべきか暗暇",
      "応募につながらない"
    ],
    "effects": [
      "開封率向上",
      "興味喬起",
      "応募導線強化"
    ],
    "image": {
      "src": "/images/business/recruiting/recruit-dm-flyer.png",
      "alt": "採用DM・チラシ制作のイメージ"
    }
  },
  {
    "id": "pamphlet",
    "icon": "book-open",
    "label": "採用パンフレット制作",
    "description": "会社理解を深める採用パンフレットを制作します。仕事内容、働く環境、社員の魅力を整理し、読み進めやすい冊子に整えます。",
    "serviceTags": [
      "構成設計",
      "取材整理",
      "コピー",
      "冊子デザイン"
    ],
    "concerns": [
      "会社説明が浅くなる",
      "魅力を伝えきれない",
      "資料に統一感がない"
    ],
    "effects": [
      "理解度向上",
      "志望度向上",
      "説明品質の安定"
    ],
    "image": {
      "src": "/images/business/recruiting/recruit-pamphlet.png",
      "alt": "採用パンフレット制作のイメージ"
    }
  },
  {
    "id": "email-template",
    "icon": "mail",
    "label": "メールテンプレート作成",
    "description": "スカウト、面接案内、フォロー連絡など、採用活動で使うメール文面をテンプレート化します。候補者対応の品質と効率を整えます。",
    "serviceTags": [
      "スカウト",
      "面接案内",
      "フォロー",
      "リマインド"
    ],
    "concerns": [
      "毎回文面に迷う",
      "返信率が上がらない",
      "対応品質にばらつきがある"
    ],
    "effects": [
      "返信率向上",
      "対応工数削減",
      "候補者体験向上"
    ],
    "image": {
      "src": "/images/business/recruiting/mail-template.png",
      "alt": "メールテンプレート作成のイメージ"
    }
  },
  {
    "id": "consulting",
    "icon": "briefcase",
    "label": "採用コンサルティング",
    "description": "採用活動の現状を整理し、課題、導線、制作物、改善施策を設計します。何から整えるべきかを明確にし、実行につながる形にします。",
    "serviceTags": [
      "課題整理",
      "導線設計",
      "施策設計",
      "改善提案"
    ],
    "concerns": [
      "何から直すべきか分からない",
      "施策が場当たり的",
      "応募後の歩留まりが悪い"
    ],
    "effects": [
      "課題の明確化",
      "優先順位整理",
      "改善アクション具体化"
    ],
    "image": {
      "src": "/images/business/recruiting/recruit-consulting.png",
      "alt": "採用コンサルティングのイメージ"
    }
  }
] as const,
} as const;

export type RecruitingAdditionalSupportId =
  (typeof RECRUITING_ADDITIONAL_SUPPORT.items)[number]['id'];
