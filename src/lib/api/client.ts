import type { ApiErrorResponse } from "@/lib/api/types";

type ApiClientOptions = Readonly<{
  baseUrl?: string;
  fetcher?: typeof fetch;
}>;

const defaultBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export class ApiRequestError extends Error {
  body?: unknown;
  status: number;

  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.body = body;
  }
}

async function parseJsonSafely(response: Response) {
  try {
    return (await response.json()) as unknown;
  } catch {
    return undefined;
  }
}

function getErrorMessage(status: number, body: unknown) {
  if (
    body &&
    typeof body === "object" &&
    "message" in body &&
    typeof (body as ApiErrorResponse).message === "string"
  ) {
    return (body as ApiErrorResponse).message;
  }

  return `API request failed: ${status}`;
}

export function createApiClient(options: ApiClientOptions = {}) {
  const baseUrl = options.baseUrl ?? defaultBaseUrl;
  const fetcher = options.fetcher ?? fetch;

  async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetcher(`${baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });

    const body = await parseJsonSafely(response);

    if (!response.ok) {
      throw new ApiRequestError(
        response.status,
        getErrorMessage(response.status, body),
        body,
      );
    }

    return body as T;
  }

  return {
    delete: <T>(path: string, init?: RequestInit) =>
      request<T>(path, { ...init, method: "DELETE" }),
    get: <T>(path: string, init?: RequestInit) =>
      request<T>(path, { ...init, method: "GET" }),
    post: <T>(path: string, body: unknown, init?: RequestInit) =>
      request<T>(path, {
        ...init,
        method: "POST",
        body: JSON.stringify(body),
      }),
    put: <T>(path: string, body: unknown, init?: RequestInit) =>
      request<T>(path, {
        ...init,
        method: "PUT",
        body: JSON.stringify(body),
      }),
  };
}

export const apiClient = createApiClient();
