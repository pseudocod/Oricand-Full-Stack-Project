import axios from "./axiosInstance";

export async function fetchAllCategories() {
  const res = await axios.get("/categories");
  return res.data;
}

export async function fetchCategoryById(id) {
  const res = await axios.get(`/categories/${id}`);
  return res.data;
}

export async function createCategory(data) {
  const res = await axios.post("/categories", data);
  return res.data;
}

export async function updateCategory(id, data) {
  const res = await axios.post(`/categories/${id}`, data);
  return res.data;
}

export async function deleteCategory(id) {
  await axios.delete(`/categories/${id}`);
}
