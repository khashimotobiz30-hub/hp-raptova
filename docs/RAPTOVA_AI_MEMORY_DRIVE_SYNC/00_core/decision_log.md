# decision_log.md — 意思決定ログ

> **目的**: 「なぜそうしたか」を記録し、後から振り返れるようにするためのファイル。  
> 同じ議論を繰り返さないための共有メモリとして機能する。  
> 初期作成: 2026-05-01

---

## ログの書き方テンプレート

```
### [YYYY-MM-DD] 決定タイトル

- **決めたこと**: 
- **理由**: 
- **次にやること**: 
- **振り返り**: （後から追記）
```

---

## ログ一覧

---
### [2026-05-20] Header / Footer 文字ロゴ（small 版）への統一

- **以前の状態**:
  - Header / Footer は **`RAPTOVA` テキスト表示**（CSS の tracking 付き文字）。
  - `.R` アイコンは favicon / SNS 用途のみ。
  - `public/logos/` に字間広めの header 用 SVG はあるが Header/Footer 未採用。
- **決めたこと**:
  - Header / Footer の **`RAPTOVA` 表示を SVG 文字ロゴに差し替え**、字間の密な **small 版に統一**する。
  - **Header（全幅）**: `/logos/raptova-logotype-small.svg`（黒）。透明 Header 時も白版に切り替えない（`md:mix-blend-difference` は使用しない）。
  - **Footer（全幅）**: `/logos/raptova-logotype-small-white.svg`（白・同一字形）。`currentColor` 版は `next/image` で色指定できないため白専用 SVG を追加。
  - **`.R` アイコン** / favicon / OGP は現状維持。
  - **SP 配置**: Header / Footer と本文・ナビ（`px-7`）の左端を揃える。
- **理由**:
  - 字間広めの header 用ロゴがサイトの静かさ・エディトリアルトーンに対し浮いて見えた。
  - スマホ Header で自然に見えた small 版の密度でまず統一し、新規作成前に全体感を確認する。
  - 淡色 Hero 上で透明 Header の黒ロゴ視認性を確保する。
- **実装メモ（確定値）**:
  - Header: `h-[18px] w-[137px]`（SP）/ `md:h-[20px] md:w-[152px]`（PC）
  - Footer: `h-[16px] w-[115px]`（SP）/ `md:h-[18px] md:w-[140px]`（PC）— Header よりやや控えめ
  - `components/layout/Header.tsx` / `components/layout/Footer.tsx`
  - `public/logos/raptova-logotype-small-white.svg` 新規
  - `npm run build` 成功
- **次にやること**:
  - 全体感を見て、必要ならロゴ SVG 本体の字間調整を検討（今回は既存 small のみ使用）。
- **正本**: `01_projects/raptova_hp.md` の **`### ロゴ / favicon 実装状況`**。
### [2026-05-20] RAPTOVAロゴアイコンとfavicon方針の決定・実装

- **以前の状態**:
  - RAPTOVAの**正式なアイコン方針は未確定**だった。
  - Header / Footer は **`RAPTOVA` テキスト表示のみ**。
  - favicon / apple-touch-icon は**既存アセットのまま**だった。
- **決定したこと**:
  - **`.R` モチーフ**のアイコンを採用。コンセプトは **焦点と拡張（R-Focus & Expansion）**。
  - **PC版 Header / Footer** には今回は組み込まず、従来の **`RAPTOVA` テキスト**を維持。
  - **`.R`** は favicon / apple-touch-icon / SNSアイコン等の**小サイズ用途**を中心に使う。
  - favicon は `.R` 由来の **`app/favicon.ico`** に差し替え。
  - **`app/icon.svg`** と **`public/logos/raptova-icon-favicon.svg`** を追加。
  - **`public/apple-touch-icon.png`** を `.R` 由来に差し替え。
  - **OGPは現状維持**（OGP画像・metadata・Header / Footer は今回変更しない）。
- **理由**:
  - `.R` は RAPTOVA の「焦点化・整理・実行・拡張」の思想と合う。
  - 直接的なAI表現ではなく、**仕事を前に進める構造**を表現できる。
  - PC版 Header/Footer では、現時点では**アイコンよりテキストロゴ**の方が自然。
  - favicon や apple-touch-icon では、**記号性のある `.R`** が有効。
  - 既存HPの**白黒・余白・静かなトーン**と相性が良い。
- **実装メモ**:
  - **`public/logos/`** に SVG 正本・favicon 専用 SVG を配置。
  - **`app/favicon.ico`** / **`app/icon.svg`** / **`public/apple-touch-icon.png`** を更新。
  - **`scripts/generate-apple-touch-icon.mjs`** を追加。
  - **`scripts/generate-favicon-ico.mjs`** を追加（favicon.ico の再生成可能）。
  - **`npm run lint` / `npm run build`** 成功。
- **正本**: ブランド方針 → **`00_core/raptova.md`**（`## ロゴ・アイコン方針`）。HP実装状況 → **`01_projects/raptova_hp.md`**（`### ロゴ / favicon 実装状況`）。

---

### [2026-05-18] 公式HP `/projects/raptova-website` 制作実績ページの整理（Output除くFIX）と掲載方針

- **以前の方針**:
  - 同日に記録した **Project 詳細の見せ方**（全 `[slug]`）と **QUESTORIA FIX** の時点では、**`/projects/raptova-website`** の本文整理は未着手だった（Output 含め未FIX）。
  - 自社サイト実績は、**インタラクション・未実装機能**（粒子・NOVA・対話型Contact 等）を**訴求コピーに含めうる**状態だった（一覧・旧文案と詳細の乖離がありうる）。
  - Next の **CONTACT** は **黒ベタ（solid）** 想定の実装が残っていた。
- **変更内容**:
  - **`/projects/raptova-website`** を **「ブランドブック」ではなく「情報設計された制作実績ページ」** として整理。**Hero / Project Info / Background / Approach / Detail / Next** は **FIX**（**Output のみ未FIX**）。
  - **Project Info** の英語ラベルを QUESTORIA と統一（**PROJECT / TYPE / EXPERIENCE / DESIGN SCOPE / STATUS / RELEASE**）。
  - **Detail** は **実装実態に基づく5項目**（Information Architecture / Japanese Typography / Visual Tone / Motion & Navigation / Technical Foundation）。**未実装の粒子・NOVA・対話型Contact UI は Detail に書かない**。
  - **Next**：自社サイトから **`→ Next Project / AI Skill Diagnosis QUESTORIA`** へ接続（一覧上の案件順想定）。**CONTACT** は **透明背景＋黒枠線（outline）** とし、**QUESTORIA 側 Next にも同表現を反映**。
  - **Output** は今後、「完成物の証拠」として **情報設計・サイト構造・画面遷移**が伝わる構成へ見直す（**方針のみ確定・実装・素材は未**）。
- **変更理由**:
  - 他セクションを **情報設計・実装一致・静かなトーン**で揃えた一方、Output が **プレースホルダ中心**のままだと実績としての説得力が弱い。未実装機能の記載は **信頼と実装の一致**を損なうため。
- **最新方針**:
  - **全 `[slug]` の役割・見せ方**: **`01_projects/raptova_hp.md`** の **`### /projects/[slug] の役割`**。
  - **自社サイト実績の正本**: 同ファイル **`## RAPTOVA公式HP 制作実績ページ（/projects/raptova-website）`**。
  - **QUESTORIA 実績の正本**: **`01_projects/questoria.md`** の **「RAPTOVA公式HPでの掲載（制作実績）」**。
  - **次にやること**: **`/projects/raptova-website` の Output** セクション。**`/projects` 一覧**コピーと詳細の整合（未実装表現の除去）。Projects 掲載ガバナンス（既存未完了）。

---

### [2026-05-18] 公式HP Project詳細（`/projects/[slug]`）の見せ方方針と QUESTORIA（`/projects/questoria`）のFIX

- **以前の方針**:
  - Project 詳細は、**Hero / Overview / Background / Approach / Output / Detail / Next** の7ブロックを**実装第一弾**とし、**横展開可能な型**として進めていた（`decision_log.md` 2026-05-14、`raptova_hp.md`）。
  - **思想・工程説明**に寄りやすく、「読めばわかる」説明中心になりやすい構成だった。
- **変更内容**:
  - Project 詳細は**思想ページではなく**、**制作意図が自然に伝わる実績ページ**として設計する。
  - **「見たくなって、読んだらわかる」**構成を重視する。RAPTOVAらしさは**抽象語ではなく、情報整理・構造整理・余白・順番**で表現する。
  - **`/projects/questoria`** について、構成・文章・導線を整理し、**FIX方針**とした（セクション別の確定内容の正本は **`01_projects/questoria.md`**）。
- **変更理由**:
  - 「読めばわかる」だけでは、**何をどういう意図で作ったか**が伝わりにくく、実績としての説得力・**成果物への導線**（例: Launch QUESTORIA）が弱かったため。
- **最新方針**:
  - 全 **`/projects/[slug]`** の役割・見せ方の原則の正本は **`01_projects/raptova_hp.md`** の **`### /projects/[slug] の役割`**。
  - **QUESTORIA** のFIX詳細・セクション定義の正本は **`01_projects/questoria.md`** の **「RAPTOVA公式HPでの掲載（制作実績）」**。
  - **次にやること**: **`/projects` 一覧**、Projects 掲載ガバナンス（既存未完了タスク）。**`/projects/raptova-website`** の本文整理（Output 除く）は **同日の別エントリ**で記録済み。

