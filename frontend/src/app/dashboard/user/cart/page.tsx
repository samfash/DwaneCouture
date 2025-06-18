"use client";

import { useCart } from "@/src/hooks/cartStore";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Saved Items (Cart)</h1>

      {items.length === 0 ? (
        <div className="text-center space-y-4">
          <p className="text-gray-600">You have not saved any items yet.</p>
          <p className="text-gray-500 text-sm">
            You can save items for later from the products page.
          </p>
          <Link
            href="/products"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-200 dark:border-gray-700"
              >
                <p><strong>Product:</strong> {item.product_name}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Price:</strong> ${item.price}</p>
                <p><strong>Saved on:</strong> {new Date(item.saved_at).toLocaleDateString()}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-2 inline-block px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t flex justify-between items-center">
            <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
