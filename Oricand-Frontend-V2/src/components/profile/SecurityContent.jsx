import { useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import { useProfileForm } from "../../hooks/useProfileForm";
import FormInput from "../common/Input/FormInput";
import FormButton from "../common/Button/FormButton";

export default function SecurityContent({ user }) {
  const { passwordData, handlePasswordChange, handlePasswordSave } = useProfileForm(user);
  const { loading: logoutLoading, logoutCurrentDevice, logoutAllUserDevices } = useLogout();
  const [passwordLoading, setPasswordLoading] = useState(false);

  const onPasswordSave = async () => {
    setPasswordLoading(true);
    try {
      await handlePasswordSave();
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Change Password Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium tracking-wide">Change Password</h3>
        <div className="space-y-4">
          <FormInput
            label="Current Password"
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
          <FormInput
            label="New Password"
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            autoComplete="new-password"
          />
          <FormInput
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            autoComplete="new-password"
          />
          <FormButton
            onClick={onPasswordSave}
            loading={passwordLoading}
            loadingText="UPDATING..."
            disabled={!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword}
          >
            UPDATE PASSWORD
          </FormButton>
        </div>
      </div>

      <div className="space-y-4 pt-8 border-t">
        <h3 className="text-lg font-medium tracking-wide">Device Sessions</h3>
        <p className="text-sm text-gray-600">
          Manage your active sessions across devices. You can sign out of this device or all devices.
        </p>
        

        
        <div className="space-y-3">
          <div className="flex flex-col space-y-2">
            <button
              onClick={logoutCurrentDevice}
              disabled={logoutLoading}
              className="text-left py-2 px-4 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {logoutLoading ? "Signing out..." : "Sign out of this device"}
            </button>
            
            <button
              onClick={logoutAllUserDevices}
              disabled={logoutLoading}
              className="text-left py-2 px-4 border border-red-300 text-red-600 rounded hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {logoutLoading ? "Signing out..." : "Sign out of all devices"}
            </button>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          * Signing out of all devices will require you to sign in again on all your devices.
        </p>
      </div>
    </div>
  );
} 