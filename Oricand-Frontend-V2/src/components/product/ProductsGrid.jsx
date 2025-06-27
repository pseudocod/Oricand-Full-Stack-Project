import { motion } from "framer-motion";
import ProductBoxPresentation from "../product/ProductBoxPresentation";

export default function ProductsGrid({ products, categoryName }) {
  if (products.length === 0) {
    return (
      <div className="px-6 md:px-12 pb-32">
        <p className="text-center text-9xl font-bold">COMING SOON</p>
      </div>
    );
  }
  return (
    <div className="px-6 md:px-12 pb-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-6 md:gap-x-12">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group"
          >
            <ProductBoxPresentation
              product={product}
              categoryName={categoryName}
            />

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              className="h-[1px] bg-neutral-200 mt-8"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
