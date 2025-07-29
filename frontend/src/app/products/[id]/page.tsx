import { getProductById } from "@/src/lib/api/api-v2/products_v2";
import { notFound } from "next/navigation";
import ProductDetails from "@/src/components/product/ProductDetails";
import { Product } from "@/src/types/products";

type Props = { id: string };

export default async function ProductPage( params: Props) {
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
