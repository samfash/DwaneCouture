import { useCart } from "@/src/hooks/cartStore";

interface Product {
  id: string | number;
  name: string;
  price: number;
  // Add other fields if needed
}

interface AddToCartButtonProps {
  product: Product;
}

export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const addItem = useCart((state) => state.addItem);

  return (
    <button
      onClick={() =>
        addItem({
          id: String(product.id),
          product_name: product.name,
          quantity: 1,
          price: product.price,
          saved_at: new Date().toISOString(),
        })
      }
    >
      Save for Later
    </button>
  );
};
