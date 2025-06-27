import { animate, motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CategoryPreview({
  categoryName,
  videoUrl,
  categoryId,
}) {

  const marqueeVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 12,
          ease: "linear",
        },
      },
    },
  };  

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-0 pb-32">
      <div className="absolute inset-0 z-0 flex flex-col justify-center overflow-hidden text-[20vw] md:text-[20vw] lg:text-[20vw] xl:text-[10vw] font-extrabold uppercase leading-[0.9] opacity-100 pointer-events-none select-none text-richblack space-y-6">
          {Array.from({ length: 4 }).map((_, rowIdx) => (
            <div key={rowIdx} className="w-full overflow-hidden">
              <motion.div
                className="flex whitespace-nowrap gap-x-12"
                variants={marqueeVariants}
                animate="animate"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={i} className="pr-12">
                    {categoryName}
                  </span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
        <Link
          to={`/categories/${categoryId}`}
          className="absolute inset-0 z-20 flex items-center justify-center group"
        >
          <div className="relative z-10">
            <video
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-[80vw] max-w-[800px] aspect-video object-cover rounded shadow-xl"
              />
          </div>
        </Link>
    </section>
  );
}
