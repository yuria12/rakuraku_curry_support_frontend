import { AuthScreen } from "@/components/auth/AuthScreen";
import { Button } from "@/components/common/Button";
import { PasswordInput } from "@/components/common/PasswordInput";
import { TextInput } from "@/components/common/TextInput";

export default function LoginPage() {
  return (
    <AuthScreen
      actionHref="/register"
      actionLabel="会員登録する"
      actionText="初めての方はこちら"
      breadcrumb="トップ&gt;ログイン"
      title="2段階認証"
    >
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
    </AuthScreen>
  );
}
