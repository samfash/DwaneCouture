// Product type definition
export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  createdAt: string;
  updatedAt: string;
};

export type GetProductsResponse = Product[];

export type GetProductResponse = {
  product: Product;
};

export type GetSignedUrlResponse = {
  url: string;
};