export interface Category{
    id       : number | null,
    name     : string,
}

export interface CategoriesState{
    categories        : Category[],
    getCategories     : () => void,
};