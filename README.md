# Hono and Next.js Monorepo Template

Hono, Next.js, Better Auth, Turso, Drizzle ORMを使用したCloudflare Workers向けのテンプレート monorepoプロジェクトです。

## 📁 プロジェクト構造

このプロジェクトはpnpm workspaceを使用したmonorepo構成です。

```
.
├── apps/
│   └── api/          # Cloudflare Workers APIアプリケーション
├── package.json      # ルートパッケージ設定
├── pnpm-workspace.yaml  # pnpm workspace設定
└── README.md
```

### ワークスペース

- `apps/api` - HonoベースのCloudflare Workers APIアプリケーション

## 🛠 技術スタック

- **[Hono](https://hono.dev/)** - 高速なWebフレームワーク
- **[pnpm](https://pnpm.io/)** - パッケージマネージャー（workspace対応）
- **[Better Auth](https://www.better-auth.com/)** - 認証ライブラリ
- **[Turso](https://turso.tech/)** - エッジ向けSQLデータベース（libSQL）
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** - Cloudflare Workers開発ツール

## 🚀 セットアップ

### 必要な環境

- Node.js 24.0.0
- pnpm 10.20.0

### インストール

ルートディレクトリで以下のコマンドを実行して、すべてのワークスペースの依存関係をインストールします：

```bash
pnpm install
```

### 環境変数の設定

各アプリケーションの環境変数を設定します。

#### `apps/api/.env`

`apps/api/.env`ファイルを作成し、以下の環境変数を設定してください：

```env
TURSO_DATABASE_URL=your_turso_database_url
TURSO_AUTH_TOKEN=your_turso_auth_token
BETTER_AUTH_URL=http://localhost:8787
BETTER_AUTH_SECRET=your_secret_key_here
```

**ローカル開発の場合：**

ローカルSQLiteファイルを使用する場合は、以下のように設定します：

```env
TURSO_DATABASE_URL=file:./src/db/local/local.db
TURSO_AUTH_TOKEN=local
BETTER_AUTH_URL=http://localhost:8787
BETTER_AUTH_SECRET=your_secret_key_here
```

### データベースのセットアップ

#### Better Authスキーマの生成

Better Authのスキーマを生成します（既に作成されている場合は、編集した場合に実行）：

```bash
pnpm --filter api better-auth-gen-schema
```

#### マイグレーションファイルの生成

```bash
pnpm --filter api drizzle:generate
```

#### マイグレーションの実行

```bash
pnpm --filter api drizzle:migrate
```

## 💻 開発

### ワークスペースごとのコマンド実行

monorepoでは、`--filter`オプションを使用して特定のワークスペースでコマンドを実行します。

### APIアプリケーションの開発

#### ローカル開発サーバーの起動

```bash
pnpm --filter api dev
```

開発サーバーは `http://localhost:8787` で起動します。

#### Drizzle Studioの起動

データベースを視覚的に確認・編集するには：

```bash
pnpm --filter api drizzle:studio
```

**注意：** ローカルSQLiteファイルを使用する場合は、`drizzle.config.ts`でローカルファイルパスを指定する必要があります。

#### Cloudflare Bindingsの型生成

```bash
pnpm --filter api cf-typegen
```

#### デプロイ

```bash
pnpm --filter api deploy
```

## 📝 コマンド一覧

### ルートコマンド

- `pnpm install` - すべてのワークスペースの依存関係をインストール

### APIアプリケーション（`apps/api`）

- `pnpm --filter api dev` - 開発サーバーを起動
- `pnpm --filter api deploy` - Cloudflare Workersにデプロイ
- `pnpm --filter api cf-typegen` - Cloudflare Bindingsの型を生成
- `pnpm --filter api better-auth-gen-schema` - Better Authスキーマを生成
- `pnpm --filter api drizzle:generate` - マイグレーションファイルを生成
- `pnpm --filter api drizzle:migrate` - マイグレーションを実行
- `pnpm --filter api drizzle:studio` - Drizzle Studioを起動

## 🔧 トラブルシューティング

### ポート8080への接続エラー

`ECONNREFUSED 127.0.0.1:8080`エラーが発生する場合：

1. **ローカルSQLiteファイルを使用する場合：**
   - `apps/api/.dev.vars`で`TURSO_DATABASE_URL=file:./src/db/local/local.db`を設定
   - `apps/api/drizzle.config.ts`でローカルファイルパスを指定

2. **Tursoリモートデータベースを使用する場合：**
   - Turso CLIを使用してローカルサーバーを起動する必要があります
