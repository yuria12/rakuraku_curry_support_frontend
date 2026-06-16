import { resolveDataSource } from "@/lib/api/data-source";
import { getToppings } from "@/lib/api/toppings";
import type { ApiTopping } from "@/lib/api/types";
import { mockToppings } from "@/mocks/toppings";
import type { Topping } from "@/types/topping";

function mapApiToppingToTopping(topping: ApiTopping): Topping {
  return {
    id: topping.id,
    name: topping.name,
    priceL: topping.priceL,
    priceM: topping.priceM,
  };
}

export function getToppingListData(): Promise<Topping[]> {
  return resolveDataSource<Topping[]>({
    api: async () => {
      const toppings = await getToppings();

      return toppings.map(mapApiToppingToTopping);
    },
    mock: () => mockToppings,
  });
}
