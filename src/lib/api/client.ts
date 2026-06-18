import { apiConfig } from "@/lib/api/config";
import type { ApiErrorResponse } from "@/lib/api/types";

type ApiClientOptions = Readonly<{
  baseUrl?: string;
  fetcher?: typeof fetch;
  timeoutMs?: number;
}>;

type ApiRequestOptions = RequestInit &
  Readonly<{
    query?: Record<string, boolean | number | string | undefined>;
    timeoutMs?: number;
  }>;

export type ApiResponse<T> = Readonly<{
  data: T;
  response: Response;
}>;

export class ApiRequestError extends Error {
  body?: unknown;
  method?: string;
  status: number;
  url?: string;

  constructor({
    body,
    message,
    method,
    status,
    url,
  }: Readonly<{
    body?: unknown;
    message: string;
    method?: string;
    status: number;
    url?: string;
  }>) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.body = body;
    this.method = method;
    this.url = url;
  }
}

export function isApiRequestError(error: unknown): error is ApiRequestError {
  return error instanceof ApiRequestError;
}

async function parseJsonSafely(response: Response) {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    return response.text();
  }

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

function createUrl(baseUrl: string, path: string, query?: ApiRequestOptions["query"]) {
  const isAbsoluteUrl = /^https?:\/\//.test(path);
  const url = isAbsoluteUrl
    ? new URL(path)
    : new URL(path, baseUrl || "http://localhost");

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  if (!isAbsoluteUrl && !baseUrl) {
    return `${url.pathname}${url.search}`;
  }

  return url.toString();
}

function createHeaders(init?: RequestInit) {
  const headers = new Headers(init?.headers);

  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return headers;
}

export function createApiClient(options: ApiClientOptions = {}) {
  const baseUrl = options.baseUrl ?? apiConfig.baseUrl;
  const fetcher = options.fetcher ?? fetch;
  const timeoutMs = options.timeoutMs ?? apiConfig.requestTimeoutMs;

  async function requestWithResponse<T>(
    path: string,
    init?: ApiRequestOptions,
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const externalSignal = init?.signal;
    const abortRequest = () => controller.abort();
    const timeoutId = globalThis.setTimeout(
      () => controller.abort(),
      init?.timeoutMs ?? timeoutMs,
    );
    const method = init?.method ?? "GET";
    const url = createUrl(baseUrl, path, init?.query);

    if (externalSignal?.aborted) {
      controller.abort();
    }

    externalSignal?.addEventListener("abort", abortRequest, { once: true });

    try {
      const response = await fetcher(url, {
        ...init,
        headers: createHeaders(init),
        signal: controller.signal,
      });

      const body = await parseJsonSafely(response);

      if (!response.ok) {
        throw new ApiRequestError({
          body,
          message: getErrorMessage(response.status, body),
          method,
          status: response.status,
          url,
        });
      }

      return {
        data: body as T,
        response,
      };
    } catch (error) {
      if (isApiRequestError(error)) {
        throw error;
      }

      throw new ApiRequestError({
        body: error,
        message:
          error instanceof Error && error.name === "AbortError"
            ? "API request timed out"
            : "API request failed",
        method,
        status: 0,
        url,
      });
    } finally {
      externalSignal?.removeEventListener("abort", abortRequest);
      globalThis.clearTimeout(timeoutId);
    }
  }

  return {
    delete: <T>(path: string, init?: ApiRequestOptions) =>
      requestWithResponse<T>(path, { ...init, method: "DELETE" }).then(
        ({ data }) => data,
      ),
    get: <T>(path: string, init?: ApiRequestOptions) =>
      requestWithResponse<T>(path, { ...init, method: "GET" }).then(
        ({ data }) => data,
      ),
    post: <T>(path: string, body: unknown, init?: ApiRequestOptions) =>
      requestWithResponse<T>(path, {
        ...init,
        method: "POST",
        body: JSON.stringify(body),
      }).then(({ data }) => data),
    postWithResponse: <T>(path: string, body: unknown, init?: ApiRequestOptions) =>
      requestWithResponse<T>(path, {
        ...init,
        method: "POST",
        body: JSON.stringify(body),
      }),
    put: <T>(path: string, body: unknown, init?: ApiRequestOptions) =>
      requestWithResponse<T>(path, {
        ...init,
        method: "PUT",
        body: JSON.stringify(body),
      }).then(({ data }) => data),
  };
}

export const apiClient = createApiClient();
