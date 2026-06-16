import { ButtonLink } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductImage } from "@/components/common/ProductImage";
import { getOrderHistoryListData } from "@/lib/order-data";
import type { OrderHistory } from "@/types/order";

const deliveryStatuses = [
  { className: "order-history-card__status--preparing", label: "配送準備中" },
  { className: "order-history-card__status--shipping", label: "配送中" },
  { className: "order-history-card__status--delivered", label: "配送完了" },
] as const;

function formatDate(date: string) {
  const datePart = date.split(/[T\s]/)[0];

  return datePart.replaceAll("-", "/");
}

function formatOrderNumber(id: string) {
  return id.startsWith("#") ? id : `#${id}`;
}

function getOrderItemSummary(order: OrderHistory) {
  const [firstItem] = order.items;

  if (!firstItem) {
    return {
      name: "商品情報なし",
      suffix: "",
    };
  }

  const otherItemCount = order.items.length - 1;

  return {
    name: firstItem.product.name,
    suffix: otherItemCount > 0 ? `（他${otherItemCount}商品）` : "",
  };
}

function getDeliveryStatus(index: number) {
  return deliveryStatuses[index % deliveryStatuses.length];
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
        {orders.map((order, index) => {
          const itemSummary = getOrderItemSummary(order);
          const deliveryStatus = getDeliveryStatus(index);

          return (
            <article className="order-history-card" key={order.id}>
              <div className="order-history-card__image">
                {order.items[0] ? (
                  <ProductImage
                    alt={order.items[0].product.name}
                    src={order.items[0].product.imagePath}
                  />
                ) : null}
              </div>

              <div className="order-history-card__content">
                <p className="order-history-card__items-summary">
                  <span>{itemSummary.name}</span>
                  {itemSummary.suffix ? (
                    <span className="order-history-card__items-summary-sub">
                      {itemSummary.suffix}
                    </span>
                  ) : null}
                </p>
                <span
                  className={`order-history-card__status ${deliveryStatus.className}`}
                >
                  {deliveryStatus.label}
                </span>
                <dl className="order-history-card__meta">
                  <div>
                    <dt>注文日</dt>
                    <dd>{formatDate(order.deliveryDate)}</dd>
                  </div>
                  <div>
                    <dt>注文番号</dt>
                    <dd>{formatOrderNumber(order.id)}</dd>
                  </div>
                </dl>
              </div>

              <div className="order-history-card__actions">
                <p className="order-history-card__total-label">合計金額</p>
                <p className="order-history-card__total">
                  ¥{order.totalPrice.toLocaleString()}
                </p>
                <ButtonLink
                  href={`/orders/${order.id}`}
                  size="sm"
                  variant="secondary"
                >
                  詳細を見る &gt;
                </ButtonLink>
              </div>
            </article>
          );
        })}
      </div>

      <div className="orders-page__footer">
        <ButtonLink href="/products" variant="secondary">
          商品一覧へ戻る
        </ButtonLink>
      </div>
    </section>
  );
}
