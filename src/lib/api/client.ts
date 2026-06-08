type ApiClientOptions = Readonly<{
  baseUrl?: string;
  fetcher?: typeof fetch;
}>;

const defaultBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

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

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
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
