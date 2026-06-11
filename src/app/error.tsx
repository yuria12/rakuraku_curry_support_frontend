"use client";

import Image from "next/image";
import { ButtonLink } from "@/components/common/Button";

export default function Error() {
  return (
    <section className="error-page error-page--server-error">
      <div className="error-page__stacked">
        <Image
          alt="こぼしちゃったカレー鍋"
          className="error-page__image error-page__image--server-error"
          height={512}
          priority
          src="/images/products/rakurakucurry500.png"
          width={768}
        />

        <div className="error-page__message error-page__message--center">
          <h1>申し訳ありません。</h1>
          <p>
            カレーをこぼしてしまいました。
            <br />
            ただいま片付けていますので、
            しばらくしてからお試しください。
          </p>
          <ButtonLink href="/products" size="sm" variant="secondary">
            商品一覧へ戻る
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
