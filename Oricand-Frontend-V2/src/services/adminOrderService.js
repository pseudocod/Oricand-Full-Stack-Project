import axios from "./axiosInstance";

export const getAllOrdersForAdmin = async (statusFilter = null) => {
  const params = statusFilter ? { status: statusFilter } : {};
  const response = await axios.get("/orders/admin/all", { params });
  return response.data;
};

export const getOrderByIdForAdmin = async (orderId) => {
  const response = await axios.get(`/orders/admin/${orderId}`);
  return response.data;
};

export const updateOrderStatusForAdmin = async (orderId, status) => {
  const response = await axios.patch(`/orders/admin/${orderId}/status`, {
    status
  });
  return response.data;
}; 