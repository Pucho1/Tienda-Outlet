import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useForm } from "react-hook-form";

import ProductService from "../../service/ProductService";
import { Product, ProductForm } from "../../interfaces/product";
import useMapers from "../../utilities/useMapers";
import useCategoriesStore from "../../store/categoriesStore";
import useProducts from "../../utilities/useProducts";

const useEditProduct = () => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [images, setImages]                  = useState<any[]>();
  const [imageUrl, setImageUrl]              = useState("");
  const [showImageField, setShowImageField]  = useState<boolean>(false);

  const location                    = useLocation();
  const id                          = location.pathname.split("/").pop() || "";
  const { mapDataToProduct }        = useMapers();
  const { categories }              = useCategoriesStore();
  const { isValidUrl, imageExists } = useProducts();
  
  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors, isDirty, isValid, dirtyFields }, reset, setValue, } 
  = useForm<ProductForm>(
    {
      mode: "onChange",
      defaultValues: {
        id: 0,
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        category: "",
        images: [],
      },
    }
  );

  /**
   * Se encarga de enviar la solicitud para actualizar el producto.
   * @param e evento de submit del formulario
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const newProductDetails = mapDataToProduct(data as Product);

    ProductService().EditProductById(id, newProductDetails as Product)
      .then((response) => {
        console.log("Product updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeImage = (index: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue("images", watch().images.filter((_: any, i: any) => i !== index));
  };

  /**
   * Agrega una nueva imagen al producto y la previsualiza en la lista de imagenes.
   * @returns
   */
  const addImage = () => {
    if (!imageUrl.trim()) return;
    setValue("images", [...watch().images, {"original":imageUrl.trim()}]);
    setImageUrl("");
  };

	useEffect(() => {
		ProductService().getProductById(id)
			.then((response) => {
        setImages(response.data.images);
        reset({
          id: response.data.id,
          name: response.data!.name,
          price: response.data.price,
          description: response.data.description,
          category: response.data.category,
          images: response.data.images,
          quantity: response.data.quantity
        });
			})
			.catch((error) => {
				console.error("Error fetching productDetail:", error);
			});
	}, [id]);

  /**
   * Maneja los cambios en el formulario.
   * @param e 
   */
  const handlerFormChange = (e: React.FormEvent) => {
    e.preventDefault();
  };


/**
 * verifica si el formulario tiene cambios reales e ignora el checkeo el campo de la URL de la imagen.
 * @returns boolean
 */
  const isFormValid = (): boolean => {

    // 1. Extrae el campo que importa de los campos sucios
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { imageUrl, ...restDirtyFields } = dirtyFields;

    // 2. Verificam si hay otros campos que realmente han cambiado
    const hasRealChanges = Object.keys(restDirtyFields).length > 0;

    // 2. Check de errores reales
    // Obtiene todos los nombres de campos que tienen errores
    const fieldsWithErrors = Object.keys(errors);

    // Filtra los errores para ver si hay alguno que NO sea el campo ignorado
    const hasRealErrors = fieldsWithErrors.some(fieldName => fieldName !== "imageUrl");

    return hasRealChanges && !hasRealErrors;
  };

  return {
    addImage,
    removeImage,
    handleSubmit,
    images,
    setImages,
    imageUrl,
    setImageUrl,
    showImageField,
    setShowImageField,
    categories,
    handlerFormChange,
    register,
    errors,
    watch,
    onSubmit,
    isDirty,
    isValidUrl,
    imageExists,
    isValid,
    isFormValid,
  };
};

export default useEditProduct;
