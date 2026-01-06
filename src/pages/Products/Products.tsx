import useProducts from "./useProducts";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import TitleBig from "../../components/TitleBig";
import Skeleton from "../../components/Skeleton/Skeleton";
import NoProducts from "../../components/errors/NoProducts";
import { Cross } from "lucide-react";

const Products = () => {

	const { productList, loading, error, goToCreate, isAuthenticated, deleteProduct } = useProducts();
 
	return (
		<div className="flex flex-col gap-6">
			{error ?
				<div className="col-span-full" />
			:
				<div className="flex flex-col">
					<div className="flex items-center justify-center mb-5 h-1/7">
						<TitleBig />
					</div>
				</div>
			}
			{ isAuthenticated && <div className="flex justify-end">
				<div
					onClick={() => goToCreate()}
					className="w-60 h-12 flex items-center justify-center border-2 border-dashed border-gray-300 rounded md:cursor-pointer">
					<button className="flex flex-row lg:cursor-pointer">
						<p className="flex pr-5 justify-center items-center">Adicionar producto</p>
						<Cross className="h-10 w-10 text-gray-400" />
					</button>
				</div>
			</div>}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-5 gap-6 p-4">

				{ loading ?
					[...Array(10)].map((_, index) => <Skeleton key={index} /> )
				 :
				  error ?
					<NoProducts />
				  :
					productList.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							deleteProduct={deleteProduct}
						/>
					))
				}
			</div>
		</div>
	);
};

export default Products;
