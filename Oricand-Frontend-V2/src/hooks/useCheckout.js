import { useState } from "react";
import { createOrder, createGuestOrder } from "../services/orderService";
import { useAuth } from "../context/UserContext";

export default function useCheckout() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkout = async (orderData, isGuest = false) => {
    try {
      setLoading(true);
      setError(null);

      let data;
      if (isGuest) {
        data = await createGuestOrder(orderData);
      } else {
        data = await createOrder(orderData);
      }
      
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Checkout failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    checkout, 
    loading, 
    error,
    isAuthenticated: !!user 
  };
}
