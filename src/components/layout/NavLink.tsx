"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = Readonly<{
  href: string;
  children: React.ReactNode;
}>;

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className="app-nav__link"
      href={href}
    >
      {children}
    </Link>
  );
}
