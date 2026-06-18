import { isApiRequestError } from "@/lib/api/client";
import { resolveDataSource } from "@/lib/api/data-source";
import { getOrderById, getOrders } from "@/lib/api/orders";
import type { ApiCartItem, ApiOrder } from "@/lib/api/types";
import { getBackendSessionRequestInit } from "@/lib/auth-session";
import { getCartItemDisplaySubtotal } from "@/lib/cart-display-pricing";
import { mapApiCartItemToCartItem } from "@/lib/cart-item-mappers";
import { mockOrders } from "@/mocks/orders";
import type { OrderHistory, OrderHistoryItem } from "@/types/order";

const defaultCustomer = {
  address: "",
  email: "",
  name: "",
  paymentMethod: "",
  paymentStatus: "",
  phone: "",
  postalCode: "",
};

function mapApiItemToOrderHistoryItem(
  item: ApiCartItem,
  index: number,
): OrderHistoryItem {
  const cartItem = mapApiCartItemToCartItem(item, index);

  return {
    ...cartItem,
    subtotal: getCartItemDisplaySubtotal(cartItem),
  };
}

function getDatePart(value: string) {
  return value.includes("T") ? value.split("T")[0] : value;
}

function mapApiOrderToOrderHistory(order: ApiOrder): OrderHistory {
  const customer = order.customer ?? {};

  return {
    customer: {
      ...defaultCustomer,
      address: customer.address ?? order.shippingAddress,
      paymentMethod: customer.paymentMethod ?? order.paymentMethod ?? "",
      paymentStatus: customer.paymentStatus ?? order.paymentStatus ?? order.status,
      ...customer,
    },
    deliveryDate: order.deliveryDate ?? getDatePart(order.orderedAt),
    deliveryTime: order.deliveryTime ?? "",
    id: order.id,
    items: order.items.map(mapApiItemToOrderHistoryItem),
    totalPrice: order.total,
  };
}

export function getOrderStaticParams() {
  return mockOrders.map((order) => ({
    id: order.id,
  }));
}

export function getOrderHistoryListData(): Promise<OrderHistory[]> {
  return resolveDataSource<OrderHistory[]>({
    api: async () =>
      (await getOrders(await getBackendSessionRequestInit())).map(
        mapApiOrderToOrderHistory,
      ),
    mock: () => mockOrders,
  });
}

export function getOrderDetailData(
  id: string,
): Promise<OrderHistory | undefined> {
  return resolveDataSource<OrderHistory | undefined>({
    api: async () => {
      try {
        return mapApiOrderToOrderHistory(
          await getOrderById(id, await getBackendSessionRequestInit()),
        );
      } catch (error) {
        if (isApiRequestError(error) && error.status === 404) {
          return undefined;
        }

        throw error;
      }
    },
    mock: () => mockOrders.find((order) => order.id === id),
  });
}
