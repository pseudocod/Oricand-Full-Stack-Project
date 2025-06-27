import { useState } from "react";

export default function OrderStatusSelect({ 
  order, 
  getAvailableStatuses, 
  updateOrderStatus, 
  getStatusColor 
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const availableStatuses = getAvailableStatuses(order.status);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === order.status) return;
    
    setIsUpdating(true);
    await updateOrderStatus(order.id, newStatus);
    setIsUpdating(false);
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
        {order.status}
      </span>
      
      {availableStatuses.length > 1 && (
        <select
          value={order.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={isUpdating}
          className="text-xs border border-gray-300 rounded px-2 py-1 bg-white disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
        >
          {availableStatuses.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      )}
      
      {isUpdating && (
        <div className="text-xs text-gray-500">Updating...</div>
      )}
    </div>
  );
} 