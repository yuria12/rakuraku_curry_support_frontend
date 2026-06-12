type MessageVariant = "error" | "success" | "info";

type MessageProps = Readonly<{
  children: React.ReactNode;
  id?: string;
  variant?: MessageVariant;
}>;

export function Message({ children, id, variant = "info" }: MessageProps) {
  return (
    <p className={`message message--${variant}`} id={id}>
      {children}
    </p>
  );
}

export function FieldError({
  children,
  id,
}: Readonly<{
  children: React.ReactNode;
  id?: string;
}>) {
  return (
    <p className="field__message field__message--error" id={id}>
      {children}
    </p>
  );
}
