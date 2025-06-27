import { motion } from "framer-motion";

export default function ProductAttributes({ groupedAttributes }) {
  return (
    <div className="bg-stone">
      <section className="w-full px-6 md:px-16 max-w-6xl mx-auto pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
          {Object.entries(groupedAttributes).map(([key, values], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="pl-5 border-l-2 border-black hover:opacity-80 transition">
                <p className="text-xs font-bold uppercase text-richblack tracking-widest mb-1">
                  {key}
                </p>
                <p className="text-xl text-black leading-snug font-light">
                  {values.join(", ")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
