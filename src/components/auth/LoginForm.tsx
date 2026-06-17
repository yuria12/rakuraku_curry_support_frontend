"use client";

import { useState } from "react";
import { loginAction } from "@/app/login/actions";
import { Button, ButtonLink } from "@/components/common/Button";
import { Message } from "@/components/common/Message";
import { PasswordInput } from "@/components/common/PasswordInput";
import { TextInput } from "@/components/common/TextInput";
import {
  hasErrors,
  trimValue,
  validateEmail,
  validateRequired,
} from "@/lib/form-validation";

type LoginFormErrors = Partial<Record<"email" | "password", string>>;

type LoginFormProps = Readonly<{
  errorMessage?: string;
  infoMessage?: string;
  redirectTo: string;
  successMessage?: string;
}>;

export function LoginForm({
  errorMessage,
  infoMessage,
  redirectTo,
  successMessage,
}: LoginFormProps) {
  const [errors, setErrors] = useState<LoginFormErrors>({});

  function validate(formData: FormData) {
    const nextErrors: LoginFormErrors = {
      email: validateEmail(trimValue(formData.get("email"))),
      password: validateRequired(trimValue(formData.get("password")), "パスワード"),
    };

    setErrors(nextErrors);

    return !hasErrors(nextErrors);
  }

  return (
    <>
      <form
        className="auth-form"
        action={loginAction}
        noValidate
        onSubmit={(event) => {
          if (!validate(new FormData(event.currentTarget))) {
            event.preventDefault();
          }
        }}
      >
        <input name="redirectTo" type="hidden" value={redirectTo} />
        {errorMessage ? <Message variant="error">{errorMessage}</Message> : null}
        {!errorMessage && successMessage ? (
          <Message variant="success">{successMessage}</Message>
        ) : null}
        {!errorMessage && !successMessage && infoMessage ? (
          <Message variant="info">{infoMessage}</Message>
        ) : null}
        <TextInput
          autoComplete="email"
          errorMessage={errors.email}
          id="email"
          label="メールアドレス："
          name="email"
          type="email"
          onChange={() => setErrors((current) => ({ ...current, email: undefined }))}
        />
        <PasswordInput
          autoComplete="current-password"
          errorMessage={errors.password}
          id="password"
          label="パスワード："
          name="password"
          onChange={() =>
            setErrors((current) => ({ ...current, password: undefined }))
          }
        />
        <Button type="submit">ログインする</Button>
      </form>

      <div className="auth-divider">
        <span>または</span>
      </div>

      <div className="auth-action">
        <p>初めての方はこちら</p>
        <ButtonLink href="/register" size="sm" variant="secondary">
          会員登録する
        </ButtonLink>
      </div>
    </>
  );
}
