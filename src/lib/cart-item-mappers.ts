import type { ApiCartItem } from "@/lib/api/types";
import type { CartItem } from "@/types/cart";

export function getSelectedCartItemSize(
  size: ApiCartItem["size"],
): CartItem["size"] {
  return size === "L" ? "L" : "M";
}

export function mapApiCartItemToCartItem(
  item: ApiCartItem,
  index: number,
): CartItem {
  const size = getSelectedCartItemSize(item.size);

  return {
    id: item.id ?? `${item.productId}-${size}-${index}`,
    product: {
      description: "",
      id: item.productId,
      imagePath: item.imagePath,
      name: item.name,
      priceL: item.price,
      priceM: item.price,
    },
    quantity: item.quantity,
    size,
    toppings: item.toppings.map((topping) => ({
      id: topping.id,
      name: topping.name,
      priceL: topping.price,
      priceM: topping.price,
    })),
  };
}
