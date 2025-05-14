export type ProductCategory = "male" | "female";

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: ProductCategory;
  price: number;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  category: ProductCategory;
  price: number;
  image_url: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  category?: ProductCategory;
  price?: number;
  image_url?: string;
}
