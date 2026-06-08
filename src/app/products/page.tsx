import { Button } from "@/components/common/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/mocks/products";

const visibleProducts = mockProducts.slice(0, 4);

export default function ProductsPage() {
  return (
    <section className="products-page">
      <p className="breadcrumb">パンくずリスト&gt;商品一覧</p>

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
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <nav className="pagination" aria-label="ページネーション">
        <a aria-label="前のページ" href="/products">
          ◀
        </a>
        <span aria-current="page">1</span>
        <a aria-label="次のページ" href="/products">
          ▶
        </a>
      </nav>
    </section>
  );
}
