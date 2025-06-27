import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import FormInput from "../components/common/Input/FormInput";
import FormButton from "../components/common/Button/FormButton";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(data.email, data.password);
      navigate("/account");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-5xl font-extralight tracking-wide text-gray-900 mb-12">
          SIGN IN
        </h1>

        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Email address"
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />

            <FormInput
              label="Password"
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <FormButton loading={loading} loadingText="SIGNING IN...">
              SIGN IN
            </FormButton>
          </form>

          <div className="text-center mt-4 text-sm text-gray-600">
            Forgot your password?{" "}
            <Link
              to="/forgot-password"
              className="text-black font-medium underline hover:text-gray-800 cursor-pointer"
            >
              Reset
            </Link>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/register"
              className="inline-block w-full text-center py-2 px-4 text-black font-medium rounded-xs bg-white hover:bg-black hover:text-white transition-all duration-500"
            >
              CREATE AN ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
