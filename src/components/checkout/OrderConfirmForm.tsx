"use client";

import { useState } from "react";
import { CartItemSummary } from "@/components/cart/CartItemSummary";
import { Button, ButtonLink } from "@/components/common/Button";
import { TextInput } from "@/components/common/TextInput";
import type { OrderConfirmData } from "@/lib/order-confirm-data";
import {
  hasErrors,
  trimValue,
  validateEmail,
  validatePhone,
  validatePostalCode,
  validateRequired,
  validationMessages,
} from "@/lib/form-validation";

const deliveryTimes = [
  "10時",
  "11時",
  "12時",
  "13時",
  "14時",
  "15時",
  "16時",
  "17時",
  "18時",
];

type CheckoutField =
  | "address"
  | "deliveryDate"
  | "deliveryTime"
  | "email"
  | "name"
  | "paymentMethod"
  | "phone"
  | "postalCode";

type CheckoutErrors = Partial<Record<CheckoutField, string>>;

type OrderConfirmFormProps = Readonly<{
  action: (formData: FormData) => void | Promise<void>;
  orderConfirm: OrderConfirmData;
}>;

export function OrderConfirmForm({ action, orderConfirm }: OrderConfirmFormProps) {
  const { cart, customer } = orderConfirm;
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [deliveryTime, setDeliveryTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(customer.paymentMethod);

  function clearError(field: CheckoutField) {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate(formData: FormData) {
    const nextErrors: CheckoutErrors = {
      address: validateRequired(trimValue(formData.get("address")), "住所"),
      deliveryDate: trimValue(formData.get("deliveryDate"))
        ? undefined
        : validationMessages.deliveryDateRequired,
      deliveryTime: trimValue(formData.get("deliveryTime"))
        ? undefined
        : validationMessages.deliveryTimeRequired,
      email: validateEmail(trimValue(formData.get("email"))),
      name: validateRequired(trimValue(formData.get("name")), "名前"),
      paymentMethod: trimValue(formData.get("paymentMethod"))
        ? undefined
        : validationMessages.paymentRequired,
      phone: validatePhone(trimValue(formData.get("phone"))),
      postalCode: validatePostalCode(trimValue(formData.get("postalCode"))),
    };

    setErrors(nextErrors);

    return !hasErrors(nextErrors);
  }

  return (
    <>
      <section className="checkout-section" aria-label="配送情報">
        <h1>配送情報</h1>
        <form
          action={action}
          className="checkout-form"
          id="order-confirm-form"
          noValidate
          onSubmit={(event) => {
            if (!validate(new FormData(event.currentTarget))) {
              event.preventDefault();
            }
          }}
        >
          <TextInput
            defaultValue={customer.name}
            errorMessage={errors.name}
            label="名前"
            name="name"
            onChange={() => clearError("name")}
          />
          <TextInput
            defaultValue={customer.email}
            errorMessage={errors.email}
            label="メールアドレス"
            name="email"
            type="email"
            onChange={() => clearError("email")}
          />
          <div className="checkout-postal">
            <TextInput
              defaultValue={customer.postalCode}
              errorMessage={errors.postalCode}
              label="郵便番号"
              name="postalCode"
              onChange={() => clearError("postalCode")}
            />
            <button type="button">住所検索</button>
          </div>
          <TextInput
            defaultValue={customer.address}
            errorMessage={errors.address}
            label="住所"
            name="address"
            onChange={() => clearError("address")}
          />
          <TextInput
            defaultValue={customer.phone}
            errorMessage={errors.phone}
            label="電話番号"
            name="phone"
            type="tel"
            onChange={() => clearError("phone")}
          />
          <TextInput
            errorMessage={errors.deliveryDate}
            label="お届け日"
            name="deliveryDate"
            type="date"
            onChange={() => clearError("deliveryDate")}
          />
          <div className="checkout-radio-field">
            <p>お届け時間</p>
            <div>
              <div className="checkout-time-options">
                {deliveryTimes.map((time) => (
                  <label key={time}>
                    <input
                      checked={deliveryTime === time}
                      name="deliveryTime"
                      type="radio"
                      value={time}
                      onChange={() => {
                        setDeliveryTime(time);
                        clearError("deliveryTime");
                      }}
                    />
                    <span>{time}</span>
                  </label>
                ))}
              </div>
              {errors.deliveryTime ? (
                <p className="field__message field__message--error">
                  {errors.deliveryTime}
                </p>
              ) : null}
            </div>
          </div>
        </form>
      </section>

      <section className="checkout-section" aria-label="支払方法">
        <h2>支払方法</h2>
        <div className="checkout-payment-options">
          {[
            ["creditCard", "クレジットカード"],
            ["payPay", "PayPay"],
            ["cash", "コンビニ払い"],
          ].map(([value, label]) => (
            <label key={value}>
              <input
                checked={paymentMethod === value}
                form="order-confirm-form"
                name="paymentMethod"
                type="radio"
                value={value}
                onChange={() => {
                  setPaymentMethod(value);
                  clearError("paymentMethod");
                }}
              />
              {label}
            </label>
          ))}
          {errors.paymentMethod ? (
            <p className="field__message field__message--error">
              {errors.paymentMethod}
            </p>
          ) : null}
        </div>
      </section>

      <section className="checkout-section" aria-label="カート内容">
        <h2>カート（{cart.items.length}件）</h2>
        <div className="checkout-cart-list">
          {cart.items.map((item) => (
            <CartItemSummary item={item} key={item.id} />
          ))}
        </div>
      </section>

      <section className="checkout-summary" aria-label="注文金額">
        <dl>
          <div>
            <dt>商品小計</dt>
            <dd>¥{cart.productsTotal.toLocaleString()}</dd>
          </div>
          <div>
            <dt>送料</dt>
            <dd>¥{cart.shippingFee.toLocaleString()}</dd>
          </div>
          <div>
            <dt>合計：</dt>
            <dd>¥{cart.orderTotal.toLocaleString()}</dd>
          </div>
        </dl>
        <div className="checkout-summary__actions">
          <ButtonLink href="/cart" variant="secondary">
            カートに戻る
          </ButtonLink>
          <Button form="order-confirm-form" type="submit">
            注文を確定する
          </Button>
        </div>
      </section>
    </>
  );
}
