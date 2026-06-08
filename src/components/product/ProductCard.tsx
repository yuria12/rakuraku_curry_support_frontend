import Link from "next/link";
import { ProductImage } from "@/components/common/ProductImage";
import type { Product } from "@/types/product";

type ProductCardProps = Readonly<{
  product: Product;
}>;

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link className="product-card__image-link" href={`/products/${product.id}`}>
        <ProductImage alt={product.name} src={product.imagePath} />
      </Link>
      <Link className="product-card__name" href={`/products/${product.id}`}>
        {product.name}
      </Link>
      <p className="product-card__prices">
        <span>M</span> ¥{product.priceM.toLocaleString()}
        <br />
        <span>L</span> ¥{product.priceL.toLocaleString()}
      </p>
    </article>
  );
}
