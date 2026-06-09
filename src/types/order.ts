import type { Product } from "@/types/product";

export type OrderHistoryItem = Readonly<{
  id: number;
  product: Product;
  quantity: number;
  size: "M" | "L";
  subtotal: number;
}>;

export type OrderHistory = Readonly<{
  id: string;
  deliveryDate: string;
  items: OrderHistoryItem[];
  totalPrice: number;
}>;
