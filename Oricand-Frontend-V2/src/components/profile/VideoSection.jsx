import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <motion.div
      className="flex-1 flex justify-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-[600px] h-[550px]">
        <video
          src="/src/assets/videos/oricand-hero.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </motion.div>
  );
} 