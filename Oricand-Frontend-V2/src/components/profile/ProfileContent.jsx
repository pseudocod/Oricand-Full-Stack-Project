import ProfileField from "./ProfileField";

export default function ProfileContent({
  user,
  formData,
  editing,
  handleChange,
}) {
  return (
    <div className="space-y-4">
      <ProfileField label="Email" value={user.email} editing={false} />
      <ProfileField
        label="First Name"
        value={formData.firstName}
        name="firstName"
        editing={editing}
        onChange={handleChange}
      />
      <ProfileField
        label="Last Name"
        value={formData.lastName}
        name="lastName"
        editing={editing}
        onChange={handleChange}
      />
      <ProfileField
        label="Phone"
        value={formData.phoneNumber}
        name="phoneNumber"
        editing={editing}
        onChange={handleChange}
      />
    </div>
  );
}
