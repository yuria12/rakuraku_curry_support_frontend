import {
  deleteCartItemAction,
  updateCartItemQuantityAction,
} from "@/app/cart/actions";
import { CartItemSummary } from "@/components/cart/CartItemSummary";
import { ButtonLink } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { getCartData } from "@/lib/cart-data";

export default async function CartPage() {
  const cart = await getCartData();

  return (
    <section className="cart-page">
      <Breadcrumb
        items={[
          { href: "/products", label: "トップ" },
          { label: "カート" },
        ]}
      />
      <h1>カート（{cart.items.length}件）</h1>

      <div className="cart-panel">
        <div className="cart-panel__main">
          <div className="cart-list" aria-label="カート商品一覧">
            {cart.items.map((item) => (
              <CartItemSummary
                deleteAction={deleteCartItemAction}
                headingLevel="h2"
                item={item}
                key={item.id}
                showActions
                updateQuantityAction={updateCartItemQuantityAction}
              />
            ))}
          </div>
        </div>

        <section className="cart-summary" aria-label="注文金額">
          <h2>注文内容</h2>
          <dl>
            <div>
              <dt>商品小計</dt>
              <dd>¥{cart.productsTotal.toLocaleString()}</dd>
            </div>
            <div>
              <dt>送料</dt>
              <dd>¥{cart.shippingFee.toLocaleString()}</dd>
            </div>
            <div>
              <dt>合計：</dt>
              <dd>¥{cart.orderTotal.toLocaleString()}</dd>
            </div>
          </dl>
          <ButtonLink href="/orders/confirm">注文に進む</ButtonLink>
        </section>
      </div>
    </section>
  );
}
