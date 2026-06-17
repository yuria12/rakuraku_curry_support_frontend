"use server";

import { redirect } from "next/navigation";
import {
  authenticateUser,
  saveAuthSession,
} from "@/lib/auth-session";

function getRedirectPath(value: FormDataEntryValue | null) {
  const redirectTo = String(value ?? "/products");

  return redirectTo.startsWith("/") && !redirectTo.startsWith("//")
    ? redirectTo
    : "/products";
}

function getLoginPath(error: "invalid" | "required", redirectTo: string) {
  const params = new URLSearchParams({ error });

  if (redirectTo !== "/products") {
    params.set("redirectTo", redirectTo);
  }

  return `/login?${params.toString()}`;
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = getRedirectPath(formData.get("redirectTo"));

  if (!email || !password) {
    redirect(getLoginPath("required", redirectTo));
  }

  try {
    const response = await authenticateUser(email, password);
    await saveAuthSession(response);
  } catch {
    redirect(getLoginPath("invalid", redirectTo));
  }

  redirect(redirectTo);
}
