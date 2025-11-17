import { useState } from "react";
import { useNavigate } from "react-router";

import useProducts from "./useProducts";
import { ProductCard } from "../../components/ProductCard";
import { Product } from "../../interfaces/product";
import TitleBig from "../../components/TitleBig";
import GalleryImage from "../../components/galleryImage/GalleryImage";

const Products = () => {

	const [productList, setProductList] = useState<Product[]>([]);
	const navigate = useNavigate();

	useProducts(setProductList);

	const goDetail = (product: Product) => {
		navigate(`/product/${product.id}`, { state: { product } });
	};
 
	return (
		<>
			<div className="flex flex-col h-[80vh]">
				<div className="flex items-center justify-center mb-5">
					<TitleBig />
				</div>

				<div className="flex flex-row mb-10 px-7">
					<div className="w-full md:w-1/2">
						<GalleryImage />
					</div>
					<div className="hidden md:flex md:w-1/2">
						esapacio 
					</div>
				</div>
			</div>
			
			
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{productList.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						onClick={() => goDetail(product)}
					/>
				))}
			</div>
		</>
		
	);
};

export default Products;
