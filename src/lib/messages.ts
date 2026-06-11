export const validationMessages = {
  required: "入力してください。",
  email: "メールアドレスの形式で入力してください。",
  phone: "電話番号の形式で入力してください。",
  postalCode: "郵便番号の形式で入力してください。",
  passwordLength: "パスワードは8文字以上で入力してください。",
  passwordMismatch: "パスワードが一致していません。",
  dateRequired: "日付を選択してください。",
  timeRequired: "時間を選択してください。",
  quantityMin: "数量は1個以上を選択してください。",
} as const;

export const formMessages = {
  invalidInput: "入力内容を確認してください。",
  submitFailed: "処理に失敗しました。時間をおいて再度お試しください。",
} as const;

export const resultMessages = {
  orderComplete: "注文が完了しました。",
  logoutComplete: "ログアウトしました。",
} as const;
