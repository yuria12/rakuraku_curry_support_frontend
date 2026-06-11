import { LogoutConfirmActions } from "@/components/auth/LogoutConfirmActions";
import { Breadcrumb } from "@/components/common/Breadcrumb";

export default function LogoutPage() {
  return (
    <section className="auth-page">
      <Breadcrumb
        items={[
          { href: "/products", label: "トップ" },
          { label: "ログアウト" },
        ]}
      />

      <div className="auth-panel logout-panel">
        <h1>ログアウトしますか？</h1>
        <p>
          ログアウトすると、再度ご利用いただく際にログインが必要です。
        </p>
        <LogoutConfirmActions />
      </div>
    </section>
  );
}
