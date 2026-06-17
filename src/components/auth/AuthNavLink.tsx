import { NavLink } from "@/components/layout/NavLink";

export function AuthNavLink({ isLoggedIn }: Readonly<{ isLoggedIn: boolean }>) {
  return (
    <NavLink href={isLoggedIn ? "/logout" : "/login"}>
      {isLoggedIn ? "ログアウト" : "ログイン"}
    </NavLink>
  );
}
