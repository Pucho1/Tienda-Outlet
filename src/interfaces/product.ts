export interface Product {
    id	       : number,
    name       : string,
    price      : number,
    description: string,
    category   : string,
    images     : { original: string }[],
    quantity?  : number;
    brand      : string;
};

export interface ProductListResponse {
    products: Product[];
    total   : number;
    skip    : number;
    limit   : number;
};

export interface ProductCardProps {
  product: Product;
}