import { logoutAction } from "@/app/logout/actions";
import { Button, ButtonLink } from "@/components/common/Button";

export function LogoutConfirmActions() {
  return (
    <div className="logout-actions">
      <ButtonLink href="/products" variant="secondary">
        キャンセル
      </ButtonLink>
      <form action={logoutAction}>
        <Button type="submit">ログアウトする</Button>
      </form>
    </div>
  );
}
