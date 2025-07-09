import { fetcher } from './api';

export const getAllProducts = async () => {
  const res = await fetcher(`/api/products`, "GET") as Response;
  return res;
};

export const getProductById = async (id: string) => {
  const res = await fetcher(`/api/products/${id}`, "GET") as Response;
  return res;
};

// multipart upload
export const createProduct = async (formData: FormData) => {
  const res = await fetcher(`/api/products`, 'POST', formData) as Response;
  return res;
};
export const updateProduct = async (
  id: string,
  formData: FormData,
) => {
  const res = await fetcher(`/api/products/${id}`,'PUT',formData,
  ) as Response;
  return res;
};
export const deleteProduct = async (id: string) => {
  const res = await fetcher(`/api/products/${id}`,'DELETE', undefined) as Response;
  return res;
};

export const getSignedUrl = async (key: string) => {
  const  data  = await fetcher(`/api/products/get-signed-url/${key}`, 'GET') as { url: string };
  return data.url;
}