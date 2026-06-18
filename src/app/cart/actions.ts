"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  deleteCartItem,
  updateCartItemQuantity,
} from "@/lib/cart-data";
import { isApiRequestError } from "@/lib/api/client";
import { trimValue, validateQuantityValue } from "@/lib/form-validation";

function redirectToLoginOnUnauthorized(error: unknown): never {
  if (isApiRequestError(error) && error.status === 401) {
    redirect("/auth/session-expired?redirectTo=/cart");
  }

  throw error;
}

export async function updateCartItemQuantityAction(formData: FormData) {
  const id = trimValue(formData.get("cartItemId"));
  const quantity = Number(formData.get("quantity"));

  if (!id || validateQuantityValue(formData.get("quantity"))) {
    return;
  }

  try {
    await updateCartItemQuantity(id, quantity);
  } catch (error) {
    redirectToLoginOnUnauthorized(error);
  }

  revalidatePath("/cart");
  revalidatePath("/orders/confirm");
}

export async function deleteCartItemAction(formData: FormData) {
  const id = trimValue(formData.get("cartItemId"));

  if (!id) {
    return;
  }

  try {
    await deleteCartItem(id);
  } catch (error) {
    redirectToLoginOnUnauthorized(error);
  }

  revalidatePath("/cart");
  revalidatePath("/orders/confirm");
}
