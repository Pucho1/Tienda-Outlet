import { Cross, Shield, ThumbsUp, X } from "lucide-react";

import useCreateProduct from "./useCreateProduct";
import GoBackBtn from "../../components/goBackBtn/GoBackBtn";

const CreateProduct = () => {

  const { 
    addImage,
    removeImage,
    imageUrl,
    setImageUrl,
    showImageField,
    setShowImageField,
    categories,
    register,
    errors,
    onSubmit,
    watch,
    isValid,
    isDirty,
    isValidUrl,
    imageExists,
  } = useCreateProduct();


  return (
    <>
      <GoBackBtn />
      <form className="mt-8 space-y-6 px-6" onSubmit={ onSubmit }>

        <div className="space-y-4">

          {/* NAME */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>

            {/* NAME */}
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-gray-400" />
              </div>

              <input
                id="name"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                {...register("name", 
                  { 
                    required: {
                      value: true,
                      message: "Este campo es requerido"
                    }, 
                    minLength: {
                      value: 2,
                      message: "el nombre debe tener al menos 2 caracteres"
                    }
                  }
                )}
              />
            </div>
            {errors.name && <p className="pt-1 text-red-500">{errors.name.message as string}</p>}
          </div>

          {/* DESCRIPCION */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Descripcion
            </label>

            <div className="mt-1 relative">
              <textarea
                id="description"
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                {...register("description",
                  { 
                    required: {
                      value: true,
                      message: "Este campo es requerido"
                    }, 
                    minLength: {
                      value: 30,
                      message: "La descripción debe tener al menos 30 caracteres"
                    }
                  }
                )}
              />
            </div>
            {errors.description && <p className="pt-1 text-red-500">{errors.description.message as string}</p>}
          </div>

          {/* PRICE */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Price
            </label>

            {/* PRICE */}
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-gray-400" />
              </div>

              <input
                id="price"
                {...register("price",
                  {
                    required: {value: true, message: "Este campo es requerido"},
                    valueAsNumber: true,
                    min: {value: 0, message: "El precio no puede ser negativo"},
                    validate: (value) => Number.isInteger(value) || "El precio debe ser un número",
                  }
                )}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            {errors.price && <p className="pt-1 text-red-500">{errors.price.message as string}</p>}
          </div>

          {/* CATEGORIA */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Categoria
            </label>

            {/* CATEGORIA */}
            <div className="mt-1 relative">
              <select
                id="category"
                {...register("category", { required: true } )}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id ?? 0}>{cat.name}</option>
                ))}
              </select>
            </div>
            {errors.category && <p className="pt-1 text-red-500">{errors.category.message as string}</p>}
          </div>

          {/* CANTIDAD */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Cantidad
            </label>

            {/* CANTIDAD */}
            <div className="mt-1 relative">
              <input
                id="quantity"
                {...register( "quantity", {
                  required: {value: true, message: "Este campo es requerido"},
                  valueAsNumber: true,
                  min: {value: 0, message: "La cantidad no puede ser negativa"},
                  validate: (value) => Number.isInteger(value) || "La cantidad debe ser un número",
                })}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            {errors.quantity && <p className="pt-1 text-red-500">{errors.quantity.message as string}</p>}
          </div>

          {/* IMAGEN URL */}
          <div className={`transition-all duration-300 ease-out transform
              ${showImageField
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 max-h-0 pointer-events-none"}
            `}>
            <div className="overflow-hidden max-h-40 relative">
              <input
                className="block w-full pr-12 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="text"
                placeholder="Escriba la URL de la nueva imagen"
                value={imageUrl}
                onKeyDown={(e) => {
                  if (e.key === "Enter")  addImage();
                }}
                {...register("imageUrl",
                  {
                    onChange: (e) => setImageUrl(e.target.value),
                    validate: async (value: string) => {
                      if (!isValidUrl(value)) {
                        return "La URL no es válida";
                      }

                      const exists = await imageExists(value);
                      return exists || "La imagen no existe o no se puede cargar";
                    }
                  }
                )}
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
            {errors.imageUrl && <p className="pt-1 text-red-500">{errors.imageUrl.message as string}</p>}
          </div>
        </div>

        {/* IMAGENES Y BTN DE AGREGAR */}
        <div className="flex gap-3 flex-wrap my-6 px-6">
          {watch().images?.map((img: {original: string}, index: number) => (
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
            onClick={(e) =>{ 
              e.preventDefault();
              e.stopPropagation();
              return setShowImageField(!showImageField)
            }}
            className="size-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded lg:cursor-pointer">
            <button className="flex justy">
              <Cross className="h-10 w-10 text-gray-400 lg:cursor-pointer" />
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            disabled={ !isDirty && !isValid }
            type="submit"
            className={`
              group relative w-1/2 flex justify-center py-2.5 px-4 border border-transparent rounded-lg
              text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-indigo-500 font-medium
              disabled:bg-gray-400 disabled:cursor-not-allowed
            `}
          >
            Adicionar Producto
          </button>
        </div>
      </form>

      { JSON.stringify(watch(), null, 2) }
    </>
  );
};

export default CreateProduct;
