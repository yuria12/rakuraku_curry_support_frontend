import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type {
  AdminCreateProductRequest,
  AdminCreateProductResponse,
  AdminUpdateUserRequest,
  AdminUpdateUserResponse,
  ApiAdminUser,
  ApiProduct,
  MessageResponse,
} from "@/lib/api/types";

export function getAdminProducts() {
  return apiClient.get<ApiProduct[]>(apiEndpoints.admin.products);
}

export function createAdminProduct(request: AdminCreateProductRequest) {
  return apiClient.post<AdminCreateProductResponse>(
    apiEndpoints.admin.products,
    request,
  );
}

export function getAdminUsers() {
  return apiClient.get<ApiAdminUser[]>(apiEndpoints.admin.users);
}

export function updateAdminUser(id: string, request: AdminUpdateUserRequest) {
  return apiClient.put<AdminUpdateUserResponse>(
    apiEndpoints.admin.userById(id),
    request,
  );
}

export function deleteAdminUser(id: string) {
  return apiClient.delete<MessageResponse>(apiEndpoints.admin.userById(id));
}
