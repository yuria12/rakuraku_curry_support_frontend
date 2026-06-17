type CardProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export function Card({ children, className }: CardProps) {
  return (
    <div className={["card", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
