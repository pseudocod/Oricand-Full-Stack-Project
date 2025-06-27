import axios from "./axiosInstance";

export const getCurrentUser = async () => {
  const res = await axios.get("/users/me");
  return res.data;
};

export const updateCurrentUser = async (data) => {
  const res = await axios.put("/users/me", data);
  return res.data;
};

export const changePassword = async (data) => {
  const res = await axios.put("/users/me/password", data);
  return res.data;
};
