import { getProductById } from "@/src/lib/products";
import { notFound } from "next/navigation";
import ProductDetails from "@/src/ui/ProductDetails";

type Props = { params: { id: string } };

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  description: string;
}

export default async function ProductPage({ params }: Props) {
  const param = await params;
  const res = await getProductById(param.id) as unknown;
  const product = res ? (res as Product) : null;

  if (!product) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <ProductDetails product={product} />
    </div>
  );
}
