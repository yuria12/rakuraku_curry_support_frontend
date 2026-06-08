type PlaceholderImageProps = Readonly<{
  label?: string;
}>;

export function PlaceholderImage({ label = "Placeholder" }: PlaceholderImageProps) {
  return <div className="placeholder-image">{label}</div>;
}
