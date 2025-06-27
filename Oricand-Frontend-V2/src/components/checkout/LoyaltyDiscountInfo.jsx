const LoyaltyDiscountInfo = ({ loyaltyData, isAuthenticated }) => {
  if (!isAuthenticated) {
    return null;
  }

  if (!loyaltyData) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-sm font-medium text-blue-800">Loyalty Program</span>
        </div>
        <p className="text-sm text-blue-700 mt-1">
          Join our loyalty program to earn points and get discounts on future orders!
        </p>
      </div>
    );
  }

  const { points, discountPercentage, status, pointsToNextStatus } = loyaltyData;

  return (
    <div className="p-4 bg-gradient-to-r from-black/5 to-black/10 rounded-lg border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-black"></div>
          <span className="text-sm font-medium">ORICÂND Loyalty</span>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-black/10">
          {status.replace('_', ' ')}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Current Points:</span>
          <span className="font-medium">{points}</span>
        </div>
        
        {discountPercentage > 0 ? (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount Applied:</span>
            <span className="font-medium">{discountPercentage}%</span>
          </div>
        ) : (
          <div className="text-xs text-gray-600">
            Earn {pointsToNextStatus} more points to unlock 15% discount!
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyDiscountInfo; 