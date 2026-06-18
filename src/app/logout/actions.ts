"use server";

import { redirect } from "next/navigation";
import {
  clearAuthSession,
  logoutUser,
} from "@/lib/auth-session";

export async function logoutAction() {
  await logoutUser();
  await clearAuthSession();

  redirect("/products");
}
