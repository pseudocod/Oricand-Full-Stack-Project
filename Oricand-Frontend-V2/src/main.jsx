import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./context/UserContext";
import App from "./App";
import "./assets/styles/index.css";
import { CartUIProvider } from "./context/CartUIContext";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
        <CartUIProvider>
          <App />
        </CartUIProvider>
      </CartProvider>
    </UserProvider>
  </StrictMode>
);
