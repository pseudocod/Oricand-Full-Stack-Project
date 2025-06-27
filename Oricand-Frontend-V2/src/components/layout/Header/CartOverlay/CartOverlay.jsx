import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useCart } from "../../../../context/CartContext";
import { useCartUI } from "../../../../context/CartUIContext";

export default function CartOverlay() {
  const { cart, loading, updateQuantity } = useCart();
  const { isOpen, closeCart } = useCartUI();

  return (
    <>
      <motion.div
        key="cart-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[70]"
        onClick={closeCart}
      />

      <motion.div
        key={"cart-panel"}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] flex flex-col"
        data-lenis-prevent
      >
        <div className="flex justify-between items-center px-6 py-5">
          <button onClick={closeCart} className="cursor-pointer">
            <XMarkIcon className="w-6 h-6" />
          </button>
          <h2 className="text-2xl tracking-widest font-normal">CART</h2>
          <div className="w-6" />
        </div>
        <div className="h-[1px] bg-gray-200" />
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            Loading...
          </div>
        ) : cart.entries.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <h3 className="text-2xl font-light tracking-wide uppercase mb-12">
              Your Cart is Empty
            </h3>
            <Link
              to="/products"
              onClick={closeCart}
              className="inline-block bg-black text-white px-12 py-3 rounded-sm text-sm uppercase tracking-wider font-medium hover:bg-white hover:text-black transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6" data-lenis-prevent>
            {cart.entries.map((entry) => {
              const { id, product, quantity, totalPriceEntry } = entry;
              return (
                <div key={id} className="flex gap-5 items-center mb-8">
                  <img
                    src={`${import.meta.env.VITE_MEDIA_URL}${
                      product.featuredImageUrl
                    }`}
                    className="w-32 h-32 object-cover rounded"
                  />

                  <div className="flex-1 space-y-1">
                    <h4 className="font-light text-xl">{product.name}</h4>

                    <div className="flex items-center gap-3 text-sm">
                      <button
                        onClick={() =>
                          updateQuantity(id, Math.max(1, quantity - 1))
                        }
                        disabled={quantity === 1}
                        className="w-6 h-6 grid place-content-center border border-black
                       disabled:opacity-30 hover:bg-black hover:text-white transition cursor-pointer"
                      >
                        −
                      </button>

                      <span className="min-w-[20px] text-center">
                        {quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(id, quantity + 1)}
                        className="w-6 h-6 grid place-content-center border border-black
                       hover:bg-black hover:text-white transition cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-light text-xl">
                    {totalPriceEntry} lei
                  </div>
                </div>
              );
            })}

            <div className="px-6 py-4 border-t bg-white sticky bottom-0">
              <div className="flex justify-between items-center mb-4">
                <p className="font-extralight text-3xl">SUBTOTAL</p>
                <p className="text-2xl font-medium">{cart.totalPrice} lei</p>
              </div>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="mt-6 block bg-black text-white px-6 py-3 text-center hover:bg-white hover:text-black transition-all rounded-xs text-lg uppercase tracking-wider font-light"
              >
                CHECKOUT
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
