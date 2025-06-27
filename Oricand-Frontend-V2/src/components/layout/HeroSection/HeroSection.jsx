import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <>
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="src/assets/videos/oricand-movie-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d]/80 via-[#111]/70 to-[#0a0a0a]/80 z-10" />

      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full text-center pl-6"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.3, delayChildren: 0.2 },
          },
        }}
      >
        <motion.h1
          className="text-[15vw] font-semibold tracking-[0.1em]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          ORICÂND
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <span className="text-white text-xs tracking-widest">SCROLL</span>
        </motion.div>
{/* 
        <motion.p
          className="uppercase text-5xl text-white tracking-[0.3em] mt-2"
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeOut" },
            },
          }}
        >
          Welcome <span className="font-bold">Anytime</span>
        </motion.p>

        <motion.p
          className="mt-6 max-w-xl text-white text-lg leading-relaxed"
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.2, ease: "easeOut" },
            },
          }}
        >
          A drop-based identity. Nothing permanent — only presence.
        </motion.p> */}
      </motion.div>
    </div>
          
    </>
  );
}
