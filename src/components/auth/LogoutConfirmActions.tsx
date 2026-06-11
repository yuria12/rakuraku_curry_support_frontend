"use client";

import { useRouter } from "next/navigation";
import { authChangedEventName, authStatusKey } from "@/components/auth/AuthNavLink";
import { Button, ButtonLink } from "@/components/common/Button";

export function LogoutConfirmActions() {
  const router = useRouter();

  function handleLogout() {
    window.localStorage.setItem(authStatusKey, "logged-out");
    window.dispatchEvent(new Event(authChangedEventName));
    router.push("/");
  }

  return (
    <div className="logout-actions">
      <ButtonLink href="/" variant="secondary">
        キャンセル
      </ButtonLink>
      <Button type="button" onClick={handleLogout}>
        ログアウトする
      </Button>
    </div>
  );
}
