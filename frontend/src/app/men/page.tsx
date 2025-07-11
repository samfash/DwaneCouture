"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/src/lib/api";
import { useCart } from "@/src/hooks/cartStore";
import { useRouter } from "next/navigation";
import SignedImage from "@/src/ui/s3SignedUrl";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  description: string;
}

export default function MenProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const res = await fetcher("/api/products?category=male", "GET");
        if (Array.isArray(res)) {
          setProducts(res as Product[]);
        } else {
          setError("Failed to load products.");
        }
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

    fetchMenProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading men&#39;s products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Men&#39;s Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white dark:bg-gray-900"
          >
            <SignedImage
              s3Url={product.image_url}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:opacity-75"
            />
            <div className="p-4 space-y-1">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {product.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{product.description}</p>
              <p className="text-blue-600 font-bold">${product.price}</p>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center gap-2">
              <button
                onClick={() => router.push(`/products/${product.id}`)}
                className="px-4 py-1 text-sm bg-white text-gray-800 rounded shadow hover:bg-gray-100"
              >
                View Details
              </button>
              <button
                onClick={() => addItem({
                  id: product.id,
                  product_name: product.name,
                  quantity: 1,
                  price: product.price,
                  saved_at: new Date().toISOString()
                })}
                className="px-4 py-1 text-sm bg-yellow-500 text-white rounded shadow hover:bg-yellow-600"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addItem({
                    id: product.id,
                    product_name: product.name,
                    quantity: 1,
                    price: product.price,
                    saved_at: new Date().toISOString(),
                  });
                  router.push("/checkout");
                }}
                className="px-4 py-1 text-sm bg-green-600 text-white rounded shadow hover:bg-green-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
