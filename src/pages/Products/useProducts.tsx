/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import ProductService from "../../service/ProductService";
import { Product } from "../../interfaces/product";
import filtersSelectedStore from "../../store/filtersSelected";
import { useAuthStore } from "../../store/authZustandStore";
import { useNavigate } from "react-router";


const useProducts = () => {
	const [productList, setProductList] = useState<Product[]>([]);
	const [loading, setLoading] 		= useState<boolean>(true);
	const [error, setError] 			= useState<any>(null);

  	const navigate 			  = useNavigate();
	const { filtersSelected } = filtersSelectedStore();
	const { isAuthenticated } = useAuthStore();

	const getProductsList = (): void => {
		ProductService().getProductsListByFilter(filtersSelected?.category.id)
			.then((response) => {
				setProductList(response.data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	};

	useEffect(() => {
		getProductsList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filtersSelected]);

	const deleteProduct = (id: number) => {
		ProductService().deleteProductById(id)
		.then((resp) => {
			if( resp.status === 200 ) {
				getProductsList();
			}
		})
		.catch((err) => {
			console.log(err)
		})
	};

	const goToCreate = () => {
    	navigate(`/createProduct`);
	};

  return { productList, loading, error, goToCreate, isAuthenticated, deleteProduct };
};

export default useProducts;
