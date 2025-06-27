import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/UserContext";

export default function MenuOverlay({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-2xs z-50"
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 h-full w-full max-w-md bg-white z-50 flex flex-col md:right-[80px] right-0"
      >
        <nav className="flex-1 p-10 pt-24 md:pt-20">
          <div className="flex flex-col gap-8">
            <NavLink to="/products" onClick={onClose}>
              All Products
            </NavLink>
            <NavLink to="/all-coffees" onClick={onClose}>
              All Coffees
            </NavLink>
            <NavLink to="/gift-card" onClick={onClose}>
              Gift Card
            </NavLink>
            <NavLink to="/boxes" onClick={onClose}>
              Boxes
            </NavLink>
            <NavLink to="/cool-stuff" onClick={onClose}>
              Cool Stuff
            </NavLink>
          </div>

          <div className="mt-20 flex flex-col gap-4">
            {user && (
              <NavLink to="/account" onClick={onClose} variant="small">
                Account
              </NavLink>
            )}

            {user?.role === "ROLE_ADMIN" && (
              <NavLink to="/admin" onClick={onClose} variant="small">
                Admin Panel
              </NavLink>
            )}
            {user ? (
              <button
                onClick={async () => {
                  await logout();
                  onClose();
                }}
                className="text-lg font-light tracking-wide text-left hover:opacity-60 transition-opacity cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" onClick={onClose} variant="small">
                Login
              </NavLink>
            )}
          </div>
        </nav>

        <div className="p-10 pt-0 text-xs text-neutral-500">
          <p className="mb-1">© 2025 ORICÂND</p>
          <p>WELCOME ANYTIME</p>
        </div>
      </motion.div>
    </>
  );
}

function NavLink({ to, onClick, children, variant = "default" }) {
  const className =
    variant === "small"
      ? "text-lg font-light tracking-wide hover:opacity-60 transition-opacity cursor-pointer"
      : "text-3xl font-light tracking-wide hover:opacity-60 transition-opacity cursor-pointer";

  return (
    <Link to={to} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
