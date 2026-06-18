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

export function getCart(init?: RequestInit) {
  return apiClient.get<ApiCart>(apiEndpoints.cart.base, init);
}

export function addCartItem(request: AddCartItemRequest, init?: RequestInit) {
  return apiClient.post<AddCartItemResponse>(
    apiEndpoints.cart.items,
    request,
    init,
  );
}

export function updateCartItemQuantity(
  id: string,
  request: UpdateCartItemQuantityRequest,
  init?: RequestInit,
) {
  return apiClient.put<UpdateCartItemQuantityResponse>(
    apiEndpoints.cart.itemById(id),
    request,
    init,
  );
}

export function deleteCartItem(id: string, init?: RequestInit) {
  return apiClient.delete<DeleteCartItemResponse>(
    apiEndpoints.cart.itemById(id),
    init,
  );
}
