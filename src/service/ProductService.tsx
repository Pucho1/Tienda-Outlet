import { AxiosResponse } from "axios";

import { Product } from "../interfaces/product";
import newAxs from "../api/axiosSimplyCall";

const ProductService = () => {

  const getProductsList = (): Promise<AxiosResponse<Product[]>> => {
    return newAxs.get<Product[]>(`/products/all`);
  };

  const getProductsListByFilter = (category: number | undefined): Promise<AxiosResponse<Product[]>> => {
    return newAxs.get<Product[]>(`/products`, {
      params: { category },
    });
  };

   const getProductById = (id: string): Promise<AxiosResponse<Product>> => {
    return newAxs.get<Product>(`/products/${id}`);
  };

  return { getProductsList, getProductById, getProductsListByFilter };
};

export default ProductService;
