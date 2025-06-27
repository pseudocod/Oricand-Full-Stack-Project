import { useState } from "react";
import ConfirmDialog from "../ui/ConfirmDialog";

export default function OrderActions({ 
  order, 
  canCancelOrder, 
  handleCancelOrder, 
  isLoading, 
  onClose, 
  onOrderUpdate 
}) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  const handleConfirmCancel = async () => {
    setShowCancelConfirm(false);
    await handleCancelOrder(order.id, () => {
      onOrderUpdate();
      onClose();
    });
  };

  const handleCancelClose = () => {
    setShowCancelConfirm(false);
  };

  return (
    <>
      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
        {order.status === 'DELIVERED' && (
          <button className="px-6 py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors cursor-pointer uppercase tracking-wide text-sm">
            Reorder Items
          </button>
        )}
        {canCancelOrder(order.status) && (
          <button 
            onClick={handleCancelClick}
            disabled={isLoading}
            className="px-6 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors cursor-pointer uppercase tracking-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Cancelling...' : 'Cancel Order'}
          </button>
        )}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded hover:bg-gray-200 transition-colors cursor-pointer uppercase tracking-wide text-sm disabled:opacity-50"
        >
          Close
        </button>
      </div>

      {showCancelConfirm && (
        <ConfirmDialog
          message={`Are you sure you want to cancel this order?\n\nThe following will happen:\n• Your order will be cancelled immediately\n• Product stock will be restored\n• This action cannot be undone`}
          onConfirm={handleConfirmCancel}
          onCancel={handleCancelClose}
        />
      )}
    </>
  );
} 