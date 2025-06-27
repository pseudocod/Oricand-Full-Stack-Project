import { Link } from "react-router-dom";

const adminPages = [
  {
    name: "Orders",
    path: "/admin/orders",
    emoji: "📋",
    description: "Manage customer orders and status",
  },
  {
    name: "Products",
    path: "/admin/products",
    emoji: "🛒",
    description: "Manage coffee and merchandise products",
  },
  {
    name: "Categories",
    path: "/admin/categories",
    emoji: "📦",
    description: "Define drops and thematic collections",
  },
  {
    name: "Attribute Types",
    path: "/admin/attribute-types",
    emoji: "🏷️",
    description: "Create product characteristics",
  },
  {
    name: "Attribute Options",
    path: "/admin/attribute-options",
    emoji: "⚙️",
    description: "Configure option values",
  },
  {
    name: "Selected Attributes",
    path: "/admin/selected-attributes",
    emoji: "✅",
    description: "Assign options to products",
  },
  {
    name: "Voting Management",
    path: "/admin/voting",
    emoji: "🗳️",
    description: "Manage voting campaigns and analyze results",
  },
];

export default function DashboardAdmin() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-4xl font-light text-gray-900">
          ADMIN DASHBOARD
        </h1>
        <p className="text-gray-600">Manage your e-commerce platform</p>
      </div>

      {/* Quick Stats */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">7</div>
            <div className="text-sm text-gray-600">Admin Modules</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">Active</div>
            <div className="text-sm text-gray-600">System Status</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">Ready</div>
            <div className="text-sm text-gray-600">All Services</div>
          </div>
        </div>
      </div>

      {/* Admin Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Admin Modules</h2>
          <div className="text-sm text-gray-500">
            {adminPages.length} modules available
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminPages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-200">
                  {page.emoji}
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-2">{page.name}</div>
              <div className="text-sm text-gray-600">{page.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
