/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import ProductService from "../../service/ProductService";
import normalizedDataResponse from "../../utilities/NormalizedData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useProducts = ( setProductList: any) => {

	
	useEffect(() => {
		ProductService().getProductsList()
			.then((response) => {
				console.log("Fetched products:", response.data);
				const mapedResponse = normalizedDataResponse(response.data);
				setProductList(mapedResponse);
			})
			.catch((error) => {
				console.error("Error fetching products:", error);
			});
	}, []);

  return {}
};

export default useProducts;
