// "use client";

// import { useState, ChangeEvent } from "react";
// import { fetcher } from "@/src/lib/api";

// interface ProductInput {
//   id: string;
//   name: string;
//   price: number;
//   category: "male" | "female";
//   description: string;
//   image: File | null;
// }

// export default function TailorProductsPage() {
//   const [newProduct, setNewProduct] = useState<Partial<ProductInput>>({});
//   const [imageFile, setImageFile] = useState<File | null>(null);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setImageFile(file);
//   };

//   const handleCreate = async () => {
//     try {
//       if (!imageFile) {
//         alert("Please select an image file");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("name", newProduct.name || "");
//       formData.append("price", String(newProduct.price || ""));
//       formData.append("category", newProduct.category || "");
//       formData.append("description", newProduct.description || "");
//       formData.append("image", imageFile); // 👈 must match `req.file` key on backend

//       await fetcher("/api/products", "POST", formData,);

//       alert("Product created!");
//       setNewProduct({});
//       setImageFile(null);
//     } catch (err) {
//       if (err instanceof Error) {
//         alert("Failed to create product: " + err.message);
//       } else {
//         alert("Failed to create product: An unknown error occurred.");
//       }
//     }
//   };


//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Manage Products</h1>

//       <div className="p-4 bg-white dark:bg-gray-800 rounded shadow space-y-4">
//         <h2 className="text-lg font-semibold">Add New Product</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             placeholder="Name"
//             value={newProduct.name || ""}
//             onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//             className="px-4 py-2 border rounded"
//           />
//           <input
//             placeholder="Price"
//             type="number"
//             value={newProduct.price || ""}
//             onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
//             className="px-4 py-2 border rounded"
//           />
//           <select
//             value={newProduct.category || ""}
//             onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as "male" | "female" })}
//             className="px-4 py-2 border rounded"
//           >
//             <option value="">Select Category</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="px-4 py-2 border rounded"
//           />

//           <textarea
//             placeholder="Description"
//             value={newProduct.description || ""}
//             onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//             className="px-4 py-2 border rounded col-span-full"
//           />
//         </div>
//         <button
//           onClick={handleCreate}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Add Product
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, ChangeEvent } from "react";
import { fetcher } from "@/src/lib/api";

export default function TailorProductsPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState<"male" | "female" | "">("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleCreate = async () => {
    if (!imageFile) {
      alert("Please select an image file");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", String(price)); // ✅ always a string
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", imageFile); // ✅ matches multer.single("image")

    try {
      await fetcher("/api/products", "POST", formData);
      
        alert("Product created!");
        // Reset form
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setImageFile(null);
    } catch (err: unknown) {
      console.error(err);
      alert("An unexpected error occurred");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="px-4 py-2 border rounded"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as "male" | "female")}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
    </div>
  );
}
