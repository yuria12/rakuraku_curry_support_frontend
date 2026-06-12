import { FieldError } from "@/components/common/Message";

type FormFieldProps = Readonly<{
  children: React.ReactNode;
  errorMessage?: string;
  htmlFor?: string;
  label: string;
}>;

export function FormField({
  children,
  errorMessage,
  htmlFor,
  label,
}: FormFieldProps) {
  const errorId = errorMessage && htmlFor ? `${htmlFor}-error` : undefined;

  return (
    <div className="field">
      <label className="field__label" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {errorMessage ? <FieldError id={errorId}>{errorMessage}</FieldError> : null}
    </div>
  );
}
