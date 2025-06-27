import { motion } from "framer-motion";

export default function Marquee() {
  const text = "ORICÂND • NEW DROP • FRESH OFF THE TREE • ANYTIME • ";

  return (
    <div className="overflow-hidden border-y border-neutral-300 py-4 bg-offwhite">
      <motion.div
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
        aria-hidden="true"
        role="presentation"
      >
        <span className="mr-8 text-richblack uppercase tracking-wide text-sm font-light">
          {text.repeat(3)}
        </span>
      </motion.div>
    </div>
  );
}
