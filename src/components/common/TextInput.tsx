import type { InputHTMLAttributes } from "react";
import { FormField } from "@/components/common/FormField";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  errorMessage?: string;
  label: string;
};

export function TextInput({ errorMessage, id, label, ...props }: TextInputProps) {
  const inputId = id ?? label;
  const errorId = errorMessage ? `${inputId}-error` : undefined;

  return (
    <FormField errorMessage={errorMessage} htmlFor={inputId} label={label}>
      <input
        aria-describedby={errorId}
        aria-invalid={errorMessage ? true : undefined}
        className="text-input"
        id={inputId}
        type="text"
        {...props}
      />
    </FormField>
  );
}
