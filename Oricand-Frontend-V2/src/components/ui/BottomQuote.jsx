import { motion } from "framer-motion";

export default function BottomQuote({ theme }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="text-center pb-32"
    >
      <p className={`text-lg md:text-xl italic text-neutral-500 ${theme.font}`}>
        "The art of coffee is in its impermanence"
      </p>
      <div className="w-12 h-[1px] bg-neutral-300 mx-auto mt-6" />
    </motion.div>
  );
} 