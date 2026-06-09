import {
  CartItemSummary,
  getCartItemSubtotal,
} from "@/components/cart/CartItemSummary";
import { ButtonLink } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { TextInput } from "@/components/common/TextInput";
import { mockCartItems } from "@/mocks/cart";

const shippingFee = 500;
const deliveryTimes = [
  "10時",
  "11時",
  "12時",
  "13時",
  "14時",
  "15時",
  "16時",
  "17時",
  "18時",
];
const productsTotal = mockCartItems.reduce(
  (total, item) => total + getCartItemSubtotal(item),
  0,
);
const orderTotal = productsTotal + shippingFee;

export default function OrderConfirmPage() {
  return (
    <section className="checkout-page">
      <Breadcrumb
        items={[
          { href: "/", label: "トップ" },
          { href: "/cart", label: "カート" },
          { label: "注文確認" },
        ]}
      />

      <section className="checkout-section" aria-label="配送情報">
        <h1>配送情報</h1>
        <div className="checkout-form">
          <TextInput label="名前" />
          <TextInput label="メールアドレス" type="email" />
          <div className="checkout-postal">
            <TextInput label="郵便番号" />
            <button type="button">住所検索</button>
          </div>
          <TextInput label="住所" />
          <TextInput label="電話番号" type="tel" />
          <TextInput label="お届け日" type="date" />
          <div className="checkout-radio-field">
            <p>お届け時間</p>
            <div className="checkout-time-options">
              {deliveryTimes.map((time, index) => (
                <label key={time}>
                  <input
                    defaultChecked={index === 0}
                    name="deliveryTime"
                    type="radio"
                    value={time}
                  />
                  <span>{time}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="checkout-section" aria-label="支払方法">
        <h2>支払方法</h2>
        <div className="checkout-payment-options">
          <label>
            <input name="paymentMethod" type="radio" value="creditCard" />
            クレジットカード
          </label>
          <label>
            <input name="paymentMethod" type="radio" value="payPay" />
            PayPay
          </label>
          <label>
            <input name="paymentMethod" type="radio" value="cash" />
            コンビニ払い
          </label>
        </div>
      </section>

      <section className="checkout-section" aria-label="カート内容">
        <h2>カート（{mockCartItems.length}件）</h2>
        <div className="checkout-cart-list">
          {mockCartItems.map((item) => (
            <CartItemSummary item={item} key={item.id} />
          ))}
        </div>
      </section>

      <section className="checkout-summary" aria-label="注文金額">
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
        <div className="checkout-summary__actions">
          <ButtonLink href="/cart" variant="secondary">
            カートに戻る
          </ButtonLink>
          <ButtonLink href="/orders/complete">注文を確定する</ButtonLink>
        </div>
      </section>
    </section>
  );
}
