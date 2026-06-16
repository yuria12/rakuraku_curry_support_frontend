import type { Product } from "@/types/product";
import type { Topping } from "@/types/topping";

export type OrderHistoryItem = Readonly<{
  id: number | string;
  product: Product;
  quantity: number;
  size: "M" | "L";
  subtotal: number;
  toppings: Topping[];
}>;

export type OrderHistory = Readonly<{
  customer: {
    address: string;
    email: string;
    name: string;
    paymentMethod: string;
    paymentStatus: string;
    phone: string;
    postalCode: string;
  };
  id: string;
  deliveryDate: string;
  deliveryTime: string;
  items: OrderHistoryItem[];
  totalPrice: number;
}>;
