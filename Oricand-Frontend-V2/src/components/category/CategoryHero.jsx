import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

export default function CategoryHero({ category, theme }) {
  return (
    <div className="relative w-full pt-10 pb-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center text-center px-6"
      >
    <div style={{ overflowX: "auto", width: "100%" }}>
    <h2
  className={`font-bold uppercase tracking-wider mt-2 ${theme.font} text-center`}
  style={{
    fontSize: "clamp(2rem, 12vw, 8rem)",
    lineHeight: 1.1,
    width: "100%",
    wordBreak: "break-word",
  }}
>
  <Balancer>
    {category.name}
  </Balancer>
</h2>
</div>
      </motion.div>
    </div>
  );
}
