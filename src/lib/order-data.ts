import { isApiRequestError } from "@/lib/api/client";
import { resolveDataSource } from "@/lib/api/data-source";
import { getOrderById, getOrders } from "@/lib/api/orders";
import type { ApiCartItem, ApiOrder } from "@/lib/api/types";
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

function getSelectedSize(size: ApiCartItem["size"]): OrderHistoryItem["size"] {
  return size === "L" ? "L" : "M";
}

function mapApiItemToOrderHistoryItem(
  item: ApiCartItem,
  index: number,
): OrderHistoryItem {
  const size = getSelectedSize(item.size);
  const toppingTotal = item.toppings.reduce((total, topping) => {
    return total + topping.price;
  }, 0);

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
    subtotal: (item.price + toppingTotal) * item.quantity,
    toppings: item.toppings.map((topping) => ({
      id: topping.id,
      name: topping.name,
      priceL: topping.price,
      priceM: topping.price,
    })),
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
    api: async () => (await getOrders()).map(mapApiOrderToOrderHistory),
    mock: () => mockOrders,
  });
}

export function getOrderDetailData(
  id: string,
): Promise<OrderHistory | undefined> {
  return resolveDataSource<OrderHistory | undefined>({
    api: async () => {
      try {
        return mapApiOrderToOrderHistory(await getOrderById(id));
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
