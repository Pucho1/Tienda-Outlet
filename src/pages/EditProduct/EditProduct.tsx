import { Barcode, Shirt, X, Cross, ThumbsUp  } from "lucide-react";

import useEditProduct from "./useEditProduct";
import GoBackBtn from "../../components/goBackBtn/GoBackBtn";

const EditProduct = () => {

  const { 
    addImage,
    removeImage,
    handlerChange,
    handleSubmit,
    images,
    productDetail,
    imageUrl,
    setImageUrl,
    showImageField,
    setShowImageField,
  } = useEditProduct();

  return (
    <>

      <GoBackBtn />
      
      <form className="mt-8 space-y-6 px-6" onSubmit={ (e) => handleSubmit(e) }>
        <div className="space-y-4">
          {/* NOMBRE */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              ID
            </label>

            {/* ID */}
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Barcode className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="id"
                name="id"
                autoComplete="id"
                required
                value={productDetail?.id || ""}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="01"
              />
            </div>
          </div>
          
          {/* NAME */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>

            {/* NAME */}
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shirt className="h-5 w-5 text-gray-400" />
              </div>

              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                value={productDetail?.name || ""}
                onChange={(e) => handlerChange(e)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder=""
              />
            </div>
          </div>

          {/* DESCRIPCION */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Descripcion
            </label>

            {/* NAME */}
            <div className="mt-1 relative">
              <textarea
                id="description"
                name="description"
                autoComplete="description"
                value={productDetail?.description || ""}
                onChange={(e) => handlerChange(e)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder=""
              />
            </div>
          </div>

          {/* CANTIDAD */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Cantidad
            </label>

            {/* NAME */}
            <div className="mt-1 relative">

              <input
                id="quantity"
                name="quantity"
                autoComplete="quantity"
                type="number"
                value={productDetail?.quantity || ""}
                onChange={(e) => handlerChange(e)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          {/* IMAGEN URL */}
          <div className={` transition-all duration-300 ease-out transform
            ${showImageField 
              ? "opacity-100 translate-y-0 max-h-40" 
              : "opacity-0 -translate-y-2 max-h-0 pointer-events-none"}
            overflow-hidden
          `}>
            <input
              className="block w-full pr-12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              placeholder="Escriba la URL de la nueva imagen"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
              onKeyDown={(e) => {
                if (e.key === "Enter")  addImage();
              }}
            />

            <button
              type="button"
              onClick={addImage}
              className="absolute right-2 top-1/2 -translate-y-1/2
                        text-indigo-600 hover:text-indigo-800"
              aria-label="Agregar imagen"
            >
              <ThumbsUp size={20} />
            </button>
          </div>
        </div>
        {/* IMAGENES Y BTN DE AGREGAR */}
        <div className="flex gap-3 flex-wrap my-6 px-6">
          {images?.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img.original}
                alt={`img-${index}`}
                className="size-24 object-cover rounded"
              />

              <button
                type="button"
                className="absolute top-1 right-1"
                onClick={() => removeImage(index)}
              >
                <X className="h-5 w-5 text-black" />
              </button>
            </div>
          ))}

          <div 
            onClick={() => setShowImageField(!showImageField)}
            className="size-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded lg:cursor-pointer">
            <button className="flex justy">
              <Cross className="h-10 w-10 text-gray-400 lg:cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="group relative w-1/2 flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium"
          >
            Update Product
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProduct;
