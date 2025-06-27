import AddressForm from "./AddressForm";
import AddressList from "./AddressList";

export default function AddressContent({
  addresses,
  isAddingAddress,
  setIsAddingAddress,
  editingAddress,
  setEditingAddress,
  handleAddressSubmit,
  handleDeleteAddress,
  handleSetDefaultDelivery,
  handleSetDefaultBilling,
  defaultDeliveryId,
  defaultBillingId,
}) {
  return (
    <div className="space-y-8">
      {!isAddingAddress && !editingAddress && (
        <button
          onClick={() => setIsAddingAddress(true)}
          className="text-gray-700 text-sm hover:text-black underline underline-offset-4 decoration-[1px] cursor-pointer"
        >
          + Add New Address
        </button>
      )}

      {(isAddingAddress || editingAddress) && (
        <AddressForm
          address={editingAddress}
          onSubmit={handleAddressSubmit}
          onCancel={() => {
            setIsAddingAddress(false);
            setEditingAddress(null);
          }}
          isEditing={!!editingAddress}
        />
      )}

      {!isAddingAddress && !editingAddress && (
        <AddressList
          addresses={addresses}
          onEdit={setEditingAddress}
          onDelete={handleDeleteAddress}
          onSetDefaultDelivery={handleSetDefaultDelivery}
          onSetDefaultBilling={handleSetDefaultBilling}
          defaultDeliveryId={defaultDeliveryId}
          defaultBillingId={defaultBillingId}
        />
      )}
    </div>
  );
} 