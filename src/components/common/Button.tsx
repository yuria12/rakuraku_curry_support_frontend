import Link from "next/link";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "sm";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonLinkProps = Readonly<{
  children: React.ReactNode;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}>;

function buttonClassName(variant: ButtonVariant, size: ButtonSize) {
  return [
    "button",
    variant === "secondary" ? "button--secondary" : "",
    size === "sm" ? "button--sm" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  children,
  className,
  size = "md",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[buttonClassName(variant, size), className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  size = "md",
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link className={buttonClassName(variant, size)} href={href}>
      {children}
    </Link>
  );
}
