import axios from "axios";

const API_URL = import.meta.env.VITE_MEDIA_URL;

export async function loginUser(email, password) {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
}

export async function registerUser(userData) {
  const response = await axios.post(`${API_URL}/auth/register`, userData, {
    withCredentials: true,
  });
  return response.data;
}

export async function refreshToken(refreshToken) {
  if (!refreshToken) {
    throw new Error('Refresh token is required');
  }
  
  const response = await axios.post(`${API_URL}/auth/refresh`, {
    refreshToken,
  });
  return response.data;
}

export async function logoutUser(refreshToken) {
  if (!refreshToken) {
    return { success: true };
  }
  
  const response = await axios.post(`${API_URL}/auth/logout`, {
    refreshToken,
  });
  return response.data;
}

export async function logoutAllDevices() {
  const response = await axios.post(`${API_URL}/auth/logout-all`);
  return response.data;
}

export async function forgotPassword(email) {
  const response = await axios.post(`${API_URL}/api/auth/password/forgot`, {
    email,
  });
  return response.data;
}

export async function resetPassword(token, newPassword) {
  const response = await axios.post(`${API_URL}/api/auth/password/reset`, {
    token,
    newPassword,
  });
  return response.data;
}
