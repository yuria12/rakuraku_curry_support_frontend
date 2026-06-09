import { mockProducts } from "@/mocks/products";
import type { OrderHistory } from "@/types/order";

export const mockOrders: OrderHistory[] = [
  {
    id: "RK-20260609-001",
    deliveryDate: "2026-06-09",
    items: [
      {
        id: 1,
        product: mockProducts[0],
        quantity: 1,
        size: "M",
        subtotal: mockProducts[0].priceM,
      },
      {
        id: 2,
        product: mockProducts[4],
        quantity: 2,
        size: "L",
        subtotal: mockProducts[4].priceL * 2,
      },
    ],
    totalPrice: mockProducts[0].priceM + mockProducts[4].priceL * 2,
  },
  {
    id: "RK-20260602-004",
    deliveryDate: "2026-06-02",
    items: [
      {
        id: 3,
        product: mockProducts[1],
        quantity: 1,
        size: "M",
        subtotal: mockProducts[1].priceM,
      },
    ],
    totalPrice: mockProducts[1].priceM,
  },
  {
    id: "RK-20260521-002",
    deliveryDate: "2026-05-21",
    items: [
      {
        id: 4,
        product: mockProducts[2],
        quantity: 1,
        size: "L",
        subtotal: mockProducts[2].priceL,
      },
      {
        id: 5,
        product: mockProducts[7],
        quantity: 1,
        size: "M",
        subtotal: mockProducts[7].priceM,
      },
    ],
    totalPrice: mockProducts[2].priceL + mockProducts[7].priceM,
  },
];
