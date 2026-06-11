import Link from "next/link";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { mockAuthSession } from "@/mocks/auth";

type AppShellProps = Readonly<{
  children: React.ReactNode;
}>;

const navItems = [
  { href: "/products", label: "商品一覧" },
  { href: "/cart", label: "カート" },
  { href: "/orders", label: "注文履歴" },
];

const authNavItem = mockAuthSession.isLoggedIn
  ? { href: "/login", label: "ログアウト" }
  : { href: "/login", label: "ログイン" };

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <Link className="app-logo-link" href="/" aria-label="トップページへ戻る">
            <SiteLogo />
          </Link>
          <nav className="app-nav" aria-label="メインナビゲーション">
            {[...navItems, authNavItem].map((item) => (
              <Link className="app-nav__link" href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