---

### [2026-05-21] 公式HP `/business` を事業・相談説明ページへ再定義（表層3事業／裏思想は維持）

- **以前の方針**:
  - **`/business`** は、サービス一覧ではなく、**改善翻訳モデル・改善実装モデル**等の**思想説明**として整理する（`decision_log.md` 2026-05-19、`raptova_hp.md` の **`### /business の役割`** および末尾 **改善翻訳モデル** 追記）。
  - ページ骨格は **Problem / Business Model / Three Themes** 等を中心とし、**止まっている改善をどう実装で前に進めるか**を主に伝える設計とした。
  - **採用・Web・AI** を**横並びの独立カテゴリとして固定しない**方針で整理していた。
- **変更内容**:
  - **`/business`** を**思想ページではなく**、外部向けに **何をしている会社か・何を相談できるか** が分かる **事業内容・相談内容の説明ページ** とする（**営業・相談導線**を優先）。
  - **表層（対外）**は、次の **3事業** で整理する方向とする（**正式名称・トップ表示コピー・英語ラベルとの対応は未確定**。UI・情報設計フェーズで微調整の可能性あり）。
    - **採用支援事業**
    - **Web・資料制作事業**
    - **業務整理・AI活用支援事業**
  - **裏側（ブランド思想・維持）**: 課題・情報・構想を整理し形にする／Web・資料・AIは**目的ではなく手段**／採用は**最初の重点領域**／単なる制作会社ではなく**整理〜実装まで**支援する、という考え方は**維持**する。
  - **改善翻訳モデル**（四停止・Three Themes 等）は **`/business` 公開ページの主構造から外し**、**裏思想・参照メモ**として保持する（`raptova_hp.md` の **`## /business 裏思想メモ（改善翻訳モデル・参照用）`**）。
  - 公式HP制作フェーズは、**サイト構造・思想設計は概ね完了**。**次フェーズ**は各ページの**見せ方・UI・情報設計**（コピー・カード・文章量は未確定）。
- **変更理由**:
  - 思想寄りの説明では、閲覧者に **何をしている会社か・何を相談できるか** が伝わりにくく、**営業導線として弱い**ため。
- **最新方針**:
  - **正本**: **`01_projects/raptova_hp.md`** の **`## 公式HP 全体サイト設計 v1（2026-05-15）`** 内 **`### /business の役割`**。
  - **裏思想の参照**: 同ファイル **`## /business 裏思想メモ（改善翻訳モデル・参照用）`**（公開コピー・サイト掲載の正本ではない）。
  - **次にやること**: `/business` の**情報設計・UI・各セクションの見せ方**（表層3事業の名称・見せ方・トップ英語ラベル対応は**未確定**）。

---

### [2026-05-19] 公式HP `/business` を「改善実装モデル」の説明ページとして整理（採用・実装手段の位置づけ）

- **今回決めたこと**:
  - **`/business`** はサービス一覧ではなく、RAPTOVAの**「改善実装モデル」**（どんな止まりを、どう実装して前に進めるか）を説明するページとして整理する。
  - **採用**は RAPTOVA 全体の定義ではなく、**原体験と課題理解の深い、現在の主要実行領域**として扱う。
  - **Web / AI / 資料 / LP / HP** などは**独立事業の並列カテゴリ**ではなく、**改善を動かすための実装手段**として整理する。
  - **正本**: **`01_projects/raptova_hp.md`** の **`## 公式HP 全体サイト設計 v1` 内 `### /business の役割`**。
  - **コピー・UI・レイアウト・カード設計・文章量**は未確定で、**次フェーズ**。
- **理由**: サービスカタログ誤読の防止と、トップの **3領域ラベル**（Recruiting 等）との**役割分担**を明確にするため（骨格リストの重複転記はしない）。

---

### [2026-05-18] 公式HP `/about` 制作用の一次素材を `raptova_hp.md` に集約（非公開・参考メモ）

- **今回決めたこと**:
  - `/about` 制作時に参照する**口語・長文の原文メモ**を、**`01_projects/raptova_hp.md`** の **`## /about 制作用一次素材（非公開・参考メモ）`** に置く運用とした。
  - その内容は**公開文・サイト掲載の正本ではない**。ページの**役割定義**は引き続き **`## 公式HP 全体サイト設計 v1` の `### /about の役割`** を正とする。
- **理由**:
  - READMEの **追記優先・新トピックはまず既存ファイル**（`README.md`）に合わせ、公式サイト関連は **`raptova_hp.md`** に近接させるため。
  - **正本（役割）**と**一次素材**を同じ見出しに混ぜると、AI・人の双方で**混線**しやすいため。
- **正本**: 一次素材の置き場所・非公開の宣言は **`raptova_hp.md`** の当該 `##` 節冒頭を正とする（本エントリは運用記録のみ）。

---

### [2026-05-17] 公式HP `/about` の役割を明文化（思想・原点・行動原理／プロフィールページ化の回避）

- **今回決めたこと**:
  - **`/about`** は**単なるプロフィール・経歴の網羅ページ**ではなく、**RAPTOVAの思想・原点・行動原理を補強する下層ページ**とする。
  - **論旨の芯**として、AIで**止まりやすかった改善**が**動かしやすくなった**こと、現場ではまだ**活かしきれていない**こと、前職採用支援で見た**「改善したいが忙しさで止まる」**課題、求人・魅力整理・採用ページ・HPなどが**時間・コストで止まりがち**だったこと、RAPTOVAが**AIと設計・実装で動く形まで落とす**こと、**単なるAI論ではなく現場課題×実装が原点**であることを整理する（**具体コピー・セクション確定はしない**）。
  - **Top** の **Statement / Philosophy** は**世界観・入口として浅く**、**思想・原点・行動原理の深め**は主に **`/about`** に寄せる。
  - **人物の事実・AI向けルール**は **`profile.md`**、**MVV・事業定義の全文系**は **`raptova.md` / `strategy_full.md`** とし、**`/about`** は**対外のブランド物語・行動原理**を正とする。
- **理由**:
  - **`/business`・`/projects`・`/projects/[slug]`** の役割整理後、**`/about` が「誰が」だけに読まれる**とサイト全体の情報設計と**ずれる**ため。
  - **採用文脈**は強みの**具体例**であり、ページ全体を**採用プロフィール**に寄せないための**定義**が必要だったため。
- **正本**: **`01_projects/raptova_hp.md`** の **`## 公式HP 全体サイト設計 v1（2026-05-15）`** 内 **`### /about の役割`**、**`### サイト全体の情報フロー（設計思想）`**、**`### Topと下層ページの役割分担`**（本エントリは要点のみ）。
- **次にやること**: **`/about` のコピー・セクション設計・実装**は別タスク。必要に応じ **`strategy_full.md` §1.5** との同期。

---

### [2026-05-16] 公式HP `/projects` と `/projects/[slug]` の役割を明文化（一覧と詳細の分担・情報の種類）

- **今回決めたこと**:
  - **`/projects`** は **RAPTOVAの実行・検証・実装の蓄積**を示す**一覧・入口**であり、制作実績ギャラリーに寄せない。
  - **`/projects/[slug]`** は **個別PJを通じた深掘り**とし、**なぜ取り組み／どう考え／どう形にし／何が見え／次にどうつながるか**を扱う。**完成物紹介だけ**にしない。
  - **共通化するのは見出し名や順番ではなく**、**背景・課題/仮説・設計意図・実装内容・学び・次への接続**といった**情報の種類**に留める。
  - **QUESTORIA** の7セクション構成は **当該案件の参考例・実装第一弾**であり、**すべての Project 詳細の固定テンプレではない**。
- **理由**:
  - **`decision_log.md` 2026-05-14** 付近の記述は、QUESTORIA を**最初に実装した型**としての記録が中心になり、**長期の情報設計**（クライアント／自社／検証／AI基盤／内部ツール等の**混在**）と**一対一で読まれすぎる**懸念があったため。
  - 今後の案件追加で**見出し固定のテンプレ**に縛られないよう、**MEMORY 上の正本**で役割を切り分けておく必要があったため。
- **正本**: **`01_projects/raptova_hp.md`** の **`## 公式HP 全体サイト設計 v1（2026-05-15）`** 内 **`### /projects の役割`**、**`### /projects/[slug] の役割`**、**`### Business と Projects の役割分担（要約）`**、**`### Topと下層ページの役割分担`**（本エントリは要点のみ）。
- **次にやること**: **Projects 掲載ガバナンス**（仮想サンプル・注意書き・一覧導線等）。UI・カード・タグ・CTA・具体コピーは別段階。

---

### [2026-05-15] RAPTOVA公式HPの全体サイト設計 v1 を整理

- **今回決めたこと**:
  - 細かい文言・セクション構成・料金・FAQ などを詰める**前に**、まず公式HP全体の**ページ構造**と**各ページの役割**を整理する方針にした。
  - 基本構造は **`/`**、**`/about`**、**`/business`**、**`/projects`**、**Contact 導線**。
  - **`/business`** は、将来的に**各事業詳細ページ**を持たせる前提で設計する。
  - **`/projects`** は単なる制作実績一覧ではなく、**広いプロジェクト蓄積**ページとして扱う。
  - **Top** は全体像を伝える**入口**、**下層ページ**は詳細説明を担う。
  - **Contact** は発注を迫る導線ではなく、**相談・紹介・協業**の入口とする。
