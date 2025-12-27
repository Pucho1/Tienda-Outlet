export interface Product {
    id	       : number,
    name       : string | undefined,
    price      : number | undefined,
    description: string | undefined,
    category   : string | number | undefined,
    images     : { original: string }[],
    quantity?  : number | undefined;
    brand      : string | undefined;
};

export interface ProductListResponse {
    products: Product[];
    total   : number;
    skip    : number;
    limit   : number;
};

export interface ProductCardProps extends Product {
  price : number
  deleteProduct: ((id: number) => void)
}