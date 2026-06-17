import { OrderConfirmForm } from "@/components/checkout/OrderConfirmForm";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { getOrderConfirmData } from "@/lib/order-confirm-data";

export default async function OrderConfirmPage() {
  const orderConfirm = await getOrderConfirmData();

  return (
    <section className="checkout-page">
      <Breadcrumb
        items={[
          { href: "/products", label: "トップ" },
          { href: "/cart", label: "カート" },
          { label: "注文確認" },
        ]}
      />

      <OrderConfirmForm orderConfirm={orderConfirm} />
    </section>
  );
}
