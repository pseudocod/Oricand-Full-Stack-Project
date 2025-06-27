import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  useRef,
} from "react";
import axios from "../services/axiosInstance";
import { useAuth } from "./UserContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { token } = useAuth();
  const [cart, setCart] = useState({ entries: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await axios.get("/cart", { withCredentials: true });
      setCart(data);
    } catch {
      setCart({ entries: [], totalPrice: 0 });
    }
  }, []);

  const prevTokenRef = useRef(token);

  useEffect(() => {
    prevTokenRef.current = token;
    setLoading(true);
    fetchCart().finally(() => setLoading(false));
  }, [fetchCart, token]);

  const addToCart = async (product, qty) => {
    await axios.post(
      "/cart/entries",
      {
        productId: product.id,
        quantity: qty,
      },
      { withCredentials: true }
    );
    await fetchCart();
  };

  const updateQuantity = async (entryId, qty) => {
    await axios.put(
      `/cart/entries/${entryId}`,
      { quantity: qty },
      { withCredentials: true }
    );
    await fetchCart();
  };

  const removeEntry = async (entryId) => {
    await axios.delete(`/cart/entries/${entryId}`, { withCredentials: true });
    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, updateQuantity, removeEntry, refreshCart: fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
