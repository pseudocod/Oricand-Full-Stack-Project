import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import centerImage from "/src/assets/images/front.webp";

export default function MissionSection() {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/about");
  };

  return (
    <section className="relative w-full min-h-[200vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="src/assets/images/BACK.webp"
          alt="Mission Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center z-5">
        <div className="absolute left-8 md:left-16 text-white max-w-xs hidden md:block">
          <p className="text-lg md:text-xl font-bold uppercase leading-tight">
            ESCAPE
            <br />
            IS ALWAYS POSSIBLE.
          </p>
        </div>

        <img
          src={centerImage}
          alt="Center Image"
          className="w-auto h-auto max-w-md max-h-md object-contain"
        />

        <div className="absolute right-8 md:right-16 text-white max-w-xs text-right hidden md:block">
          <p className="text-lg md:text-xl font-bold uppercase leading-tight">
            JUST GRAB A BAG
            <br />
            AND JUMP RIGHT IN.
          </p>
        </div>
      </div>

      <div className="absolute top-5 left-8 md:left-16 z-10 max-w-8xl">
        <div className="text-white space-y-8">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-5">
            OUR MISSION
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight">
            We've been accused of having a one-track mind. And to those
            accusations we say - thank you. Because we know it's by focusing on
            one thing that many things happen. And at ORICÂND, that one thing
            was always coffee. We have gone deeper into coffee than anyone,
            getting our hands dirty and coffee-grind dusted at every step.
            <button
              onClick={handleLearnMore}
              className="inline-block ml-4 cursor-pointer text-white px-3 text-3xl font-extrabold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              LEARN MORE
            </button>
          </p>
        </div>
      </div>

      <div className="absolute bottom-1/8 left-1/2 -translate-x-1/2 z-10">
        <h2 className="text-white text-7xl md:text-9xl font-bold uppercase tracking-widest">
          ANYTIME
        </h2>
      </div>
    </section>
  );
}
