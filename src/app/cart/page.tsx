import { ButtonLink } from "@/components/common/Button";
import {
  CartItemCard,
  getCartItemSubtotal,
} from "@/components/cart/CartItemCard";
import { mockCartItems } from "@/mocks/cart";

const shippingFee = 500;
const productsTotal = mockCartItems.reduce(
  (total, item) => total + getCartItemSubtotal(item),
  0,
);
const orderTotal = productsTotal + shippingFee;

export default function CartPage() {
  return (
    <section className="cart-page">
      <p className="breadcrumb">トップ&gt;カート</p>
      <h1>カート（{mockCartItems.length}件）</h1>

      <div className="cart-list" aria-label="カート商品一覧">
        {mockCartItems.map((item) => (
          <CartItemCard item={item} key={item.id} />
        ))}
      </div>

      <section className="cart-summary" aria-label="注文金額">
        <dl>
          <div>
            <dt>商品小計</dt>
            <dd>¥{productsTotal.toLocaleString()}</dd>
          </div>
          <div>
            <dt>送料</dt>
            <dd>¥{shippingFee.toLocaleString()}</dd>
          </div>
          <div>
            <dt>合計：</dt>
            <dd>¥{orderTotal.toLocaleString()}</dd>
          </div>
        </dl>
        <ButtonLink href="/orders/confirm">注文に進む</ButtonLink>
      </section>
    </section>
  );
}
