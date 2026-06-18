import Link from "next/link";
import { NavLink } from "@/components/layout/NavLink";
import { HeaderUserMenu } from "@/components/layout/HeaderUserMenu";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { getAuthSession } from "@/lib/auth-session";
import { getCartData } from "@/lib/cart-data";

function getCartItemCount(items: Awaited<ReturnType<typeof getCartData>>["items"]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export async function Header() {
  const [session, cart] = await Promise.all([getAuthSession(), getCartData()]);
  const cartItemCount = getCartItemCount(cart.items);
  const userName = session.user?.name ?? "ユーザー";

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link className="app-logo-link" href="/" aria-label="トップページへ戻る">
          <SiteLogo />
        </Link>

        <nav className="app-nav" aria-label="メインナビゲーション">
          <NavLink href="/products">商品一覧</NavLink>
          <NavLink className="app-nav__cart-link" href="/cart">
            <span className="app-nav__cart-icon-wrap">
              <span className="app-nav__cart-icon" aria-hidden="true" />
              <span className="app-nav__cart-badge" aria-label={`${cartItemCount}件`}>
                {cartItemCount}
              </span>
            </span>
            <span>カート</span>
          </NavLink>
          {session.isLoggedIn ? (
            <HeaderUserMenu userName={userName} />
          ) : (
            <NavLink href="/login">ログイン</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
