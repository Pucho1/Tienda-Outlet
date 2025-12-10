import { AxiosResponse } from "axios";
import newAxs from "../api/axiosSimplyCall";

import { Category } from "../interfaces/categories";

const CategoriesService = () => {

  const getCategoriesList = (): Promise<AxiosResponse<Category[]>> => {
		return newAxs.get<Category[]>(`/category`);
	};

  return{ getCategoriesList };
};
export default CategoriesService;