import axios from "./axiosInstance";

const API_URL = "/attribute-options";

export async function fetchAttributeOptions() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function createAttributeOption(data) {
  const res = await axios.post(API_URL, data);
  return res.data;
}

export async function updateAttributeOption(id, data) {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
}

export async function deleteAttributeOption(id) {
  await axios.delete(`${API_URL}/${id}`);
}
