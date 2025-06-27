import FormInput from "../common/Input/FormInput";

export default function AddressSection({
  title,
  addresses,
  selectedAddressId,
  onAddressSelect,
  newAddress,
  onAddressChange,
  showSameAsDelivery = false,
  sameAsDelivery,
  onSameAsDeliveryChange,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onAddressChange({ ...newAddress, [name]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-light uppercase">{title}</h2>

      {showSameAsDelivery && (
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            id="sameAsDelivery"
            checked={sameAsDelivery}
            onChange={(e) => onSameAsDeliveryChange(e.target.checked)}
            className="rounded border-gray-300 text-black focus:ring-black"
          />
          <label htmlFor="sameAsDelivery" className="text-sm text-gray-700">
            Same as delivery address
          </label>
        </div>
      )}

      {(!showSameAsDelivery || !sameAsDelivery) && (
        <>
          {addresses.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Select Address
              </label>
              <select
                value={selectedAddressId}
                onChange={(e) => onAddressSelect(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xs bg-offwhite focus:outline-none focus:ring-2 focus:ring-richblack"
              >
                <option value="new">Add New Address</option>
                {addresses.map((addr) => (
                  <option key={addr.id} value={addr.id}>
                    {addr.streetLine}, {addr.city} {addr.postalCode}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedAddressId === "new" && (
            <div className="space-y-4 pt-4">
              <FormInput
                label="Street"
                id={`${title.toLowerCase().replace(' ', '-')}-street`}
                name="streetLine"
                value={newAddress.streetLine}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Postal Code"
                id={`${title.toLowerCase().replace(' ', '-')}-postal`}
                name="postalCode"
                value={newAddress.postalCode}
                onChange={handleChange}
                required
              />
              <FormInput
                label="City"
                id={`${title.toLowerCase().replace(' ', '-')}-city`}
                name="city"
                value={newAddress.city}
                onChange={handleChange}
                required
              />
              <FormInput
                label="County"
                id={`${title.toLowerCase().replace(' ', '-')}-county`}
                name="county"
                value={newAddress.county}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Country"
                id={`${title.toLowerCase().replace(' ', '-')}-country`}
                name="country"
                value={newAddress.country}
                onChange={handleChange}
                required
              />
            </div>
          )}
        </>
      )}
    </div>
  );
} 