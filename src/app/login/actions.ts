"use server";

import { redirect } from "next/navigation";
import {
  authenticateUser,
  saveAuthSession,
} from "@/lib/auth-session";

function getRedirectPath(value: FormDataEntryValue | null) {
  const redirectTo = String(value ?? "/products");

  return redirectTo.startsWith("/") ? redirectTo : "/products";
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = getRedirectPath(formData.get("redirectTo"));

  if (!email || !password) {
    redirect("/login?error=required");
  }

  try {
    const response = await authenticateUser(email, password);
    await saveAuthSession(response);
  } catch {
    redirect("/login?error=invalid");
  }

  redirect(redirectTo);
}
