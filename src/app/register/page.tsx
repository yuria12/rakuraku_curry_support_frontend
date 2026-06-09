import { AuthScreen } from "@/components/auth/AuthScreen";
import { Button } from "@/components/common/Button";
import { PasswordInput } from "@/components/common/PasswordInput";
import { TextInput } from "@/components/common/TextInput";

export default function RegisterPage() {
  return (
    <AuthScreen
      actionHref="/login"
      actionLabel="ログインする"
      actionText="アカウントをお持ちの方はこちら"
      breadcrumb="トップ&gt;会員登録"
      title="会員登録"
    >
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
    </AuthScreen>
  );
}
