import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginUser, registerUser, logoutUser } from "../services/authService";
import { getCurrentUser } from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await getCurrentUser();
      setUser(res);
    } catch (err) {
      console.error("Failed to fetch user", err);
      if (err.response?.status === 401) {
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);


  const login = async (email, password) => {
    const res = await loginUser(email, password);
    setToken(res.token);
    setRefreshToken(res.refreshToken);
    setUser(res.user);
    localStorage.setItem("token", res.token);
    localStorage.setItem("refreshToken", res.refreshToken);
  };

  const register = async (data) => {
    const res = await registerUser(data);
    setToken(res.token);
    setRefreshToken(res.refreshToken);
    setUser(res.user);
    localStorage.setItem("token", res.token);
    localStorage.setItem("refreshToken", res.refreshToken);
  };

  const logout = useCallback(async () => {
    try {
      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      setUser(null);
      setToken(null);
      setRefreshToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  }, [refreshToken]);



  const refreshUser = async () => {
    if (!token) return;
    await fetchUser();
  };

  return (
    <UserContext.Provider
      value={{ 
        user, 
        token, 
        refreshToken, 
        login, 
        register, 
        logout, 
        refreshUser, 
        loading 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
