import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isApiRequestError } from "@/lib/api/client";
import { loginWithResponse, logout } from "@/lib/api/auth";
import { resolveDataSource } from "@/lib/api/data-source";
import {
  authUserCookieName,
  backendSessionCookieName,
} from "@/lib/auth-constants";
import { mockAuthSession } from "@/mocks/auth";
import type { ApiUser, LoginResponse } from "@/lib/api/types";

export type AuthSession = Readonly<{
  isLoggedIn: boolean;
  sessionId?: string;
  user?: ApiUser;
}>;

type AuthenticatedUser = Readonly<{
  backendSessionId?: string;
  response: LoginResponse;
}>;

function getMockLoginResponse(): LoginResponse {
  return {
    user: mockAuthSession.user,
  };
}

function getCookieValue(setCookieHeader: string | null, name: string) {
  if (!setCookieHeader) {
    return undefined;
  }

  const match = setCookieHeader.match(new RegExp(`(?:^|,\\s*)${name}=([^;]+)`));
  return match?.[1];
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
  const sessionId = cookieStore.get(backendSessionCookieName)?.value;
  const user = parseUserCookie(cookieStore.get(authUserCookieName)?.value);

  return {
    isLoggedIn: Boolean(sessionId),
    sessionId,
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
): Promise<AuthenticatedUser> {
  return resolveDataSource<AuthenticatedUser>({
    api: async () => {
      const { data, response } = await loginWithResponse({ email, password });

      return {
        backendSessionId: getCookieValue(
          response.headers.get("set-cookie"),
          backendSessionCookieName,
        ),
        response: data,
      };
    },
    mock: () => {
      if (email === "user@example.com" && password === "password") {
        return {
          backendSessionId: "mock-session",
          response: getMockLoginResponse(),
        };
      }

      throw new Error("メールアドレスまたはパスワードが正しくありません。");
    },
  });
}

export async function saveAuthSession(authenticatedUser: AuthenticatedUser) {
  const cookieStore = await cookies();

  if (authenticatedUser.backendSessionId) {
    cookieStore.set(backendSessionCookieName, authenticatedUser.backendSessionId, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });
  }

  cookieStore.set(authUserCookieName, JSON.stringify(authenticatedUser.response.user), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });
}

export async function clearAuthSession() {
  const cookieStore = await cookies();

  cookieStore.delete(backendSessionCookieName);
  cookieStore.delete(authUserCookieName);
}

export async function getBackendSessionRequestInit(): Promise<RequestInit | undefined> {
  const session = await getAuthSession();

  if (!session.sessionId) {
    return undefined;
  }

  return {
    headers: {
      Cookie: `${backendSessionCookieName}=${session.sessionId}`,
    },
  };
}

export async function logoutUser(): Promise<void> {
  await resolveDataSource<void>({
    api: async () => {
      try {
        await logout(await getBackendSessionRequestInit());
      } catch (error) {
        if (!isApiRequestError(error) || error.status !== 401) {
          throw error;
        }
      }
    },
    mock: () => undefined,
  });
}
