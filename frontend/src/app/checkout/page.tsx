"use client";

import { createPayment } from "@/src/lib/payments";
import { createOrder } from "@/src/lib/orders";
import { getProductById } from "@/src/lib/products";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";


interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface OrderResponse {
  data: {
    id: string;
  };
}
interface PaymentResponse {
  data?: {
    url?: string;
  };
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const itemsParam = searchParams.get("items");
 

  const [products, setProducts] = useState<CartItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const itemUsed: { id: string; quantity: number }[] = itemsParam
      ? JSON.parse(decodeURIComponent(itemsParam))
      : [];


      try {
        const productData = await Promise.all(
          itemUsed.map(async (item) => {
            const res = await getProductById(item.id);
            const data: Product = await res.json();
            console.log("the res product is: ", res)
            console.log("the data product is: ", data)
            return { ...data, quantity: item.quantity};
          })
        );
        console.log("this is the product data : ",productData)
        setProducts(productData);
      } catch {
        toast.error("Failed to load products");
      }
    };

    if (!itemsParam) {
      fetchProducts();
    }
  }, [itemsParam]);

  const handleCheckout = async () => {
    if (!deliveryAddress.trim()) {
      toast.error("Delivery address is required");
      return;
    }

    if (!products.length) {
      toast.error("Products not loaded");
      return;
    }

    setLoading(true);

    try {
      const orderItems = products.map((p) => ({
        product_id: p.id,
        quantity: p.quantity,
        delivery_address: deliveryAddress,
        notes,
      }));

      const createdOrders = await Promise.all(
        orderItems.map((item) => createOrder(item))
      ) as OrderResponse[];

      const totalAmount = products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const paymentRes = await createPayment({
        order_id: createdOrders[0].data.id, // Assuming one payment per batch
        payment_method: paymentMethod,
        amount: totalAmount,
        currency: "NGN",
      }) as PaymentResponse;

      const url = paymentRes?.data?.url;

      if (url) {
        window.location.href = url;
      } else {
        toast.error("Payment URL not found");
      }
    } catch {
      toast.error("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (!products.length) return <p className="p-4">Loading products...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="space-y-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500">₦{product.price.toLocaleString()}</p>
            <label className="block mt-2 text-sm font-medium">Quantity</label>
            <input
              type="number"
              value={product.quantity}
              min={1}
              onChange={(e) => {
                const updatedQty = parseInt(e.target.value);
                setProducts((prev) =>
                  prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: updatedQty } : p
                  )
                );
              }}
              className="w-full p-2 border rounded"
            />
            <p className="mt-2 font-semibold">
              Total: ₦{(product.price * product.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 mb-4">
        <label className="block text-sm font-medium">Delivery Address</label>
        <textarea
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Notes (Optional)</label>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="paystack">Paystack</option>
          <option value="flutterwave">Flutterwave</option>
          <option value="stripe">Stripe</option>
        </select>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
