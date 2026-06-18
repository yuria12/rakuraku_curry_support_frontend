import Image from "next/image";

type ProductImageProps = Readonly<{
  alt: string;
  priority?: boolean;
  src: string;
}>;

function resolveProductImageSrc(src: string) {
  if (!src.startsWith("/img_curry/")) {
    return src;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    return src;
  }

  return new URL(src, apiBaseUrl).toString();
}

export function ProductImage({ alt, priority = false, src }: ProductImageProps) {
  const resolvedSrc = resolveProductImageSrc(src);

  return (
    <div className="product-image-frame">
      <Image alt={alt} fill priority={priority} sizes="(max-width: 620px) 100vw, 25vw" src={resolvedSrc} />
    </div>
  );
}
