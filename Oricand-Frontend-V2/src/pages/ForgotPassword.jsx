import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/authService";
import FormInput from "../components/common/Input/FormInput";
import FormButton from "../components/common/Button/FormButton";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await forgotPassword(email);
      setMessage("If the email exists, password reset instructions have been sent");
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl flex flex-col items-center">
        <h1 className="text-5xl font-extralight tracking-wide text-gray-900 mb-12">
          FORGOT PASSWORD
        </h1>

        <div className="w-full max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Email address"
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}
            {message && <p className="text-sm text-green-600">{message}</p>}

            <FormButton loading={loading} loadingText="SENDING...">
              SEND RESET INSTRUCTIONS
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