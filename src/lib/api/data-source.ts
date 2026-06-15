import { shouldUseApi } from "@/lib/api/config";

type DataSourceHandlers<T> = Readonly<{
  api: () => Promise<T>;
  mock: () => Promise<T> | T;
}>;

export function resolveDataSource<T>({ api, mock }: DataSourceHandlers<T>) {
  return shouldUseApi() ? api() : Promise.resolve(mock());
}
