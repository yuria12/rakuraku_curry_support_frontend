import { redirect } from "next/navigation";
import { loginAction } from "@/app/login/actions";
import { Button, ButtonLink } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Message } from "@/components/common/Message";
import { PasswordInput } from "@/components/common/PasswordInput";
import { TextInput } from "@/components/common/TextInput";
import { getAuthSession } from "@/lib/auth-session";

type LoginPageProps = Readonly<{
  searchParams?: Promise<{
    error?: string;
    registered?: string;
    redirectTo?: string;
  }>;
}>;

const loginErrorMessages = {
  invalid: "メールアドレスまたはパスワードが正しくありません。",
  required: "メールアドレスとパスワードを入力してください。",
} as const;

function getLoginErrorMessage(error?: string) {
  if (error === "invalid" || error === "required") {
    return loginErrorMessages[error];
  }

  return undefined;
}

function getLoginInfoMessage(redirectTo: string) {
  if (redirectTo.startsWith("/orders/confirm")) {
    return "注文確認へ進むにはログインしてください。";
  }

  return undefined;
}

function getLoginSuccessMessage(registered?: string) {
  if (registered === "success") {
    return "会員登録が完了しました。ログインしてください。";
  }

  return undefined;
}

function getRedirectPath(value?: string) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/products";
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getAuthSession();
  const params = await searchParams;
  const redirectTo = getRedirectPath(params?.redirectTo);
  const errorMessage = getLoginErrorMessage(params?.error);
  const infoMessage = getLoginInfoMessage(redirectTo);
  const successMessage = getLoginSuccessMessage(params?.registered);

  if (session.isLoggedIn) {
    redirect(redirectTo);
  }

  return (
    <section className="auth-page">
      <Breadcrumb
        items={[
          { href: "/products", label: "トップ" },
          { label: "ログイン" },
        ]}
      />

      <div className="auth-panel">
        <h1>ログイン</h1>

        <form className="auth-form" action={loginAction}>
          <input name="redirectTo" type="hidden" value={redirectTo} />
          {errorMessage ? (
            <Message variant="error">{errorMessage}</Message>
          ) : null}
          {!errorMessage && successMessage ? (
            <Message variant="success">{successMessage}</Message>
          ) : null}
          {!errorMessage && !successMessage && infoMessage ? (
            <Message variant="info">{infoMessage}</Message>
          ) : null}
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
