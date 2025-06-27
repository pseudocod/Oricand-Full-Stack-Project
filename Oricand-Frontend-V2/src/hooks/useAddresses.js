import { useState, useEffect } from "react";
import {
  getCurrentUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultDeliveryAddress,
  setDefaultBillingAddress,
} from "../services/addressService";
import { useAuth } from "../context/UserContext";
import toast from "react-hot-toast";

export const useAddresses = (shouldFetch = true) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAddress, setEditingAddress] = useState(null);
  const { user, refreshUser } = useAuth();

  const loadAddresses = async () => {
    if (!user || !shouldFetch) {
      setLoading(false);
      return;
    }

    try {
      const data = await getCurrentUserAddresses();
      setAddresses(data);
    } catch (err) {
      toast.error("Failed to load addresses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, [user, shouldFetch]);

  const handleCreateAddress = async (addressData) => {
    try {
      const newAddress = await createAddress(addressData);
      setAddresses((prev) => [...prev, newAddress]);
      toast.success("Address added successfully");
      return newAddress;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add address");
      throw err;
    }
  };

  const handleUpdateAddress = async (id, addressData) => {
    try {
      const updatedAddress = await updateAddress(id, addressData);
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === id ? updatedAddress : addr))
      );
      toast.success("Address updated successfully");
      setEditingAddress(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update address");
      throw err;
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      toast.success("Address deleted successfully");
      await refreshUser();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete address");
      throw err;
    }
  };

  const handleSetDefaultDelivery = async (addressId) => {
    try {
      await setDefaultDeliveryAddress(addressId);
      await refreshUser();
      toast.success("Default delivery address updated");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to set default delivery address"
      );
      throw err;
    }
  };

  const handleSetDefaultBilling = async (addressId) => {
    try {
      await setDefaultBillingAddress(addressId);
      await refreshUser();
      toast.success("Default billing address updated");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to set default billing address"
      );
      throw err;
    }
  };

  return {
    addresses,
    loading,
    editingAddress,
    setEditingAddress,
    handleCreateAddress,
    handleUpdateAddress,
    handleDeleteAddress,
    handleSetDefaultDelivery,
    handleSetDefaultBilling,
    defaultDeliveryId: user?.defaultDeliveryAddressId,
    defaultBillingId: user?.defaultBillingAddressId,
    loadAddresses,
  };
};
