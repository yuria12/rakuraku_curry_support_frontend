"use server";

import { revalidatePath } from "next/cache";
import {
  deleteCartItem,
  updateCartItemQuantity,
} from "@/lib/cart-data";
import { trimValue, validateQuantityValue } from "@/lib/form-validation";

export async function updateCartItemQuantityAction(formData: FormData) {
  const id = trimValue(formData.get("cartItemId"));
  const quantity = Number(formData.get("quantity"));

  if (!id || validateQuantityValue(formData.get("quantity"))) {
    return;
  }

  await updateCartItemQuantity(id, quantity);
  revalidatePath("/cart");
  revalidatePath("/orders/confirm");
}

export async function deleteCartItemAction(formData: FormData) {
  const id = trimValue(formData.get("cartItemId"));

  if (!id) {
    return;
  }

  await deleteCartItem(id);
  revalidatePath("/cart");
  revalidatePath("/orders/confirm");
}
