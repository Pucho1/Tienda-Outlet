import { AxiosResponse } from "axios";
import newAxs from "../api/axiosSimplyCall";

import { Categories } from "../interfaces/categories";

const CategoriesService = () => {

  const getCategoriesList = (): Promise<AxiosResponse<Categories[]>> => {
		return newAxs.get<Categories[]>(`/category`);
	};

  return{ getCategoriesList };
};
export default CategoriesService;