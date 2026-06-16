export type Product = Readonly<{
  description: string;
  id: number | string;
  imagePath: string;
  name: string;
  priceL: number;
  priceM: number;
}>;
