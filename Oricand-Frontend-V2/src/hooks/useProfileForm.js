// hooks/useProfileForm.js
import { useState } from "react";
import { updateCurrentUser, changePassword } from "../services/userService";
import toast from "react-hot-toast";

export const useProfileForm = (user) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleEdit = () => setEditing(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateCurrentUser(formData);
      toast.success("Profile updated successfully");
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
      console.error(err);
    }
  };

  const handlePasswordSave = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
      console.error(err);
    }
  };

  return {
    editing,
    formData,
    passwordData,
    handleEdit,
    handleChange,
    handlePasswordChange,
    handleSave,
    handlePasswordSave,
  };
};
