export default function OrderStatusSection({ order, getStatusColor, getStatusMessage }) {
  return (
    <div className="text-center py-6">
      <div className={`inline-flex items-center px-8 py-3 rounded-lg border ${getStatusColor(order.status)}`}>
        <span className="font-medium text-sm uppercase tracking-wide">{order.status}</span>
      </div>
      <p className="text-gray-600 mt-3 font-light">{getStatusMessage(order.status)}</p>
    </div>
  );
} 