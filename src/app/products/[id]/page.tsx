import { notFound } from "next/navigation";
import { Button } from "@/components/common/Button";
import { ProductImage } from "@/components/common/ProductImage";
import { QuantityStepper } from "@/components/common/QuantityStepper";
import { mockProducts } from "@/mocks/products";
import { mockToppings } from "@/mocks/toppings";

type ProductDetailPageProps = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: String(product.id),
  }));
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = mockProducts.find((item) => item.id === Number(id));

  if (!product) {
    notFound();
  }

  const selectedSize = "M";
  const quantity = 1;
  const selectedToppings = mockToppings;
  const toppingsTotal = selectedToppings.reduce(
    (total, topping) => total + topping.priceM,
    0,
  );
  const totalPrice = (product.priceM + toppingsTotal) * quantity;

  return (
    <section className="product-detail-page">
      <p className="breadcrumb">パンくずリスト&gt;商品詳細</p>

      <div className="product-detail">
        <div className="product-detail__summary">
          <ProductImage alt={product.name} priority src={product.imagePath} />
          <div className="product-detail__copy">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
          </div>
        </div>

        <form className="product-detail__form">
          <fieldset className="option-group">
            <legend>サイズ選択</legend>
            <label>
              <input
                defaultChecked
                name="size"
                type="radio"
                value="M"
              />
              <span>M</span>
              <strong>¥{product.priceM.toLocaleString()}</strong>
            </label>
            <label>
              <input name="size" type="radio" value="L" />
              <span>L</span>
              <strong>¥{product.priceL.toLocaleString()}</strong>
            </label>
          </fieldset>

          <fieldset className="option-group">
            <legend>トッピング</legend>
            {mockToppings.map((topping) => (
              <label key={topping.id}>
                <input defaultChecked name="toppings" type="checkbox" />
                <span>{topping.name}</span>
                <strong>+¥{topping.priceM.toLocaleString()}</strong>
              </label>
            ))}
          </fieldset>

          <div className="detail-quantity">
            <div>
              <span>数量</span>
              <p>数量を選択してください</p>
            </div>
            <QuantityStepper value={quantity} />
          </div>

          <p className="detail-total">
            合計 ¥{totalPrice.toLocaleString()}
            <span>表示価格は{selectedSize}サイズ・選択中トッピングの仮計算です。</span>
          </p>

          <Button type="button">カートに入れる</Button>
        </form>
      </div>
    </section>
  );
}
