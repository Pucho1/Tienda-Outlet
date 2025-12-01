import { useState } from "react";
import { useNavigate } from "react-router";

import useProducts from "./useProducts";
import { ProductCard } from "../../components/ProductCard";
import { Product } from "../../interfaces/product";
import TitleBig from "../../components/TitleBig";

const Products = () => {

	const [productList, setProductList] = useState<Product[]>([]);
	const navigate = useNavigate();

	useProducts(setProductList);

	const goDetail = (product: Product) => {
		navigate(`/product/${product.id}`, { state: { product } });
	};
 
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col">
				<div className="flex items-center justify-center mb-5 h-1/7">
					<TitleBig />
				</div>
			</div>
			
			
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-5 gap-6 p-4">
				{productList.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onClick={() => goDetail(product)}
					/>
				))}
			</div>
		</div>
	);
};

export default Products;
