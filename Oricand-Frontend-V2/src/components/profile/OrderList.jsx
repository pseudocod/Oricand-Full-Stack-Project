export default function OrderList({ orders, onOrderClick }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">No orders yet</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'SHIPPED': return 'bg-purple-100 text-purple-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="space-y-6 p-1">
      {orders.map((order) => (
        <div
          key={order.id}
          className="p-4 border border-gray-200 rounded-lg space-y-3"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium text-gray-900">
                  Order #{order.id}
                </p>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {order.paymentType}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Ordered on {formatDate(order.orderDate)}
              </p>
              <p className="text-sm font-medium text-gray-900">
                Total: {formatPrice(order.totalPrice)}
              </p>
            </div>
            <button
              className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer underline underline-offset-2"
              onClick={() => onOrderClick && onOrderClick(order)}
            >
              View Details
            </button>
          </div>
          
          {/* Order Items Summary */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-700 mb-2">
              Items ({order.items.length}):
            </p>
            <div className="space-y-1">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.productName}
                  </span>
                  <span className="text-gray-900 font-medium">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 