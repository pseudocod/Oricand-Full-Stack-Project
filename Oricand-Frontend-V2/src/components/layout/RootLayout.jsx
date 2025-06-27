import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "../ui/CustomCursor";
import Footer from "./Footer/Footer";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header/Header";

export default function RootLayout() {
  return (
    <div className="relative">
      <ScrollToTop />
      <Header />
      <CustomCursor />
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
      <Footer />
    </div>
  );
}
