import { resolveDataSource } from "@/lib/api/data-source";
import {
  deleteCartItem as deleteCartItemApi,
  getCart,
  updateCartItemQuantity as updateCartItemQuantityApi,
} from "@/lib/api/cart";
import type { ApiCart, ApiCartItem } from "@/lib/api/types";
import { mockCartItems } from "@/mocks/cart";
import type { CartItem } from "@/types/cart";

export type CartData = Readonly<{
  items: CartItem[];
  orderTotal: number;
  productsTotal: number;
  shippingFee: number;
}>;

const mockShippingFee = 500;

function getSelectedSize(size: ApiCartItem["size"]): CartItem["size"] {
  return size === "L" ? "L" : "M";
}

function mapApiCartItemToCartItem(
  item: ApiCartItem,
  index: number,
): CartItem {
  const size = getSelectedSize(item.size);

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

export function mapApiCartToCartData(cart: ApiCart): CartData {
  return {
    items: cart.items.map(mapApiCartItemToCartItem),
    orderTotal: cart.total,
    productsTotal: cart.subtotal,
    shippingFee: cart.shippingFee,
  };
}

function getCartItemSubtotal(item: CartItem) {
  const productPrice =
    item.size === "M" ? item.product.priceM : item.product.priceL;
  const toppingTotal = item.toppings.reduce((total, topping) => {
    return total + (item.size === "M" ? topping.priceM : topping.priceL);
  }, 0);

  return (productPrice + toppingTotal) * item.quantity;
}

function getMockCartData(): CartData {
  const productsTotal = mockCartItems.reduce(
    (total, item) => total + getCartItemSubtotal(item),
    0,
  );

  return {
    items: mockCartItems,
    orderTotal: productsTotal + mockShippingFee,
    productsTotal,
    shippingFee: mockShippingFee,
  };
}

export function getCartData(): Promise<CartData> {
  return resolveDataSource<CartData>({
    api: async () => mapApiCartToCartData(await getCart()),
    mock: getMockCartData,
  });
}

export function updateCartItemQuantity(
  id: string,
  quantity: number,
): Promise<void> {
  return resolveDataSource<void>({
    api: async () => {
      await updateCartItemQuantityApi(id, { quantity });
    },
    mock: () => undefined,
  });
}

export function deleteCartItem(id: string): Promise<void> {
  return resolveDataSource<void>({
    api: async () => {
      await deleteCartItemApi(id);
    },
    mock: () => undefined,
  });
}
