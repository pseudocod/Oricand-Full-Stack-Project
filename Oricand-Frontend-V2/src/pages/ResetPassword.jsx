import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "../services/authService";
import FormInput from "../components/common/Input/FormInput";
import FormButton from "../components/common/Button/FormButton";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token");
    }
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await resetPassword(token, formData.newPassword);
      setMessage("Password has been successfully reset");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 400) {
        setError("Invalid or expired reset token. Please request a new password reset.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="w-full max-w-lg flex flex-col items-center">
          <h1 className="text-5xl font-extralight tracking-wide text-gray-900 mb-12">
            INVALID LINK
          </h1>
          <p className="text-sm text-red-600 mb-6">
            This password reset link is invalid or has expired.
          </p>
          <Link
            to="/forgot-password"
            className="inline-block w-full text-center py-2 px-4 text-black font-medium rounded-xs bg-white hover:bg-black hover:text-white transition-all duration-500"
          >
            REQUEST NEW RESET LINK
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-5xl font-extralight tracking-wide text-gray-900 mb-12">
          RESET PASSWORD
        </h1>

        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="New Password"
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />

            <FormInput
              label="Confirm New Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
            {message && <p className="text-sm text-green-600">{message}</p>}

            <FormButton loading={loading} loadingText="RESETTING...">
              RESET PASSWORD
            </FormButton>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="inline-block w-full text-center py-2 px-4 text-black font-medium rounded-xs bg-white hover:bg-black hover:text-white transition-all duration-500"
            >
              BACK TO SIGN IN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 