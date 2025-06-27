import { createContext, useContext, useState, useCallback } from "react";

const CartUIContext = createContext();

export function CartUIProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartUIContext.Provider value={{ isOpen, openCart, closeCart }}>
      {children}
    </CartUIContext.Provider>
  );
}

export const useCartUI = () => useContext(CartUIContext);
