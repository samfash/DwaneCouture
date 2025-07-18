"use client";

import { useCart } from "@/src/hooks/cartStore";
import { createPayment } from "@/src/lib/payments";
import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const { items } = useCart();

  const searchParams = useSearchParams();
  const itemsParam = searchParams.get("items");

  const itemUsed = itemsParam ? JSON.parse(decodeURIComponent(itemsParam)) : items;

  const handleCheckout = async () => {
    try {
      const res = await createPayment( {
        email: "customer@email.com", // Replace with real customer email
        items: itemUsed,
        provider: "paystack", // or stripe, flutterwave
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Unable to initiate checkout.");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Proceed to Checkout
    </button>
  );
}
