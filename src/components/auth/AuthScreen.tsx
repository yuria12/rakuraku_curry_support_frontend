import type { ReactNode } from "react";
import { ButtonLink } from "@/components/common/Button";
import {
  Breadcrumb,
  type BreadcrumbItem,
} from "@/components/common/Breadcrumb";

type AuthScreenProps = Readonly<{
  actionHref: string;
  actionLabel: string;
  actionText: string;
  breadcrumbItems: BreadcrumbItem[];
  children: ReactNode;
  title: string;
}>;

export function AuthScreen({
  actionHref,
  actionLabel,
  actionText,
  breadcrumbItems,
  children,
  title,
}: AuthScreenProps) {
  return (
    <section className="auth-page">
      <Breadcrumb items={breadcrumbItems} />

      <div className="auth-panel">
        <h1>{title}</h1>

        {children}

        <div className="auth-divider">
          <span>または</span>
        </div>

        <div className="auth-action">
          <p>{actionText}</p>
          <ButtonLink href={actionHref} size="sm" variant="secondary">
            {actionLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
