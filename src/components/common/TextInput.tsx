import type { InputHTMLAttributes } from "react";
import { FormField } from "@/components/common/FormField";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function TextInput({ id, label, ...props }: TextInputProps) {
  const inputId = id ?? label;

  return (
    <FormField htmlFor={inputId} label={label}>
      <input className="text-input" id={inputId} type="text" {...props} />
    </FormField>
  );
}
