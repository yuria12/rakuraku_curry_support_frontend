import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { ApiTopping } from "@/lib/api/types";

export function getToppings() {
  return apiClient.get<ApiTopping[]>(apiEndpoints.toppings.base);
}
