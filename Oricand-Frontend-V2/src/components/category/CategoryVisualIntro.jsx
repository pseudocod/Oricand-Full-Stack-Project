import { motion } from "framer-motion";

export default function CategoryVisualIntro({ category }) {
  return (
    <section className="w-full pb-20">
      <div className="relative w-full h-[100vh] md:h-[180vh] overflow-hidden">
        <img
          src={`${import.meta.env.VITE_MEDIA_URL}${category.coverImageUrl}`}
          alt="Background"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="absolute top-6 left-6 md:left-12 z-20">
          <p className="text-white hidden md:block md:text-3xl lg:text-5xl font-bold tracking-widest drop-shadow-2xl">
            ORICÂND
          </p>
        </div>
        <div className="absolute z-20 top-24 left-6 md:top-40 md:left-12 max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="uppercase font-bold tracking-tight text-white"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 7rem)",
              lineHeight: 1,
              wordBreak: "break-word",
            }}
          >
            {category.label}
          </motion.h1>
        </div>

        <div className="absolute z-20 bottom-1/3 right-8 max-w-lg text-left px-2">
          <p className="text-white text-lg md:text-2xl font-bold leading-tight">
            {category.phrase}
          </p>
        </div>

        <div className="absolute z-20 bottom-12 right-8 text-left">
          <h2 className="text-white text-4xl md:text-9xl font-bold uppercase drop-shadow-2xl">
            {category.name}
          </h2>
        </div>
      </div>
    </section>
  );
}
