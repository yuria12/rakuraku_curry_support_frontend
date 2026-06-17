import { RegisterForm } from "@/components/auth/RegisterForm";
import { Breadcrumb } from "@/components/common/Breadcrumb";

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
  passwordPolicy: "パスワードは英大文字・英小文字・数字を各1文字以上含めてください",
  passwordLength: "パスワードは８文字以上１６文字以内で設定してください",
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

        <RegisterForm errorMessage={errorMessage} />
      </div>
    </section>
  );
}
