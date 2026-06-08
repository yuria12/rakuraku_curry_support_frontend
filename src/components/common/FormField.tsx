type FormFieldProps = Readonly<{
  children: React.ReactNode;
  htmlFor?: string;
  label: string;
}>;

export function FormField({ children, htmlFor, label }: FormFieldProps) {
  return (
    <label className="field" htmlFor={htmlFor}>
      <span className="field__label">{label}</span>
      {children}
    </label>
  );
}
