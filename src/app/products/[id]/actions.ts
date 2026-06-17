"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addCartItem } from "@/lib/cart-data";
import type { CurrySize } from "@/lib/api/types";
import { trimValue, validateQuantityValue } from "@/lib/form-validation";

function getSize(value: FormDataEntryValue | null): CurrySize | undefined {
  if (value === "M" || value === "L") {
    return value;
  }

  return undefined;
}

export async function addProductToCartAction(formData: FormData) {
  const productId = trimValue(formData.get("productId"));
  const quantity = Number(formData.get("quantity") ?? 1);
  const size = getSize(formData.get("size"));
  const toppingIds = formData
    .getAll("toppingIds")
    .map((value) => String(value))
    .filter(Boolean);

  if (!productId || !size || validateQuantityValue(formData.get("quantity"))) {
    return;
  }

  await addCartItem({
    productId,
    quantity,
    size,
    toppingIds,
  });

  revalidatePath("/cart");
  revalidatePath("/orders/confirm");
  redirect("/cart");
}
