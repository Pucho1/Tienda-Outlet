import { create } from 'zustand'
import { Product } from '../interfaces/product';
import { carShopState } from '../interfaces/store';

const useStore = create<carShopState>((set) => ({

	cartProducts : [],

  addProduct : (newProduct: Product) =>
    set((state: carShopState) => {

      const existing = state.cartProducts .find(
        (product) => product.id === newProduct.id
      );

      if( existing ) {
        return {
          cartProducts :  state.cartProducts.map( product =>
            product.id === newProduct.id
              ? { ...product, quantity: (product.quantity ?? 0) + 1 }
              : product
          )
        };
      };

      return {
        cartProducts: [...state.cartProducts, { ...newProduct, quantity: 1 }]
      };
    }),

  deleteProductByID: (id: number) => set((state: carShopState) => (
    { cartProducts : state.cartProducts .filter((product) => product.id !== id) }
  )),


  changeQuantity: (id: number, increase?: string ) => set( (state: carShopState) =>  {
    return {
      cartProducts: state.cartProducts.map((item: Product) =>

        Number(item.id) === Number(id)
          ? {
              ...item,
              quantity: increase
                ? item.quantity! + 1

                : item.quantity! >= 2 ? item.quantity! - 1 : 1
            }
          : item,
      ),
    };
  }),

}));

export default useStore;