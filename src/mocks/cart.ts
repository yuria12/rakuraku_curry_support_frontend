import { mockProducts } from "@/mocks/products";
import { mockToppings } from "@/mocks/toppings";
import type { CartItem } from "@/types/cart";

export const mockCartItems: CartItem[] = [
  {
    id: 1,
    product: mockProducts[0],
    quantity: 1,
    size: "M",
    toppings: [mockToppings[3]],
  },
  {
    id: 2,
    product: mockProducts[1],
    quantity: 1,
    size: "M",
    toppings: [mockToppings[3], mockToppings[0], mockToppings[1]],
  },
];
