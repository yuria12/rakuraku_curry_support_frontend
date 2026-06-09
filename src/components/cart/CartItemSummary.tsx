import { ProductImage } from "@/components/common/ProductImage";
import { QuantityStepper } from "@/components/common/QuantityStepper";
import type { CartItem } from "@/types/cart";

type CartItemSummaryProps = Readonly<{
  headingLevel?: "h2" | "h3";
  item: CartItem;
  showActions?: boolean;
}>;

export function getCartItemPrice(item: CartItem) {
  return item.size === "M" ? item.product.priceM : item.product.priceL;
}

export function getCartToppingPrice(
  item: CartItem,
  topping: CartItem["toppings"][number],
) {
  return item.size === "M" ? topping.priceM : topping.priceL;
}

export function getCartItemSubtotal(item: CartItem) {
  const toppingTotal = item.toppings.reduce((total, topping) => {
    return total + getCartToppingPrice(item, topping);
  }, 0);

  return (getCartItemPrice(item) + toppingTotal) * item.quantity;
}

export function CartItemSummary({
  headingLevel = "h3",
  item,
  showActions = false,
}: CartItemSummaryProps) {
  const Heading = headingLevel;

  return (
    <article className="cart-item-summary">
      <div className="cart-item-summary__image">
        <ProductImage alt={item.product.name} src={item.product.imagePath} />
      </div>

      <div className="cart-item-summary__details">
        <Heading>{item.product.name}</Heading>

        <dl className="cart-item-summary__breakdown">
          <div>
            <dt>サイズ：{item.size}</dt>
            <dd>¥{getCartItemPrice(item).toLocaleString()}</dd>
          </div>
          {item.toppings.length > 0 ? (
            item.toppings.map((topping, index) => (
              <div key={topping.id}>
                <dt>
                  {index === 0 ? "トッピング：" : ""}
                  {topping.name}
                </dt>
                <dd>¥{getCartToppingPrice(item, topping).toLocaleString()}</dd>
              </div>
            ))
          ) : (
            <div>
              <dt>トッピング：なし</dt>
              <dd>¥0</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="cart-item-summary__quantity">
        {showActions ? (
          <>
            <p className="cart-item-summary__quantity-label">数量</p>
            <QuantityStepper value={item.quantity} />
            <button className="cart-item-summary__delete" type="button">
              削除
            </button>
          </>
        ) : (
          <p className="cart-item-summary__count">個数：{item.quantity}個</p>
        )}
        <p className="cart-item-summary__total">
          合計　¥{getCartItemSubtotal(item).toLocaleString()}
        </p>
      </div>
    </article>
  );
}
