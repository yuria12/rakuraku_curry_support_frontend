import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type {
  AddCartItemRequest,
  AddCartItemResponse,
  ApiCart,
  DeleteCartItemResponse,
  UpdateCartItemQuantityRequest,
  UpdateCartItemQuantityResponse,
} from "@/lib/api/types";

export function getCart() {
  return apiClient.get<ApiCart>(apiEndpoints.cart.base);
}

export function addCartItem(request: AddCartItemRequest) {
  return apiClient.post<AddCartItemResponse>(apiEndpoints.cart.items, request);
}

export function updateCartItemQuantity(
  id: string,
  request: UpdateCartItemQuantityRequest,
) {
  return apiClient.put<UpdateCartItemQuantityResponse>(
    apiEndpoints.cart.itemById(id),
    request,
  );
}

export function deleteCartItem(id: string) {
  return apiClient.delete<DeleteCartItemResponse>(apiEndpoints.cart.itemById(id));
}
