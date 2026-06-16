import { notFound } from "next/navigation";
import { Button } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductImage } from "@/components/common/ProductImage";
import { QuantityStepper } from "@/components/common/QuantityStepper";
import { ToppingPicker } from "@/components/product/ToppingPicker";
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
  const quantity = 1;
  const totalPriceM = product.priceM * quantity;
  const totalPriceL = product.priceL * quantity;

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

        <form action={addProductToCartAction} className="product-detail__form">
          <input name="productId" type="hidden" value={String(product.id)} />
          <input name="quantity" type="hidden" value={quantity} />

          <fieldset className="option-group option-group--size">
            <legend>サイズ選択</legend>
            <div className="size-options">
              <label>
                <input defaultChecked name="size" type="radio" value="M" />
                <span>
                  M
                  <strong>¥{product.priceM.toLocaleString()}</strong>
                </span>
              </label>
              <label>
                <input name="size" type="radio" value="L" />
                <span>
                  L
                  <strong>¥{product.priceL.toLocaleString()}</strong>
                </span>
              </label>
            </div>
          </fieldset>

          <fieldset className="option-group option-group--toppings">
            <legend>トッピング</legend>
            <ToppingPicker toppings={toppings} />
          </fieldset>

          <div className="detail-quantity">
            <div>
              <span>数量</span>
              <p>数量を選択してください</p>
            </div>
            <QuantityStepper value={quantity} />
          </div>

          <p className="detail-total detail-total--m">
            合計 ¥{totalPriceM.toLocaleString()}
          </p>
          <p className="detail-total detail-total--l">
            合計 ¥{totalPriceL.toLocaleString()}
          </p>

          <Button type="submit">カートに入れる</Button>
        </form>
      </div>
    </section>
  );
}
