import { isApiRequestError } from "@/lib/api/client";
import { shouldUseApi } from "@/lib/api/config";

type DataSourceHandlers<T> = Readonly<{
  api: () => Promise<T>;
  mock: () => Promise<T> | T;
}>;

export async function resolveDataSource<T>({ api, mock }: DataSourceHandlers<T>) {
  if (!shouldUseApi()) {
    return Promise.resolve(mock());
  }

  try {
    return await api();
  } catch (error) {
    if (isApiRequestError(error) && error.status === 0) {
      return Promise.resolve(mock());
    }

    throw error;
  }
}
