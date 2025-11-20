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
		<div className="flex flex-col gap-6">
			<div className="flex flex-col h-[100vh]">
				<div className="flex items-center justify-center mb-5 h-1/7">
					<TitleBig />
				</div>

				<div className="flex flex-col md:flex-row mb-10 px-7 h-6/7 ">
					<div className="w-full md:w-1/2">
						<GalleryImage />
					</div>
					<div className="md:flex md:w-1/2 pt-5 bg-gray-100">
						<p className="text-2xl font-bold font-playfair">
							¡No es magia, es outlet! Descuentos que te hacen sentir que has ganado la lotería.
						</p>
					</div>
				</div>
			</div>
			
			
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
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