- **設計思想の補足（長期に固定する定義。詳細は正本）**:
  - サイト全体の情報設計は **思想 → 現在の支援領域 → 実行・検証・実装** の流れで整理する（細かいコピーではなく設計思想）。
  - **`/business`** は「サービス一覧」ではなく、**現在どの領域から事業を前に進めているか**・**現在の支援領域・支援アプローチ**を示すページとする（固定商品カタログではない）。
  - **`/projects`** は **実行・検証・実装の蓄積**（何を考え、何を試し、どう形にしたか）とし、QUESTORIA・公式HP・プロトタイプ・検証PJ・将来のAI基盤・自社プロダクト等を**含めうる**。
  - **役割分担の要約**: **`/business`** = 現在どの領域から支援するか、**`/projects`** = どう考え、どう実装したか（正本の見出し・図に従う）。
- **変更理由**:
  - Top の細かい文言調整に入る**前に**、RAPTOVA公式HP全体を**どのような構造で育てるか**を整理する必要があったため。
  - 詳細まで詰めすぎると、後から方向性が変わった際にメモリー上の**負債**になりやすいため、今回は**「構造」と「役割」**のみを確定方針として記録するため。
- **正本**: **`01_projects/raptova_hp.md`** の **`## 公式HP 全体サイト設計 v1（2026-05-15）`** を正本とする（本エントリは要点のみ）。
- **次にやること**:
  - 全体サイト設計 v1 を前提に、まず **`/business`** の**粗い設計**へ進む。
  - 次段階でも細部には入りすぎず、まずは **`/business`** と**各事業詳細ページの役割分担**を整理する。
- **振り返り**: Top の文言や各ページの詳細に入りすぎる前に、サイト全体の骨格を整理できた。次回以降も、メモリーに残す内容は**確定度の高い構造**と**未確定の詳細**を分けて扱う。

---

### [2026-05-14] 公式HPを「設計書先行の制作プロセス」に戻し、営業・信用獲得を主目的とした戦略に整理

- **以前の方針**:
  - 公式HPは **ブランドサイト**としての構成・**エディトリアルなデザイン**・レスポンシブ等を優先し、**実装・デザイン調整・Works詳細（`/works/questoria` 等）の制作を先行**して進めてきた面がある。
  - 採用は **重点領域**として見せつつ、**採用支援会社に固定されない**トーンへ整理済み（`decision_log.md` / `raptova_hp.md` 2026-05-13 前後）。
- **今回決めたこと**:
  - **制作会社型の進め方**に戻し、**目的・ターゲット・行動導線・ポジショニングを設計書として整理してから**、コピー・構成・実装に反映する。
  - 公式HPの位置づけを **「信用獲得を目的とした、営業・実績・ブランド拠点型の公式サイト」** とする（名刺サイトではない）。
  - **初期の想定閲覧者**は、**既存人脈・過去のつながり**、**案件紹介・協業のパートナー候補**を最優先とする。
  - **CONTACT** は、強い発注導線ではなく、**相談・紹介・協業の入口**として設計する。
  - **RAPTOVA** は、単なる Web 制作会社や AI ツール代行ではなく、**「AI時代の企画・制作パートナー」**として見せる。
  - 詳細の整理内容は `raptova_hp.md` の **`### 戦略設計（目的・ターゲット・行動・ポジショニング）`** に記録する。
- **変更理由**:
  - 今後、これまでの人脈や紹介先に営業をかける際に、**橋本自身が何を支援でき、どの程度の品質で形にできるか**を証明する**信用材料**にするため。
  - **QUESTORIA** をはじめとする制作物を一過性で終わらせず、**実績として蓄積**し、RAPTOVAの提供価値を伝える**ポートフォリオ基盤**にするため。
- **最新方針**:
  - **ブランドサイト**としての表現（Make Work Move.・3 Business・エディトリアル等）は**維持**しつつ、その**目的**を **営業・信用・実績・自分自身が立ち返るブランド拠点**として明文化する（対立ではなく補強）。
  - **トップ**は信用・導線を優先し、**実績の厚みは Projects 下層**で見せる。**不特定多数の検索流入**は初期の主目的としないが、**将来的な SEO・下層流入**とは並立して設計する。
- **次にやること**: 今回の戦略設計を前提に、**トップコピー / BUSINESS / ABOUT / CONTACT** の文言・構成を見直す。設計書の置き場所・更新フローは運用に合わせて固定する。
- **振り返り**: 今後、**BUSINESS / ABOUT / CONTACT / トップコピー**の設計を進めながら見直す。

---

### [2026-05-14] 公式HPに Works 詳細 `/works/questoria` を実装し、詳細ページの固定フォーマット第一弾とした

- **以前の方針**: Works は当面**トップ上ではステイ気味**とし、仮想サンプル掲載の**枠・注意書き**を別途決める前提だった。実装としての **Works 詳細ページの固定フォーマット**は未着手だった（`raptova_hp.md`）。
- **今回の変更内容**:
  - RAPTOVA公式HPに **`/works/questoria`** を追加し、**Works 詳細の第一弾**として **Hero / Overview / Background / Approach / Output / Detail / Next** の7セクションまで実装した。
  - **`npm run lint` / `npm run build` 通過**済み。
  - **Output**: 4枚の個別画像ではなく、**診断体験フローを1枚にまとめたビジュアル**とした。
  - **Detail**: **低めの黒帯**に **アイコン付き6項目**で整理した。
  - **Next**: **左見出し・中央本文・右 CONTACT** の締めCTAとした。
  - 今後の Works 詳細にも**横展開可能なベース**とした。案件固有の見せ方は `questoria.md` の「RAPTOVA公式HPでの掲載（制作実績）」に記録。
- **変更理由**:
  - 実案件（QUESTORIA）で**編集デザインのトーン**と**案件ストーリー**を両立した「見せ方の型」を先に固め、以降の実績追加を速くするため。
  - RAPTOVAの**余白・罫線・白黒灰のエディトリアル**をベースにしつつ、QUESTORIAの**SF体験は Output 画像内**に閉じ、サイト全体のブランドと衝突させないため。
- **最新方針**:
  - Works 詳細は **上記7セクションを「確定に近いデフォルト」**とし、案件ごとに中身を差し替えて横展開する。
  - **仮想サンプル掲載ルール・掲載ガバナンス・一覧導線**は **未完了タスク**として `raptova_hp.md` で継続整理する（**ページ実装の完了**と切り離す）。
  - **対外 URL の正**は **`/projects` / `/projects/questoria`**（**第1〜第3段階でルート・画像パスまで反映**・`decision_log.md` の **Business / Projects 統一**エントリ参照）。**当時の実装完了記録**として **`/works/questoria`** 起点の記述は本エントリ本文に**残す**。旧 **`/works/*`・`/services`** は **redirect なしで 404** 想定（**第3段階**で redirect 削除済み）。
- **次にやること**: 他案件の **Projects 詳細**への展開、**Projects** 一覧との導線、掲載ルール・注意書きの確定（必要ならキャプション方針）。**Business / Projects 統一の第1〜第3段階（URL・内部命名・redirect 削除・画像パス）**は完了済み。
- **振り返り**: （後から追記）

---

### [2026-05-14] 公式HPの主要呼称とURL方針を Business / Projects に統一する

- **以前の方針**:
  - 設計・実装上は **`Services` / `Works`** の呼称が残っていた。
  - **`/works/questoria`** など、**Works ベースの URL**・内部管理で進めていた。
  - 一方で、**対外表示やブランドトーン**では **`BUSINESS` / `PROJECTS`** の方が自然になっていた。
- **今回決めたこと**:
  - RAPTOVA公式HPでは、**対外表示・URL・設計上の呼称**を原則として **`BUSINESS` / `PROJECTS`** に統一する。
  - **`Services` / `Works`** は**補助語**としてのみ扱う（`Services`＝具体的支援内容の補足、`Works`＝制作実績・ケーススタディ等）。
  - URL は **`/business` / `/projects`** を基本とする（一覧例: `/about`、`/business`、`/projects`、`/projects/questoria`、`/projects/raptova-website`、`/projects/ai-sns-operation`、contact / mailto 導線）。
  - 既存の **`/works`** は **`/projects`** へ、**`/works/questoria`** は **`/projects/questoria`** へ移行する方針とする。
  - **方針決定時点（本エントリ初版）**では **RAPTOVA_AI_MEMORY の更新のみ**とし、**HP本体コードは即日は変更しない**旨を記録した（第1段階のコード移行は**後続**で実施。完了内容は下記 **実装反映**）。
- **変更理由**:
  - **表示・URL・設計書・実装指示**がずれると、今後の運用や AI への指示で混乱しやすいため。
  - RAPTOVAを**一般的な制作会社・サービスメニュー型サイト**ではなく、**ブランドサイトとして一貫**して見せるため。
  - **`Projects`** の方が、自社プロダクト・制作実績・プロトタイプ・仮想サンプル・支援パッケージなどを**広く扱いやすい**ため。
  - 作り込みが浅いうちに統一した方が、**将来の修正負荷が低い**ため。
- **最新方針**:
  - ナビ表示は **`ABOUT` / `BUSINESS` / `PROJECTS` / `CONTACT`** を基本とする。
  - URL は **`/about` / `/business` / `/projects` / `/projects/questoria` / `/projects/raptova-website` / `/projects/ai-sns-operation`** および **contact 導線**を基本とする。
  - **`Business`** は**事業領域・支援内容**のページ。**`Projects`** は**作ったもの・取り組んだもの**を示すページ。
  - **正の画像パス**: **`/images/business/...`**、**`/images/projects/...`**（**第3段階**で **`/images/works`・`/images/services` から移行**済み）。
  - **旧 URL**: **`/services`**・**`/works`**・**`/works/*`** は **redirect なし**。**404 で問題ない**想定（**第3段階**で **`next.config.ts` の旧 URL redirect を削除**済み。互換より完全統一を優先）。
