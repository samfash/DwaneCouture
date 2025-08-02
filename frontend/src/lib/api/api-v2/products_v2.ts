import { fetcher } from './api_v2';
import type { Product, GetProductsResponse, GetProductResponse, GetSignedUrlResponse } from '@/src/types/products';

type ProductCategory = 'male' | 'female';

// Get all products
export const getAllProducts = (category?: ProductCategory) => {
  const query = category ? `?category=${category}` : '';
  return fetcher.get<GetProductsResponse>(`/api/products${query}`);
}

// Get product by ID
export const getProductById = (id: string) =>
  fetcher.get<GetProductResponse>(`/api/products/${id}`);

// Create a product (multipart)
export const createProduct = (formData: FormData) =>
  fetcher.post<Product>('/api/products', formData);

// Update product
export const updateProduct = (id: string, formData: FormData) =>
  fetcher.patch<Product>(`/api/products/${id}`, formData);

// Delete product
export const deleteProduct = (id: string) =>
  fetcher.delete<void>(`/api/products/${id}`);

// Get signed S3 upload URL
export const getSignedUrl = async (key: string) => {
  const { url } = await fetcher.get<GetSignedUrlResponse>(`/api/products/get-signed-url/${key}`);
  return url;
};

