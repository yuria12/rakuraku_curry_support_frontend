import { resolveDataSource } from "@/lib/api/data-source";
import {
  addCartItem as addCartItemApi,
  deleteCartItem as deleteCartItemApi,
  getCart,
  updateCartItemQuantity as updateCartItemQuantityApi,
} from "@/lib/api/cart";
import type { AddCartItemRequest, ApiCart } from "@/lib/api/types";
import { getBackendSessionRequestInit } from "@/lib/auth-session";
import { getCartItemDisplaySubtotal } from "@/lib/cart-display-pricing";
import { mapApiCartItemToCartItem } from "@/lib/cart-item-mappers";
import { mockCartItems } from "@/mocks/cart";
import { mockProducts } from "@/mocks/products";
import { mockToppings } from "@/mocks/toppings";
import type { CartItem } from "@/types/cart";

export type CartData = Readonly<{
  items: CartItem[];
  orderTotal: number;
  productsTotal: number;
  shippingFee: number;
}>;

const mockShippingFee = 500;

export function mapApiCartToCartData(cart: ApiCart): CartData {
  return {
    items: cart.items.map(mapApiCartItemToCartItem),
    orderTotal: cart.total,
    productsTotal: cart.subtotal,
    shippingFee: cart.shippingFee,
  };
}

function getMockCartData(): CartData {
  const productsTotal = mockCartItems.reduce(
    (total, item) => total + getCartItemDisplaySubtotal(item),
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
    api: async () =>
      mapApiCartToCartData(await getCart(await getBackendSessionRequestInit())),
    mock: getMockCartData,
  });
}

function addMockCartItem(request: AddCartItemRequest) {
  const product = mockProducts.find(
    (item) => String(item.id) === String(request.productId),
  );

  if (!product) {
    return;
  }

  const toppings = mockToppings.filter((topping) =>
    request.toppingIds?.includes(String(topping.id)),
  );
  const nextId =
    Math.max(0, ...mockCartItems.map((item) => Number(item.id) || 0)) + 1;

  mockCartItems.push({
    id: nextId,
    product,
    quantity: request.quantity,
    size: request.size,
    toppings,
  });
}

function updateMockCartItemQuantity(id: string, quantity: number) {
  const itemIndex = mockCartItems.findIndex(
    (cartItem) => String(cartItem.id) === id,
  );

  if (itemIndex < 0) {
    return;
  }

  mockCartItems.splice(itemIndex, 1, {
    ...mockCartItems[itemIndex],
    quantity,
  });
}

function deleteMockCartItem(id: string) {
  const itemIndex = mockCartItems.findIndex(
    (cartItem) => String(cartItem.id) === id,
  );

  if (itemIndex < 0) {
    return;
  }

  mockCartItems.splice(itemIndex, 1);
}

export function addCartItem(request: AddCartItemRequest): Promise<void> {
  return resolveDataSource<void>({
    api: async () => {
      await addCartItemApi(request, await getBackendSessionRequestInit());
    },
    mock: () => addMockCartItem(request),
  });
}

export function updateCartItemQuantity(
  id: string,
  quantity: number,
): Promise<void> {
  return resolveDataSource<void>({
    api: async () => {
      await updateCartItemQuantityApi(
        id,
        { quantity },
        await getBackendSessionRequestInit(),
      );
    },
    mock: () => updateMockCartItemQuantity(id, quantity),
  });
}

export function deleteCartItem(id: string): Promise<void> {
  return resolveDataSource<void>({
    api: async () => {
      await deleteCartItemApi(id, await getBackendSessionRequestInit());
    },
    mock: () => deleteMockCartItem(id),
  });
}
