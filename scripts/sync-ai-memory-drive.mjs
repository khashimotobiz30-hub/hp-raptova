/**
 * Build updated RAPTOVA_AI_MEMORY files for manual upload to Google Drive.
 * Usage: node scripts/sync-ai-memory-drive.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const OUT = 'docs/RAPTOVA_AI_MEMORY_DRIVE_SYNC';

function ensureDir(p) {
  mkdirSync(dirname(p), { recursive: true });
}

function writeOut(rel, content) {
  const path = join(OUT, rel);
  ensureDir(path);
  writeFileSync(path, content, 'utf8');
  return path;
}

// --- README (download fresh if missing) ---
let readme = '';
try {
  readme = readFileSync('.tmp-readme.md', 'utf8');
} catch {
  readme = readFileSync(join(OUT, 'README.md'), 'utf8');
}

readme = readme.replace(
  /> \*\*最終更新\*\*: 2026-05-18[^]*?\n\nAIに毎回/,
  `> **最終更新**: 2026-05-20（\`raptova_hp.md\`：SEO・問い合わせメール・5月レスポンシブ追記／\`raptova.md\`・\`decision_log.md\`：ロゴ方針・HP実装ログ／README：本行）

AIに毎回`,
);

writeOut('README.md', readme);

// --- raptova_hp.md ---
let hp = readFileSync('.tmp-raptova-hp.md', 'utf8');

const hpStatusInsert = `
- **問い合わせメール（2026-05-20）**: **\`info@raptova.com\`**（\`lib/config.ts\` → \`MAILTO_HREF\`）。旧 \`k.hashimoto.biz30@gmail.com\` から差し替え済み。
- **SEO（2026-05-20）**: \`app/sitemap.ts\`（\`/\` \`/about\` \`/business\` \`/projects/raptova-website\` \`/projects/questoria\`）、\`public/robots.txt\`。OGP は \`ogp-default.png\` のまま。
- **レスポンシブ追記（2026-05-18〜20・コードベース）**: TOP Hero / Statement（1024×1366・1440+）、TOP About（\`RevealAnimation\` 構造）、About ページ Profile 画像 SP 全幅、\`globals.css\` の grid フォールバック（\`top-hero-split\` 等）。詳細は HP リポジトリ \`git log\` 参照。
- **コード品質（2026-05）**: 不要 \`'use client'\` 削除、\`CaseStudyDetailItem\` 判別共用体、Header \`inert\`、BusinessApproach sm 5列、他（Claude Code レビュー対応）。
- **再生成スクリプト（HPリポジトリ）**: \`scripts/generate-favicon-ico.mjs\`、\`scripts/generate-apple-touch-icon.mjs\`（\`public/logos/raptova-icon-favicon.svg\` ベース）。
- **Git（HP）**: コミット \`21ec97b\`「サイト改善: レスポンシブ修正、SEO、コンタクトメール更新など」。**未コミットの可能性**: \`app/favicon.ico\` / \`app/icon.svg\` / \`public/logos/\` / \`apple-touch-icon.png\` / 生成スクリプト（\`git status\` で要確認）。
`;

if (!hp.includes('info@raptova.com')) {
  hp = hp.replace(
    '- **ロゴ / favicon（2026-05-20）**:',
    `${hpStatusInsert}\n- **ロゴ / favicon（2026-05-20）**:`,
  );
}

hp = hp.replace(
  /> 初期作成: 2026-05-01 \/ \*\*最終更新: 2026-05-20\*\*（\*\*ロゴ \/ favicon/,
  '> 初期作成: 2026-05-01 / **最終更新: 2026-05-20**（**SEO・問い合わせメール・5月レスポンシブ**／**ロゴ / favicon',
);

const faviconSectionAdd = `
- **\`scripts/generate-favicon-ico.mjs\`**: 追加済み（favicon.ico の再生成可能）。
`;

if (!hp.includes('generate-favicon-ico.mjs')) {
  hp = hp.replace(
    '- **`scripts/generate-apple-touch-icon.mjs`**: 追加済み',
    `- **\`scripts/generate-apple-touch-icon.mjs\`**: 追加済み${faviconSectionAdd}`,
  );
}

writeOut('01_projects/raptova_hp.md', hp);

// --- decision_log append ---
const decisionAppend = `
---

## 2026-05-20：HP 問い合わせメール・SEO・MEMORY同期

- **決定（メール）**: 公開サイトの Contact 宛先を **info@raptova.com** に統一。
- **理由**: 公式ドメインに合わせ、ブランドとしての一貫性。
- **実装**: \`lib/config.ts\` の \`SITE_CONFIG.email\` / \`MAILTO_HREF\`。

- **決定（SEO）**: \`app/sitemap.ts\` + \`public/robots.txt\` を追加。Coming Soon の \`/projects/ai-sns-operation\` と \`/projects\` リダイレクトはサイトマップ除外。
- **OGP**: 現状の \`ogp-default.png\` を維持（ロゴ差し替えは別タスク）。

- **MEMORY運用**: 正本は Google Drive。Cursor からの直接書き込みは不可のため、\`docs/RAPTOVA_AI_MEMORY_DRIVE_SYNC/\` に更新案を出力し Drive へ手動反映する。
`;

let decision = '';
try {
  decision = readFileSync('.tmp-decision_log.md', 'utf8');
  if (!decision.includes('2026-05-20：HP 問い合わせメール')) {
    decision = decision.trimEnd() + decisionAppend;
  }
} catch {
  decision = `# decision_log.md\n${decisionAppend.trim()}\n`;
}

writeOut('00_core/decision_log.md', decision);

// --- raptova.md: copy from download (already current) ---
try {
  const raptova = readFileSync('.tmp-raptova.md', 'utf8');
  writeOut('00_core/raptova.md', raptova);
} catch {
  // skip
}

// --- Instructions ---
writeOut(
  'UPLOAD_TO_DRIVE.md',
  `# Drive へ反映する手順

1. [RAPTOVA_AI_MEMORY フォルダ](https://drive.google.com/drive/folders/16q09cnfP8EXVEYd84eIDwEtAXi64e66h?usp=sharing) を開く
2. このフォルダ内の同名ファイルを **上書き**（README.md、01_projects/raptova_hp.md、00_core/decision_log.md）
3. \`00_core/raptova.md\` は Drive 上が既に 2026-05-20 なら **差分確認後** 必要時のみ上書き

## 今後 Cursor から Drive を直接更新するには

**Google Drive for Desktop** で \`RAPTOVA_AI_MEMORY\` を PC に同期し、その **ローカルパス**をチャットで共有してください。  
例: \`C:\\Users\\あなた\\Google Drive\\RAPTOVA_AI_MEMORY\`

同期フォルダがあれば、エージェントはそこへ直接 \`.md\` を書き込めます（Drive へ自動同期されます）。
`,
);

console.log('OK: wrote', OUT);
