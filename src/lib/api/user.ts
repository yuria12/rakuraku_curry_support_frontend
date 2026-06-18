import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { ApiUserProfile } from "@/lib/api/types";

export function getCurrentUserProfile(init?: RequestInit) {
  return apiClient.get<ApiUserProfile>(apiEndpoints.user.current, init);
}
