export const currySupportSteps = [
  {
    status: "Ready",
    title: "共通レイアウト",
    description:
      "ヘッダー、メイン領域、フッターを AppShell として分離しています。",
  },
  {
    status: "Ready",
    title: "配置場所",
    description:
      "components、mocks、lib/api を作成し、今後の UI と通信処理を分けて追加できます。",
  },
  {
    status: "Ready",
    title: "レスポンシブ基盤",
    description:
      "CSS 変数、コンテナ幅、clamp、ブレークポイントで画面幅に合わせる設計にしています。",
  },
] as const;
