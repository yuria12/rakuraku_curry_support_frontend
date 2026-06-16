import type { Topping } from "@/types/topping";

export type Product = Readonly<{
  description: string;
  id: number | string;
  imagePath: string;
  name: string;
  priceL: number;
  priceM: number;
  toppings?: Topping[];
}>;
