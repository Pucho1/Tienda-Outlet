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


  return { productDetail };
};

export default useProductDetail;