- **実装反映（第1段階・HP本体・memory 追記）**:
  - 方針決定後、**HP本体コード**で **Business / Projects への第1段階移行**を実施し完了した（別 Cursor 実装）。
  - **正 URL**: **`/business`**、**`/projects`**、**`/projects/questoria`**、**`/projects/raptova-website`**、**`/projects/ai-sns-operation`**。
  - **`next.config.ts`** に **permanent redirect** を追加済み: **`/services` → `/business`**。**`/works` → `/projects`**。**`/works/questoria` → `/projects/questoria`**。**`/works/raptova-website` → `/projects/raptova-website`**。**`/works/ai-sns-operation` → `/projects/ai-sns-operation`**。
  - **実装概要（要約・第1段階時点）**: `app/services/page.tsx` 削除・`app/business/page.tsx` 新設。`app/works/*` 削除・`app/projects/*` 新設。`lib/config.ts` の href、**`components/sections/Projects.tsx`** の **`/projects/...` リンク**、**`components/sections/Business.tsx`** の VIEW MORE（**`/business`**）、当時 **`lib/works/questoria-case-study.ts`** の **`backHref`（`/projects`）**、metadata の **WORKS → PROJECTS** 表記、等（**第2段階**で **`lib/projects/*`**・**`ProjectCaseStudyView`** に整理済み。下記参照）。
  - **検証**: **`npm run lint` 成功**。**`.next` 削除後 `npm run build` 成功**。正 URL および旧 URL からのリダイレクトを**実表示で確認**、問題なし（**redirect は第3段階で削除**済み。当時の検証記録として残す）。
  - **Header / Footer**: 方針どおりトップ内アンカー **`/#business`** / **`/#projects`** を維持。
- **実装反映（第2段階・HP本体・memory 追記）**:
  - **第1段階**で URL・表示・リンク・redirect を整理済みのうえ、**第2段階**として**内部コードの主要命名**も **Projects / Business** に統一した（別 Cursor 実装）。
  - **`lib/works/*` → `lib/projects/*`**（新規: **`lib/projects/case-study-types.ts`**、**`lib/projects/questoria-project.ts`**）。**`components/works/case-study/WorkCaseStudyView.tsx` → `components/projects/case-study/ProjectCaseStudyView.tsx`**。**`WorkCaseStudyView` → `ProjectCaseStudyView`**。**`QUESTORIA_CASE_STUDY` → `QUESTORIA_PROJECT`**。**`WORKS_ITEMS` → `PROJECTS_ITEMS`**。**`WorkItem` → `ProjectItem`**。**`SERVICES_ITEMS` → `BUSINESS_ITEMS`**。**`Business.tsx`** 内ローカル配列は **`BUSINESS_SECTION_CARDS`** に変更（**`lib/config.ts` の `BUSINESS_ITEMS` と衝突しない**よう整理）。**`aria` / `id` の `work-case-*` → `project-case-*`**。未使用 **`components/sections/Works.tsx`** / **`Services.tsx`** 削除。空の **`lib/works`** / **`components/works`** ディレクトリ削除。**`lib/config.ts`**、**`app/projects/questoria/page.tsx`** 等を更新。
  - **削除した主なファイル（メモ）**: `lib/works/case-study-types.ts`、`lib/works/questoria-case-study.ts`、`components/works/case-study/WorkCaseStudyView.tsx`、`components/sections/Works.tsx`、`components/sections/Services.tsx`。
  - **意図的に維持（第2段階時点）**: 当時は **`public` の `/images/works`・`/images/services`** と **`next.config.ts` の旧 URL redirect** を残す方針だったが、**第3段階でいずれも整理済み**（下記 **第3段階**）。**自然語**の「サービス設計」、**`package-lock.json`** 等の **`project-service`** 等は**修正対象外**のまま。
  - **検証**: **`npm run lint` 成功**。**`.next` 削除後 `npm run build` 成功**。**`/projects/questoria`** はビルド上**静的生成対象に含まれる**ことを確認。
- **実装反映（第3段階・HP本体・memory 追記）**:
  - **第1段階**で URL・表示・リンクを **`/business` / `/projects`** に移行済み。**第2段階**で内部命名を **Projects / Business 系**に統一済み。**第3段階**として、**`next.config.ts` から旧 URL の permanent redirect を削除**（**`/services` → `/business`**、**`/works` → `/projects`**、**`/works/questoria` → `/projects/questoria`**、**`/works/raptova-website` → `/projects/raptova-website`**、**`/works/ai-sns-operation` → `/projects/ai-sns-operation`**）。理由は**本格公開・外部共有前**であり、**互換維持より完全統一を優先**するため。旧 URL は **404 で問題ない**扱い。
  - **画像フォルダ**: **`public/images/works` → `public/images/projects`**、**`public/images/services` → `public/images/business`**。**コード参照**: **`/images/works/...` → `/images/projects/...`**、**`/images/services/...` → `/images/business/...`**（主に **`lib/projects/questoria-project.ts`**、**`lib/projects/case-study-types.ts`**、**`lib/config.ts`**、**`components/sections/Business.tsx`**）。
  - **ファイル名**: **`service-product-abstract.png` → `business-product-abstract.png`** 等、**`service-*` → `business-*` 系**（**`service-business-creative.png` → `business-creative.png`** で `business-business-*` を回避）。
  - **検証**: **`npm run lint` 成功**。**`.next` 削除後 `npm run build` 成功**。**`public/images` 直下に `works` / `services` が残っていない**ことを確認。
  - **現在の正**: URL は **`/business`**、**`/projects`**、**`/projects/questoria`** 等。呼称は **Business** / **Projects**。画像パスは **`/images/business/...`** / **`/images/projects/...`**。
- **次にやること（第1〜第3段階後）**:
  - **継続**: **sitemap・外部リンク・検索コンソール**など、リポジトリ外の整合を必要に応じて確認する。
- **振り返り**: **第1段階（ルート・リンク・metadata）**、**第2段階（内部命名）**、**第3段階（redirect 削除・画像パス・ファイル名）**まで完了。**旧 URL は意図的に 404**。**自然語「サービス設計」・npm 由来文字列**は従来どおり対象外。

---

### [2026-05-14] SNS_AUTO_RESEARCH / SNS_AUTO_RESEARCH_CAREER_NEWS_LAB の実運用を candidate_items → manual_final_posts に一本化した

- **2026-05-14以降の正式運用（人間・GPTs）**: 選定〜投稿管理の主線は **`candidate_items` → 専用GPTs → `manual_final_posts`**。旧きっかけだった **`post_drafts` は人間の実運用から外す**（シート削除・列削除はしない）。
- **旧運用（参考）**: `candidate_items` → `post_drafts` → `manual_final_posts` を前提とした手順・ドキュメントがあった。
- **新運用の要点**:
  - **`candidate_items`**: AI一次選定済みニュースの**選定台帳**。`selection_reason` を最重要判断材料とする。列の前方では `selection_reason` を優先して見やすくする。**`status` はスクリプト・人間運用ともに `new` / `used` / `other` を基本とする**。`used` 行は条件付き書式でグレーアウトする。
  - **`manual_final_posts`**: **投稿直前〜投稿済みの管理台帳**。前方列の目安は `final_text` / `image_filename` / `status` / `created_at` / `source_url`。**`status` は主に `ready` / `posted` / `needs_check`**。`posted` 行はグレーアウト。シートに **`stock` / `editing` / `discard` 等の旧値が残る場合は履歴扱い**とする。
  - **GPTsに渡す素材**: **`candidate_items` の `selection_reason` と `url` を中心**にする（完成文の作成・推敲の起点）。
  - **`manual_final_posts` に `final_text` を貼ったとき（Apps Script）**: 本文から URL 抽出 → **`candidate_items` の URL 一致**で `source_url` / `title` / `source_name` / `image_filename` / `status`（`ready`）などを自動補完。該当 **`candidate_items` 行は `used`** とし、条件付き書式でグレーアウトする。`fillManualFinalPostMeta_()` は **`post_drafts` が無くても** `findCandidateItemByUrl_()` 等により **candidate 側で補完可能**。
  - **`source_caution` / `source_caution_reason` / `source_evidence_type`**: **`post_drafts` に該当行があれば従来どおりそこから補完**。**なければ `candidate_items` 側で補完できる範囲で補うか、デフォルト扱い**とする（実装のフォールバック）。
  - **`post_drafts` の位置づけ**: **削除しない**。過去コード互換・将来のAI下書き自動生成への再拡張・Apps Script 内 legacy フローの保険として**シート・コード経路は残す**が、**人間は通常参照しない**。
  - **legacy 名称**: **`runPostDraftPipelineMVP` 等の関数名・トリガー名は今回変更しない**。名前は旧スコープを反映しているが、**人間の現行実運用フローは上記の一本化**であることをドキュメントで明示する。
- **変更理由**: 台帳を二段（候補選定 / 投稿直前）に絞り、選定判断と投稿管理の往復を減らす。メタ補完は URL をキーに **`candidate_items` でも完結**させられるようにした。
- **Apps Script 修正内容（要約）**: `fillManualFinalPostMeta_()` を post_drafts 必須でない形に変更。`findCandidateItemByUrl_()` を追加済み。
- **振り返り**: （後から追記）

