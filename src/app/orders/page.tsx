import { ButtonLink } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductImage } from "@/components/common/ProductImage";
import { getOrderHistoryListData } from "@/lib/order-data";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function OrdersPage() {
  const orders = await getOrderHistoryListData();

  return (
    <section className="orders-page">
      <Breadcrumb
        items={[
          { href: "/products", label: "トップ" },
          { label: "注文履歴" },
        ]}
      />

      <div className="orders-page__header">
        <h1>注文一覧</h1>
        <p>過去に注文したカレーの内容を確認できます。</p>
      </div>

      <div className="order-history-list" aria-label="注文履歴一覧">
        {orders.map((order) => (
          <article className="order-history-card" key={order.id}>
            <header className="order-history-card__header">
              <p className="order-history-card__date">
                お届け日：<strong>{formatDate(order.deliveryDate)}</strong>
              </p>
              <ButtonLink
                href={`/orders/${order.id}`}
                size="sm"
                variant="secondary"
              >
                注文詳細
              </ButtonLink>
              <p className="order-history-card__total">
                合計金額：<strong>¥{order.totalPrice.toLocaleString()}</strong>
              </p>
            </header>

            <div className="order-history-card__items">
              {order.items.map((item) => (
                <article className="order-history-item" key={item.id}>
                  <div className="order-history-item__image">
                    <ProductImage
                      alt={item.product.name}
                      src={item.product.imagePath}
                    />
                  </div>

                  <div className="order-history-item__name">
                    <p>{item.product.name}</p>
                  </div>

                  <dl className="order-history-item__details">
                    <div>
                      <dt>サイズ：</dt>
                      <dd>{item.size}</dd>
                    </div>
                    <div>
                      <dt>個数：</dt>
                      <dd>{item.quantity}個</dd>
                    </div>
                  </dl>

                  <dl className="order-history-item__subtotal">
                    <div>
                      <dt>小計：</dt>
                      <dd>¥{item.subtotal.toLocaleString()}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="orders-page__footer">
        <ButtonLink href="/products" variant="secondary">
          商品一覧へ戻る
        </ButtonLink>
      </div>
    </section>
  );
}
