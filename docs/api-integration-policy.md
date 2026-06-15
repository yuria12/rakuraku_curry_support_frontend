# API連携基盤メモ

## 目的

正式API連携に向けて、フロントエンド側の通信処理・エラー処理・データ取得元切り替え方針を共通化する。

## 環境変数

`.env.local` で以下を設定する。

```txt
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_API_TIMEOUT_MS=10000
NEXT_PUBLIC_DATA_SOURCE=mock
```

- `NEXT_PUBLIC_API_BASE_URL`: APIサーバーのベースURL。
- `NEXT_PUBLIC_API_TIMEOUT_MS`: APIタイムアウト時間。
- `NEXT_PUBLIC_DATA_SOURCE`: `mock` または `api`。未指定時は `mock`。

## `src/lib/api` の役割

- `config.ts`: APIベースURL、タイムアウト、データ取得元の設定。
- `client.ts`: fetch共通処理、JSON解析、エラー正規化、タイムアウト処理。
- `endpoints.ts`: APIエンドポイント文字列。
- `types.ts`: APIリクエスト・レスポンス型。
- `data-source.ts`: モック取得とAPI取得の切り替え補助。
- `products.ts` / `cart.ts` / `orders.ts` / `auth.ts` / `admin.ts`: 機能別API関数。

## エラー表示方針

- API通信エラーは `ApiRequestError` として扱う。
- `status`, `message`, `body`, `url`, `method` を確認できるようにする。
- APIの `message` をそのまま表示するかは画面ごとに判断する。
- 想定外エラーや通信失敗は、フロント側の共通文言に置き換える。

## ローディング表示方針

- 画面全体の初回取得は、該当エリアにローディング表示を出す。
- ボタン操作による更新は、対象ボタンを処理中表示にする。
- カート数量変更など部分更新は、画面全体ではなく対象行だけを更新中にする。
- ローディングコンポーネントの実装は、実画面API連携時に必要な粒度で追加する。

## モック/API切り替え方針

- 現時点の画面表示はモックデータを継続利用する。
- 後続Issueで画面ごとに `resolveDataSource` を使い、`mock` と `api` を切り替えられるようにする。
- API仕様が確定している箇所から、商品一覧・商品詳細、カート、注文の順に接続する。
