import { resolveDataSource } from "@/lib/api/data-source";
import { getOrderConfirm } from "@/lib/api/orders";
import type { OrderConfirmResponse } from "@/lib/api/types";
import {
  getCartData,
  mapApiCartToCartData,
  type CartData,
} from "@/lib/cart-data";

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
  address: "",
  email: "",
  name: "",
  paymentMethod: "creditCard",
  phone: "",
  postalCode: "",
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
    api: async () => mapApiOrderConfirmToData(await getOrderConfirm()),
    mock: async () => ({
      cart: await getCartData(),
      customer: mockCustomer,
    }),
  });
}
