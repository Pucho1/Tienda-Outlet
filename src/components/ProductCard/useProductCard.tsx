import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/authZustandStore";
import { Product } from "../../interfaces/product";

const useProductCard = () => {

  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  const calcularDescuento = (price: number): {aumento:number, porcent: number} => {
    const aumento = price + 10;
    const porcent = 0;
    return {aumento , porcent};
  }

  const oferta = true;

  const goDetail = (product: Product) => {
		console.log("ver producto");
		navigate(`/product/${product.id}`, { state: { product } });
	};

  const goEditPage = (product: Product) => {
		console.log("Editar producto");
    navigate(`/editProduct/${product.id}`, { state: { product } });
  };

  return { calcularDescuento, oferta, isAuthenticated, goDetail, goEditPage};
};

export default useProductCard;