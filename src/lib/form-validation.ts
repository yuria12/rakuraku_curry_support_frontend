export const validationMessages = {
  emailFormat: "メールアドレスの形式が不正です",
  passwordLength: "パスワードは８文字以上１６文字以内で設定してください",
  passwordMismatch: "パスワードと確認用パスワードが不一致です",
  passwordPolicy: "パスワードは英大文字・英小文字・数字を各1文字以上含めてください",
  paymentRequired: "支払方法を選択してください",
  phoneFormat: "電話番号はXXXX-XXXX-XXXXの形式で入力してください",
  postalCodeFormat: "郵便番号はXXX-XXXXの形式で入力してください",
  quantityRequired: "数量を選択してください",
  deliveryDateRequired: "お届け日を選択してください",
  deliveryTimeRequired: "お届け時間を選択してください",
} as const;

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
