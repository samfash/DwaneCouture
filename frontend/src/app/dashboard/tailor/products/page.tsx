"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/lib/api";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  category: "male" | "female";
  description: string;
  image_url: string;
}

export default function TailorProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  // Removed unused error state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetcher("/api/products", "GET");
        setProducts(res as Product[]);
      } catch {
        // Error handling removed as error state is unused
      } finally {
        // loading state removed
      }
    };

    fetchProducts();
  }, []);
  const handleCreate = async () => {
    try {
      const res = await fetcher("/api/products", "POST", newProduct);
      setProducts((prev) => [res as Product, ...prev]);
      setNewProduct({});
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Failed to create product: " + err.message);
      } else {
        alert("Failed to create product: An unknown error occurred.");
      }
    }
  };

  const handleUpdate = async (id: string, updates: Partial<Product>) => {
    try {
      const res = await fetcher(`/api/products/${id}`, "PATCH", updates);
      setProducts((prev) => prev.map((p) => (p.id === id ? (res as Product) : p)));
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert("Failed to update product: " + err.message);
      } else {
        alert("Failed to update product: An unknown error occurred.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Products</h1>

      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold">Add New Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            placeholder="Name"
            value={newProduct.name || ""}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="px-4 py-2 border rounded"
          />
          <input
            placeholder="Price"
            type="number"
            value={newProduct.price || ""}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            className="px-4 py-2 border rounded"
          />
          <select
            value={newProduct.category || ""}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as "male" | "female" })}
            className="px-4 py-2 border rounded"
          >
            <option value="">Select Category</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            placeholder="Image URL"
            value={newProduct.image_url || ""}
            onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
            className="px-4 py-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={newProduct.description || ""}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="px-4 py-2 border rounded col-span-full"
          />
        </div>
        <button
          onClick={handleCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 bg-white dark:bg-gray-900 shadow space-y-2"
          >
            <Image
              src={product.image_url}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p>${product.price.toFixed(2)}</p>
              <textarea
                value={product.description}
                onChange={(e) => handleUpdate(product.id, { description: e.target.value })}
                className="w-full mt-2 p-1 text-sm border rounded"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
