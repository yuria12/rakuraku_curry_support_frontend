import { ButtonLink } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";

export default function OrderCompletePage() {
  return (
    <section className="order-complete-page">
      <Breadcrumb
        items={[
          { href: "/products", label: "トップ" },
          { href: "/cart", label: "カート" },
          { href: "/orders/confirm", label: "注文確認" },
          { label: "注文完了" },
        ]}
      />

      <section className="order-complete-card" aria-label="注文完了">
        <div className="order-complete-card__message">
          <h1>注文が完了しました！</h1>
          <p>
            この度はご注文ありがとうございます。
            <br />
            注文内容は注文履歴からも確認できます。
          </p>
        </div>

        <div className="order-complete-card__actions">
          <ButtonLink href="/orders">注文履歴を見る</ButtonLink>
          <ButtonLink href="/" size="sm" variant="secondary">
            トップページに戻る
          </ButtonLink>
        </div>
      </section>
    </section>
  );
}
