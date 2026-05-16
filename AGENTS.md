<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# リポジトリ作業ルール（エンコーディング・日本語ファイル）

このリポジトリで作業する **エージェント**（Cursor / Claude Code / その他 LLM ベースの編集ツール）と **人間** が従うルール。

最終更新: 2026-05-16

## 責務の分担（エージェント vs 人間）

| 対象 | エージェント | 人間 |
|------|--------------|------|
| 日本語を含む（または含みうる）ソースの編集 | **§1 の禁止・許可経路に従う**（原則 Node スクリプト経由） | IDE（VS Code / Cursor）での手動編集・保存を推奨 |
| PowerShell での TS/TSX/MD の読み書き | **禁止**（§1.1） | 非推奨。やむを得ない場合は Node / IDE を優先 |
| `scripts/**/*.mjs` の作成 | **ASCII のみなら `Write` 可**（§1.2） | 通常どおり |
| 編集後の文字化けチェック | スクリプト末尾または専用チェックで **必須**（§1.3） | `git diff` で目視確認を推奨 |
| Git コミット | **ユーザー明示依頼時のみ**（§3） | 推奨タイミングでコミット（§3） |

---

## 1. 最優先ルール: 日本語を含むファイルの編集

### 1.0 「日本語を含むファイル」の定義

次の **いずれか** に該当するファイルは、本ルールの対象とする。

**A. パスベース（常に対象）**

- `app/**`
- `components/**`
- `lib/**`
- `styles/**`
- 上記配下の `*.tsx` `*.ts` `*.css`（プロジェクトのページ・UI ソース）

**B. 内容ベース（CJK 含有）**

- リポジトリ内の任意の `*.tsx` `*.ts` `*.md` `*.mdx` `*.json` で、ファイル本文に **CJK 文字**（`\p{Script=Han}` / ひらがな・カタカナ・漢字のいずれか）が 1 文字でも含まれるもの

**C. 除外（本ルールの直接編集対象外とみなしてよい例）**

- `node_modules/**` `.next/**` `dist/**` `build/**`
- 生成物・キャッシュ・バイナリ
- `.env*`（シークレット。別途 `.gitignore` で管理）

> 新規ファイルに初めて日本語を入れる場合も、保存経路は §1.1 / §1.2 に従う。

### 1.1 エージェントの禁止事項

- **PowerShell で対象ファイルを読み書きしない**
  - 禁止: `Set-Content` / `Out-File` / `>` リダイレクトによる上書き
  - 禁止: `(Get-Content ... -Raw) ... | Set-Content ...` の **読み→加工→書き戻しパイプライン全体**
  - `-Encoding utf8` 等を付けても **エージェントは使用しない**
- **エージェントの `StrReplace` / `Write` / `Edit` で、§1.0 の対象ファイルを直接書き換えない**
  - 変更内容が ASCII のみ（`className` 調整、import 並び替え等）でも禁止
  - 理由: 過去に UTF-8 復元後、ASCII のみの編集直後にファイル全体の日本語が `?` 化した事例がある。機序は未確定のため保守的に禁止（詳細は §4.3・§7）

**例外（エージェントが `Write` してよいもの）**

- `scripts/**/*.mjs` / `scripts/**/*.cjs` で、**ファイル内容が ASCII のみ** のもの（編集用 Node スクリプト、チェック用スクリプト）
  - スクリプト内の日本語は `\uXXXX` エスケープを使う

### 1.2 許可される編集経路

| 経路 | 誰 | 用途 |
|------|-----|------|
| Node スクリプト（`fs.writeFileSync(path, content, 'utf8')`） | エージェント | 自動編集は **これに統一** |
| `readFileSync` → 文字列置換 → `writeFileSync(..., 'utf8')` | エージェント | 部分変更 |
| `\uXXXX` エスケープを含む `scripts/**/*.mjs` | エージェント | スクリプト本体を ASCII に保つ |
| IDE（VS Code / Cursor）の手動編集と保存 | 人間 | 通常の開発 |
| 上記以外のエディタで UTF-8 保存 | 人間 | 可（PowerShell 経由の保存は非推奨） |

