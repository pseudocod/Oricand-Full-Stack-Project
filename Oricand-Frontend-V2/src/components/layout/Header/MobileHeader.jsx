import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../../context/UserContext";

export default function MobileHeader({ isOpen, onMenuToggle, onCartOpen }) {
  const { user } = useAuth();

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] md:hidden">
      <div className="px-4 py-2 text-[10px] text-center bg-black text-white font-light tracking-wide">
        <span className="font-medium">Free Shipping:</span> Bucharest 100 RON+ ·
        Romania 150 RON+ · EU 250 RON+
      </div>

      <div className="bg-white border-b border-neutral-200">
        <div className="px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="text-lg font-medium tracking-wide cursor-pointer"
          >
            ORICÂND
          </Link>

          <div className="flex items-center gap-6">
            <button onClick={onCartOpen} className="w-5 h-5 cursor-pointer">
              <ShoppingBagIcon />
            </button>
            <Link
              to={user ? "/account" : "/login"}
              className="w-5 h-5 cursor-pointer"
            >
              <UserIcon />
            </Link>
            <button onClick={onMenuToggle} className="w-6 h-6 cursor-pointer">
              {isOpen ? <XMarkIcon /> : <Bars3Icon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
