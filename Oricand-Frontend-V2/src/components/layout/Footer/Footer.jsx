import { Link, NavLink } from "react-router-dom";
import Logo from "../../ui/Logo";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const year = new Date().getFullYear();

  const navItems = [
    { label: "Products", to: "/collections/all" },
    { label: "Account", to: "/account" },
    { label: "About", to: "/about" },
  ];

  return (
    <footer className="w-full bg-richblack text-offwhite lg:pr-[80px] py-30 space-y-12">
      <div className="flex flex-col lg:flex-row justify-around items-center gap-12">
        <Logo textColor="text-offwhite" />

        <div className="flex flex-col items-center lg:items-start gap-8">
          <nav aria-label="Footer">
            <ul className="flex flex-col sm:flex-row items-center gap-6 lg:gap-12">
              {navItems.map(({ label, to }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    className="text-lg text-offwhite lg:text-xl border-b border-offwhite pb-1 transition
                               hover:text-[#A5C5E9] hover:border-[#A5C5E9]
                               focus-visible:outline-dashed focus-visible:outline-2
                               focus-visible:outline-[#A5C5E9]"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li></li>
            </ul>
          </nav>

          <p className="text-offwhite text-center lg:text-left text-xl font-extralight tracking-wider">
            CRAFTED FOR EVERY MOMENT
          </p>
          <button
            onClick={scrollToTop}
            className="text-lg lg:text-5xl border-b border-offwhite pb-1 
                               hover:text-[#A5C5E9] hover:border-[#A5C5E9]
                               focus-visible:outline-dashed focus-visible:outline-2
                               focus-visible:outline-[#A5C5E9] cursor-pointer transition-all"
          >
            BACK TO TOP
          </button>
        </div>
      </div>

      {/* Lower strip */}
      <div className="text-center text-xs tracking-widest">
        &copy; {year} ORICÂND CAFE
      </div>
    </footer>
  );
}
