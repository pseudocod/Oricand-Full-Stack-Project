import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
        status
      )}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
};

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate("/account");
    }
  }, [order, navigate]);

  if (!order) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPaymentType = (type) => {
    return type
      .split("_")
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-center justify-center mb-6">
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-light text-center tracking-wide">
              Thank you for your order!
            </h1>
            <p className="mt-2 text-center text-gray-600">
              Order #{order.id} • {formatDate(order.orderDate)}
            </p>
            <div className="mt-4 flex justify-center">
              <StatusBadge status={order.status} />
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Payment Information
                </h3>
                <p className="text-gray-600">
                  Payment Method: {formatPaymentType(order.paymentType)}
                </p>
              </div>

              {/* Items */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Order Items
                </h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-4 border-b border-gray-200 last:border-0"
                    >
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-gray-900">
                          {item.productName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.pricePerPiece} lei × {item.quantity}
                        </p>
                      </div>
                      <p className="text-base font-medium text-gray-900">
                        {item.totalPrice} lei
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center">
                  <p className="text-xl font-light">Total</p>
                  <p className="text-xl font-medium">{order.totalPrice} lei</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-6 bg-gray-50 flex justify-between items-center">
            <Link
              to="/account"
              className="text-gray-600 hover:text-gray-900 underline"
            >
              View Account
            </Link>
            <Link
              to="/products"
              className="bg-black text-white px-6 py-3 rounded-xs hover:bg-white hover:text-black transition-all border border-black text-sm uppercase tracking-wider"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 