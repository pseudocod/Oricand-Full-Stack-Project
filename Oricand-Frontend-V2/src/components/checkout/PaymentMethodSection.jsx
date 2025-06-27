export default function PaymentMethodSection({ paymentType, onPaymentTypeChange }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="paymentType"
        className="text-base font-medium text-gray-700"
      >
        Payment Method
      </label>
      <select
        id="paymentType"
        name="paymentType"
        value={paymentType}
        onChange={(e) => onPaymentTypeChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-xs bg-offwhite focus:outline-none focus:ring-2 focus:ring-richblack"
      >
        <option value="CARD">Card</option>
        <option value="CASH">Cash</option>
        <option value="APPLE_PAY">Apple Pay</option>
        <option value="GOOGLE_PAY">Google Pay</option>
      </select>
    </div>
  );
} 