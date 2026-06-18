import { ProductImage } from "@/components/common/ProductImage";
import { QuantityStepper } from "@/components/common/QuantityStepper";
import {
  getCartItemDisplayPrice,
  getCartItemDisplaySubtotal,
} from "@/lib/cart-display-pricing";
import type { CartItem } from "@/types/cart";

type CartItemSummaryProps = Readonly<{
  deleteAction?: (formData: FormData) => void | Promise<void>;
  headingLevel?: "h2" | "h3";
  item: CartItem;
  showActions?: boolean;
  updateQuantityAction?: (formData: FormData) => void | Promise<void>;
}>;

export function CartItemSummary({
  deleteAction,
  headingLevel = "h3",
  item,
  showActions = false,
  updateQuantityAction,
}: CartItemSummaryProps) {
  const Heading = headingLevel;
  const cartItemId = String(item.id);
  const nextDecrementQuantity = Math.max(1, item.quantity - 1);
  const nextIncrementQuantity = item.quantity + 1;
  const toppingNames =
    item.toppings.length > 0
      ? item.toppings.map((topping) => topping.name).join("、")
      : "なし";

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
            <dd>¥{getCartItemDisplayPrice(item).toLocaleString()}</dd>
          </div>
          <div className="cart-item-summary__breakdown-row--full">
            <dt>トッピング：{toppingNames}</dt>
          </div>
        </dl>
      </div>

      <div className="cart-item-summary__quantity">
        {showActions ? (
          <>
            <p className="cart-item-summary__quantity-label">数量</p>
            {updateQuantityAction ? (
              <form
                action={updateQuantityAction}
                className="cart-item-summary__quantity-form"
                aria-label="数量"
              >
                <input name="cartItemId" type="hidden" value={cartItemId} />
                <QuantityStepper
                  decrementButtonProps={{
                    name: "quantity",
                    type: "submit",
                    value: nextDecrementQuantity,
                  }}
                  decrementDisabled={item.quantity <= 1}
                  incrementButtonProps={{
                    name: "quantity",
                    type: "submit",
                    value: nextIncrementQuantity,
                  }}
                  value={item.quantity}
                />
              </form>
            ) : (
              <QuantityStepper value={item.quantity} />
            )}
            {deleteAction ? (
              <form action={deleteAction}>
                <input name="cartItemId" type="hidden" value={cartItemId} />
                <button className="cart-item-summary__delete" type="submit">
                  削除
                </button>
              </form>
            ) : (
              <button className="cart-item-summary__delete" type="button">
                削除
              </button>
            )}
          </>
        ) : (
          <p className="cart-item-summary__count">個数：{item.quantity}個</p>
        )}
        <p className="cart-item-summary__total">
          合計　¥{getCartItemDisplaySubtotal(item).toLocaleString()}
        </p>
      </div>
    </article>
  );
}
