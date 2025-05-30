import { API_BASE_URL } from './api';

export const getAllProducts = async () => {
  const res = await fetch(`${API_BASE_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
};

export const getProductById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
};

// multipart upload
export const createProduct = async (formData: FormData, token: string) => {
  const res = await fetch(`${API_BASE_URL}/api/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
};
export const updateProduct = async (
  id: string,
  formData: FormData,
  token: string
) => {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
};
export const deleteProduct = async (id: string, token: string) => {
  const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
};
