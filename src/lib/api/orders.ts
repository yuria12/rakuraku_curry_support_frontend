import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type {
  ApiOrder,
  CreateOrderRequest,
  CreateOrderResponse,
  OrderConfirmResponse,
} from "@/lib/api/types";

export function getOrderConfirm() {
  return apiClient.get<OrderConfirmResponse>(apiEndpoints.orders.confirm);
}

export function createOrder(request: CreateOrderRequest) {
  return apiClient.post<CreateOrderResponse>(apiEndpoints.orders.base, request);
}

export function getOrders() {
  return apiClient.get<ApiOrder[]>(apiEndpoints.orders.base);
}

export function getOrderById(id: string) {
  return apiClient.get<ApiOrder>(apiEndpoints.orders.byId(id));
}
