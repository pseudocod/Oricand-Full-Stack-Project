import axios from "./axiosInstance";

export const getOrderHistory = async () => {
  const response = await axios.get("/orders/my");
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axios.post("/orders", orderData);
  return response.data;
};

export const createGuestOrder = async (guestOrderData) => {
  const response = await axios.post("/orders/guest", guestOrderData);
  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await axios.post(`/orders/${orderId}/cancel`);
  return response.data;
};

 