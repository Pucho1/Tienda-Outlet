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

  const EditProductById = (id: string, product: Product) => {
    const newProduct = { ...product, price: Number(product.price), quantity: Number(product.quantity) };
    return newAxs.patch<Product>(`/products/update/${id}`, newProduct);
  };

  return { getProductsList, getProductById, getProductsListByFilter, EditProductById };
};

export default ProductService;
