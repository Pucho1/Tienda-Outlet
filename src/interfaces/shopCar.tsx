import { Product } from "./product";

export interface CarCardProps {
  product: Product;
  onRemove: (id: number) => void;
}