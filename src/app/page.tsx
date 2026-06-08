import { ButtonLink } from "@/components/common/Button";
import { PlaceholderImage } from "@/components/common/PlaceholderImage";
import { ProductImage } from "@/components/common/ProductImage";
import { TextInput } from "@/components/common/TextInput";
import { mockProducts } from "@/mocks/products";

export default function Home() {
  const previewProducts = mockProducts.slice(0, 4);

  return (
    <section className="foundation-page">
      <div className="foundation-hero">
        <p className="eyebrow">Issue 1</p>
        <h1>共通UI基盤</h1>
        <p>
          Figma の見た目に合わせて、ヘッダー、ボタン、フォーム、画像表示、
          商品データの土台を整えています。
        </p>
        <ButtonLink href="/products">商品一覧を見る</ButtonLink>
      </div>

      <div className="foundation-section">
        <h2>フォーム部品</h2>
        <div className="foundation-form-preview">
          <TextInput label="商品名で検索" placeholder="バターチキンカレー" />
          <ButtonLink href="/products" variant="secondary">
            クリア
          </ButtonLink>
        </div>
      </div>

      <div className="foundation-section">
        <h2>商品画像部品</h2>
        <div className="product-preview-grid">
          {previewProducts.map((product) => (
            <article className="product-preview-card" key={product.id}>
              <ProductImage
                alt={product.name}
                src={product.imagePath}
                priority={product.id === 1}
              />
              <h3>{product.name}</h3>
              <p>
                M ¥{product.priceM.toLocaleString()} / L ¥
                {product.priceL.toLocaleString()}
              </p>
            </article>
          ))}
          <article className="product-preview-card">
            <PlaceholderImage label="差し替え画像" />
            <h3>プレースホルダー</h3>
            <p>ロゴ・バナー・未作成画像用</p>
          </article>
        </div>
      </div>
    </section>
  );
}
