/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import ProductService from "../../service/ProductService";
// import normalizedDataResponse from "../../utilities/NormalizedData";

import { Product } from "../../interfaces/product";


const useProducts = () => {
	const [productList, setProductList] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<any>(null);
	const navigate = useNavigate();

	const goDetail = (product: Product) => {
		navigate(`/product/${product.id}`, { state: { product } });
	};

	
	useEffect(() => {
		ProductService().getProductsList()
			.then((response) => {
				// const mapedResponse = normalizedDataResponse(response.data);
				console.log("Fetched products:", response.data);
				setProductList(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
				console.error("Error fetching products:", error);
			});
	}, []);

  return {goDetail, productList, loading, error};
};

export default useProducts;
