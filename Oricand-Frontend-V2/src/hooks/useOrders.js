import { useState, useEffect } from "react";
import { getOrderHistory } from "../services/orderService";
import toast from "react-hot-toast";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const data = await getOrderHistory();
      setOrders(data);
    } catch (err) {
      toast.error("Failed to load orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return {
    orders,
    loading,
    loadOrders,
  };
}; 