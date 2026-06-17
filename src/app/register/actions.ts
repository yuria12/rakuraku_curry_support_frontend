"use server";

import { redirect } from "next/navigation";
import { registerUser } from "@/lib/api/auth";
import { isApiRequestError } from "@/lib/api/client";
import {
  trimValue,
  validateEmail,
  validatePassword,
  validatePhone,
  validatePostalCode,
  validateRequired,
} from "@/lib/form-validation";

type RegisterError =
  | "duplicate"
  | "failed"
  | "invalidEmail"
  | "invalidPhone"
  | "invalidPostalCode"
  | "passwordLength"
  | "passwordMismatch"
  | "passwordPolicy"
  | "required";

function getRegisterPath(error: RegisterError) {
  return `/register?error=${error}`;
}

export async function registerAction(formData: FormData) {
  const name = trimValue(formData.get("name"));
  const email = trimValue(formData.get("email"));
  const postalCode = trimValue(formData.get("postalCode"));
  const address = trimValue(formData.get("address"));
  const phone = trimValue(formData.get("phone"));
  const password = trimValue(formData.get("password"));
  const passwordConfirmation = trimValue(formData.get("passwordConfirmation"));

  if (
    validateRequired(name, "名前") ||
    !email ||
    !postalCode ||
    validateRequired(address, "住所") ||
    !phone ||
    !password ||
    !passwordConfirmation
  ) {
    redirect(getRegisterPath("required"));
  }

  if (validateEmail(email)) {
    redirect(getRegisterPath("invalidEmail"));
  }

  if (validatePostalCode(postalCode)) {
    redirect(getRegisterPath("invalidPostalCode"));
  }

  if (validatePhone(phone)) {
    redirect(getRegisterPath("invalidPhone"));
  }

  const passwordError = validatePassword(password);

  if (passwordError === "パスワードは８文字以上１６文字以内で設定してください") {
    redirect(getRegisterPath("passwordLength"));
  }

  if (passwordError) {
    redirect(getRegisterPath("passwordPolicy"));
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