---

### [2026-05-01] AI用記憶フォルダをGoogle Drive上に構築する方針にした

- **決めたこと**: OpenClaw的な仕組み（外部ツールやサービス）をそのまま導入するのではなく、まずGoogle Drive上にAI用の記憶フォルダ（RAPTOVA_AI_MEMORY）を作る方針にした。
- **理由**: 外部ツールの学習コストや初期セットアップより、すぐ使えてポータブルなMarkdownベースの管理が自分のスタイルに合っている。まず動く最小構成を作り、必要に応じて拡張する。
- **次にやること**: 各ファイルに実際の情報を追記していく。AIに「このフォルダを参照して」と伝えるフローを定着させる。
- **振り返り**: （後から追記）

---

---

### [2026-05-01] 詳細参照層（hako_full.md / strategy_full.md）をAI記憶フォルダに追加した

- **決めたこと**:
  - `hako_self_analysis_2026-04-18.md`（人物分析）を `00_core/hako_full.md` として格納
  - `hako_strategy_2026-04-18.md`（独立戦略）を `00_core/strategy_full.md` として格納
  - 既存ファイル（profile.md / raptova.md / questoria.md / sns_strategy.md）には要点のみを追記し、詳細は上記2ファイルへの参照リンクで案内する2層構造を採用
  - `content_sales.md`（コンテンツ販売戦略）は今回は作成しない。詳細は `strategy_full.md §5` に原文として残し、5月リリースへ動き出すタイミングで必要なら独立ファイル化する
- **理由**: 毎回AIに読み込ませるファイルが重すぎると参照効率が落ちる。普段参照用（軽量）と詳細参照用（原文保持）の2層に分けることで、目的に応じた使い分けができる。
- **次にやること**: 各ファイルの「追記」プレースホルダーを実際の情報で埋めていく。コンテンツ販売の実行フェーズ（5月〜）で必要に応じてcontent_sales.mdを独立させる。
- **振り返り**: （後から追記）

---

---

### [2026-05-01] SNSアカウント構成を4アカウント構想から「AIアカウント1本で検証」に変更した

- **以前の方針**: AIニュース垢・AI自動化垢・採用垢・メイン垢の4アカウントを並行運用する構想
- **変更内容**: 当面は「AIアカウント1本（@hako_freework30）」で運用し、反応を見てから分岐する方針に変更
- **変更理由**:
  - いきなり複数アカウントを立ち上げると、投稿管理・検証・改善が複雑になる
  - まずは大枠のAIアカウントでどのテーマに反応があるかを確認する
  - 反応が良いジャンルが出てきてから、AI自動化・効率化系・採用系への分岐を検討する
- **最新方針**: AIアカウント1本で検証開始。SNS_AUTO_RESEARCH の `target_account` 候補は将来の分岐に備えて現状維持する
- **次にやること**: 投稿を継続し、post_templateごとの反応データを蓄積する
- **振り返り**: （後から追記）

---

### [2026-05-01] SNS自動化MVPのスコープをRSS収集のみからpost_drafts生成まで拡張した

- **以前の方針**: RSS収集 → collected_items への蓄積のみ（AI要約・投稿案作成は今回は実装しないとしていた）
- **変更内容**: Apps Scriptの自動化範囲を post_drafts 生成まで拡張した
- **現在の自動化フロー**:
  ```
  sources → collected_items → article_contents
  → candidate_items → content_blueprints → post_drafts
  ```
  上記5段階が `runPostDraftPipelineMVP()` として動作し、毎日6時・12時・19時に自動実行される
- **次にやること**: post_drafts の品質を確認しながら、post_templateごとの精度を改善する
- **振り返り**: （後から追記）

---

### [2026-05-01] 最終投稿文の完全自動生成をやめ、専用GPTsで最終編集する方針を採用した

- **以前の検討**: APIで final_posts を自動生成する案があった
- **変更内容**: final_posts シートを廃止し、専用GPTsで人間が最終編集 → manual_final_posts に保存する運用に変更した
- **変更理由**:
  - APIで完全自動化するより、GPTsで会話しながら整える方が文体品質が高い
  - GPTsを使うことでAPIコストを抑えやすい
  - 人間の確認を挟むため、事実誤認や違和感を減らしやすい
  - X投稿は手動投稿とするため、アカウントリスクを抑えやすい
- **最新方針**: `post_drafts.post_text` → 専用GPTsで最終調整 → `manual_final_posts.final_text` に保存 → X手動投稿
- **次にやること**: 運用を開始し、GPTsの最終調整品質を確認する
- **振り返り**: （後から追記）

---

### [2026-05-04] AI Shift Lab（@ai_shift_lab_r）を作成し、初回投稿を完了した

- **決めたこと**: SNS自動化フローの投稿先として AI Shift Lab（@ai_shift_lab_r）を新設・初回投稿完了
- **補足（過去記録の訂正）**: 2026-05-01のログに「AIアカウント1本（@hako_freework30）で運用」と記載していたが、これは不正確だった。@hako_freework30 は Kohei の個人ブランド／AI起業ログ用アカウントであり、SNS自動化フローの投稿先としては別アカウントを新設する方針だった。今回の AI Shift Lab 作成で役割が明確に分離された。
- **アカウント概要**:
  - アカウント名: AI Shift Lab / ハンドル: @ai_shift_lab_r
  - コンセプト: AIニュースから、仕事と事業の変化を読み解く
  - 位置づけ: RAPTOVA本体とは表向き切り離した独立AI情報メディア
  - 管理メール: ai.lab@raptova.com
- **メールエイリアス設定済み**: ai.lab@raptova.com / ai.auto@raptova.com / recruit@raptova.com
- **次にやること**: SNS_AUTO_RESEARCH の自動生成フローを AI Shift Lab へ接続し、投稿を継続する
- **振り返り**: （後から追記）

---

### [2026-05-04] post_drafts の status に moved_to_manual を追加し、manual_final_posts との連携を強化した

- **決めたこと**:
  - `manual_final_posts.final_text` に完成文を貼ると、URL照合でメタ情報が自動補完される既存の仕組みに加え、照合元の `post_drafts.status` が `moved_to_manual` に自動変更されるよう拡張した
  - `post_drafts.status` の意味を明確化: `ready` = 未移行、`moved_to_manual` = manual_final_posts 移行済み
- **位置づけ**: 投稿管理の主軸は manual_final_posts のまま変わらない。`moved_to_manual` は「移行済みかどうかを判別する最低限のフラグ」であり、細かい投稿管理ではない
- **理由**: post_drafts に何が残っているか（未処理 vs 処理済み）を一目で判断できるようにするため
- **振り返り**: （後から追記）

---

### [2026-05-04] Apps Scriptの生成数を増やし、候補多め・人間判断の運用方針に変更した

- **以前の方針**: 生成数の上限設定が未記録（暗黙的に少数）
- **変更内容**: SELECT_CANDIDATE_OUTPUT_LIMIT: 20 / BLUEPRINT_INPUT_LIMIT: 10 / DRAFT_INPUT_LIMIT: 10 に設定。1日最大30件の post_drafts 生成を想定
- **変更理由**: AI Shift Lab で1日10投稿を目標とするにあたり、Apps Script側で厳選しすぎず候補を多めに出し、最終投稿可否を専用GPTsと人間が判断する運用に切り替えるため
- **次にやること**: 実際の投稿ペースと post_drafts の消化率を確認し、生成数の過不足を検証する
- **振り返り**: （後から追記）

---

### [2026-05-04] 専用GPTsの最終編集方針を「冒頭強化・ラフ表現暫定許容」に変更した

- **以前の方針**: 表現方針は明示されていなかった
- **変更内容**: 冒頭をより強くしてXで読まれる入口を作ることを優先。「これはすごい」「地味だけど重要」「要チェック」「ヤバい」「エグい」などのラフな表現を暫定的に許容する
- **変更理由**: 情報の正確さより「読まれること」を優先するフェーズと判断。反応データが出てから表現の強度を調整する
- **最新方針（暫定）**: ラフ表現を許容しつつ、軽く見えすぎる場合は専用GPTs側で随時制約する
- **次にやること**: 反応データを蓄積し、表現許容範囲の最終確定を判断する
- **振り返り**: （後から追記）

---

### [2026-05-04] キャリアニュースラボ（@career_news_lab）を立ち上げた

- **決めたこと**: 将来検討としていた採用系アカウントを、キャリアニュースラボ（@career_news_lab）として正式に立ち上げた
- **補足（ターゲット変更）**: 当初は新卒・就活支援アカウントを検討していたが、新卒限定にせず新卒/第二新卒/若手転職層をメインターゲットとする方針に変更した
- **コンセプト**: 「採用ニュースを、キャリアのヒントに。」
- **位置づけ**: AI Shift Labと同じSNS自動化思想を使うが、情報源・選定基準・GPTs・テンプレートが完全に異なる独立メディア。AI Shift Labと情報は混在させない。
- **詳細**: `02_sns/career_news_lab.md` 参照
- **次にやること**: SNS_AUTO_RESEARCH_CAREER_NEWS_LAB を構築し、投稿を開始する
- **振り返り**: （後から追記）

---

### [2026-05-04] キャリアニュースラボ用に SNS_AUTO_RESEARCH_CAREER_NEWS_LAB を別スプシとして作成する方針にした

