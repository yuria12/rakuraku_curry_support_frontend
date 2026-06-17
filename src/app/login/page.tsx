import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { getAuthSession } from "@/lib/auth-session";

type LoginPageProps = Readonly<{
  searchParams?: Promise<{
    error?: string;
    registered?: string;
    redirectTo?: string;
  }>;
}>;

const loginErrorMessages = {
  invalid: "メールアドレス、またはパスワードが間違っています",
  invalidEmail: "メールアドレスの形式が不正です",
  requiredEmail: "メールアドレスを入力してください",
  requiredPassword: "パスワードを入力してください",
} as const;

function getLoginErrorMessage(error?: string) {
  if (error && error in loginErrorMessages) {
    return loginErrorMessages[error as keyof typeof loginErrorMessages];
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

        <LoginForm
          errorMessage={errorMessage}
          infoMessage={infoMessage}
          redirectTo={redirectTo}
          successMessage={successMessage}
        />
      </div>
    </section>
  );
}
