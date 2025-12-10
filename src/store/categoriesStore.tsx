import { create } from 'zustand';
import { Category, CategoriesState } from '../interfaces/categories';
import CategoriesService from '../service/CategoriesService';


const useCategoriesStore =  create<CategoriesState>((set) => ({
  categories: [],

	getCategories: () => {
		CategoriesService().getCategoriesList()
			.then((response) => {
				const categoriesData: Category[] = response.data;
				set(() => ({ categories: categoriesData }));
			})
			.catch((error) => {
				console.error("Error fetching categories:", error);
			});
	},

}));

export default useCategoriesStore;