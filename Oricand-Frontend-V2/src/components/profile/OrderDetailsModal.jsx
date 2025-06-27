import { useEffect } from "react";
import { useOrderDetails } from "../../hooks/useOrderDetails";
import OrderStatusSection from "./OrderStatusSection";
import OrderInformation from "./OrderInformation";
import OrderItemsList from "./OrderItemsList";
import OrderActions from "./OrderActions";

export default function OrderDetailsModal({ order, isOpen, onClose, onOrderUpdate }) {
  const {
    isLoading,
    getStatusColor,
    formatDate,
    formatPrice,
    getStatusMessage,
    canCancelOrder,
    handleCancelOrder
  } = useOrderDetails();

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xs shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-light text-richblack">ORDER DETAILS</h2>
            <p className="text-md text-gray-500 mt-1">Order #{order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-2"
            disabled={isLoading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-5">
          <OrderStatusSection 
            order={order}
            getStatusColor={getStatusColor}
            getStatusMessage={getStatusMessage}
          />

          <OrderInformation 
            order={order}
            formatDate={formatDate}
            formatPrice={formatPrice}
          />

          <OrderItemsList 
            items={order.items}
            formatPrice={formatPrice}
          />

          <OrderActions
            order={order}
            canCancelOrder={canCancelOrder}
            handleCancelOrder={handleCancelOrder}
            isLoading={isLoading}
            onClose={onClose}
            onOrderUpdate={onOrderUpdate}
          />
        </div>
      </div>
    </div>
  );
} 