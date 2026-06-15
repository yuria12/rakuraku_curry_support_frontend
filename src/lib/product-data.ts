import { isApiRequestError } from "@/lib/api/client";
import { resolveDataSource } from "@/lib/api/data-source";
import { getProductById, getProducts } from "@/lib/api/products";
import type { ApiProduct } from "@/lib/api/types";
import { mockProducts } from "@/mocks/products";
import type { Product } from "@/types/product";

function mapApiProductToProduct(product: ApiProduct): Product {
  return {
    description: product.description,
    id: product.id,
    imagePath: product.imagePath,
    name: product.name,
    priceL: product.priceL,
    priceM: product.priceM,
  };
}

export function getProductStaticParams() {
  return mockProducts.map((product) => ({
    id: String(product.id),
  }));
}

export function getProductListData() {
  return resolveDataSource<Product[]>({
    api: async () => {
      const products = await getProducts();

      return products.map(mapApiProductToProduct);
    },
    mock: () => mockProducts,
  });
}

export async function getProductDetailData(id: string) {
  return resolveDataSource<Product | undefined>({
    api: async () => {
      try {
        const product = await getProductById(id);

        return mapApiProductToProduct(product);
      } catch (error) {
        if (isApiRequestError(error) && error.status === 404) {
          return undefined;
        }

        throw error;
      }
    },
    mock: () => mockProducts.find((product) => String(product.id) === id),
  });
}
