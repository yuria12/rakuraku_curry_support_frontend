import { resolveDataSource } from "@/lib/api/data-source";
import { getOrderConfirm } from "@/lib/api/orders";
import type { OrderConfirmResponse } from "@/lib/api/types";
import { getBackendSessionRequestInit } from "@/lib/auth-session";
import {
  getCartData,
  mapApiCartToCartData,
  type CartData,
} from "@/lib/cart-data";
import { mockAuthSession } from "@/mocks/auth";

export type OrderConfirmCustomer = Readonly<{
  address: string;
  email?: string;
  name: string;
  paymentMethod: string;
  phone?: string;
  postalCode?: string;
}>;

export type OrderConfirmData = Readonly<{
  cart: CartData;
  customer: OrderConfirmCustomer;
}>;

const mockCustomer: OrderConfirmCustomer = {
  address: mockAuthSession.user.address,
  email: mockAuthSession.user.email,
  name: mockAuthSession.user.name,
  paymentMethod: "creditCard",
  phone: mockAuthSession.user.phone,
  postalCode: mockAuthSession.user.postalCode,
};

function mapApiOrderConfirmToData(
  response: OrderConfirmResponse,
): OrderConfirmData {
  return {
    cart: mapApiCartToCartData(response.cart),
    customer: {
      ...mockCustomer,
      ...response.customer,
    },
  };
}

export function getOrderConfirmData(): Promise<OrderConfirmData> {
  return resolveDataSource<OrderConfirmData>({
    api: async () =>
      mapApiOrderConfirmToData(
        await getOrderConfirm(await getBackendSessionRequestInit()),
      ),
    mock: async () => ({
      cart: await getCartData(),
      customer: mockCustomer,
    }),
  });
}
