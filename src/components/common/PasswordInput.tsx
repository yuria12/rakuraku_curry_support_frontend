import type { InputHTMLAttributes } from "react";
import { FormField } from "@/components/common/FormField";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function PasswordInput({ id, label, ...props }: PasswordInputProps) {
  const inputId = id ?? label;

  return (
    <FormField htmlFor={inputId} label={label}>
      <input className="text-input" id={inputId} type="password" {...props} />
    </FormField>
  );
}