- **決めたこと**: 既存の SNS_AUTO_RESEARCH（AI Shift Lab用）と混ぜず、専用スプシを新設する
- **理由（主要なもの）**:
  - 情報源・選定基準・テンプレート・プロンプト・投稿トーンが全て異なる
  - 同一スプシに混ぜるとApps Scriptの条件分岐が複雑化する
  - エラー時の影響範囲を分離できる
  - 将来的な外注・共有もしやすい
- **基本構成**: AI Shift Lab用スプシを踏襲（sources → post_drafts まで同じ構造）
- **ステータス**: 構築予定 / 未構築
- **振り返り**: （後から追記）

---

### [2026-05-05] SNS_AUTO_RESEARCH_CAREER_NEWS_LAB の実装が完了した

- **決めたこと**: AI Shift Lab用 SNS_AUTO_RESEARCH を複製し、キャリアニュースラボ用として実装・調整が完了した
- **主な変更内容**:
  - メニュー名を `CAREER_NEWS_LAB` に変更
  - `sources` をキャリア/採用/HR系RSSへ差し替え
  - AI一次選定・投稿設計図・ドラフト作成の各プロンプトをキャリアニュースラボ用に変更
  - `normalizePostTemplate_` をキャリア用テンプレートに変更
- **追加した関数**: `inferPostTemplateFromFinalText_` / `syncManualFinalPostTemplatesFromLabelsMVP`
- **追加したメニュー**: `manual_final_posts メタ情報補完` / `manual_final_posts post_template補正`
- **ステータス変更**: 構築予定 → 構築済み・調整完了
- **詳細**: `02_sns/career_news_lab.md` 参照
- **振り返り**: （後から追記）

---

### [2026-05-05] manual_final_posts.post_template を冒頭ラベルから自動補正する方針に確定した

- **決めたこと**:
  - `post_drafts.post_template` は下書き段階の**仮分類**として扱う
  - `manual_final_posts.post_template` は完成文の冒頭ラベルを正とした**最終分類**として扱う
  - 分析・比較に使うのは `manual_final_posts.post_template`
- **理由**: GPTsで最終編集した後に投稿の切り口が変わることがある。完成文の冒頭ラベルが最も実態を正確に反映するため
- **実装**: `inferPostTemplateFromFinalText_` で冒頭ラベルから post_template を推定し、`syncManualFinalPostTemplatesFromLabelsMVP` で一括補正できるようにした
- **対応表**: 冒頭ラベル → post_template の7対応（詳細は `career_news_lab.md` の「post_template 分類ルール」参照）
- **振り返り**: （後から追記）

---

### [2026-05-05] AI Shift LabのX投稿時にURLをメイン本文から削除する運用に変更した

- **以前の方針**: 元記事URLを投稿文末に含めて投稿する（暗黙のルール）
- **変更内容**:
  - GPTs出力・`manual_final_posts.final_text` にはURLを残す（auto補完のキーになるため）
  - X投稿時はメイン本文からURLを削除する
  - 必要な場合のみ、返信で「出典：\nURL」の形式で出典を投稿する
- **理由**: URLがあると投稿のリーチが下がる可能性への対応
- **影響なし**: `manual_final_posts` の自動補完の仕組みはURLをキーにしているため、`final_text` 内のURLは引き続き必要
- **振り返り**: （後から追記）

---

### [2026-05-05] post_drafts / manual_final_posts に出典注意情報列を追加し、Apps Scriptで自動生成・補完するようにした

- **決めたこと**:
  - `post_drafts` に3列追加：`source_caution` / `source_caution_reason` / `source_evidence_type`
  - `manual_final_posts` に4列追加：上記3列 + `image_filename`
  - Apps Scriptが `post_drafts` 生成時に上記3項目を自動生成
  - `manual_final_posts` への貼り付け時、URL照合で `post_drafts` から3項目を自動補完
  - `image_filename` は手入力のみ（自動補完しない）
- **理由**: 投稿時に出典の信頼性・根拠の種類を把握できるようにする。GPTsが投稿時の注意として提示する情報の基になる。
- **振り返り**: （後から追記）

---

### [2026-05-05] AI Shift Labの画像運用方針を確定した

- **決めたこと**:
  - 画像は毎回生成せず、ユーザーが明示した場合のみ別途GPTsに依頼する
  - 保存したくなる1枚資料・図解を目指す（記事の単なる要約画像にしない）
  - 画像には出典名・URLを入れない
  - 実在人物の顔・ニュース写真風・実在プロダクト画面の捏造・記事にない数字や出来事は避ける
  - 画像ファイルはGoogle Driveに保存し、`manual_final_posts` には `image_filename` だけ記録する
- **振り返り**: （後から追記）

---

### [2026-05-06] 投稿画像の保存フォルダ構造と image_filename 運用を確定した

- **決めたこと**:
  - 投稿画像はアカウント別・月別のフォルダに保存する
  - AI Shift Lab：`SNS_POST_IMAGES/AI_Shift_Lab/YYYY-MM`
  - Career News Lab：`SNS_POST_IMAGES/Career_News_Lab/YYYY-MM`
  - 投稿と画像の紐づけは `manual_final_posts.image_filename` で管理する
  - `image_filename` にはファイル名のみを記録する（フルパスは記録しない）
  - ファイル名はChatGPTからダウンロードした名前をそのまま使用する（例：`ChatGPT Image 2026年5月5日 13_54_27.png`）
  - `image_filename` は手入力のみ（Apps Script自動補完対象外）
  - 補足：現在 `image_filename` は `manual_final_posts` の O列
- **理由**: アカウント間・期間間の画像混在を防ぎ、ファイル名から投稿を特定しやすくする
- **振り返り**: （後から追記）

---

### [2026-05-06] Career News Lab に AI Shift Lab と同様の新運用を適用し、実装・テストが完了した

- **決めたこと**: Career News Lab（SNS_AUTO_RESEARCH_CAREER_NEWS_LAB）にAI Shift Lab側で確立した以下の運用をすべて適用した
- **実装内容**:
  - `post_drafts` に3列追加：`source_caution` / `source_caution_reason` / `source_evidence_type`（Apps Scriptが自動生成）
  - `manual_final_posts` に4列追加：上記3列 + `image_filename`（source_caution系3列はURL照合で自動補完、image_filenameは手入力のみ）
  - `normalizeSourceCaution_()` / `normalizeSourceEvidenceType_()` を追加
  - `fillManualFinalPostMeta_()` を修正し、manual_final_posts への貼り付け時に source_caution 系3列を自動補完するよう対応
  - 1日3回の自動実行トリガー（6時・12時・19時）を再設定
- **URL運用**: AI Shift Lab同様に統一
  - GPTs出力・manual_final_posts.final_text にはURLあり完成文を保存
  - X投稿時はメイン本文からURLを削除
  - 必要な場合のみ返信で出典URLを投稿
- **GPTs**: 3パート出力形式（投稿文・出典注意・返信用出典）に対応。指示文は圧縮版でFIX。詳細版の原文はチャット側にバックアップ済み。
- **画像**: 明示依頼時のみ生成・Drive保存（SNS_POST_IMAGES/Career_News_Lab/YYYY-MM）・image_filename手入力（前回記録済みの方針を実装）
- **テスト済み**: post_drafts 生成・manual_final_posts 自動補完ともに動作確認済み
- **振り返り**: （後から追記）

---

### [2026-05-06] Career News Lab の GPTs指示文・Apps Script全文を 02_sns/backups/ にバックアップした

- **決めたこと**:
  - `02_sns/backups/` フォルダを新設し、全文バックアップ専用の置き場とした
  - `career_news_lab_gpts_instruction_current.md`：GPTs圧縮版指示文の全文
  - `career_news_lab_apps_script_current.md`：Apps Script全文（コードブロック形式）
- **管理方針**: `_current` 形式で最新版を上書き管理。ファイル冒頭に更新日・用途・変更概要を記載する。
- **復元手段**: Google Driveのバージョン履歴も併用し、過去バージョンへの復元も可能にする。
- **将来の拡張**: AI Shift Lab側のバックアップも同じ命名規則（`ai_shift_lab_gpts_instruction_current.md` 等）で同フォルダに追加予定。
- **振り返り**: （後から追記）

---

### [2026-05-06] AI Shift Lab のGPTs指示文・Apps Script全文バックアップ枠を作成した

- **決めたこと**:
  - `02_sns/backups/ai_shift_lab_gpts_instruction_current.md` を作成
  - `02_sns/backups/ai_shift_lab_apps_script_current.md` を作成
  - `_current` 形式で最新版を上書き管理する
  - GPTs指示文全文とApps Script全文はユーザーが手動で貼り付ける
  - Google Driveのバージョン履歴も併用して復元可能にする
  - Career News Labと同じバックアップ管理ルールに揃える

---

### [2026-05-06] AI Shift Lab / Career News Lab の全文バックアップ体制が完全に揃った

- **決めたこと**:
  - 4ファイルすべてに本文が入り、プレースホルダーが残っていないことを確認済み
  - 対象ファイル：
    - `02_sns/backups/ai_shift_lab_gpts_instruction_current.md`
    - `02_sns/backups/ai_shift_lab_apps_script_current.md`
    - `02_sns/backups/career_news_lab_gpts_instruction_current.md`
    - `02_sns/backups/career_news_lab_apps_script_current.md`
  - AI Shift Lab側は `sns_strategy.md` から参照済み
  - Career News Lab側は `career_news_lab.md` から参照済み
  - 今後は `_current` ファイルを最新版バックアップとして上書き管理する
  - 更新時は各ファイル冒頭の最終更新日・変更概要を更新する
  - 過去版はGoogle Driveのバージョン履歴も併用して復元可能にする
