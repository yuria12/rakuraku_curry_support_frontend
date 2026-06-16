"use server";

import { revalidatePath } from "next/cache";
import {
  deleteCartItem,
  updateCartItemQuantity,
} from "@/lib/cart-data";

export async function updateCartItemQuantityAction(formData: FormData) {
  const id = String(formData.get("cartItemId") ?? "");
  const quantity = Number(formData.get("quantity"));

  if (!id || !Number.isFinite(quantity) || quantity < 1) {
    return;
  }

  await updateCartItemQuantity(id, quantity);
  revalidatePath("/cart");
  revalidatePath("/orders/confirm");
}

export async function deleteCartItemAction(formData: FormData) {
  const id = String(formData.get("cartItemId") ?? "");

  if (!id) {
    return;
  }

  await deleteCartItem(id);
  revalidatePath("/cart");
  revalidatePath("/orders/confirm");
}
