/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import ProductService from "../../service/ProductService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useProducts = ( setProductList: any) => {

	
	useEffect(() => {
		ProductService().getProductsList()
			.then((response) => {
				console.log("Fetched products:", response.data);
				setProductList(response.data);
			})
			.catch((error) => {
				console.error("Error fetching products:", error);
			});
	}, []);

  return {}
};

export default useProducts;
