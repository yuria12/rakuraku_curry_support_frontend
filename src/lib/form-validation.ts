import { validationMessages } from "@/lib/messages";

export { validationMessages };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPolicyPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
const phonePattern = /^\d{2,4}-\d{2,4}-\d{3,4}$/;
const postalCodePattern = /^\d{3}-\d{4}$/;

export function trimValue(value: FormDataEntryValue | null | undefined) {
  return String(value ?? "").trim();
}

export function getRequiredMessage(label: string) {
  return `${label}を入力してください`;
}

export function validateRequired(value: string, label: string) {
  return value ? undefined : getRequiredMessage(label);
}

export function validateEmail(value: string) {
  if (!value) {
    return getRequiredMessage("メールアドレス");
  }

  return emailPattern.test(value) ? undefined : validationMessages.emailFormat;
}

export function validatePostalCode(value: string) {
  if (!value) {
    return getRequiredMessage("郵便番号");
  }

  return postalCodePattern.test(value)
    ? undefined
    : validationMessages.postalCodeFormat;
}

export function validatePhone(value: string) {
  if (!value) {
    return getRequiredMessage("電話番号");
  }

  return phonePattern.test(value) ? undefined : validationMessages.phoneFormat;
}

export function validatePassword(value: string) {
  if (!value) {
    return getRequiredMessage("パスワード");
  }

  if (value.length < 8 || value.length > 16) {
    return validationMessages.passwordLength;
  }

  return passwordPolicyPattern.test(value)
    ? undefined
    : validationMessages.passwordPolicy;
}

export function validateQuantityValue(value: FormDataEntryValue | null) {
  const quantity = Number(value);

  if (!Number.isFinite(quantity) || !Number.isInteger(quantity) || quantity < 1) {
    return validationMessages.quantityRequired;
  }

  return undefined;
}

export function hasErrors(errors: Record<string, string | undefined>) {
  return Object.values(errors).some(Boolean);
}
