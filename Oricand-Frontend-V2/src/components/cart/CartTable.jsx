// src/components/cart/CartTable.jsx
import { TrashIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext";

export default function CartTable({ entries, compact = false }) {
  const { updateQuantity, removeEntry } = useCart();

  if (!entries.length) return null;

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="font-semibold tracking-widest uppercase text-sm border-b">
          <tr>
            <th className="py-3">Product</th>
            {!compact && <th className="py-3">Price</th>}
            <th className="py-3">Quantity</th>
            <th className="py-3 text-right">Total</th>
            {!compact && <th />}
          </tr>
        </thead>

        <tbody>
          {entries.map((entry) => {
            const { id, product, quantity, totalPriceEntry } = entry;
            return (
              <tr key={id} className="border-b last:border-0">
                {/* product */}
                <td className="py-4 flex items-center gap-4">
                  <img
                    src={`${import.meta.env.VITE_MEDIA_URL}${
                      product.featuredImageUrl
                    }`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span>{product.name}</span>
                </td>

                {/* price (hide on compact) */}
                {!compact && (
                  <td className="py-4">{entry.pricePerPiece} lei</td>
                )}

                {/* quantity controls */}
                <td className="py-4">
                  <div className="inline-flex items-center border px-2">
                    <button
                      onClick={() =>
                        updateQuantity(id, Math.max(1, quantity - 1))
                      }
                      className="p-1 disabled:opacity-30"
                      disabled={quantity === 1}
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="px-3">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(id, quantity + 1)}
                      className="p-1"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>

                {/* line total */}
                <td className="py-4 text-right">{totalPriceEntry} lei</td>

                {/* trash (hide on compact) */}
                {!compact && (
                  <td className="py-4 pl-4">
                    <button
                      onClick={() => removeEntry(id)}
                      className="p-2 hover:text-red-500"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
