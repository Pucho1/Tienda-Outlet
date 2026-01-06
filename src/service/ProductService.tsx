import { AxiosResponse } from "axios";

import { Product } from "../interfaces/product";
import newAxs from "../api/axiosSimplyCall";

const ProductService = () => {

  const getProductsList = (): Promise<AxiosResponse<Product[]>> => {
    return newAxs.get<Product[]>(`/products/all`);
  };

  const getProductsListByFilter = (category: number | null): Promise<AxiosResponse<Product[]>> => {
    return newAxs.get<Product[]>(`/products`, {
      params: { category },
    });
  };

  const getProductById = (id: string): Promise<AxiosResponse<Product>> => {
    return newAxs.get<Product>(`/products/${id}`);
  };

  const EditProductById = (id: string, product: Product) => {
    return newAxs.patch<Product>(`/products/update/${id}`, product);
  };

  const deleteProductById = (id : number): Promise<AxiosResponse<boolean>> => {
    return newAxs.delete<boolean>(`/products/delete/${id}`);
  };

  const createProduct = (product: Product): Promise<AxiosResponse<boolean>> => {
    return newAxs.post<boolean>(`/products/create`, product);
  };

  return { getProductsList, getProductById, getProductsListByFilter, EditProductById, deleteProductById, createProduct };
};

export default ProductService;
