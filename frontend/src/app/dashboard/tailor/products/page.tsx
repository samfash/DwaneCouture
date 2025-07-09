"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { fetcher } from "@/src/lib/api";

interface Product {
  id: string;
  name: string;
  price: number;
  category: "male" | "female";
  description: string;
  image: File | null;
}

export default function TailorProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleCreate = async () => {
    try {
      if (!imageFile) {
        alert("Please select an image file");
        return;
      }

      const formData = new FormData();
      formData.append("name", newProduct.name || "");
      formData.append("price", String(newProduct.price || ""));
      formData.append("category", newProduct.category || "");
      formData.append("description", newProduct.description || "");
      formData.append("image", imageFile); // 👈 must match `req.file` key on backend

      await fetcher("/api/products", "POST", formData,);

      alert("Product created!");
      setNewProduct({});
      setImageFile(null);
    } catch (err) {
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
            type="file"
            accept="image/*"
            onChange={handleFileChange}
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
