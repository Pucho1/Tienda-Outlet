/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import ProductService from "../../service/ProductService";
import { useLocation } from "react-router";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useProductDetail = ( setProductDetail: any) => {

  const location = useLocation();
  const id = location.pathname.split("/").pop() || "";



	useEffect(() => {
		ProductService().getProductById(id)
			.then((response) => {
				console.log("Fetched productDetail:", response.data);
				const newData = {...response.data, images: response.data.images.map((image: string) => ({ original: image }))};
				setProductDetail(newData);
			})
			.catch((error) => {
				console.error("Error fetching productDetail:", error);
			});
	}, []);

  return {};
};

export default useProductDetail;
