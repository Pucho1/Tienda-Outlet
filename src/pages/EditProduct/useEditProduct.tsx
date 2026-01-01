import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useForm } from "react-hook-form";

import ProductService from "../../service/ProductService";
import { Product } from "../../interfaces/product";
import useMapers from "../../utilities/useMapers";
import useCategoriesStore from "../../store/categoriesStore";

const useEditProduct = () => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [images, setImages]                  = useState<any[]>();
  const [imageUrl, setImageUrl]              = useState("");
  const [showImageField, setShowImageField]  = useState<boolean>(false);

  const location             = useLocation();
  const id                   = location.pathname.split("/").pop() || "";
  const { mapDataToProduct } = useMapers();
  const { categories }       = useCategoriesStore();
  const { register, handleSubmit, watch, formState: { errors, isDirty }, reset, setValue } = useForm();

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
				// setProductDetail(response.data);
        setImages(response.data.images);
        reset(response.data);
			})
			.catch((error) => {
				console.error("Error fetching productDetail:", error);
			});
	}, [id]);

  const handlerFormChange = (e: React.FormEvent) => {
    e.preventDefault();
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
  };
};

export default useEditProduct;
