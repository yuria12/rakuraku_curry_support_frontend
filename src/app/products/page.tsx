import { Button } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductCard } from "@/components/product/ProductCard";
import { getProductListData } from "@/lib/product-data";

export default async function ProductsPage() {
  const products = await getProductListData();

  return (
    <section className="products-page">
      <Breadcrumb
        items={[
          { href: "/products", label: "トップ" },
          { label: "商品一覧" },
        ]}
      />

      <form className="product-search" role="search">
        <fieldset>
          <legend>商品を探す</legend>
          <div className="product-search__body">
            <label htmlFor="product-search-name">商品名で検索</label>
            <input id="product-search-name" name="searchName" type="text" />
            <Button size="sm" type="submit">
              検索
            </Button>
            <Button size="sm" type="reset" variant="secondary">
              クリア
            </Button>
          </div>
        </fieldset>
      </form>

      <div className="product-list-grid" aria-label="商品一覧">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
