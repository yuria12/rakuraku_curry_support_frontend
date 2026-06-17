"use server";

import { redirect } from "next/navigation";
import { isApiRequestError } from "@/lib/api/client";
import { registerUser } from "@/lib/api/auth";

type RegisterError =
  | "duplicate"
  | "failed"
  | "invalidEmail"
  | "invalidPhone"
  | "invalidPostalCode"
  | "passwordMismatch"
  | "required";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d{2,4}-\d{2,4}-\d{3,4}$/;
const postalCodePattern = /^\d{3}-\d{4}$/;

function getStringValue(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function getRegisterPath(error: RegisterError) {
  return `/register?error=${error}`;
}

export async function registerAction(formData: FormData) {
  const name = getStringValue(formData, "name");
  const email = getStringValue(formData, "email");
  const postalCode = getStringValue(formData, "postalCode");
  const address = getStringValue(formData, "address");
  const phone = getStringValue(formData, "phone");
  const password = getStringValue(formData, "password");
  const passwordConfirmation = getStringValue(formData, "passwordConfirmation");

  if (
    !name ||
    !email ||
    !postalCode ||
    !address ||
    !phone ||
    !password ||
    !passwordConfirmation
  ) {
    redirect(getRegisterPath("required"));
  }

  if (!emailPattern.test(email)) {
    redirect(getRegisterPath("invalidEmail"));
  }

  if (!postalCodePattern.test(postalCode)) {
    redirect(getRegisterPath("invalidPostalCode"));
  }

  if (!phonePattern.test(phone)) {
    redirect(getRegisterPath("invalidPhone"));
  }

  if (password !== passwordConfirmation) {
    redirect(getRegisterPath("passwordMismatch"));
  }

  try {
    await registerUser({
      address,
      email,
      name,
      password,
      phone,
      postalCode,
    });
  } catch (error) {
    if (
      isApiRequestError(error) &&
      error.message === "そのメールアドレスはすでに使われています"
    ) {
      redirect(getRegisterPath("duplicate"));
    }

    redirect(getRegisterPath("failed"));
  }

  redirect("/login?registered=success");
}
