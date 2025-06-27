import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductBoxPresentation({ product }) {
  const featuredImage =
    product.images.find((img) => img.featured) || product.images[0];

  const tastingNotes = product.attributes
    .filter((attr) => attr.attributeName === "Tasting Notes")
    .map((attr) => attr.value)
    .join(", ");

  const type = product.attributes.find(
    (attr) => attr.attributeName === "Roast Level"
  )?.value;
  const origin = product.attributes.find(
    (attr) => attr.attributeName === "Origin Country"
  )?.value;
  const process = product.attributes.find(
    (attr) => attr.attributeName === "Processing Method"
  )?.value;

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="relative aspect-[5/5] bg-stone rounded-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        {/* Product Image */}
        <img
          src={`${import.meta.env.VITE_MEDIA_URL}${featuredImage?.url}`}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-opacity duration-500"
        />

        {/* Name + Price (visible by default, fade out on hover) */}
        <div className="absolute bottom-1 left-0 right-0 flex justify-between items-center text-[13px] md:text-[14px] font-semibold uppercase px-4 transition-opacity duration-500 group-hover:opacity-0">
          <span className="truncate max-w-[70%]">{product.name}</span>
          <span>{product.price} lei</span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-5 flex flex-col justify-between pointer-events-none">
          <div className="uppercase font-bold text-2xl md:text-3xl tracking-normal">
            {tastingNotes || "Flavor notes unavailable"}
          </div>

          {/* Attributes */}
          <div className="text-sm md:text-base font-medium space-y-2 mt-8">
            {type && (
              <div className="flex gap-5">
                <span className="text-neutral-400">Type:</span>
                <span>{type}</span>
              </div>
            )}
            {origin && (
              <div className="flex gap-5">
                <span className="text-neutral-400">Origin:</span>
                <span>{origin}</span>
              </div>
            )}
            {process && (
              <div className="flex gap-5">
                <span className="text-neutral-400">Process:</span>
                <span>{process}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
