import { motion } from "framer-motion";

export default function ProductDescription({ descriptionLines }) {
  return (
    <section className="w-full px-6 pb-12 pt-8 md:px-12 lg:pl-32 lg:pr-6 text-richblack max-w-9xl mx-auto">
      {descriptionLines.map((line, i) => {
        const words = line.split(" ");
        return (
          <motion.p
            key={i}
            className="text-[1.5rem] md:text-[2rem] leading-[2.4rem] md:leading-[2.8rem] tracking-tight mb-10 flex flex-wrap"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.05, delayChildren: i * 0.1 }}
          >
            {words.map((word, idx) => (
              <motion.span
                key={idx}
                className="mr-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        );
      })}
    </section>
  );
}
