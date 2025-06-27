import { Link } from "react-router-dom";

export default function Logo({
  textColor = "text-white",
  fontWeight = "font-semibold",
}) {
  return (
    <Link to="/" className="inline-block group">
      <div className="relative inline-block">
        <h1
          className={`text-5xl md:text-8xl xl:text-9xl ${fontWeight} tracking-widest whitespace-nowrap opacity-100 transition-opacity duration-300 group-hover:opacity-0 cursor-pointer ${textColor}`}
        >
          ORICÂND
        </h1>
        <h1
          className={`text-5xl md:text-8xl xl:text-9xl ${fontWeight} tracking-widest whitespace-nowrap absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer ${textColor}`}
        >
          ANYTIME
        </h1>
      </div>
    </Link>
  );
}
