export default function GuestAddressSection({ 
  title, 
  address, 
  onAddressChange, 
  showSameAsDelivery = false, 
  sameAsDelivery = false, 
  onSameAsDeliveryChange 
}) {
  const handleChange = (field, value) => {
    onAddressChange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {showSameAsDelivery && (
          <div className="flex items-center">
            <input
              id="same-as-delivery"
              type="checkbox"
              checked={sameAsDelivery}
              onChange={(e) => onSameAsDeliveryChange(e.target.checked)}
              className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
            />
            <label htmlFor="same-as-delivery" className="ml-2 text-sm text-gray-600">
              Same as delivery address
            </label>
          </div>
        )}
      </div>

      {!sameAsDelivery && (
        <div className="space-y-4">
          <div>
            <label htmlFor={`${title.toLowerCase()}-street`} className="block text-sm font-medium text-gray-700 mb-1">
              Street Address *
            </label>
            <input
              id={`${title.toLowerCase()}-street`}
              type="text"
              value={address.streetLine}
              onChange={(e) => handleChange('streetLine', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter street address"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`${title.toLowerCase()}-city`} className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                id={`${title.toLowerCase()}-city`}
                type="text"
                value={address.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter city"
                required
              />
            </div>

            <div>
              <label htmlFor={`${title.toLowerCase()}-postal`} className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code *
              </label>
              <input
                id={`${title.toLowerCase()}-postal`}
                type="text"
                value={address.postalCode}
                onChange={(e) => handleChange('postalCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter postal code"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`${title.toLowerCase()}-county`} className="block text-sm font-medium text-gray-700 mb-1">
                County *
              </label>
              <input
                id={`${title.toLowerCase()}-county`}
                type="text"
                value={address.county}
                onChange={(e) => handleChange('county', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter county"
                required
              />
            </div>

            <div>
              <label htmlFor={`${title.toLowerCase()}-country`} className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <input
                id={`${title.toLowerCase()}-country`}
                type="text"
                value={address.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter country"
                required
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 