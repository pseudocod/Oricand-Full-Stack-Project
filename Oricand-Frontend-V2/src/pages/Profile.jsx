import { useAuth } from "../context/UserContext";
import { useProfileForm } from "../hooks/useProfileForm";
import { useAddresses } from "../hooks/useAddresses";
import { useOrders } from "../hooks/useOrders";
import { useState } from "react";
import { motion } from "framer-motion";
import ProfileContent from "../components/profile/ProfileContent";
import AddressContent from "../components/profile/AddressContent";
import OrderContent from "../components/profile/OrderContent";
import SecurityContent from "../components/profile/SecurityContent";
import LoyaltyContent from "../components/profile/LoyaltyContent";
import ProfileHeader from "../components/profile/ProfileHeader";
import TabNavigation from "../components/profile/TabNavigation";
import ActionButtons from "../components/profile/ActionButtons";
import VideoSection from "../components/profile/VideoSection";

export default function Profile() {
  const { user, logout } = useAuth();
  const { editing, formData, handleEdit, handleChange, handleSave } = useProfileForm(user);
  const {
    addresses,
    editingAddress,
    setEditingAddress,
    handleCreateAddress,
    handleUpdateAddress,
    handleDeleteAddress,
    handleSetDefaultDelivery,
    handleSetDefaultBilling,
    defaultDeliveryId,
    defaultBillingId,
  } = useAddresses();
  const { orders, loading: ordersLoading, loadOrders } = useOrders();

  const [activeTab, setActiveTab] = useState("profile");
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  const handleAddressSubmit = async (addressData) => {
    if (editingAddress) {
      await handleUpdateAddress(editingAddress.id, addressData);
    } else {
      await handleCreateAddress(addressData);
    }
    setIsAddingAddress(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-white text-black px-6 flex items-center justify-center"
    >
      <div className="flex flex-col lg:flex-row max-w-7xl w-full gap-16">
        <motion.div
          className="flex-1 flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <ProfileHeader user={user} />
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="relative h-[220px] overflow-y-scroll" data-lenis-prevent>
              {activeTab === "profile" && (
                <ProfileContent
                  user={user}
                  formData={formData}
                  editing={editing}
                  handleChange={handleChange}
                />
              )}
              {activeTab === "addresses" && (
                <AddressContent
                  addresses={addresses}
                  isAddingAddress={isAddingAddress}
                  setIsAddingAddress={setIsAddingAddress}
                  editingAddress={editingAddress}
                  setEditingAddress={setEditingAddress}
                  handleAddressSubmit={handleAddressSubmit}
                  handleDeleteAddress={handleDeleteAddress}
                  handleSetDefaultDelivery={handleSetDefaultDelivery}
                  handleSetDefaultBilling={handleSetDefaultBilling}
                  defaultDeliveryId={defaultDeliveryId}
                  defaultBillingId={defaultBillingId}
                />
              )}
              {activeTab === "orders" && (
                <OrderContent orders={orders} loading={ordersLoading} loadOrders={loadOrders} />
              )}
              {activeTab === "loyalty" && (
                <LoyaltyContent />
              )}
              {activeTab === "security" && (
                <SecurityContent user={user} />
              )}
            </div>

            <ActionButtons
              editing={editing}
              handleEdit={handleEdit}
              handleSave={handleSave}
              logout={logout}
              activeTab={activeTab}
            />
          </div>
        </motion.div>

        <VideoSection />
      </div>
    </motion.div>
  );
}
