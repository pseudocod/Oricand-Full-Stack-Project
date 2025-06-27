import { useState, useEffect } from "react";
import ProfileField from "./ProfileField";

export default function AddressForm({
  address,
  onSubmit,
  onCancel,
  isEditing = false,
}) {
  const [formData, setFormData] = useState({
    streetLine: "",
    postalCode: "",
    city: "",
    county: "",
    country: "",
  });

  useEffect(() => {
    if (address) {
      setFormData({
        streetLine: address.streetLine || "",
        postalCode: address.postalCode || "",
        city: address.city || "",
        county: address.county || "",
        country: address.country || "",
      });
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ProfileField
        label="Street"
        value={formData.streetLine}
        name="streetLine"
        editing={true}
        onChange={handleChange}
      />
      <ProfileField
        label="Postal Code"
        value={formData.postalCode}
        name="postalCode"
        editing={true}
        onChange={handleChange}
      />
      <ProfileField
        label="City"
        value={formData.city}
        name="city"
        editing={true}
        onChange={handleChange}
      />
      <ProfileField
        label="County"
        value={formData.county}
        name="county"
        editing={true}
        onChange={handleChange}
      />
      <ProfileField
        label="Country"
        value={formData.country}
        name="country"
        editing={true}
        onChange={handleChange}
      />
      <div className="flex space-x-4 mt-6">
        <button
          type="submit"
          className="text-gray-700 text-sm hover:text-black underline underline-offset-4 decoration-[1px] cursor-pointer"
        >
          {isEditing ? "Save Changes" : "Add Address"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 text-sm hover:text-gray-700 underline underline-offset-4 decoration-[1px] cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
