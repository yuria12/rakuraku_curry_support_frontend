# API設計書

カレーECサイトのフロントエンドで利用する本番API仕様です。現時点の画面はモック表示を継続し、正式接続時は `src/lib/api` の関数を差し替え口として利用します。

## エンドポイント

| カテゴリ | メソッド | エンドポイント | 概要 | 認証 | 権限 |
| --- | --- | --- | --- | --- | --- |
| 認証 | POST | `/api/login` | ログイン | 不要 | 全員 |
| 認証 | POST | `/api/admin/login` | 管理者ログイン | 不要 | admin |
| 認証 | POST | `/api/user-register` | ユーザー登録 | 不要 | 全員 |
| 認証 | POST | `/api/password-change` | パスワード変更 | 必要 | 全員 |
| 認証 | POST | `/api/otp-verification` | OTP認証 | 不要 | 全員 |
| 商品 | GET | `/api/products` | 商品一覧取得 | 不要 | 全員 |
| 商品 | GET | `/api/products-detail` | 商品詳細取得（モック専用） | 不要 | 全員 |
| 商品 | GET | `/api/products/{id}` | 商品詳細取得 | 不要 | 全員 |
| カート | GET | `/api/cart` | カート取得 | 不要 | 全員 |
| カート | POST | `/api/cart/items` | カートに商品追加 | 不要 | 全員 |
| 注文 | GET | `/api/order-confirm` | 注文確認画面データ取得 | 不要 | 全員 |
| 注文 | POST | `/api/orders` | 注文確定 | 不要 | 全員 |
| 注文 | GET | `/api/orders` | 注文一覧取得 | 不要 | 全員 |
| 注文 | GET | `/api/orders/{id}` | 注文詳細取得 | 不要 | 全員 |
| 管理者 | GET | `/api/admin/products` | 商品一覧取得（管理者） | 必要 | admin |
| 管理者 | POST | `/api/admin/products` | 商品追加（管理者） | 必要 | admin |
| 管理者 | GET | `/api/admin/users` | ユーザー一覧取得（管理者） | 必要 | admin |
| 管理者 | PUT | `/api/admin/users/{id}` | ユーザー情報更新（管理者） | 必要 | admin |
| 管理者 | DELETE | `/api/admin/users/{id}` | ユーザー退会（管理者） | 必要 | admin |

## テスト条件

- 一般ログイン: `user@example.com` / `password`
- 管理者ログイン: `admin@example.com` / `password`
- 登録済みメール: `registered@example.com`
- OTP正解コード: `123456`

## 実装メモ

- API型は `src/lib/api/types.ts` に集約します。
- エンドポイント文字列は `src/lib/api/endpoints.ts` に集約します。
- 通信処理は `src/lib/api/client.ts` の `apiClient` 経由で行います。
- UIはAPIレスポンスを直接参照せず、必要に応じて画面用型へ変換します。
