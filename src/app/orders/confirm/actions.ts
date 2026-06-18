"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createOrder } from "@/lib/api/orders";
import { resolveDataSource } from "@/lib/api/data-source";
import { getBackendSessionRequestInit } from "@/lib/auth-session";
import { getCartData } from "@/lib/cart-data";
import { getCartItemDisplaySubtotal } from "@/lib/cart-display-pricing";
import {
  hasErrors,
  trimValue,
  validateEmail,
  validatePhone,
  validatePostalCode,
  validateRequired,
  validationMessages,
} from "@/lib/form-validation";
import { mockCartItems } from "@/mocks/cart";
import { mockOrders } from "@/mocks/orders";
import type { OrderHistory } from "@/types/order";

type OrderFormErrors = Readonly<{
  address?: string;
  deliveryDate?: string;
  deliveryTime?: string;
  email?: string;
  name?: string;
  paymentMethod?: string;
  phone?: string;
  postalCode?: string;
}>;

function validateOrderForm(formData: FormData): OrderFormErrors {
  return {
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
}

function getMockOrderId() {
  const now = new Date();
  const date = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const sequence = String(mockOrders.length + 1).padStart(4, "0");

  return `${date}${sequence}`;
}

function createMockOrder(formData: FormData, cart: Awaited<ReturnType<typeof getCartData>>) {
  const order: OrderHistory = {
    customer: {
      address: trimValue(formData.get("address")),
      email: trimValue(formData.get("email")),
      name: trimValue(formData.get("name")),
      paymentMethod: trimValue(formData.get("paymentMethod")),
      paymentStatus: "未入金",
      phone: trimValue(formData.get("phone")),
      postalCode: trimValue(formData.get("postalCode")),
    },
    deliveryDate: trimValue(formData.get("deliveryDate")),
    deliveryTime: trimValue(formData.get("deliveryTime")),
    id: getMockOrderId(),
    items: cart.items.map((item) => ({
      ...item,
      subtotal: getCartItemDisplaySubtotal(item),
    })),
    totalPrice: cart.orderTotal,
  };

  mockOrders.unshift(order);
  mockCartItems.splice(0);
}

export async function createOrderAction(formData: FormData) {
  const errors = validateOrderForm(formData);

  if (hasErrors(errors)) {
    return;
  }

  const cart = await getCartData();

  if (cart.items.length === 0) {
    redirect("/cart");
  }

  await resolveDataSource<void>({
    api: async () => {
      await createOrder(
        {
          paymentMethod: trimValue(formData.get("paymentMethod")),
          shippingAddress: trimValue(formData.get("address")),
        },
        await getBackendSessionRequestInit(),
      );
    },
    mock: () => createMockOrder(formData, cart),
  });

  revalidatePath("/cart");
  revalidatePath("/orders");
  revalidatePath("/orders/confirm");
  redirect("/orders/complete");
}
