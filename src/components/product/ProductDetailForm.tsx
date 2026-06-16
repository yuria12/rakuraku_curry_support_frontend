"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { QuantityStepper } from "@/components/common/QuantityStepper";
import { ToppingPicker } from "@/components/product/ToppingPicker";
import type { CurrySize } from "@/lib/api/types";
import type { Product } from "@/types/product";
import type { Topping } from "@/types/topping";

type ProductDetailFormProps = Readonly<{
  action: (formData: FormData) => void | Promise<void>;
  product: Product;
  toppings: Topping[];
}>;

function getProductPrice(product: Product, size: CurrySize) {
  return size === "M" ? product.priceM : product.priceL;
}

function getToppingPrice(topping: Topping, size: CurrySize) {
  return size === "M" ? topping.priceM : topping.priceL;
}

export function ProductDetailForm({
  action,
  product,
  toppings,
}: ProductDetailFormProps) {
  const [size, setSize] = useState<CurrySize>("M");
  const [selectedToppingIds, setSelectedToppingIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  const selectedToppings = useMemo(() => {
    return toppings.filter((topping) =>
      selectedToppingIds.includes(String(topping.id)),
    );
  }, [selectedToppingIds, toppings]);

  const totalPrice = useMemo(() => {
    const toppingTotal = selectedToppings.reduce((total, topping) => {
      return total + getToppingPrice(topping, size);
    }, 0);

    return (getProductPrice(product, size) + toppingTotal) * quantity;
  }, [product, quantity, selectedToppings, size]);

  return (
    <form action={action} className="product-detail__form">
      <input name="productId" type="hidden" value={String(product.id)} />
      <input name="quantity" type="hidden" value={quantity} />

      <fieldset className="option-group option-group--size">
        <legend>サイズ選択</legend>
        <div className="size-options">
          <label>
            <input
              checked={size === "M"}
              name="size"
              type="radio"
              value="M"
              onChange={() => setSize("M")}
            />
            <span>
              M
              <strong>¥{product.priceM.toLocaleString()}</strong>
            </span>
          </label>
          <label>
            <input
              checked={size === "L"}
              name="size"
              type="radio"
              value="L"
              onChange={() => setSize("L")}
            />
            <span>
              L
              <strong>¥{product.priceL.toLocaleString()}</strong>
            </span>
          </label>
        </div>
      </fieldset>

      <fieldset className="option-group option-group--toppings">
        <legend>トッピング</legend>
        <ToppingPicker
          selectedIds={selectedToppingIds}
          toppings={toppings}
          onSelectedIdsChange={setSelectedToppingIds}
        />
      </fieldset>

      <div className="detail-quantity">
        <div>
          <span>数量</span>
          <p>数量を選択してください</p>
        </div>
        <QuantityStepper
          decrementDisabled={quantity <= 1}
          value={quantity}
          onDecrement={() =>
            setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1))
          }
          onIncrement={() =>
            setQuantity((currentQuantity) => currentQuantity + 1)
          }
        />
      </div>

      <p className="detail-total">
        <span>選択内容にもとづく仮計算です</span>
        合計 ¥{totalPrice.toLocaleString()}
      </p>

      <Button type="submit">カートに入れる</Button>
    </form>
  );
}
