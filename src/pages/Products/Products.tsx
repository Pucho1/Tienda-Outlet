import useProducts from "./useProducts";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import TitleBig from "../../components/TitleBig";
import Skeleton from "../../components/Skeleton/Skeleton";
// import Skeleton from "../../components/Skeleton/Skeleton";

const Products = () => {

	const { goDetail, productList, loading } = useProducts();
 
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col">
				<div className="flex items-center justify-center mb-5 h-1/7">
					<TitleBig />
				</div>
			</div>
			
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-5 gap-6 p-4">

				{ loading ?   
					[...Array(10)].map((_, index) => <Skeleton key={index} /> )
				 :
					productList.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							onClick={() => goDetail(product)}
						/>
						
					))
				}
			</div>
		</div>
	);
};

export default Products;
