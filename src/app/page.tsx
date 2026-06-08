import { currySupportSteps } from "@/mocks/currySupportSteps";

export default function Home() {
  return (
    <section className="home">
      <div className="home__intro">
        <p className="eyebrow">Initial setup</p>
        <h1>らくらくカレーサポート フロントエンド</h1>
        <p>
          UI 改修に入る前の初期構築です。共通レイアウト、コンポーネント、
          API クライアント、モックデータを分けて配置できる状態にしています。
        </p>
      </div>

      <div className="step-grid" aria-label="初期構築の確認項目">
        {currySupportSteps.map((step) => (
          <article className="step-card" key={step.title}>
            <span>{step.status}</span>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
