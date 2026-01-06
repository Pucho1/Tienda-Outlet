import { useEffect, useState } from "react";
import ProductService from "../../service/ProductService";
import { useLocation } from "react-router";

const useProductDetail = ( ) => {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [productDetail, setProductDetail] = useState<any>();
  const location = useLocation();
  const id = location.pathname.split("/").pop() || "";

	useEffect(() => {
		ProductService().getProductById(id)
			.then((response) => {
				setProductDetail(response.data);
			})
			.catch((error) => {
				console.error("Error fetching productDetail:", error);
			});
	}, [id]);

	const quedanMenosDeDiez = (): boolean => {
		if (productDetail && productDetail.quantity < 10) {
			return true;
		}
		return false;
	};


  return { productDetail, quedanMenosDeDiez };
};

export default useProductDetail;
