"use server";

import { redirect } from "next/navigation";
import {
  clearAuthSession,
  getAuthSession,
  logoutUser,
} from "@/lib/auth-session";

export async function logoutAction() {
  const session = await getAuthSession();

  await logoutUser(session.token);
  await clearAuthSession();

  redirect("/products");
}
