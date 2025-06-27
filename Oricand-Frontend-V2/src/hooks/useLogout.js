import { useState } from "react";
import { useAuth } from "../context/UserContext";
import { logoutAllDevices } from "../services/authService";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const logoutCurrentDevice = async () => {
    setLoading(true);
    try {
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const logoutAllUserDevices = async () => {
    setLoading(true);
    try {
      await logoutAllDevices();
      await logout(); 
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    logoutCurrentDevice,
    logoutAllUserDevices,
  };
}; 