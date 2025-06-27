export default function OrderItemsList({ items, formatPrice }) {
  return (
    <div className="space-y-6">
      <h3 className="font-medium text-gray-900 text-lg">Items Ordered</h3>
      <div className="border border-gray-100 rounded-lg overflow-hidden">
        {items.map((item, index) => (
          <div key={index} className={`p-6 ${index > 0 ? 'border-t border-gray-100' : ''}`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 text-lg mb-2">{item.productName}</h4>
                <div className="space-y-1">
                  <p className="text-gray-600 font-light">
                    Quantity: <span className="text-gray-900">{item.quantity}</span>
                  </p>
                  <p className="text-gray-600 font-light">
                    Price per item: <span className="text-gray-900">{formatPrice(item.pricePerPiece)}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 text-lg">
                  {formatPrice(item.totalPrice)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 