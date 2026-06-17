import { registerAction } from "@/app/register/actions";
import { Button, ButtonLink } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Message } from "@/components/common/Message";
import { PasswordInput } from "@/components/common/PasswordInput";
import { TextInput } from "@/components/common/TextInput";

type RegisterPageProps = Readonly<{
  searchParams?: Promise<{
    error?: string;
  }>;
}>;

const registerErrorMessages = {
  duplicate: "そのメールアドレスはすでに使われています",
  failed: "会員登録に失敗しました",
  invalidEmail: "メールアドレスの形式が不正です",
  invalidPhone: "電話番号はXXXX-XXXX-XXXXの形式で入力してください",
  invalidPostalCode: "郵便番号はXXX-XXXXの形式で入力してください",
  passwordMismatch: "パスワードと確認用パスワードが不一致です",
  required: "未入力の項目があります",
} as const;

function getRegisterErrorMessage(error?: string) {
  if (error && error in registerErrorMessages) {
    return registerErrorMessages[error as keyof typeof registerErrorMessages];
  }

  return undefined;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = await searchParams;
  const errorMessage = getRegisterErrorMessage(params?.error);

  return (
    <section className="auth-page">
      <Breadcrumb
        items={[
          { href: "/products", label: "トップ" },
          { label: "会員登録" },
        ]}
      />

      <div className="auth-panel auth-panel--register">
        <h1>会員登録</h1>

        <form className="auth-form auth-form--register" action={registerAction}>
          {errorMessage ? (
            <Message variant="error">{errorMessage}</Message>
          ) : null}
          <TextInput
            autoComplete="name"
            id="name"
            label="名前"
            name="name"
            placeholder="例）山田 太郎"
            required
          />
          <TextInput
            autoComplete="email"
            id="email"
            label="メールアドレス"
            name="email"
            placeholder="例）example@mail.com"
            required
            type="email"
          />
          <div className="auth-postal">
            <TextInput
              autoComplete="postal-code"
              id="postal-code"
              label="郵便番号"
              name="postalCode"
              placeholder="例）123-4567"
              required
            />
            <button type="button">住所検索</button>
          </div>
          <p className="auth-form__note">
            郵便番号を入力後、住所検索で住所を入力できます
          </p>
          <TextInput
            autoComplete="street-address"
            id="address"
            label="住所"
            name="address"
            placeholder="例）東京都渋谷区神宮前1-2-3"
            required
          />
          <TextInput
            autoComplete="tel"
            id="phone"
            label="電話番号"
            name="phone"
            placeholder="例）09012345678"
            required
            type="tel"
          />
          <PasswordInput
            autoComplete="new-password"
            id="password"
            label="パスワード"
            name="password"
            placeholder="半角英数字を含む8文字以上"
            required
          />
          <p className="auth-form__note">
            8文字以上の英数字を含むパスワードを設定してください
          </p>
          <PasswordInput
            autoComplete="new-password"
            id="password-confirmation"
            label="パスワード確認"
            name="passwordConfirmation"
            placeholder="もう一度パスワードを入力してください"
            required
          />
          <Button type="submit">登録する</Button>
        </form>

        <div className="auth-divider">
          <span>または</span>
        </div>

        <div className="auth-action">
          <p>アカウントをお持ちの方はこちら</p>
          <ButtonLink href="/login" size="sm" variant="secondary">
            ログインする
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
