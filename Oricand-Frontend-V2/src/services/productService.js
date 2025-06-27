import axios from "./axiosInstance";

export async function fetchAllProducts(sortBy = "") {
  const response = await axios.get(`/products${sortBy ? `?sort=${sortBy}` : ""}`);
  return response.data;
}

export async function fetchProductsByCategoryId(categoryId, sortBy = "") {
  const response = await axios.get(
    `/products/category/${categoryId}${sortBy ? `?sort=${sortBy}` : ""}`
  );
  return response.data;
}

export async function fetchProductById(id) {
  const response = await axios.get(`/products/${id}`);
  return response.data;
}

export async function createProduct(product) {
  const response = await axios.post("/products", product);
  return response.data;
}

export async function updateProduct(id, product) {
  const response = await axios.put(`/products/${id}`, product);
  return response.data;
}

export async function deleteProduct(id) {
  const response = await axios.delete(`/products/${id}`);
  return response.data;
}

export const uploadProductImages = async (productId, files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  await axios.post(`/products/${productId}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProductImage = async (productId, imageId) => {
  await axios.delete(`/products/${productId}/images/${imageId}`);
};

export const setFeaturedImage = async (productId, imageId) => {
  await axios.put(`/products/${productId}/images/${imageId}/feature`);
};
