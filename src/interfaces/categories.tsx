export interface Category{
    id       : number,
    name     : string,
}

export interface CategoriesState{
    categories        : Category[],
    getCategories     : () => void,
};