- **振り返り**: （後から追記）

---

### [2026-05-06] AI Shift Lab専用GPTs指示文を改訂した（v2）

- **決めたこと**: AI Shift Lab専用GPTs指示文を以下の方針で改訂し、バックアップ（`ai_shift_lab_gpts_instruction_current.md`）をv2として更新した
- **変更理由**: 初期運用を経て、投稿が長くなりすぎる・箇条書きが多用される・【返信用】が毎回出るなどの問題が出てきたため、投稿品質の安定化を目的に方針を明確化した
- **主な変更点**:
  - 投稿文の長さ：400〜650字程度を目安とする（1投稿1メッセージに絞る）
  - 箇条書き：必須ではなく、使う場合は原則3つまで。記号は「・」に統一
  - 投稿構成：毎回同じ型にしない（箇条書きなしの流れも可）
  - 出典名：本文に無理に入れない
  - 【返信用】：数値・調査・資金調達・法規制・医療・セキュリティ・訴訟・決算など、一次情報確認の必要性が高い場合のみ出す。技術紹介・機能紹介・一般的な業務活用記事では原則必須ではない
  - 画像：明示依頼時のみ。横長16:9の保存型図解を基本とする
- **最新方針**: 上記すべてが `ai_shift_lab_gpts_instruction_current.md`（v2）および `sns_strategy.md` に反映済み
- **今後の注意点**: Career News Lab側のGPTs方針は今回変更しない。Career News Labは冒頭ラベル・導線・採用文脈で別仕様を維持する
- **振り返り**: （後から追記）

---

### [2026-05-06] image_filename の運用を手入力から Apps Script 自動採番に変更した

- **変更したこと**: AI Shift Lab / Career News Lab 両方の `manual_final_posts.image_filename` を、手入力から Apps Script 自動採番に変更した
- **変更理由**: 手入力では入力漏れ・表記揺れが起きやすかった。`final_text` 貼り付けのタイミングで自動採番することで、投稿との紐づけが確実になる
- **新しい形式**: `YYYYMMDD-連番2桁`（例：`20260506-01`）。拡張子はスプレッドシートに入れない
- **採番条件**: URLあり・post_drafts照合成功のみ。既存 `image_filename` は上書きしない
- **Drive運用**: 画像保存時に、Drive上のファイル名を `image_filename` の値に合わせる
- **既存方針への影響**:
  - `final_posts` / `ai_review` 廃止：影響なし
  - `manual_final_posts` 最終台帳：影響なし
  - Apps Script自動化範囲（post_draftsまで）：影響なし（採番は `fillManualFinalPostMeta_()` 内で処理される）
  - Career News Lab 独自の post_template 冒頭ラベル補正：影響なし
- **振り返り**: （後から追記）

---

### [2026-05-06] AI Shift Lab専用GPTs指示文を v2.1 に更新した

- **変更したこと**: AI Shift Lab専用GPTs指示文を v2.1 に改訂し、バックアップを更新した
- **変更理由**:
  - v2運用後、箇条書き形式の方が読みやすい投稿が多いと判断し、「必須ではない」から「原則として使う」に方針転換した
  - 初期フェーズでは、信頼感を守りすぎるより、まずXで読まれることを優先する方針とした
  - 口語表現の許容範囲と、慎重テーマでの表現制限を曖昧なままにせず明文化した
  - 画像生成ルールをより具体化し、ブランド署名・レイアウト固定回避・ロゴ風表現回避を明記した
- **v2 → v2.1 の主な差分**:
  - 箇条書き：「必須ではない」→「原則として使う」（3つまで・「・」統一は維持）
  - 投稿構成：「箇条書きなしも可」→「箇条書きを基本、なしは例外扱い」
  - 表現方針：「暫定」を解除。口語OK・慎重テーマ例外を確定
  - 画像：画像右下にアカウント表記（`AI Shift Lab｜@ai_shift_lab_r`）を追加・レイアウト固定解除・実在企業ロゴ禁止・©表記・AI生成表記禁止
- **Career News Lab側への影響**: なし。Career News Lab専用GPTsは今回変更しない
- **振り返り**: （後から追記）

---

### [2026-05-08] AI Shift Labのアカウント方向性を「AIニュース解説」から「AIの話題を面白く届ける」に変更した

- **変更したこと**:
  - 表示名を「AI Shift Lab｜AIの話題を面白く」に変更
  - コンセプトを「難しいAIの話題を、初見でも『これ面白い』と思える形に変えて届けるアカウント」に刷新
  - プロフィール文・ヘッダーコピー・固定ツイートコピーを全面更新
  - 投稿対象を「AIニュース」から「AIの話題」全般（ニュース/ツール/研究/ビジネス活用/SNS動画/引用等）に拡張
  - ブランドキャラクター（白いロボット型）を導入し、アイコン・ヘッダー・固定ツイート画像を作成
  - AI Shift Lab専用GPTsバックアップは、ヘッダー・本文ともにv2.2確定版へ更新済み。
- **変更理由**:
  - 「ニュース」に限定すると「URL付き記事紹介アカウント」の印象が強くなりやすく、投稿の自由度が下がる
  - 「AIの話題を面白く届ける」方が、SNSで読まれやすい形への変換を優先できる
  - v2.2の投稿方針「ラフだけど事実は崩さず、初見で止まる投稿」に合わせてアカウント全体を整合させた
- **GPTs v2.2 の投稿の核**: AIの話題を「説明」するのではなく、「この話題、こう見ると面白い」に変換する
- **パイプライン上の注意**: URLなし話題紹介・引用投稿・SNS動画起点の投稿は自動化パイプライン外の手動投稿となる。`manual_final_posts` に手動で記録する方針。`post_drafts` を経由しないため、`image_filename` 自動採番は適用されない。
- **Career News Labへの影響**: なし
- **振り返り**: （後から追記）

---

### [2026-05-08] AI Shift Labの画像運用方針とGPTs指示文を大幅改訂した（v2.2）

- **変更したこと**:
  - 画像を「拡散型アイキャッチ」と「保存型図解」の2タイプに整理し、使い分け方針を明確化
  - 初期フェーズの推奨比率を「拡散型7割 / 保存型3割」に設定
  - 画像生成を原則1投稿1枚に統一（複数枚はユーザーが明示した場合のみ）
  - サイズ方針を「正方形・縦長基本 / 横長は原則使わない」に変更（従来は横長16:9基本）
  - AIっぽい抽象画像への偏りを禁止。「何が変わりそうか」が伝わる構図を優先
  - ブランドキャラクターを通常投稿画像では原則不使用とする（廃止ではなく用途を限定）
  - GPTs指示文からキャラクター項目を削除済み
  - フックラベルを拡充・強化
  - GPTs指示全体を軽量化。URL運用ルールの重複を削減
- **変更理由**:
  - 新規フォロワー獲得フェーズでは拡散力と投稿量の確保が優先
  - キャラクター画像は生成コストが高く、毎投稿への適用は量産性を下げる
  - 画像タイプを明確に分けることで、GPTsへの指示と判断が迷いなく出せる
- **Career News Labへの影響**: なし
- **振り返り**: （後から追記）

---

### [2026-05-11] 開業日を2026-05-01とした

- **決めたこと**: RAPTOVAの開業日を 2026-05-01 として扱う。
- **理由**: 開業手続きの整理・運用上の基準日として固定するため。
- **次にやること**: 開業関連の手続き・証跡・次アクションを `01_admin/tax_opening_2026.md` に集約し、普段参照は `raptova.md` に要点のみ残す。
- **振り返り**: （後から追記）

---

### [2026-05-11] 法人取引を想定し、開業初期にインボイス登録申請も行う方針にした

- **決めたこと**: 法人相手の取引を想定し、開業初期にインボイス登録申請も行う方針とした。
- **理由**: 想定取引に備え、初期段階で登録プロセスを進めておくため。
- **次にやること**: e-Tax「通知書等」に届く登録通知書で登録番号・登録日等を確認し、証跡を保存する。
- **振り返り**: （後から追記）

---

### [2026-05-11] インボイス公表情報は屋号RAPTOVAのみ追加公表し、住所等は公表しない方針にした

- **決めたこと**: インボイスの公表情報は屋号（RAPTOVA）のみ追加公表し、自宅住所・事務所所在地等は追加公表しない方針とした。
- **理由**: 法人取引上の利便性と、個人情報（所在地等）の露出を抑える方針を両立するため。
- **次にやること**: 登録通知書の到着後、公表内容に屋号が反映されているかを確認する。
- **振り返り**: （後から追記）

---

### [2026-05-11] 初期受託獲得チャネルとしてランサーズを整備し、文章資産を横展開できる形で保管する方針にした

- **決めたこと**: 初期受託獲得チャネルとしてランサーズを優先的に整備し、プロフィール/パッケージ/営業文面などの文章資産を「コア本文＋可変ブロック」の形で保管して横展開する方針にした。
- **理由**: 初期フェーズで実績作り・顧客理解・提案力向上・制作フロー構築を進めつつ、クラウドワークス/ココナラ/提案文にも再利用できる状態を作るため。
- **次にやること**: `01_admin/crowdsourcing_lancers_2026.md` を原本として更新し、媒体ごとの差分は可変ブロックで管理する。
- **振り返り**: （後から追記）

---

### [2026-05-11] クラウドソーシング上の見せ方の原則（盛らない・保証しない等）を固定した

