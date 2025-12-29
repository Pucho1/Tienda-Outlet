import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductService from "../../service/ProductService";
import { Product } from "../../interfaces/product";
import useCategoriesStore from "../../store/categoriesStore";
import { useAlert } from "../../context/AlertContext";
import useMapers from "../../utilities/useMapers";

const useCreateProduct = () => {

  const [productData, setProductData]       = useState<Product>();
  const [imageUrl, setImageUrl]             = useState("");
  const [showImageField, setShowImageField] = useState<boolean>(false);

  const { showAlert }        = useAlert();
  const { categories }       = useCategoriesStore();
  const { mapDataToProduct } = useMapers();
  const navigate 			       = useNavigate();


  const createProduct =  (newProduct: Product) => {
    ProductService().createProduct(newProduct as Product)
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

  const handleSubmit = (e: React.FormEvent ) => {
    e.preventDefault();
    const newProduct = mapDataToProduct(productData as Product);

    createProduct(newProduct as Product);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeImage = (index: any) => {
    setProductData((prev) => {
      if (!prev) return prev;
      const updatedImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: updatedImages };
    });
  };

  const handlerChange = (e: React.FormEvent) => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setProductData((prev: any) => {
      const { name, value } = e.target as HTMLInputElement;
      return { ...prev, [name]: value };
    })
  };

  /**
   * Agrega una nueva imagen al producto.
   * @returns
   */
  const addImage = () => {
    if (!imageUrl.trim()) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setProductData((prev: any) => {

      if (!prev) {
        return { 
          images: [ {"original":imageUrl.trim()}]
        };
      };

      if (!prev.images) {
        return { 
          ...prev,
          images: [ {"original":imageUrl.trim()}]
        };
      }

      return {
        ...prev,
        images: [...prev.images, {"original":imageUrl.trim()}],
      };
    });

    setImageUrl("");
  };
  
  return { 
    addImage,
    removeImage,
    handlerChange,
    handleSubmit,
    productData,
    setProductData,
    imageUrl,
    setImageUrl,
    showImageField,
    setShowImageField,
    categories,
  };
};

export default useCreateProduct;
