import axios from "./axiosInstance";

export const getCurrentUserAddresses = async () => {
  const response = await axios.get("/addresses");
  return response.data;
};

export const getAddressById = async (id) => {
  const res = await axios.get(`/addresses/${id}`);
  return res.data;
};

export const createAddress = async (addressData) => {
  const response = await axios.post("/addresses", addressData);
  return response.data;
};

export const updateAddress = async (id, addressData) => {
  const response = await axios.put(`/addresses/${id}`, addressData);
  return response.data;
};

export const deleteAddress = async (id) => {
  await axios.delete(`/addresses/${id}`);
};

export const setDefaultDeliveryAddress = async (addressId) => {
  await axios.patch(`/users/me/default-delivery-address/${addressId}`);
};

export const setDefaultBillingAddress = async (addressId) => {
  await axios.patch(`/users/me/default-billing-address/${addressId}`);
}; 