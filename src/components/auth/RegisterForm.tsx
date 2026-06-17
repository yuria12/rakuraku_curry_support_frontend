"use client";

import { useState } from "react";
import { registerAction } from "@/app/register/actions";
import { Button, ButtonLink } from "@/components/common/Button";
import { Message } from "@/components/common/Message";
import { PasswordInput } from "@/components/common/PasswordInput";
import { TextInput } from "@/components/common/TextInput";
import {
  getRequiredMessage,
  hasErrors,
  trimValue,
  validateEmail,
  validatePassword,
  validatePhone,
  validatePostalCode,
  validateRequired,
} from "@/lib/form-validation";

type RegisterField =
  | "address"
  | "email"
  | "name"
  | "password"
  | "passwordConfirmation"
  | "phone"
  | "postalCode";

type RegisterFormErrors = Partial<Record<RegisterField, string>>;

type RegisterFormProps = Readonly<{
  errorMessage?: string;
}>;

export function RegisterForm({ errorMessage }: RegisterFormProps) {
  const [errors, setErrors] = useState<RegisterFormErrors>({});

  function clearError(field: RegisterField) {
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate(formData: FormData) {
    const password = trimValue(formData.get("password"));
    const passwordConfirmation = trimValue(formData.get("passwordConfirmation"));
    const nextErrors: RegisterFormErrors = {
      address: validateRequired(trimValue(formData.get("address")), "住所"),
      email: validateEmail(trimValue(formData.get("email"))),
      name: validateRequired(trimValue(formData.get("name")), "名前"),
      password: validatePassword(password),
      passwordConfirmation: !passwordConfirmation
        ? getRequiredMessage("パスワード確認")
        : password === passwordConfirmation
          ? undefined
          : "パスワードと確認用パスワードが不一致です",
      phone: validatePhone(trimValue(formData.get("phone"))),
      postalCode: validatePostalCode(trimValue(formData.get("postalCode"))),
    };

    setErrors(nextErrors);

    return !hasErrors(nextErrors);
  }

  return (
    <>
      <form
        className="auth-form auth-form--register"
        action={registerAction}
        noValidate
        onSubmit={(event) => {
          if (!validate(new FormData(event.currentTarget))) {
            event.preventDefault();
          }
        }}
      >
        {errorMessage ? <Message variant="error">{errorMessage}</Message> : null}
        <TextInput
          autoComplete="name"
          errorMessage={errors.name}
          id="name"
          label="名前"
          name="name"
          placeholder="例）山田 太郎"
          onChange={() => clearError("name")}
        />
        <TextInput
          autoComplete="email"
          errorMessage={errors.email}
          id="email"
          label="メールアドレス"
          name="email"
          placeholder="例）example@mail.com"
          type="email"
          onChange={() => clearError("email")}
        />
        <div className="auth-postal">
          <TextInput
            autoComplete="postal-code"
            errorMessage={errors.postalCode}
            id="postal-code"
            label="郵便番号"
            name="postalCode"
            placeholder="例）123-4567"
            onChange={() => clearError("postalCode")}
          />
          <button type="button">住所検索</button>
        </div>
        <p className="auth-form__note">
          郵便番号を入力後、住所検索で住所を入力できます
        </p>
        <TextInput
          autoComplete="street-address"
          errorMessage={errors.address}
          id="address"
          label="住所"
          name="address"
          placeholder="例）東京都渋谷区神宮前1-2-3"
          onChange={() => clearError("address")}
        />
        <TextInput
          autoComplete="tel"
          errorMessage={errors.phone}
          id="phone"
          label="電話番号"
          name="phone"
          placeholder="例）090-1234-5678"
          type="tel"
          onChange={() => clearError("phone")}
        />
        <PasswordInput
          autoComplete="new-password"
          errorMessage={errors.password}
          id="password"
          label="パスワード"
          name="password"
          placeholder="半角英数字を含む8文字以上"
          onChange={() => clearError("password")}
        />
        <p className="auth-form__note">
          8文字以上16文字以内で、英大文字・英小文字・数字を各1文字以上含めてください
        </p>
        <PasswordInput
          autoComplete="new-password"
          errorMessage={errors.passwordConfirmation}
          id="password-confirmation"
          label="パスワード確認"
          name="passwordConfirmation"
          placeholder="もう一度パスワードを入力してください"
          onChange={() => clearError("passwordConfirmation")}
        />
        <Button type="submit">登録する</Button>
      </form>

      <div className="auth-divider">
        <span>または</span>
      </div>

      <div className="auth-action">
        <p>アカウントをお持ちの方はこちら</p>
        <ButtonLink href="/login" size="sm" variant="secondary">
          ログインする
        </ButtonLink>
      </div>
    </>
  );
}
