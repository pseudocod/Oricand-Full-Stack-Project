export default function AddressList({ 
  addresses, 
  onEdit, 
  onDelete,
  onSetDefaultDelivery,
  onSetDefaultBilling,
  defaultDeliveryId,
  defaultBillingId
}) {
  return (
    <div className="space-y-6 p-1">
      {addresses.map((address) => (
        <div
          key={address.id}
          className="p-4 border border-gray-200 rounded-lg space-y-2"
        >
          {(address.id === defaultDeliveryId || address.id === defaultBillingId) && (
            <p className="text-xs text-gray-500 italic mb-2">
              {address.id === defaultDeliveryId && address.id === defaultBillingId
                ? "This is your default delivery and billing address"
                : address.id === defaultDeliveryId
                ? "This is your default delivery address"
                : "This is your default billing address"}
            </p>
          )}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-900">{address.streetLine}</p>
              </div>
              <p className="text-sm text-gray-600">
                {address.city}, {address.county} {address.postalCode}
              </p>
              <p className="text-sm text-gray-600">{address.country}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex space-x-4">
                <button
                  onClick={() => onEdit(address)}
                  className="text-gray-500 text-sm hover:text-gray-700 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(address.id)}
                  className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {address.id !== defaultDeliveryId && (
                  <button
                    onClick={() => onSetDefaultDelivery(address.id)}
                    className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
                  >
                    Set as Delivery
                  </button>
                )}
                {address.id !== defaultBillingId && (
                  <button
                    onClick={() => onSetDefaultBilling(address.id)}
                    className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
                  >
                    Set as Billing
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
