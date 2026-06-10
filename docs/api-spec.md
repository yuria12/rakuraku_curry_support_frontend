# API設計メモ

カレーECサイトのフロントエンドで利用するAPI仕様メモです。  
現時点の画面はモック表示を継続し、正式接続時は `src/lib/api` の関数を差し替え口として利用します。

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

## リクエスト仕様

| API | 送信場所 | フィールド | 型 | 必須 | メモ |
| --- | --- | --- | --- | --- | --- |
| `POST /api/login` | body | `email` | string | 必須 | メールアドレス |
| `POST /api/login` | body | `password` | string | 必須 | パスワード |
| `POST /api/admin/login` | body | `email` | string | 必須 | 管理者メールアドレス |
| `POST /api/admin/login` | body | `password` | string | 必須 | パスワード |
| `POST /api/user-register` | body | `name` | string | 必須 | 氏名 |
| `POST /api/user-register` | body | `email` | string | 必須 | メールアドレス |
| `POST /api/user-register` | body | `postalCode` | string | 必須 | 郵便番号 |
| `POST /api/user-register` | body | `address` | string | 必須 | 住所 |
| `POST /api/user-register` | body | `phone` | string | 必須 | 電話番号 |
| `POST /api/user-register` | body | `password` | string | 必須 | パスワード |
| `POST /api/password-change` | body | `currentPassword` | string | 必須 | 現在のパスワード |
| `POST /api/password-change` | body | `newPassword` | string | 必須 | 新しいパスワード。8文字以上 |
| `POST /api/password-change` | body | `confirmPassword` | string | 必須 | 確認用パスワード |
| `POST /api/otp-verification` | body | `code` | string | 必須 | OTPコード。正解コードは `123456` |
| `GET /api/products/{id}` | path | `id` | string | 必須 | 商品ID |
| `POST /api/cart/items` | body | `productId` | string | 必須 | 商品ID |
| `POST /api/cart/items` | body | `size` | string | 必須 | `M` または `L` |
| `POST /api/cart/items` | body | `quantity` | number | 必須 | 数量 |
| `POST /api/orders` | body | `cartItems` | array | 任意 | モックでは未使用 |
| `POST /api/orders` | body | `shippingAddress` | string | 任意 | モックでは未使用 |
| `POST /api/orders` | body | `paymentMethod` | string | 任意 | 例: `credit-card` |
| `GET /api/orders/{id}` | path | `id` | string | 必須 | 注文ID |
| `POST /api/admin/products` | body | `name` | string | 必須 | 商品名 |
| `POST /api/admin/products` | body | `imagePath` | string | 任意 | 省略時はデフォルト画像 |
| `POST /api/admin/products` | body | `description` | string | 任意 | 商品説明 |
| `POST /api/admin/products` | body | `spiceLevel` | number | 任意 | 0から5。省略時は0 |
| `POST /api/admin/products` | body | `priceM` | number | 必須 | Mサイズ価格 |
| `POST /api/admin/products` | body | `priceL` | number | 必須 | Lサイズ価格 |
| `PUT /api/admin/users/{id}` | path | `id` | string | 必須 | ユーザーID |
| `PUT /api/admin/users/{id}` | body | `name` | string | 任意 | 省略時は変更なし |
| `PUT /api/admin/users/{id}` | body | `email` | string | 任意 | 省略時は変更なし |
| `PUT /api/admin/users/{id}` | body | `role` | string | 任意 | `user` または `admin` |
| `DELETE /api/admin/users/{id}` | path | `id` | string | 必須 | 退会対象ユーザーID |

## レスポンス仕様

### 認証

- `POST /api/login`
  - `token: string`
  - `user.id: string`
  - `user.name: string`
  - `user.email: string`
  - `user.role: "user" | "admin"`
- `POST /api/admin/login`
  - `token: string`
  - `user.id: string`
  - `user.name: string`
  - `user.email: string`
  - `user.role: "admin"`
- `POST /api/user-register`
  - `message: string`
- `POST /api/password-change`
  - `message: string`
- `POST /api/otp-verification`
  - `message: string`

### 商品

- `GET /api/products`
  - `id: string`
  - `imagePath: string`
  - `name: string`
  - `description: string`
  - `spiceLevel: number`
  - `priceM: number`
  - `priceL: number`
- `GET /api/products-detail`
  - `GET /api/products/{id}` と同じ構造
  - モック専用URL。先頭商品を返す想定
- `GET /api/products/{id}`
  - `GET /api/products` の1件分と同じ構造

### カート

- `GET /api/cart`
  - `items[].productId: string`
  - `items[].name: string`
  - `items[].imagePath: string`
  - `items[].size: "M" | "L" | "—"`
  - `items[].price: number`
  - `items[].toppings[].id: string`
  - `items[].toppings[].name: string`
  - `items[].toppings[].price: number`
  - `items[].quantity: number`
  - `subtotal: number`
  - `shippingFee: number`
  - `total: number`
- `POST /api/cart/items`
  - `message: string`
  - `cart: object`
  - `cart` は `GET /api/cart` と同じ構造

### 注文

- `GET /api/order-confirm`
  - `cart: object`
  - `cart` は `GET /api/cart` と同じ構造。商品ごとのトッピング情報も含む
  - `customer.name: string`
  - `customer.address: string`
  - `customer.paymentMethod: string`
- `POST /api/orders`
  - `orderId: string`
  - `message: string`
- `GET /api/orders`
  - `id: string`
  - `orderedAt: string`
  - `status: string`
  - `total: number`
  - `items: array`
  - `shippingAddress: string`
- `GET /api/orders/{id}`
  - `GET /api/orders` の1件分と同じ構造

### 管理者

- `GET /api/admin/products`
  - `GET /api/products` と同じ構造
- `POST /api/admin/products`
  - `message: string`
  - `product: object`
  - `product` は商品1件分の構造
- `GET /api/admin/users`
  - `id: string`
  - `name: string`
  - `email: string`
  - `role: "user" | "admin"`
  - `isActive: boolean`
- `PUT /api/admin/users/{id}`
  - `message: string`
  - `user: object`
  - `user` は管理者ユーザー1件分の構造
- `DELETE /api/admin/users/{id}`
  - `message: string`

## エラー仕様

エラー時は `message` を含むレスポンスを想定します。  
フロントエンドでは `src/lib/api/client.ts` の `ApiRequestError` で `status`、`message`、`body` を扱います。

| ステータス | 主な発生API | 内容 |
| --- | --- | --- |
| 400 | `POST /api/otp-verification` | OTPコード不正 |
| 400 | `POST /api/password-change` | 現在PW不一致、新PW不足、新PW確認不一致、現在PWと新PWが同一 |
| 400 | `POST /api/admin/products` | 商品名・価格など必須項目不足 |
| 400 | `DELETE /api/admin/users/{id}` | 管理者アカウントは退会不可 |
| 401 | `POST /api/login` | メールアドレスまたはパスワード不正 |
| 401 | `POST /api/admin/login` | 管理者アカウントまたはパスワード不正 |
| 403 | `/api/admin/*` | 管理者権限なし |
| 404 | `PUT /api/admin/users/{id}` | ユーザーが見つからない |
| 404 | `DELETE /api/admin/users/{id}` | ユーザーが見つからない |
| 404 | 全API | APIが見つからない |
| 409 | `POST /api/user-register` | メールアドレス重複 |

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
- `GET /api/cart` / `GET /api/order-confirm` の `items[].toppings[]` は、カート画面・注文確認画面のトッピング表示で利用します。
