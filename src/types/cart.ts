import type { Product } from "@/types/product";
import type { Topping } from "@/types/topping";

export type CartItem = Readonly<{
  id: number | string;
  product: Product;
  quantity: number;
  size: "M" | "L";
  toppings: Topping[];
}>;
