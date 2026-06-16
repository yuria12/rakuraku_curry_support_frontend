"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addCartItem } from "@/lib/cart-data";
import type { CurrySize } from "@/lib/api/types";

function getSize(value: FormDataEntryValue | null): CurrySize {
  return value === "L" ? "L" : "M";
}

export async function addProductToCartAction(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");
  const quantity = Number(formData.get("quantity") ?? 1);
  const size = getSize(formData.get("size"));
  const toppingIds = formData
    .getAll("toppingIds")
    .map((value) => String(value))
    .filter(Boolean);

  if (!productId || !Number.isFinite(quantity) || quantity < 1) {
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
