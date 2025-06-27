import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function HighlightedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products/featured`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch featured products", err));
  }, []);

  const extractAttribute = (product, name) => {
    const values = product.attributes
      ?.filter((attr) => attr.attributeName === name)
      .map((attr) => attr.value);
    return values?.join(", ") || "—";
  };

  return (
    <section className="bg-stone w-full px-6 md:px-20 py-20">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-light uppercase tracking-widest text-black">
          Featured Picks
        </h2>
        <p className="mt-4 text-neutral-600 text-sm md:text-base max-w-xl mx-auto">
          Curated blends handpicked for moments that matter. From classics to
          experimental, here are a few you shouldn't miss.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="group relative flex flex-col justify-between border border-black/10 bg-offwhite p-6 w-[280px] md:w-[320px] transition-transform hover:scale-[1.01]"
          >
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-light uppercase tracking-wide text-richblack leading-snug">
                  {product.name}
                </h3>
              </div>

              <div className="space-y-1 text-sm tracking-tight text-neutral-700">
                <div>
                  <span className="text-neutral-900 font-medium">Type:</span>{" "}
                  {extractAttribute(product, "Origin Country")}
                </div>
                <div>
                  <span className="text-neutral-900 font-medium">Origin:</span>{" "}
                  {extractAttribute(product, "Processing Method")}
                </div>
                <div>
                  <span className="text-neutral-900 font-medium">Process:</span>{" "}
                  {extractAttribute(product, "Roast Level")}
                </div>
                <div>
                  <span className="text-neutral-900 font-medium">Tasting:</span>{" "}
                  {extractAttribute(product, "Tasting Notes")}
                </div>
              </div>
            </div>

            <Link to={`/products/${product.id}`} className="mt-3 block group">
              <div className="text-sm uppercase tracking-widest text-richblack border-t border-black pt-3 transition">
                Explore →
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
