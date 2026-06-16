import Link from "next/link";

export function AuthNavLink({ isLoggedIn }: Readonly<{ isLoggedIn: boolean }>) {
  return (
    <Link className="app-nav__link" href={isLoggedIn ? "/logout" : "/login"}>
      {isLoggedIn ? "ログアウト" : "ログイン"}
    </Link>
  );
}