### 1.3 編集後の必須チェック

エージェントは、対象ファイルを変更した **スクリプトの末尾** で少なくとも以下を実行する。

```javascript
import { readFileSync } from 'node:fs';

function assertUtf8Content(path, options = {}) {
  const content = readFileSync(path, 'utf8');

  // 1) 典型的な文字化け（? の連続）
  if (/\?{4,}/.test(content)) {
    throw new Error(`Mojibake detected in ${path}: contains "????" sequence`);
  }

  // 2) ファイルごとの必須フレーズ（グローバル固定しない）
  const { mustInclude = [] } = options;
  for (const phrase of mustInclude) {
    if (!content.includes(phrase)) {
      throw new Error(`Missing expected phrase "${phrase}" in ${path}`);
    }
  }
}

// 例: BusinessApproach.tsx を触ったスクリプトの末尾
assertUtf8Content('components/business/BusinessApproach.tsx', {
  mustInclude: ['RAPTOVAは', '整理して、'], // ← 編集対象ごとにスクリプト内で指定
});
```

- `mustInclude` は **編集したファイルごとにスクリプト内で定義**する（リポジトリ全体の固定リストにしない）
- 将来的に CI を導入する場合は、同様のチェックをワークフローから呼び出す
- リポジトリ共通の入口: `node scripts/check-mojibake.mjs`

---

## 2. ファイル保存の標準形

### 2.1 Node スクリプトのテンプレート

```javascript
// scripts/example-edit.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const path = 'components/business/BusinessApproach.tsx';

// 部分変更の例
let content = readFileSync(path, 'utf8');
content = content.replace('lg:pt-14', 'lg:pt-20');
writeFileSync(path, content, 'utf8'); // ← 'utf8' は必須

// 検証（§1.3）
if (/\?{4,}/.test(readFileSync(path, 'utf8'))) {
  throw new Error(`Mojibake detected in ${path}`);
}
if (!readFileSync(path, 'utf8').includes('整理して、')) {
  throw new Error(`Missing expected content in ${path}`);
}

console.log(`OK: ${path}`);
```

### 2.2 BOM は付けない

UTF-8 BOM (`EF BB BF`) は Next.js / TypeScript / Tailwind では不要かつ害になりうる。  
`writeFileSync` のデフォルトのまま書く。BOM を付けない。

### 2.3 一時スクリプトの扱い

- 編集用 `scripts/*.mjs` は実行後 **削除してよい**（過去セッションと同様）
- 繰り返し使うチェックは `scripts/check-mojibake.mjs` として残す

---

## 3. Git 運用

### 3.1 追跡（推奨）

- `app/**` `components/**` `lib/**` `styles/**` のソースは **Git 追跡対象にする**（未追跡のままにしない）
  - 未追跡だと、文字化け時に `git show HEAD:path` で復元できない
- 追跡しないもの: `.env*` `node_modules/` `.next/` 等（`.gitignore` に従う）

### 3.2 コミット（推奨 / ユーザー承認時）

- **人間**: 大きな編集の前後でコミットすることを推奨。「壊れたかも」と思ったら `git diff` で確認
- **エージェント**: ユーザーが **明示的に依頼したときのみ** `git commit` する（無断コミットしない）
- エージェントは変更後、**`git diff` の内容をユーザーに提示**することを推奨

### 3.3 `.gitattributes`（初版）

リポジトリルートに置く想定（人間の改行・テキスト正規化用。**エージェントの保存バグは §1 で別途防止**）。

```
* text=auto

*.tsx text eol=lf
*.ts  text eol=lf
*.md  text eol=lf
*.mdx text eol=lf
*.json text eol=lf
*.css text eol=lf
```

- 初版では `working-tree-encoding=UTF-8` は **使わない**（Git バージョン差・過信を避ける）
- 必要になったら、チームで Git バージョンを確認したうえで別 PR で検討する

---

## 4. なぜこのルールか（背景）

### 4.1 初回の文字化け（PowerShell）

