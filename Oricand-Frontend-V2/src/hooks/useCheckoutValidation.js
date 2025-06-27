import toast from "react-hot-toast";

export default function useCheckoutValidation() {
  const validateContactInfo = (contactInfo) => {
    if (!contactInfo) {
      toast.error("Contact information is missing");
      return false;
    }
    
    if (!contactInfo.firstName.trim()) {
      toast.error("First name is required");
      return false;
    }
    if (!contactInfo.lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }
    if (!contactInfo.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!contactInfo.phoneNumber.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const isContactInfoComplete = (contactInfo) => {
    if (!contactInfo) return false;
    
    return contactInfo.firstName.trim() && 
           contactInfo.lastName.trim() && 
           contactInfo.email.trim() &&
           contactInfo.phoneNumber.trim() &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo.email);
  };

  return {
    validateContactInfo,
    isContactInfoComplete,
  };
} 