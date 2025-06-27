import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useCartUI } from "../../context/CartUIContext";

export default function AddToCartBar({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { openCart } = useCartUI();

  const increase = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrease = () => setQuantity((q) => Math.max(q - 1, 1));

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#f1f1f1] px-6 py-2 rounded-full shadow-lg flex items-center gap-6 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={decrease}
          className="text-xl font-semibold hover:scale-105 transition"
        >
          −
        </button>
        <span className="text-lg font-medium w-6 text-center">{quantity}</span>
        <button
          onClick={increase}
          className="text-xl font-semibold hover:scale-105 transition"
        >
          +
        </button>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300" />

      <button
        onClick={async () => {
          await addToCart(product, quantity);
          openCart();
        }}
        className="text-base font-medium hover:underline cursor-pointer transition-all"
      >
        Add to Cart
      </button>
    </div>
  );
}
