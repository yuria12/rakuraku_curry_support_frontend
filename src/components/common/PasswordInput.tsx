import type { InputHTMLAttributes } from "react";
import { FormField } from "@/components/common/FormField";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
  label: string;
};

export function PasswordInput({
  errorMessage,
  id,
  label,
  ...props
}: PasswordInputProps) {
  const inputId = id ?? label;
  const errorId = errorMessage ? `${inputId}-error` : undefined;

  return (
    <FormField errorMessage={errorMessage} htmlFor={inputId} label={label}>
      <input
        aria-describedby={errorId}
        aria-invalid={errorMessage ? true : undefined}
        className="text-input"
        id={inputId}
        type="password"
        {...props}
      />
    </FormField>
  );
}
