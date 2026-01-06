import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import ProductService from "../../service/ProductService";
import { Product } from "../../interfaces/product";
import useCategoriesStore from "../../store/categoriesStore";
import { useAlert } from "../../context/AlertContext";
import useMapers from "../../utilities/useMapers";
import useProducts from "../../utilities/useProducts";

const useCreateProduct = () => {

  const [productData, setProductData]       = useState<Product>();
  const [imageUrl, setImageUrl]             = useState<string>("");
  const [showImageField, setShowImageField] = useState<boolean>(false);

  const { showAlert }               = useAlert();
  const { categories }              = useCategoriesStore();
  const { mapDataToProduct }        = useMapers();
  const navigate 			              = useNavigate();
  const { isValidUrl, imageExists } = useProducts();

  const { register, handleSubmit, watch, formState: { errors, isDirty, isValid }, setValue } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createProduct =  (data: any) => {
    ProductService().createProduct(data)
      .then((response) => {
        if (response.status === 201) {
          showAlert({
            type: 'success',
            title: '¡Operación exitosa!',
            message: 'Los datos se han guardado correctamente en el sistema.',
            duration: 15000
          });
          navigate(`/products-list`);
        }
      })
      .catch((error) => {
         console.error("Error creating product:", error);
         showAlert({
          type: 'error',
          title: '¡Operación fallida!',
          message: 'Los datos no se han guardado correctamente en el sistema.',
          duration: 15000
        });
      });
  };

  const onSubmit = handleSubmit((data) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {imageUrl, ...rest}  = data;
      const newProduct = mapDataToProduct(rest as Product);
      createProduct(newProduct as Product);
  });

  const removeImage = (index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue("images", watch().images.filter((_: any, i: any) => i !== index));
  };

  /**
   * Agrega una nueva imagen al producto.
   * @returns
   */
  const addImage = () => {

    if (!imageUrl.trim()) return;

    setValue("images",
      watch().images ? [ ...watch().images, {"original":imageUrl.trim()}]  : [{"original":imageUrl.trim()}],
      { shouldValidate: true }
    );
    setImageUrl("");
  };
  
  return {
    addImage,
    removeImage,
    productData,
    setProductData,
    imageUrl,
    setImageUrl,
    showImageField,
    setShowImageField,
    categories,
    register,
    errors,
    watch,
    onSubmit,
    isDirty,
    isValidUrl,
    imageExists,
    isValid,
  };
};

export default useCreateProduct;
