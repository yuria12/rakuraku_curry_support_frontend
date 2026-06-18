export const validationMessages = {
  deliveryDateRequired: "お届け日を選択してください",
  deliveryTimeRequired: "お届け時間を選択してください",
  emailFormat: "メールアドレスの形式が不正です",
  passwordLength: "パスワードは８文字以上１６文字以内で設定してください",
  passwordMismatch: "パスワードと確認用パスワードが不一致です",
  passwordPolicy: "パスワードは英大文字・英小文字・数字を各1文字以上含めてください",
  paymentRequired: "支払方法を選択してください",
  phoneFormat: "電話番号はXXXX-XXXX-XXXXの形式で入力してください",
  postalCodeFormat: "郵便番号はXXX-XXXXの形式で入力してください",
  quantityRequired: "数量を選択してください",
} as const;
