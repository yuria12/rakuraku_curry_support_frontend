import type { CartItem } from "@/types/cart";

// 表示補助用の計算。注文確定・請求金額の正はバックエンドのレスポンスを使う。
export function getCartItemDisplayPrice(item: CartItem) {
  return item.size === "M" ? item.product.priceM : item.product.priceL;
}

export function getCartToppingDisplayPrice(
  item: CartItem,
  topping: CartItem["toppings"][number],
) {
  return item.size === "M" ? topping.priceM : topping.priceL;
}

export function getCartItemDisplaySubtotal(item: CartItem) {
  const toppingTotal = item.toppings.reduce((total, topping) => {
    return total + getCartToppingDisplayPrice(item, topping);
  }, 0);

  return (getCartItemDisplayPrice(item) + toppingTotal) * item.quantity;
}
