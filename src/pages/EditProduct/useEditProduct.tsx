import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import ProductService from "../../service/ProductService";
import { Product } from "../../interfaces/product";
import useMapers from "../../utilities/useMapers";
import useCategoriesStore from "../../store/categoriesStore";

const useEditProduct = () => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [images, setImages]                  = useState<any[]>();
  const [productDetail, setProductDetail]    = useState<Product>();
  const [imageUrl, setImageUrl]              = useState("");
  const [showImageField, setShowImageField]  = useState<boolean>(false);

  const location             = useLocation();
  const id                   = location.pathname.split("/").pop() || "";
  const { mapDataToProduct } = useMapers();
  const { categories }       = useCategoriesStore();


  const handleSubmit = (e: React.FormEvent ) => {
    e.preventDefault();

    const newProductDetails = mapDataToProduct(productDetail as Product);

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
    setProductDetail((prev) => {
      if (!prev) return prev;
      const updatedImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: updatedImages };
    });
  };

  const handlerChange = (e: React.FormEvent) => {
    e.preventDefault();

    setProductDetail((prev) => {
      if (!prev) return prev;
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
    setProductDetail((prev: any) => {
      if (!prev) return prev;

      return {
        ...prev,
        images: [...prev.images, {"original":imageUrl.trim()}],
      };
    });

    setImageUrl("");
  };

	useEffect(() => {
		ProductService().getProductById(id)
			.then((response) => {
				setProductDetail(response.data);
        setImages(response.data.images);
			})
			.catch((error) => {
				console.error("Error fetching productDetail:", error);
			});
	}, [id]);
  
  return { 
    addImage,
    removeImage,
    handlerChange,
    handleSubmit,
    images,
    setImages,
    productDetail,
    setProductDetail,
    imageUrl,
    setImageUrl,
    showImageField,
    setShowImageField,
    categories,
  };
};

export default useEditProduct;
