import { mockProducts } from "@/mocks/products";
import { mockToppings } from "@/mocks/toppings";
import type { OrderHistory } from "@/types/order";

export const mockOrders: OrderHistory[] = [
  {
    customer: {
      address: "東京都千代田区千代田1-1",
      email: "test@example.com",
      name: "テストユーザー",
      paymentMethod: "代金引換",
      paymentStatus: "入金済",
      phone: "090-0000-0000",
      postalCode: "100-0001",
    },
    id: "RK-20260609-001",
    deliveryDate: "2026-06-09",
    deliveryTime: "12時",
    items: [
      {
        id: 1,
        product: mockProducts[0],
        quantity: 1,
        size: "M",
        subtotal: mockProducts[0].priceM + mockToppings[3].priceM,
        toppings: [mockToppings[3]],
      },
      {
        id: 2,
        product: mockProducts[4],
        quantity: 2,
        size: "L",
        subtotal: (mockProducts[4].priceL + mockToppings[0].priceL) * 2,
        toppings: [mockToppings[0]],
      },
    ],
    totalPrice:
      mockProducts[0].priceM +
      mockToppings[3].priceM +
      (mockProducts[4].priceL + mockToppings[0].priceL) * 2,
  },
  {
    customer: {
      address: "東京都中央区日本橋1-1",
      email: "sample@example.com",
      name: "サンプルユーザー",
      paymentMethod: "クレジットカード支払い",
      paymentStatus: "入金済",
      phone: "090-1111-1111",
      postalCode: "103-0027",
    },
    id: "RK-20260602-004",
    deliveryDate: "2026-06-02",
    deliveryTime: "18時",
    items: [
      {
        id: 3,
        product: mockProducts[1],
        quantity: 1,
        size: "M",
        subtotal:
          mockProducts[1].priceM +
          mockToppings[0].priceM +
          mockToppings[1].priceM,
        toppings: [mockToppings[0], mockToppings[1]],
      },
    ],
    totalPrice:
      mockProducts[1].priceM +
      mockToppings[0].priceM +
      mockToppings[1].priceM,
  },
  {
    customer: {
      address: "東京都港区芝公園4-2",
      email: "curry@example.com",
      name: "カリー太郎",
      paymentMethod: "代金引換",
      paymentStatus: "入金済",
      phone: "090-2222-2222",
      postalCode: "105-0011",
    },
    id: "RK-20260521-002",
    deliveryDate: "2026-05-21",
    deliveryTime: "19時",
    items: [
      {
        id: 4,
        product: mockProducts[2],
        quantity: 1,
        size: "L",
        subtotal: mockProducts[2].priceL,
        toppings: [],
      },
      {
        id: 5,
        product: mockProducts[7],
        quantity: 1,
        size: "M",
        subtotal: mockProducts[7].priceM + mockToppings[2].priceM,
        toppings: [mockToppings[2]],
      },
    ],
    totalPrice:
      mockProducts[2].priceL +
      mockProducts[7].priceM +
      mockToppings[2].priceM,
  },
];
