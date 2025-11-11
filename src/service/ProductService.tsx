import { AxiosResponse } from "axios";

import { Product } from "../interfaces/product";
import newAxs from "../api/axiosSimplyCall";

const ProductService = () => {

  const getProductsList = (): Promise<AxiosResponse<Product[]>> => {
    return newAxs.get<Product[]>(`/products/all`);
  };

  return { getProductsList };
};

export default ProductService;
