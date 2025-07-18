"use client";

import { useCart } from "@/src/hooks/cartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, clearCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    router.push(`/checkout?product=${items}`);
  };


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
                <div className="flex items-center space-x-2 mt-2">
                  <label htmlFor={`qty-${item.id}`} className="font-medium">Quantity:</label>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 px-2 py-1 border rounded"
                  />
                </div>
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

          <div className="border-t pt-4" >
          <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
          </div>

          <div className="pt-2 flex justify-between items-center">
             <button onClick={handleCheckout} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl">
              Proceed to Checkout
            </button>
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
