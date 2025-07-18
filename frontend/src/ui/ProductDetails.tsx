"use client";

import { useRouter } from "next/navigation";
import SignedImage from "@/src/ui/s3SignedUrl";
import { useState } from "react";
import { useCart } from "@/src/hooks/cartStore";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
};

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((state) => state.addItem);

  const handleBuyNow = () => router.push(`/checkout?items=${encodeURIComponent(JSON.stringify([{ id: product.id, quantity: quantity }]))}`);
  const handleAddToCart = () => {
    const item = {
      id: product.id,
      product_name: product.name,
      quantity,
      price: product.price,
      saved_at: new Date().toISOString(),
    };
    addItem(item);
    console.log("Added to cart:", product.id);
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">

        <SignedImage
            s3Url={product.image_url}
            alt={product.name}
            className="rounded-2xl object-cover w-full h-full"
        />
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <div className="text-2xl font-semibold text-blue-700">₦{product.price.toLocaleString()}</div>

        <div className="flex items-center gap-4">
          <label className="text-sm">Quantity:</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 px-2 py-1 border rounded-lg"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-black text-white rounded-xl hover:opacity-90 transition"
          >
            Add to Cart
          </button>

          <a
            href={`/checkout?productId=${product.id}&quantity=${quantity}`}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:opacity-90 transition"
          >
            Buy Now
          </a>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleBuyNow}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-5 py-2 rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
