import LoyaltyCard from '../loyalty/LoyaltyCard';

const LoyaltyContent = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-2">Your Loyalty Status</h2>
        <p className="text-gray-600">
          Earn points with every purchase and unlock exclusive benefits
        </p>
      </div>
      
      <LoyaltyCard />
      
      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-light">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-black/5 rounded-lg">
            <h4 className="font-medium mb-2">Earn Points</h4>
            <p className="text-sm text-gray-600">
              Get points for every purchase. The more you shop, the more points you earn.
            </p>
          </div>
          <div className="p-4 bg-black/5 rounded-lg">
            <h4 className="font-medium mb-2">Exclusive Benefits</h4>
            <p className="text-sm text-gray-600">
              Unlock special discounts and voting rights on new drops when you reach Oricând Loyal status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyContent; 