import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useCartUI } from "../../context/CartUIContext";
import Logo from "../ui/Logo";

export default function ProductHero({
  product,
  quantity,
  setQuantity,
  addToCartRef,
  featuredImage,
}) {
  const { addToCart } = useCart();

  return (
    <>
      <div className="bg-stone">
        <section className="flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:pl-32 md:gap-x-8 md:pr-0 pt-20 pb-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.9 }}
            className="bg-offwhite py-6 rounded-md order-2 md:order-1 w-full md:w-1/2 flex justify-center px-2"
          >
            <div className="w-full max-w-lg pl-6 space-y-10">
              <h1 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-richblack uppercase tracking-[0.05em] leading-none break-words">
                {product.name}
              </h1>

              <div className="inline-block bg-richblack text-offwhite px-4 py-2 text-2xl font-semibold shadow-lg">
                {product.price} lei
              </div>

              <p className="text-lg leading-relaxed font-light text-richblack">
                {product.description.split("\n")[0]}
              </p>

              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

              <AddToCartButton
                quantity={quantity}
                product={product}
                onAdd={addToCart}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="order-1 md:order-2 w-full md:w-1/2 flex items-center justify-center"
          >
            <img
              src={`${import.meta.env.VITE_MEDIA_URL}${featuredImage.url}`}
              alt={product.name}
              className="w-full max-w-[350px] md:max-w-full h-auto object-contain rounded-lg"
            />
          </motion.div>
        </section>
      </div>
    </>
  );
}

function QuantitySelector({ quantity, setQuantity }) {
  return (
    <div className="flex items-center justify-between border border-richblack px-2 py-1 w-full">
      <button
        className="text-xl font-medium px-2 cursor-pointer"
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
      >
        −
      </button>
      <span className="text-lg mx-3">{quantity}</span>
      <button
        className="text-xl font-medium px-2 cursor-pointer"
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
}

function AddToCartButton({ quantity, product, onAdd }) {
  const { openCart } = useCartUI();

  return (
    <button
      className="w-full bg-richblack text-offwhite text-md font-light uppercase tracking-widest px-6 py-2 rounded-xs cursor-pointer hover:bg-offwhite hover:text-richblack transition-all"
      onClick={async () => {
        await onAdd(product, quantity);
        openCart();
      }}
    >
      Add to Cart
    </button>
  );
}
