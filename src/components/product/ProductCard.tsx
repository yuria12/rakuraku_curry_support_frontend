import Link from "next/link";
import { Card } from "@/components/common/Card";
import { ProductImage } from "@/components/common/ProductImage";
import type { Product } from "@/types/product";

type ProductCardProps = Readonly<{
  product: Product;
}>;

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Card className="product-card__surface">
        <Link className="product-card__link" href={`/products/${product.id}`}>
          <ProductImage alt={product.name} src={product.imagePath} />
          <span className="product-card__body">
            <span className="product-card__name">{product.name}</span>
            <span className="product-card__prices">
              <span>
                <span className="product-card__size">M</span>
                <strong>¥{product.priceM.toLocaleString()}</strong>
              </span>
              <span>
                <span className="product-card__size">L</span>
                <strong>¥{product.priceL.toLocaleString()}</strong>
              </span>
            </span>
            <span className="product-card__cta">詳細を見る</span>
          </span>
        </Link>
      </Card>
    </article>
  );
}
