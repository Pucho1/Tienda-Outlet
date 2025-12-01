import { ArrowLeft, Package } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import { Product } from '../interfaces/product';
import { useTranslation } from 'react-i18next';
import useStore from '../store/useZTanDStore';

const ProductDetail = () => {

  const { addProduct } = useStore();

  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product as Product || {};

  const goBack = (): void => { navigate(-1) };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <button
        onClick={goBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        {t('GO_BACK')}
      </button>

      <h1></h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.category}</p>
          
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </h2>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Descripción</h3>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>
          
          <div className="mt-6 flex items-center">
            <Package className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-600">
              Stock disponible: <span className="font-semibold">{product.category} unidades</span>
            </span>
          </div>
          
          <button 
            onClick={() => addProduct(product)}
            className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
