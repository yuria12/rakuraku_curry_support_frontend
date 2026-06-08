import { ProductImage } from "@/components/common/ProductImage";
import { QuantityStepper } from "@/components/common/QuantityStepper";
import type { CartItem } from "@/types/cart";

type CartItemCardProps = Readonly<{
  item: CartItem;
}>;

function getItemPrice(item: CartItem) {
  return item.size === "M" ? item.product.priceM : item.product.priceL;
}

function getToppingPrice(item: CartItem) {
  return item.toppings.reduce((total, topping) => {
    return total + (item.size === "M" ? topping.priceM : topping.priceL);
  }, 0);
}

export function getCartItemSubtotal(item: CartItem) {
  return (getItemPrice(item) + getToppingPrice(item)) * item.quantity;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const itemPrice = getItemPrice(item);
  const toppingPrice = getToppingPrice(item);
  const subtotal = getCartItemSubtotal(item);

  return (
    <article className="cart-item-card">
      <div className="cart-item-card__image">
        <ProductImage
          alt={item.product.name}
          src={item.product.imagePath}
        />
      </div>

      <div className="cart-item-card__details">
        <h2>{item.product.name}</h2>

        <dl>
          <div className="cart-item-card__row">
            <dt>サイズ：</dt>
            <dd>{item.size}</dd>
            <dd className="cart-item-card__price">
              ¥{itemPrice.toLocaleString()}
            </dd>
          </div>

          <div className="cart-item-card__row">
            <dt>トッピング：</dt>
            <dd>{item.toppings.length}個</dd>
            <dd className="cart-item-card__price">
              ¥{toppingPrice.toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>

      <div className="cart-item-card__actions">
        <QuantityStepper value={item.quantity} />
        <p>合計　¥{subtotal.toLocaleString()}</p>
        <button type="button">削除</button>
      </div>
    </article>
  );
}