import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { ApiProduct } from "@/lib/api/types";

export function getProducts() {
  return apiClient.get<ApiProduct[]>(apiEndpoints.products.base);
}

export function getProductDetailMock() {
  return apiClient.get<ApiProduct>(apiEndpoints.products.detailMock);
}

export function getProductById(id: string) {
  return apiClient.get<ApiProduct>(apiEndpoints.products.byId(id));
}
