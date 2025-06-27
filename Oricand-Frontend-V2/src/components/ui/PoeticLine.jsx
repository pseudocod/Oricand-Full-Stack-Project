import { motion } from "framer-motion";

const wrapper = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const child = {
  hidden: {
    y: "100%",
    opacity: 0,
    filter: "blur(4px)",
  },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function PoeticLine() {
  const line = "Something bold is brewing...";

  return (
    <section className="h-[9vh] flex items-center justify-center overflow-hidden">
      <motion.div
        variants={wrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="overflow-hidden flex gap-1"
      >
        {line.split(" ").map((word, idx) => (
          <motion.span
            key={idx}
            variants={child}
            className="text-lg md:text-xl font-light tracking-wide text-black inline-block"
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
