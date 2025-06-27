import { motion } from "framer-motion";

export default function DropSection({
  title,
  subtitle,
  description,
  imageSrc,
  flip = false,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-32 px-6 flex flex-col md:flex-row gap-12 items-center max-w-6xl mx-auto"
    >
      <div className={`w-full md:w-1/2 ${flip ? "order-last" : ""}`}>
        <motion.img
          src={imageSrc}
          alt={title}
          className="rounded-xs shadow-lg w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left">
        <p className="text-sm uppercase tracking-widest text-neutral-400">
          {subtitle}
        </p>
        <h2 className="text-4xl font-playfair mb-6">{title}</h2>
        <p className="text-neutral-600 leading-relaxed">{description}</p>
        <button className="mt-8 px-6 py-3 border border-black text-sm uppercase hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
          View Drop
        </button>
      </div>
    </motion.section>
  );
}
