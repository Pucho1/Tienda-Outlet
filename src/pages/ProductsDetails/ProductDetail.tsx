import { Package } from 'lucide-react';

import useProductDetail from './useProductDetail';
import Swipper from '../../components/swipper/Swipper';
import GoBackBtn from '../../components/goBackBtn/GoBackBtn';

const ProductDetail = () => {

  const { productDetail } = useProductDetail();


  if (!productDetail) {
    return <div className="flex justify-center items-center h-screen">
      <p className="text-gray-600">Cargando detalles del producto...</p>
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">

      <GoBackBtn />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* IMAGE */}
        <div className="w-full object-contain object-center swipper-details">
          <Swipper images={productDetail.images} />
        </div>
        
        <div className='px-6'>
          <h1 className="text-3xl font-bold text-gray-900">{productDetail.name}</h1>
          <p className="text-gray-600 mt-2">{productDetail.category}</p>
          
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-blue-600">
              ${productDetail.price}
            </h2>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Descripción</h3>
            <p className="mt-2 text-gray-600">{productDetail.description}</p>
          </div>
          
          <div className="mt-6 flex items-center">
            <Package className="h-5 w-5 text-gray-600 mr-2" />
            <span className="text-gray-600">
              Stock disponible: <span className="font-semibold">{productDetail.quantity} unidades</span>
            </span>
          </div>
          
          {/* <button 
            // onClick={() => addProductDetail(productDetail)}
            className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Añadir al carrito
          </button> */}
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
