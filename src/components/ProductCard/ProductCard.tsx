import { Pencil, Trash } from 'lucide-react';

import Swipper from '../swipper/Swipper';
import useProductCard from './useProductCard';
import { ProductCardProps } from '../../interfaces/product';

import './pruductCard.css';

export const ProductCard = ({ deleteProduct, product }: ProductCardProps) => {
  
  const { calcularDescuento, oferta, isAuthenticated, goDetail, goEditPage } = useProductCard();

  return (

    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative flex flex-col">
      
      {/* IMAGES */}
      <div
        onClick={() => goDetail(product)}
        className="relative aspect-square bg-gray-50 cursor-pointer w-full object-contain object-center"
      >
        <Swipper images={product.images}/>
        
        {/* OFERTA BADGE - Modern floating style */}
        {oferta && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg z-10">
            Oferta
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      </div>

      {/* INFO */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* NAME */}
        <h3 
          onClick={() => goDetail(product)}
          className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 min-h-[3.5rem] cursor-pointer hover:text-gray-700 transition-colors"
        >
          {product.name}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* PRICES */}
        <div className="mt-auto pt-4 flex items-baseline gap-2">
          {oferta && (
            <p className="increase_text text-gray-400 line-through font-medium">
              ${calcularDescuento(product.price).aumento}
            </p>
          )}
          
          <p className="increase_text2 font-bold text-gray-900 tabular-nums">
            ${product.price}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        {isAuthenticated && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goEditPage(product);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-2 md:px-4 py-2.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg transition-all duration-200 font-medium text-sm group/btn"
            >
              <Pencil className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              <span>Editar</span>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteProduct(product.id)
              }}
              className="flex items-center justify-center px-4 py-2.5 bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg transition-all duration-200 group/btn"
            >
              <Trash className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
