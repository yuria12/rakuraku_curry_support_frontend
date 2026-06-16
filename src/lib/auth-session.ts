import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isApiRequestError } from "@/lib/api/client";
import { login, logout } from "@/lib/api/auth";
import { resolveDataSource } from "@/lib/api/data-source";
import {
  authTokenCookieName,
  authUserCookieName,
} from "@/lib/auth-constants";
import { mockAuthSession } from "@/mocks/auth";
import type { ApiUser, LoginResponse } from "@/lib/api/types";

const authCookieMaxAge = 60 * 60 * 24 * 7;

export type AuthSession = Readonly<{
  isLoggedIn: boolean;
  token?: string;
  user?: ApiUser;
}>;

function getMockLoginResponse(): LoginResponse {
  return {
    token: "mock-auth-token",
    user: mockAuthSession.user,
  };
}

function parseUserCookie(value?: string): ApiUser | undefined {
  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value) as ApiUser;
  } catch {
    return undefined;
  }
}

export async function getAuthSession(): Promise<AuthSession> {
  const cookieStore = await cookies();
  const token = cookieStore.get(authTokenCookieName)?.value;
  const user = parseUserCookie(cookieStore.get(authUserCookieName)?.value);

  return {
    isLoggedIn: Boolean(token),
    token,
    user,
  };
}

export async function requireAuth(redirectTo = "/login") {
  const session = await getAuthSession();

  if (!session.isLoggedIn) {
    redirect(redirectTo);
  }

  return session;
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  return resolveDataSource<LoginResponse>({
    api: () => login({ email, password }),
    mock: () => {
      if (email === "user@example.com" && password === "password") {
        return getMockLoginResponse();
      }

      throw new Error("メールアドレスまたはパスワードが正しくありません。");
    },
  });
}

export async function saveAuthSession(response: LoginResponse) {
  const cookieStore = await cookies();

  cookieStore.set(authTokenCookieName, response.token, {
    httpOnly: true,
    maxAge: authCookieMaxAge,
    path: "/",
    sameSite: "lax",
  });
  cookieStore.set(authUserCookieName, JSON.stringify(response.user), {
    httpOnly: true,
    maxAge: authCookieMaxAge,
    path: "/",
    sameSite: "lax",
  });
}

export async function clearAuthSession() {
  const cookieStore = await cookies();

  cookieStore.delete(authTokenCookieName);
  cookieStore.delete(authUserCookieName);
}

export async function logoutUser(token?: string): Promise<void> {
  await resolveDataSource<void>({
    api: async () => {
      try {
        await logout(token);
      } catch (error) {
        if (!isApiRequestError(error) || error.status !== 401) {
          throw error;
        }
      }
    },
    mock: () => undefined,
  });
}
