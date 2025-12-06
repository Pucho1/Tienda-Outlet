import { Product } from '../interfaces/product';
import Swipper from './swipper/Swipper';

import './pruductCard.css'

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

  const oferta = true;

  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 relative"
      onClick={onClick}
    >
      <div className="w-full object-contain object-center">
        <Swipper images={product.images}/>
      </div>

     {oferta && <div className="flex items-center bg-red-500 absolute z-10 bottom-34 sm:bottom-35 left-[6%] sm:left-[5%] w-15 pl-2 h-6 custom-banner-offer">
          <p className='text-sm text-white font-semibold'>Oferta</p>
      </div>}

      {/* INFO */}
      <div className="p-4 sm:p-5 md:p-4 flex-col flex justify-between info-card">

        {/* NAME */}
        <h3 className="font-bold text-gray-800 multiline-ellipsis">{product.name}</h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 mt-1 w-full truncate">{product.description}</p>

        {/* PRICES */}
        <div className="mt-4 flex flex-col">

          <p className="hidden text-lg font-bold proportional-nums">
            ${calcularDescuento(product.price).aumento }
          </p>

          <p className="font-bold proportional-nums">
            ${product.price}
          </p>
        </div>

      </div>
    </div>
  );
};