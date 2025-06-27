import axios from "./axiosInstance";

const API_URL = "/selected-attributes";

export async function fetchSelectedAttributes() {
  const res = await axios.get(API_URL);
  return res.data;
}

export async function createSelectedAttribute(data) {
  const res = await axios.post(API_URL, data);
  return res.data;
}

export async function updateSelectedAttribute(id, data) {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
}

export async function deleteSelectedAttribute(id) {
  await axios.delete(`${API_URL}/${id}`);
}
