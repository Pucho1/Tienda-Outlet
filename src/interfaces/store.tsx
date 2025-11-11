import { Product } from "./product";

export interface carShopState {
    cartProducts : Product[],
    addProduct : (newProduct: Product) => void;
    deleteProductByID: (id: number) => void;
    changeQuantity: (id: number, increase?: string) => void;
}