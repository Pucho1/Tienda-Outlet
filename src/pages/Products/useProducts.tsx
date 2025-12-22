/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import ProductService from "../../service/ProductService";
import { Product } from "../../interfaces/product";
import filtersSelectedStore from "../../store/filtersSelected";
import { useAuthStore } from "../../store/authZustandStore";
import { useNavigate } from "react-router";


const useProducts = () => {
	const [productList, setProductList] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<any>(null);

  	const navigate = useNavigate();


	const { filtersSelected } = filtersSelectedStore();

	const { isAuthenticated } = useAuthStore();

	useEffect(() => {
		ProductService().getProductsListByFilter(filtersSelected?.category.id)
			.then((response) => {
				console.log("Fetched products filtered:", response.data);
				setProductList(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
				console.error("Error fetching products:", error);
			});
	}, [filtersSelected]);

	const goToCreate = () => {
    	navigate(`/createProduct`);
	};

  return { productList, loading, error, goToCreate, isAuthenticated };
};

export default useProducts;
