import Image from "next/image";

type ProductImageProps = Readonly<{
  alt: string;
  priority?: boolean;
  src: string;
}>;

export function ProductImage({ alt, priority = false, src }: ProductImageProps) {
  return (
    <div className="product-image-frame">
      <Image alt={alt} fill priority={priority} sizes="(max-width: 620px) 100vw, 25vw" src={src} />
    </div>
  );
}
