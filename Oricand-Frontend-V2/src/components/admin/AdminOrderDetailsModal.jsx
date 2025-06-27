import { useEffect, useState } from "react";
import OrderStatusSelect from "./OrderStatusSelect";

export default function AdminOrderDetailsModal({ 
  order, 
  isOpen, 
  onClose, 
  getOrderById,
  updateOrderStatus,
  formatDate,
  formatPrice,
  getStatusColor,
  getAvailableStatuses
}) {
  const [detailedOrder, setDetailedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadOrderDetails = async () => {
      if (isOpen && order?.id) {
        setLoading(true);
        const details = await getOrderById(order.id);
        setDetailedOrder(details);
        setLoading(false);
      }
    };

    loadOrderDetails();
  }, [isOpen, order?.id, getOrderById]);

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
      
      // Disable Lenis smooth scroll when modal is open
      const lenis = window.lenis;
      if (lenis) {
        lenis.stop();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      
      // Re-enable Lenis smooth scroll when modal closes
      const lenis = window.lenis;
      if (lenis) {
        lenis.start();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !order) return null;

  const orderToShow = detailedOrder || order;

  return (
    <div 
      className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50 p-4" 
      data-lenis-prevent
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" 
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Order #{orderToShow.id}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {orderToShow.userFirstName} {orderToShow.userLastName} • {orderToShow.userEmail}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading order details...</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Order Status & Actions */}
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Order Status</h3>
                <p className="text-sm text-gray-500">Last updated: {formatDate(orderToShow.orderDate)}</p>
              </div>
              <OrderStatusSelect 
                order={orderToShow}
                getAvailableStatuses={getAvailableStatuses}
                updateOrderStatus={updateOrderStatus}
                getStatusColor={getStatusColor}
              />
            </div>

            {/* Customer & Order Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Customer Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer ID:</span>
                    <span className="text-gray-900">#{orderToShow.userId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="text-gray-900">{orderToShow.userFirstName} {orderToShow.userLastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-900">{orderToShow.userEmail}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Order Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="text-gray-900">{formatDate(orderToShow.orderDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="text-gray-900">{orderToShow.paymentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="text-gray-900 font-medium">{formatPrice(orderToShow.totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Delivery Address</h3>
                <p className="text-sm text-gray-600">{orderToShow.deliveryAddress}</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Billing Address</h3>
                <p className="text-sm text-gray-600">{orderToShow.invoiceAddress}</p>
              </div>
            </div>

            {/* Order Items */}
            {orderToShow.items && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Order Items</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 grid grid-cols-12 gap-4 text-xs font-medium text-gray-700 uppercase tracking-wide">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Unit Price</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>
                  {orderToShow.items.map((item, index) => (
                    <div key={index} className="px-4 py-3 grid grid-cols-12 gap-4 text-sm border-t border-gray-200">
                      <div className="col-span-6">
                        <p className="font-medium text-gray-900">{item.productName}</p>
                      </div>
                      <div className="col-span-2 text-center text-gray-600">
                        {item.quantity}
                      </div>
                      <div className="col-span-2 text-right text-gray-600">
                        {formatPrice(item.pricePerPiece)}
                      </div>
                      <div className="col-span-2 text-right font-medium text-gray-900">
                        {formatPrice(item.totalPrice)}
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Order Total</span>
                      <span className="text-lg font-semibold text-gray-900">{formatPrice(orderToShow.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 