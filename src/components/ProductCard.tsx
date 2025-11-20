// import { ArrowRight } from 'lucide-react';
import { Product } from '../interfaces/product';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {

  const calcularDescuento = (price: number): {aumento:number, porcent: number} => {
    const aumento = price + 10;
    const porcent = 0;
    return {aumento , porcent};
  }


  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-80 md:50 object-cover"
      />

      <div className="p-4 flex-col flex justify-between">

        {/* NAME */}
        <h3 className="font-bold text-gray-800 multiline-ellipsis">{product.name}</h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 mt-1 w-full truncate">{product.description}</p>

        {/* PRICES */}
        <div className="mt-4 flex flex-col">

          <span className="hidden text-lg font-bold">
            ${calcularDescuento(product.price).aumento }
          </span>

          <span className="text-lg font-semibold">
            ${product.price}
          </span>
        </div>

      </div>
    </div>
  );
};