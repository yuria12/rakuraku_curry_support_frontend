import Image from "next/image";
import { ButtonLink } from "@/components/common/Button";

export default function NotFound() {
  return (
    <section className="error-page error-page--not-found">
      <div className="error-page__content">
        <div className="error-page__message">
          <h1>
            お鍋の中を探してみましたが、
            <br />
            お探しのページは見つかりませんでした。
          </h1>
          <ButtonLink href="/products" size="sm" variant="secondary">
            商品一覧を見る
          </ButtonLink>
        </div>

        <Image
          alt="空のカレー鍋"
          className="error-page__image error-page__image--not-found"
          height={512}
          priority
          src="/images/products/rakurakucurry404.png"
          width={768}
        />
      </div>
    </section>
  );
}
