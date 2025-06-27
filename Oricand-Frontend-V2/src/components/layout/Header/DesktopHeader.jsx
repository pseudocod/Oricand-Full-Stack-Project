import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../../context/UserContext";

export default function DesktopHeader({
  isOpen,
  onMenuToggle,
  onCartOpen,
  cartCount,
}) {
  const { user } = useAuth();

  return (
    <div className="fixed right-0 top-0 h-full z-[60] hidden md:flex flex-col justify-between items-center py-6 bg-white text-black w-[80px] border-l border-neutral-200">
      <button
        onClick={onMenuToggle}
        className="w-6 h-6 cursor-pointer relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <XMarkIcon className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Bars3Icon className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <div className="transform rotate-90 text-xs text-center whitespace-pre w-[420px] leading-snug">
        <div className="font-semibold uppercase mb-1 text-lg">
          Free Shipping
        </div>
        <span className="text-neutral-500 ">
          Bucharest 100 RON+ · Romania 150 RON+ · EU 250 RON+
        </span>
      </div>

      {/* Bottom - Icons */}
      <div className="flex flex-col justify-center items-center gap-10">
        <button
          onClick={onCartOpen}
          className="relative w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
        >
          <ShoppingBagIcon className="w-7 h-7" />
          {cartCount > 0 && (
            <span
              className="
            absolute -top-1.5 -right-4
            w-5 h-5 rounded-full bg-yellow-400
            text-[10px] leading-none font-semibold text-black
            flex items-center justify-center"
            >
              {cartCount}
            </span>
          )}
        </button>
        <Link
          to={user ? "/account" : "/login"}
          className="w-5 h-5 hover:scale-110 transition-transform cursor-pointer"
        >
          <UserIcon className="w-7 h-7" />
        </Link>
        <span className="text-xs font-medium"></span>
      </div>
    </div>
  );
}
