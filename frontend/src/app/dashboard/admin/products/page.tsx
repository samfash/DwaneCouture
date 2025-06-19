"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/lib/api";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image_url: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetcher("/api/products", "GET");
        setProducts(res as Product[]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetcher(`/api/products/${id}`, "DELETE");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Failed to delete product: " + err.message);
      } else {
        alert("Failed to delete product: An unknown error occurred.");
      }
    }
  };

  if (loading) return <p className="text-center py-10">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          onClick={() => router.push("/dashboard/admin/products/create")}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product.id} className="p-4 bg-white dark:bg-gray-800 border rounded shadow">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-blue-600 font-bold">${product.price}</p>
              <p className="text-xs text-gray-400 mt-1">{product.description}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => router.push(`/dashboard/admin/products/edit/${product.id}`)}
                  className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
