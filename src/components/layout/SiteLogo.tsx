import Image from "next/image";

export function SiteLogo() {
  return (
    <span className="site-logo">
      <Image
        alt="ラクラクカリー"
        className="site-logo__image"
        height={1024}
        priority
        src="/images/products/rakurakucurry-logo.png"
        width={1536}
      />
    </span>
  );
}
