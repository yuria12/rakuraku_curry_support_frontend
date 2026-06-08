import type { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: 1,
    description: "トマトとバターのコクがある人気のチキンカレーです。",
    imagePath: "/images/products/1.jpg",
    name: "バターチキンカレー",
    priceL: 1000,
    priceM: 1000,
  },
  {
    id: 2,
    description: "香りのよいスパイスを使った定番カレーです。",
    imagePath: "/images/products/2.jpg",
    name: "スパイスチキンカレー",
    priceL: 1200,
    priceM: 900,
  },
  {
    id: 3,
    description: "野菜の甘みを楽しめるやさしい味わいです。",
    imagePath: "/images/products/3.jpg",
    name: "野菜カレー",
    priceL: 1100,
    priceM: 850,
  },
  {
    id: 4,
    description: "じっくり煮込んだビーフのうまみが特徴です。",
    imagePath: "/images/products/4.jpg",
    name: "ビーフカレー",
    priceL: 1300,
    priceM: 1000,
  },
];
