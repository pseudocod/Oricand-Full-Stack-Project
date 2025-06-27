import axios from "./axiosInstance";

export async function fetchAttributeTypes() {
  const res = await axios.get("/attribute-types");
  return res.data;
}

export async function createAttributeType(data) {
  const res = await axios.post("/attribute-types", data);
  return res.data;
}

export async function updateAttributeType(id, data) {
  const res = await axios.put(`/attribute-types/${id}`, data);
  return res.data;
}

export async function deleteAttributeType(id) {
  await axios.delete(`/attribute-types/${id}`);
}
