export default function OrderInformation({ order, formatDate, formatPrice }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 text-lg">Order Information</h3>
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 font-light">Order Date</span>
            <span className="text-gray-900">{formatDate(order.orderDate)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 font-light">Payment Method</span>
            <span className="text-gray-900 uppercase tracking-wide text-sm">{order.paymentType.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 font-light">Total Items</span>
            <span className="text-gray-900">{order.items.length}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-900 text-lg">Order Total</h3>
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 font-light">Subtotal</span>
            <span className="text-gray-900">{formatPrice(order.totalPrice)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600 font-light">Shipping</span>
            <span className="text-gray-900">Free</span>
          </div>
          <div className="flex justify-between font-medium text-lg pt-4 border-t border-gray-200">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">{formatPrice(order.totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 