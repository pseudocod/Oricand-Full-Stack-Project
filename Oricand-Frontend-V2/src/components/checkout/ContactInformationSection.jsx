import { useState } from "react";
import FormInput from "../common/Input/FormInput";
import { updateCurrentUser } from "../../services/userService";
import { useAuth } from "../../context/UserContext";
import toast from "react-hot-toast";

export default function ContactInformationSection({ 
  contactInfo, 
  setContactInfo, 
  onContactUpdate 
}) {
  const { user, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const saveContactInfo = async () => {
    // Validate before saving
    if (!contactInfo.firstName.trim() || !contactInfo.lastName.trim() || 
        !contactInfo.email.trim() || !contactInfo.phoneNumber.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      await updateCurrentUser(contactInfo);
      await refreshUser();
      setIsEditing(false);
      toast.success("Contact information updated");
      onContactUpdate?.();
    } catch (error) {
      console.error("Error updating contact info:", error);
      toast.error("Failed to update contact information");
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setContactInfo({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-light uppercase">Contact Information</h2>
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-sm text-richblack hover:text-richblack/80 underline cursor-pointer"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={saveContactInfo}
              className="text-sm bg-richblack text-white px-3 py-1 rounded hover:bg-gray-700 cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm border border-richblack text-richblack px-3 py-1 rounded hover:bg-gray-900 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <div className="grid grid-cols-2 gap-4 p-4 rounded-lg">
          <div>
            <span className="text-sm text-gray-600">Name:</span>
            <p className="font-medium">{contactInfo.firstName} {contactInfo.lastName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Email:</span>
            <p className="font-medium">{contactInfo.email}</p>
          </div>
          <div>
            <span className="text-sm text-gray-600">Phone:</span>
            <p className="font-medium">{contactInfo.phoneNumber || "Not provided"}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="First Name *"
            id="firstName"
            name="firstName"
            value={contactInfo.firstName}
            onChange={handleContactChange}
            required
          />
          <FormInput
            label="Last Name *"
            id="lastName"
            name="lastName"
            value={contactInfo.lastName}
            onChange={handleContactChange}
            required
          />
          <FormInput
            label="Email *"
            id="email"
            name="email"
            type="email"
            value={contactInfo.email}
            onChange={handleContactChange}
            required
          />
          <FormInput
            label="Phone Number *"
            id="phoneNumber"
            name="phoneNumber"
            value={contactInfo.phoneNumber}
            onChange={handleContactChange}
            required
          />
        </div>
      )}
    </div>
  );
} 