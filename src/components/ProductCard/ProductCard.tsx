import { Pencil } from 'lucide-react';

import Swipper from '../swipper/Swipper';
import useProductCard from './useProductCard';
import { ProductCardProps } from '../../interfaces/product';

import './pruductCard.css'

export const ProductCard = ({ product }: ProductCardProps) => {
  
  const { calcularDescuento, oferta, isAuthenticated, goDetail, goEditPage } = useProductCard();

  return (
    <div
      className="rounded-lg overflow-hidden md:cursor-pointer transform transition-transform hover:scale-105 relative"
      
    >
      {/* IMAGES */}
      <div 
        onClick={() => goDetail(product)}
        className="w-full object-contain object-center"
      >
        <Swipper images={product.images}/>
      </div>
     {/* OFERTA */}
     {oferta && (
        <div className="flex items-center bg-red-500 absolute z-10 bottom-34 sm:bottom-35 left-[6%] sm:left-[5%] w-15 pl-2 h-6 custom-banner-offer">
          <p className='text-sm text-white font-semibold'>Oferta</p>
        </div>
      )}

   

      {/* INFO */}
      <div className="p-4 sm:p-5 md:p-4 flex-col flex justify-between info-card">

        {/* NAME */}
        <h3 className="font-bold text-gray-800 multiline-ellipsis">{product.name}</h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-600 mt-1 w-full truncate">{product.description}</p>

        {/* PRICES */}
        <div className="mt-4 flex">

          <p className="hidden text-lg font-bold proportional-nums">
            ${calcularDescuento(product.price).aumento }
          </p>

          <p className="font-bold proportional-nums">
            ${product.price}
          </p>

          <div className="block w-24"></div>

          {/* EDIT BUTTON */}
          {isAuthenticated && (
            <button 
              onClick={ (e) => {
                e.stopPropagation();
                goEditPage(product)
              }}
              className="flex justify-center items-center w-15 bg-white shadow-md hover:bg-gray-100 transition-colors md:cursor-pointer"
            >
              <Pencil />
            </button>
          )}
        </div>

        

      </div>
    </div>
  );
};