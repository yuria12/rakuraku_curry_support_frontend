# rakuraku_curry_support_frontend

らくらくカレーサポートのフロントエンドです。UI 改修に入る前の初期構築として、Next.js、TypeScript、ESLint、共通レイアウト、配置ディレクトリ、レスポンシブ対応のベースを用意しています。

## 技術構成

- Next.js App Router
- React
- TypeScript
- ESLint
- CSS variables / media queries

## 開発コマンド

```bash
npm run dev
npm run build
npm run start
npm run lint
```

開発サーバーは通常 `http://localhost:3000` で起動します。

## ディレクトリ構成

```text
src/
  app/                  Next.js App Router のページ、レイアウト、グローバル CSS
  components/
    common/             汎用 UI コンポーネントの配置場所
    layout/             共通レイアウトコンポーネント
  lib/
    api/                API クライアント、通信処理の配置場所
  mocks/                モックデータの配置場所
  types/                共通型定義の配置場所
```

## 環境変数

API 接続先は必要に応じて `.env.local` に設定します。

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## レスポンシブ方針

`src/app/globals.css` にコンテナ幅、余白、色、ブレークポイントのベース変数を定義しています。画面幅に応じた余白や見出しサイズは `clamp()` とメディアクエリで調整し、後続の UI 改修で共通化しやすい形にしています。
