import Link from "next/link";
import { AuthNavLink } from "@/components/auth/AuthNavLink";
import { NavLink } from "@/components/layout/NavLink";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { getAuthSession } from "@/lib/auth-session";

type AppShellProps = Readonly<{
  children: React.ReactNode;
}>;

const navItems = [
  { href: "/products", label: "商品一覧" },
  { href: "/cart", label: "カート" },
  { href: "/orders", label: "注文履歴" },
];

export async function AppShell({ children }: AppShellProps) {
  const session = await getAuthSession();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <Link className="app-logo-link" href="/" aria-label="トップページへ戻る">
            <SiteLogo />
          </Link>
          <nav className="app-nav" aria-label="メインナビゲーション">
            {navItems.map((item) => (
              <NavLink href={item.href} key={item.href}>
                {item.label}
              </NavLink>
            ))}
            <AuthNavLink isLoggedIn={session.isLoggedIn} />
          </nav>
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