セッション初期に `components/business/*.tsx` を、`-Encoding` 未指定の `Get-Content` / `Set-Content` で一括処理した際、ファイルが壊れた。Windows PowerShell 5.x では、パイプライン全体が UTF-8 を保証しない。

### 4.2 焼き付きの形

壊れた結果は、多くの場合 **U+FFFD や不正 UTF-8 ではなく、ASCII `0x3F`（`?`）がソースにリテラルとして保存された状態**だった。復元スクリプトが `????` を検索キーにして動作した事実がこれを裏付ける。

### 4.3 再発（Cursor 直接編集）

UTF-8 で復元したあとも、Cursor の `StrReplace` / `Write` 経由で `BusinessApproach.tsx` が再び `?` 化した事例が複数回ある。当時のログでは、余白・`className` など **ASCII のみ** の `StrReplace` の直後に日本語が `?` 化する流れが繰り返し記録されている。

機序は完全には特定できていない（§7 参照）。

### 4.4 Node スクリプトが安全な理由

`fs.writeFileSync(path, content, 'utf8')` は、

- エンコーディングを明示できる
- スクリプト内を `\uXXXX` のみにすれば、スクリプト自体を ASCII でも正しい UTF-8 ファイルを生成できる

過去の復元はこの経路で成功している。

---

## 5. エージェント向け実行手順

日本語を含む（§1.0）`.tsx` 等の変更依頼を受けた場合:

1. **対象ファイルを `StrReplace` / `Write` / `Edit` しない**
2. `scripts/` に **ASCII のみ** の `.mjs` を `Write` してよい（§1.1 例外）
3. `node scripts/xxx.mjs` を実行
4. `node scripts/check-mojibake.mjs` および §1.3 のチェックを通す
5. `git diff` をユーザーに提示
6. コミットは **ユーザーが依頼した場合のみ**

---

## 6. やってはいけない例 / 推奨例

```powershell
# ❌ エージェント禁止: 読み→書きパイプライン
(Get-Content "components/business/BusinessApproach.tsx" -Raw) `
  -replace 'lg:pt-12', 'lg:pt-14' `
  | Set-Content "components/business/BusinessApproach.tsx" -NoNewline

# ❌ エージェント禁止: 書き込み単体も不可
$content | Set-Content "components/business/BusinessApproach.tsx" -Encoding utf8
```

```
# ❌ エージェント禁止: 対象 TSX の StrReplace（ASCII のみでも不可）
StrReplace path=components/business/BusinessApproach.tsx old="lg:pt-12" new="lg:pt-14"
```

```javascript
// ✅ エージェント推奨: scripts/ 経由（ASCII スクリプト + UTF-8 書き込み）
// scripts/update-approach-padding.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const p = 'components/business/BusinessApproach.tsx';
const c = readFileSync(p, 'utf8').replace('lg:pt-12', 'lg:pt-14');
writeFileSync(p, c, 'utf8');

const verify = readFileSync(p, 'utf8');
if (/\?{4,}/.test(verify)) throw new Error('Mojibake');
if (!verify.includes('整理して、')) throw new Error('Missing expected phrase');
```

```javascript
// ✅ エージェント可: scripts 自体は ASCII のみで Write
// scripts/update-approach-padding.mjs （内容は上記のとおり \u エスケープ可）
```

---

## 7. 未解決の論点

「Cursor `StrReplace` が **健全な UTF-8 ファイル**を ASCII だけ編集して `?` 化するのか、それとも **既に壊れていたファイル**を編集して壊れたままにしているだけか」は未確定。

**§1.1 の禁止範囲を緩めるか**は、この判別がついてから検討する。

判別の目安:

- 再発直前に `node scripts/check-mojibake.mjs` または `node -e` 等で `\?{4,}` が **false** であることを確認
- 健全な状態から `StrReplace` 1 回で壊れたケースが再現すれば、直接編集禁止を維持
- 既に壊れていたケースのみなら、復元徹底＋チェック強化で足りる可能性がある

判別がつくまでは **§1.1 を維持**する。
