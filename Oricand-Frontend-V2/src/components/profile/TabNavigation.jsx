import TabButton from "../common/Button/TabButton";

export default function TabNavigation({ activeTab, setActiveTab }) {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => setActiveTab("profile")}
        className={`px-4 py-2 text-sm ${
          activeTab === "profile" ? "border-b-2 border-black" : "text-gray-500"
        }`}
      >
        Profile
      </button>
      <button
        onClick={() => setActiveTab("addresses")}
        className={`px-4 py-2 text-sm ${
          activeTab === "addresses" ? "border-b-2 border-black" : "text-gray-500"
        }`}
      >
        Addresses
      </button>
      <button
        onClick={() => setActiveTab("orders")}
        className={`px-4 py-2 text-sm ${
          activeTab === "orders" ? "border-b-2 border-black" : "text-gray-500"
        }`}
      >
        Orders
      </button>
      <button
        onClick={() => setActiveTab("loyalty")}
        className={`px-4 py-2 text-sm ${
          activeTab === "loyalty" ? "border-b-2 border-black" : "text-gray-500"
        }`}
      >
        Loyalty
      </button>
      <button
        onClick={() => setActiveTab("security")}
        className={`px-4 py-2 text-sm ${
          activeTab === "security" ? "border-b-2 border-black" : "text-gray-500"
        }`}
      >
        Security
      </button>
    </div>
  );
} 