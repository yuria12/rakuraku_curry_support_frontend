import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type {
  AddCartItemRequest,
  AddCartItemResponse,
  ApiCart,
} from "@/lib/api/types";

export function getCart() {
  return apiClient.get<ApiCart>(apiEndpoints.cart.base);
}

export function addCartItem(request: AddCartItemRequest) {
  return apiClient.post<AddCartItemResponse>(apiEndpoints.cart.items, request);
}
