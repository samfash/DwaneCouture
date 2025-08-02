// "use client";

// import { useEffect, useState } from "react";
// import { useCart } from "@/src/store/cartStore";
// import { useRouter } from "next/navigation";
// import { getAllProducts } from "@/src/lib/api/api-v2/products_v2";
// import { Product } from "@/src/types/products";
// import SignedImage from "@/src/components/product/s3SignedUrl";


// export default function WomenProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { addItem } = useCart();
//   const router = useRouter();

//   useEffect(() => {
//     const fetchWomenProducts = async () => {
//       try {
//               const res = await getAllProducts("female");
              
//               if (!res || !Array.isArray(res)) {
//                 throw new Error('Invalid response format');
//               }
//               setProducts(res);
//             } catch (err: unknown) {
//               const message = err instanceof Error ? err.message : 'An unknown error occurred.';
//               setError(message);
//             } finally {
//               setLoading(false);
//             }
//     };

//     fetchWomenProducts();
//   }, []);

//   if (loading) return <p className="text-center py-10">Loading women&#39;s products...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8">Women&#39;s Collection</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="group relative border rounded-lg shadow hover:shadow-lg transition overflow-hidden bg-white dark:bg-gray-900"
//           >
//             <SignedImage
//               s3Url={product.image_url}
//               alt={product.name}
//               className="w-full h-64 object-cover group-hover:opacity-75"
//             />
//             <div className="p-4 space-y-1">
//               <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                 {product.name}
//               </h3>
//               <p className="text-gray-500 dark:text-gray-400 text-sm">{product.description}</p>
//               <p className="text-blue-600 font-bold">${product.price}</p>
//             </div>
//             <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center gap-2">
//               <button
//                 onClick={() => router.push(`/products/${product.id}`)}
//                 className="px-4 py-1 text-sm bg-white text-gray-800 rounded shadow hover:bg-gray-100"
//               >
//                 View Details
//               </button>
//               <button
//                 onClick={() => addItem({
//                   id: product.id,
//                   product_name: product.name,
//                   quantity: 1,
//                   price: product.price,
//                   saved_at: new Date().toISOString()
//                 })}
//                 className="px-4 py-1 text-sm bg-yellow-500 text-white rounded shadow hover:bg-yellow-600"
//               >
//                 Add to Cart
//               </button>
//               <button
//                 onClick={() => {
//                   addItem({
//                     id: product.id,
//                     product_name: product.name,
//                     quantity: 1,
//                     price: product.price,
//                     saved_at: new Date().toISOString(),
//                   });
//                   router.push(`/checkout?items=${encodeURIComponent(JSON.stringify([{ id: product.id, quantity: 1 }]))}`);
//                 }}
//                 className="px-4 py-1 text-sm bg-green-600 text-white rounded shadow hover:bg-green-700"
//               >
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/src/store/cartStore";
import { useRouter } from "next/navigation";
import { getAllProducts } from "@/src/lib/api/api-v2/products_v2";
import { Product } from "@/src/types/products";
import SignedImage from "@/src/components/product/s3SignedUrl";
import Image from "next/image";
// import clsx from "clsx";

export default function WomenProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [greeting, setGreeting] = useState("Welcome");
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Morning");
    else if (hour < 18) setGreeting("Afternoon");
    else setGreeting("Evening");
  }, []);

  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        const res = await getAllProducts("female");
        if (!res || !Array.isArray(res)) throw new Error("Invalid response format");
        setProducts(res);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchWomenProducts();
  }, []);

  if (loading) return <p className="text-center py-10">Loading women&#39;s products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* HERO SECTION */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        <Image
          width={1920}
          height={1080}
          src="/images/teju_dress.jpg" // Replace with your static image path
          alt="Hero Background"
          className="absolute  w-full h-full object-cover inset-0"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-0 w-full text-center z-10">
          <h1 className="text-white text-6xl md:text-8xl font-extrabold tracking-wide leading-none drop-shadow-lg">
            {greeting}
          </h1>
        </div>
      </div>

      {/* PRODUCT SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800 dark:text-white">
          Women&#39;s Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative border border-gray-200 dark:border-gray-700 rounded-xl shadow hover:shadow-md transition bg-white dark:bg-gray-900 overflow-hidden"
            >
              <SignedImage
                s3Url={product.image_url}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:opacity-80 transition"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.description}</p>
                <p className="text-blue-600 font-bold">${product.price}</p>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center gap-2">
                <button
                  onClick={() => router.push(`/products/${product.id}`)}
                  className="px-4 py-1 text-sm bg-white text-gray-800 rounded hover:bg-gray-100"
                >
                  View Details
                </button>
                <button
                  onClick={() =>
                    addItem({
                      id: product.id,
                      product_name: product.name,
                      quantity: 1,
                      price: product.price,
                      saved_at: new Date().toISOString(),
                    })
                  }
                  className="px-4 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
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
                    router.push(
                      `/checkout?items=${encodeURIComponent(
                        JSON.stringify([{ id: product.id, quantity: 1 }])
                      )}`
                    );
                  }}
                  className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
