import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductImage } from "@/components/common/ProductImage";
import { ProductDetailForm } from "@/components/product/ProductDetailForm";
import {
  getProductDetailData,
  getProductStaticParams,
} from "@/lib/product-data";
import { getToppingListData } from "@/lib/topping-data";
import { addProductToCartAction } from "./actions";

type ProductDetailPageProps = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;

export function generateStaticParams() {
  return getProductStaticParams();
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductDetailData(id);

  if (!product) {
    notFound();
  }

  const toppings = await getToppingListData();

  return (
    <section className="product-detail-page">
      <Breadcrumb
        items={[
          { href: "/products", label: "トップ" },
          { href: "/products", label: "商品一覧" },
          { label: "商品詳細" },
        ]}
      />

      <div className="product-detail">
        <div className="product-detail__summary">
          <ProductImage alt={product.name} priority src={product.imagePath} />
          <div className="product-detail__copy">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
          </div>
        </div>

        <ProductDetailForm
          action={addProductToCartAction}
          product={product}
          toppings={toppings}
        />
      </div>
    </section>
  );
}
