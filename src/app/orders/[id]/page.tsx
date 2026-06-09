import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/common/Button";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ProductImage } from "@/components/common/ProductImage";
import { mockOrders } from "@/mocks/orders";

type OrderDetailPageProps = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function formatDateWithWeekday(date: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    day: "numeric",
    month: "long",
    weekday: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function generateStaticParams() {
  return mockOrders.map((order) => ({
    id: order.id,
  }));
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;
  const order = mockOrders.find((item) => item.id === id);

  if (!order) {
    notFound();
  }

  const customerRows = [
    ["氏名", order.customer.name],
    ["メールアドレス", order.customer.email],
    ["郵便番号", order.customer.postalCode],
    ["住所", order.customer.address],
    ["電話番号", order.customer.phone],
    ["配達日", formatDateWithWeekday(order.deliveryDate)],
    ["配達時間", order.deliveryTime],
    ["支払方法", order.customer.paymentMethod],
    ["合計金額", `¥${order.totalPrice.toLocaleString()}`],
    ["支払い状況", order.customer.paymentStatus],
  ];

  return (
    <section className="order-detail-page">
      <Breadcrumb
        items={[
          { href: "/", label: "トップ" },
          { href: "/orders", label: "注文履歴" },
          { label: "注文詳細" },
        ]}
      />

      <div className="order-detail-page__header">
        <h1>注文詳細</h1>
        <p>ご注文内容の詳細と、お届け先情報をご確認いただけます。</p>
      </div>

      <section className="order-detail-card" aria-label="注文内容">
        <header className="order-detail-card__header">
          <p>
            お届け日：<strong>{formatDate(order.deliveryDate)}</strong>
          </p>
          <p>
            合計金額：<strong>¥{order.totalPrice.toLocaleString()}</strong>
          </p>
          <ButtonLink href="/orders" size="sm" variant="secondary">
            注文履歴に戻る
          </ButtonLink>
        </header>

        <div className="order-detail-card__section-title">注文内容</div>

        <div className="order-detail-items">
          {order.items.map((item) => (
            <article className="order-detail-item" key={item.id}>
              <div className="order-detail-item__image">
                <ProductImage
                  alt={item.product.name}
                  src={item.product.imagePath}
                />
              </div>
              <h2>{item.product.name}</h2>
              <dl className="order-detail-item__details">
                <div>
                  <dt>サイズ：</dt>
                  <dd>{item.size}</dd>
                </div>
                <div>
                  <dt>個数：</dt>
                  <dd>{item.quantity}個</dd>
                </div>
              </dl>
              <div className="order-detail-item__toppings">
                <p>トッピング</p>
                {item.toppings.length > 0 ? (
                  <ul>
                    {item.toppings.map((topping) => (
                      <li key={topping.id}>{topping.name}</li>
                    ))}
                  </ul>
                ) : (
                  <span>なし</span>
                )}
              </div>
              <dl className="order-detail-item__subtotal">
                <div>
                  <dt>小計：</dt>
                  <dd>¥{item.subtotal.toLocaleString()}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="order-detail-info" aria-label="お届け先">
        <h2>お届け先</h2>
        <dl className="order-detail-info__list">
          {customerRows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </section>
  );
}
