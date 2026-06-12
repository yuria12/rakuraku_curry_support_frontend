export type ApiDataSource = "api" | "mock";

function getApiDataSource(): ApiDataSource {
  return process.env.NEXT_PUBLIC_DATA_SOURCE === "api" ? "api" : "mock";
}

function getRequestTimeoutMs() {
  const value = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS);

  return Number.isFinite(value) && value > 0 ? value : 10000;
}

export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
  dataSource: getApiDataSource(),
  requestTimeoutMs: getRequestTimeoutMs(),
} as const;

export function shouldUseApi() {
  return apiConfig.dataSource === "api";
}
