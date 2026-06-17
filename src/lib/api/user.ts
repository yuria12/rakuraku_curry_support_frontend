import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { ApiUserProfile } from "@/lib/api/types";

export function getCurrentUserProfile(token?: string) {
  return apiClient.get<ApiUserProfile>(
    apiEndpoints.user.current,
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined,
  );
}
