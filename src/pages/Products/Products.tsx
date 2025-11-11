import { useState } from "react";
import { useNavigate } from "react-router";

import useProducts from "./useProducts";
import { ProductCard } from "../../components/ProductCard";
import { Product } from "../../interfaces/product";

const Products = () => {

	const [productList, setProductList] = useState<Product[]>([]);
	const navigate = useNavigate();

	useProducts(setProductList);

	const goDetail = (product: Product) => {
		navigate(`/product/${product.id}`, { state: { product } });
	};
 
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{productList.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					onClick={() => goDetail(product)}
				/>
			))}
		</div>
	);
};

export default Products;
