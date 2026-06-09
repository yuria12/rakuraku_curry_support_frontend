import { Button, ButtonLink } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PasswordInput } from "@/components/common/PasswordInput";
import { TextInput } from "@/components/common/TextInput";

export default function RegisterPage() {
  return (
    <section className="auth-page">
      <Breadcrumb
        items={[
          { href: "/", label: "トップ" },
          { label: "会員登録" },
        ]}
      />

      <div className="auth-panel">
        <h1>会員登録</h1>

        <form className="auth-form auth-form--register">
          <TextInput
            autoComplete="name"
            id="name"
            label="お名前："
            name="name"
          />
          <TextInput
            autoComplete="email"
            id="email"
            label="メールアドレス："
            name="email"
            type="email"
          />
          <PasswordInput
            autoComplete="new-password"
            id="password"
            label="パスワード："
            name="password"
          />
          <PasswordInput
            autoComplete="new-password"
            id="password-confirmation"
            label="パスワード確認："
            name="passwordConfirmation"
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
