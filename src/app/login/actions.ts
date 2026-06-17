"use server";

import { redirect } from "next/navigation";
import {
  authenticateUser,
  saveAuthSession,
} from "@/lib/auth-session";
import { trimValue, validateEmail } from "@/lib/form-validation";

function getRedirectPath(value: FormDataEntryValue | null) {
  const redirectTo = String(value ?? "/products");

  return redirectTo.startsWith("/") && !redirectTo.startsWith("//")
    ? redirectTo
    : "/products";
}

function getLoginPath(
  error: "invalid" | "invalidEmail" | "requiredEmail" | "requiredPassword",
  redirectTo: string,
) {
  const params = new URLSearchParams({ error });

  if (redirectTo !== "/products") {
    params.set("redirectTo", redirectTo);
  }

  return `/login?${params.toString()}`;
}

export async function loginAction(formData: FormData) {
  const email = trimValue(formData.get("email"));
  const password = trimValue(formData.get("password"));
  const redirectTo = getRedirectPath(formData.get("redirectTo"));

  if (!email) {
    redirect(getLoginPath("requiredEmail", redirectTo));
  }

  if (validateEmail(email)) {
    redirect(getLoginPath("invalidEmail", redirectTo));
  }

  if (!password) {
    redirect(getLoginPath("requiredPassword", redirectTo));
  }

  try {
    const response = await authenticateUser(email, password);
    await saveAuthSession(response);
  } catch {
    redirect(getLoginPath("invalid", redirectTo));
  }

  redirect(redirectTo);
}
