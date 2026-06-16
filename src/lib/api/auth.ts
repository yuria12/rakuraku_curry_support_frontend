import { apiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import type {
  LoginRequest,
  LoginResponse,
  MessageResponse,
  OtpVerificationRequest,
  PasswordChangeRequest,
  UserRegisterRequest,
} from "@/lib/api/types";

export function login(request: LoginRequest) {
  return apiClient.post<LoginResponse>(apiEndpoints.auth.login, request);
}

export function logout(token?: string) {
  return apiClient.post<MessageResponse>(
    apiEndpoints.auth.logout,
    {},
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined,
  );
}

export function adminLogin(request: LoginRequest) {
  return apiClient.post<LoginResponse>(apiEndpoints.admin.login, request);
}

export function registerUser(request: UserRegisterRequest) {
  return apiClient.post<MessageResponse>(apiEndpoints.auth.userRegister, request);
}

export function changePassword(request: PasswordChangeRequest) {
  return apiClient.post<MessageResponse>(apiEndpoints.auth.passwordChange, request);
}

export function verifyOtp(request: OtpVerificationRequest) {
  return apiClient.post<MessageResponse>(apiEndpoints.auth.otpVerification, request);
}
