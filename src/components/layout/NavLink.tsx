"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = Readonly<{
  href: string;
  children: React.ReactNode;
  className?: string;
}>;

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={["app-nav__link", className].filter(Boolean).join(" ")}
      href={href}
    >
      {children}
    </Link>
  );
}
