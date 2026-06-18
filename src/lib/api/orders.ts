import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type {
  ApiOrder,
  CreateOrderRequest,
  CreateOrderResponse,
  OrderConfirmResponse,
} from "@/lib/api/types";

export function getOrderConfirm(init?: RequestInit) {
  return apiClient.get<OrderConfirmResponse>(apiEndpoints.orders.confirm, init);
}

export function createOrder(request: CreateOrderRequest, init?: RequestInit) {
  return apiClient.post<CreateOrderResponse>(
    apiEndpoints.orders.base,
    request,
    init,
  );
}

export function getOrders(init?: RequestInit) {
  return apiClient.get<ApiOrder[]>(apiEndpoints.orders.base, init);
}

export function getOrderById(id: string, init?: RequestInit) {
  return apiClient.get<ApiOrder>(apiEndpoints.orders.byId(id), init);
}