- **決めたこと**: 実績以上に盛らない、成果保証しない、断定表現（CVR最大化/売上アップ確約等）を避ける、高度な開発者に見えすぎない、単純作業や何でも屋に寄せすぎない、AI任せの制作代行に見せない、というガードレールを固定した。
- **理由**: 初期獲得のために信頼を削る表現に寄せず、提供価値（課題/要件整理〜「誰に、何を、どう伝えるか」の設計）と整合させるため。
- **次にやること**: プロフィール/パッケージ/提案文の更新時に、ガードレールから逸脱していないか確認する。
- **振り返り**: （後から追記）

---

### [2026-05-12] 初期事業の主軸を採用基盤・制作物・運用支援に置く方針に変更した

- **以前の方針**:
  - `raptova.md` / `strategy_full.md` に沿い、**採用領域での事業**および**既存業務（マイナビ採用支援・掲載営業）の延長線上での起業**は避ける方針としていた。
  - 採用領域は結果責任が重く個人では抱えきれないこと、退職の意味が薄れる延長起業になり得ること、を避けたかった。
- **今回の変更内容**:
  - **初期事業として**、採用活動の立ち上げに必要な**採用基盤・制作物・運用支援**を主軸に進める。
  - 採用媒体そのものによる母集団形成を代替するのではなく、採用に金をかける前の**受け皿整備**や**歩留まり改善に効くアウトプット**の支援として位置づける。
- **変更理由**:
  - **採用媒体による母集団形成を代替するのではなく**、企業側の**受け皿**・**歩留まり改善**を支援するスコープに限定できるため、従来の「採用領域を避ける」意図（重い結果責任・媒体型の延長）と両立しやすい。
  - **採用経験を入口**にしつつ、**AI活用**により**低コスト・短納期**で制作物一式を整えられるため、単なる高額採用ブランディング制作屋ではなく「初期装備」を届けられる。
  - **将来的に採用を入口**に、コーポレートサイト・営業資料・サービスLP・販促・マーケティングなど**企業の情報発信全体**へ広げられるため、RAPTOVAを「Web制作会社」ではなく**情報発信ツールをまとめて整える事業**として見せていける。
- **最新方針**:
  - **避ける**: 採用**成果保証**、採用媒体の**代替（母集団形成の代行）**、純粋な**採用代行**（採用部門の代行・採用プロセス全体の請け負いに寄せすぎること）。
  - **やる**: 採用LP、採用サイト、インターンLP、会社説明会資料、求人票改善、スカウト・メール文面、**月額運用支援**（サイト更新・文面・求人票の継続改善など）など。
- **次にやること**:
  - RAPTOVA公式HPを今回の事業方針に合わせて修正する（`raptova_hp.md` および実サイト）。
  - 仮想企業を1社設定し、**採用LP制作**を検証する。
  - 同じ仮想企業で**会社説明会スライド制作**を検証する。
  - 将来的に**採用メール・スカウト文面作成アプリ**の構成を検討する。
- **振り返り**: （後から追記）

---

### [2026-05-13] RAPTOVAのブランド中核（理念・MVV・事業定義）を確定し、採用は「最初の重点領域」として整理した

- **以前の整理（2026-05-12 前後まで）**:
  - `raptova.md`・`raptova_hp.md` では、**採用基盤支援**が前面に出る一文・サイト目的の書き方になっており、AIが読んだとき **「RAPTOVA＝採用支援会社」** に寄って見えやすかった。
  - 事業としての**全体定義**（何の会社か）より、**採用での実装**の説明が先に立っていた。
- **今回の変更内容**:
  - **採用支援会社として定義しない**。RAPTOVA全体の立て付けを **「AIによる変化を遠い未来の話で終わらせず、目の前の仕事を前に進める力に変えていくブランド」** に固定した（企業理念・Mission・Vision・Value・事業定義・Brand Statement は `strategy_full.md` に全文、`raptova.md` に要点）。
  - **採用支援**は全体定義ではなく、**思想を最初に実装する重点領域**として位置づけた（なぜ先に採用かのストーリーも `strategy_full.md`）。
  - **キャッチコピー**を **Make Work Move.** ＋サブコピーでフィックス。**キャッチに「AI」は入れない**（伝えたいのはツールではなく、現実の仕事が進むこと）。
  - **公式HP**は「採用サイト」ではなく **RAPTOVAブランドサイト**として再設計。トップでは **3つの事業領域**（Recruiting Support / Business Creative / Workflow Design）で見せ、採用は **1番目だが細目は深掘りページ**へ。デザインは **エディトリアル × ラグジュアリー × AIクリエイティブ** など（詳細は `raptova_hp.md`）。
- **変更理由**:
  - 誤認（採用会社・制作会社のみ）を減らし、**思想と実装**の両方をサイトで伝えるため。
  - 2026-05-12 の **採用基盤のスコープ（やる／避ける）** は有効なので**維持**しつつ、**上位概念**を追加して整合させるため。
- **最新方針**:
  - **RAPTOVA** = AIで仕事を前に進める会社（表現の詳細は MVV・事業定義）。
  - **採用** = 最初の重点領域・優先実装。成果保証・媒体代替・純代行は引き続き避ける（`raptova.md` のスコープ）。
  - **HP** = ブランドサイト。モックは実装のベース、Hero／Statement のビジュアルは画像アセット前提（`raptova_hp.md`）。
- **次にやること**:
  - 実サイト・モックを今回の IA・コピー・デザイン方針に合わせて反映する。
  - 採用ドメインの**下層ページ**で、従来整理したキーワード・サービス細目を展開する。
- **振り返り**: （後から追記）

---

### [2026-05-13] 公式HPトップのレスポンシブ実装判断（横スクロールの再発防止）

- **決めたこと**: **〜1439px は縦積み**、**1440px以上で PC 左右分割**。小幅では **横スクロールを最優先で潰す**。横溢れは **ページ全体**（ルート〜各セクション〜flex/grid 子）として扱い、背景ブロックは **外側フル幅／内側に最大幅と中央寄せ**の二層に固定する。
- **理由**: iPhone 17 実機で横スワイプ・右余白・Contact/Footer の見切れが残り、単一セクションの微修正だけでは再発しうるため。
- **次にやること**: `01_projects/raptova_hp.md` の短期タスク（デザインフレーム全体、文言、Hero 固定、下層、Projects、画像アセット等）を継続。
- **詳細（検証・変更ファイル・補足方針）**: `01_projects/raptova_hp.md` の「レスポンシブ・レイアウト（実装メモ／2026-05-13）」を参照。
- **振り返り**: （後から追記）

---

<!-- 新しいログはこの下に追加 -->
---

## 2026-05-20：HP 問い合わせメール・SEO・MEMORY同期

- **決定（メール）**: 公開サイトの Contact 宛先を **info@raptova.com** に統一。
- **理由**: 公式ドメインに合わせ、ブランドとしての一貫性。
- **実装**: `lib/config.ts` の `SITE_CONFIG.email` / `MAILTO_HREF`。

- **決定（SEO）**: `app/sitemap.ts` + `public/robots.txt` を追加。Coming Soon の `/projects/ai-sns-operation` と `/projects` リダイレクトはサイトマップ除外。
- **OGP**: 現状の `ogp-default.png` を維持（ロゴ差し替えは別タスク）。

- **MEMORY運用（更新）**: 正本は Google Drive。**Google Drive for Desktop** で **`G:/マイドライブ/RAPTOVA_AI_MEMORY`** に同期されていれば、エージェントは **`scripts/push-ai-memory-to-drive.mjs`** または当該パスへの直接書き込みで更新可。HP リポジトリ内 **`docs/RAPTOVA_AI_MEMORY_DRIVE_SYNC/`** は作業用ミラー。

---

## 2026-05-20：TOP Projects データ統合と MEMORY 実装監査

- **決定（TOP Projects）**: トップ `#projects` と Header ドロップダウンの一覧データを **`lib/projects/top-projects.ts`** の **`TOP_PROJECTS`** に統一。
- **理由**: `lib/config.ts` との責務分離。TOP とナビの二重管理を防ぐ。
- **実装（`21ec97b`）**: `PROJECTS_ITEMS` / `BUSINESS_ITEMS` を `lib/config.ts` から削除。TOP 03/04 を Recruiting Support / Workflow Design（COMING SOON）に変更。`/projects/ai-sns-operation` は Coming Soon ページとして残し、TOP・サイトマップから除外。
- **MEMORY監査（同日）**: MEMORY と HP 実装の確認を実施。`raptova_hp.md` に TOP Projects 統合を記載、favicon 生成スクリプト 2 本の記載を統一、Drive 更新経路を本文に反映。

---

## 2026-05-20：HP 運用・実装索引の MEMORY 追記

- **背景**: MEMORY 監査で、方針・設計は充実しつつ、運用・技術スタック・実装マップ・設計 vs 実装の差分が未整理だった。
- **追記内容（`raptova_hp.md`）**:
  - **`## 公式サイトの概要`**: URL / GitHub / Vercel / 本番反映フロー
  - **`## 技術スタック・開発メモ`**: Next.js 16 等、`AGENTS.md` 編集ルール
  - **`## 実装マップ`**: 各ページのコンポーネント構成とデータ源
  - **`## 設計 vs 実装`**: Philosophy 未実装、Statement Hero 統合、Hero 実装済みなど
- **理由**: AI ・協力者が MEMORY のみで HP 制作に着手できるよう、「コードが正本」と「設計の未実裝」を分離記載する。
