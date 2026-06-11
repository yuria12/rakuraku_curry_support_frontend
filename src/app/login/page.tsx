import { Button, ButtonLink } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PasswordInput } from "@/components/common/PasswordInput";
import { TextInput } from "@/components/common/TextInput";

export default function LoginPage() {
  return (
    <section className="auth-page">
      <Breadcrumb
        items={[
          { href: "/products", label: "トップ" },
          { label: "ログイン" },
        ]}
      />

      <div className="auth-panel">
        <h1>2段階認証</h1>

        <form className="auth-form" action="/api/login" method="post">
          <TextInput
            autoComplete="email"
            id="email"
            label="メールアドレス："
            name="email"
            type="email"
          />
          <PasswordInput
            autoComplete="current-password"
            id="password"
            label="パスワード："
            name="password"
          />
          <Button type="submit">ログインする</Button>
        </form>

        <div className="auth-divider">
          <span>または</span>
        </div>

        <div className="auth-action">
          <p>初めての方はこちら</p>
          <ButtonLink href="/register" size="sm" variant="secondary">
            会員登録する
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
