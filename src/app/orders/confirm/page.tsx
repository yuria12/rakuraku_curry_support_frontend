import { OrderConfirmForm } from "@/components/checkout/OrderConfirmForm";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { isApiRequestError } from "@/lib/api/client";
import { getAuthSession } from "@/lib/auth-session";
import { getOrderConfirmData } from "@/lib/order-confirm-data";
import { redirect } from "next/navigation";
import { createOrderAction } from "./actions";

export default async function OrderConfirmPage() {
  const session = await getAuthSession();

  if (!session.isLoggedIn) {
    redirect("/login?redirectTo=/orders/confirm");
  }

  let orderConfirm;

  try {
    orderConfirm = await getOrderConfirmData();
  } catch (error) {
    if (isApiRequestError(error) && error.status === 401) {
      redirect("/auth/session-expired?redirectTo=/orders/confirm");
    }

    throw error;
  }

  return (
    <section className="checkout-page">
      <Breadcrumb
        items={[
          { href: "/products", label: "トップ" },
          { href: "/cart", label: "カート" },
          { label: "注文確認" },
        ]}
      />

      <OrderConfirmForm action={createOrderAction} orderConfirm={orderConfirm} />
    </section>
  );
}
