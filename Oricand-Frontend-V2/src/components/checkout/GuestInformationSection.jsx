export default function GuestInformationSection({ guestInfo, setGuestInfo }) {
  const handleChange = (field, value) => {
    setGuestInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Guest Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="guest-firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            id="guest-firstName"
            type="text"
            value={guestInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div>
          <label htmlFor="guest-lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            id="guest-lastName"
            type="text"
            value={guestInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="guest-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address *
        </label>
        <input
          id="guest-email"
          type="email"
          value={guestInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="Enter your email address"
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          We'll send your order confirmation to this email address.
        </p>
      </div>

      <div>
        <label htmlFor="guest-phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number *
        </label>
        <input
          id="guest-phone"
          type="tel"
          value={guestInfo.phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="Enter your phone number"
          required
        />
      </div>
    </div>
  );
} 