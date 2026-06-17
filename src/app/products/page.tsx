import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PageContainer } from "@/components/common/PageContainer";
import { SearchBox } from "@/components/common/SearchBox";
import { ProductCard } from "@/components/product/ProductCard";
import { getProductListData } from "@/lib/product-data";

export default async function ProductsPage() {
  const products = await getProductListData();

  return (
    <PageContainer className="products-page">
      <div className="products-toolbar">
        <Breadcrumb
          items={[
            { href: "/products", label: "トップ" },
            { label: "商品一覧" },
          ]}
        />
        <SearchBox
          id="product-search-name"
          label="商品名で検索"
          name="searchName"
          placeholder="商品名で検索..."
        />
      </div>

      <div className="product-list-grid" aria-label="商品一覧">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PageContainer>
  );
}
