import { Link } from "react-router-dom";

export default function CheckoutModeSelector({ isGuest, onModeChange, isAuthenticated }) {
  if (isAuthenticated) {
    return null; // Don't show if user is already logged in
  }

  return (
    <div className="p-6 rounded-lg border border-gray-200 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Checkout Options</h2>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            id="guest-checkout"
            type="radio"
            checked={isGuest}
            onChange={() => onModeChange(true)}
            className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-black focus:ring-2"
          />
          <label htmlFor="guest-checkout" className="ml-2 text-sm font-medium text-gray-900">
            Continue as Guest
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="user-checkout"
            type="radio"
            checked={!isGuest}
            onChange={() => onModeChange(false)}
            className="w-4 h-4 text-black bg-gray-100 border-gray-300 focus:ring-black focus:ring-2"
          />
          <label htmlFor="user-checkout" className="ml-2 text-sm font-medium text-gray-900">
            Login to Account
          </label>
        </div>
      </div>

      {!isGuest && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-3">
            Already have an account? Login to access saved addresses and order history.
          </p>
          <Link
            to="/login"
            state={{ returnTo: "/checkout" }}
            className="inline-block bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
          >
            Login to Account
          </Link>
        </div>
      )}

      {isGuest && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">
            You can checkout without creating an account. We'll send your order confirmation to your email.
          </p>
        </div>
      )}
    </div>
  );
} 