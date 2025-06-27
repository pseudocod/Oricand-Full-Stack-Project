import { useLoyaltyCard } from '../../hooks/useLoyaltyCard';

const LoyaltyCard = () => {
  const { loyaltyData, loading, error, progress, isLoyal, canVote } = useLoyaltyCard();

  if (loading) return <div className="animate-pulse">Loading loyalty card...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!loyaltyData) return null;

  return (
    <div className="bg-black/5 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-light">Oricând Loyalty Card</h2>
          <div className="flex items-center gap-2">
            {canVote && (
              <span className="text-sm px-3 py-1 rounded-full bg-green-500/10 text-green-500">
                Can Vote
              </span>
            )}
            <span className="text-sm px-3 py-1 rounded-full bg-black/10">
              {loyaltyData.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Current Points: {loyaltyData.points}</span>
            <span>{loyaltyData.pointsToNextStatus} points to next status</span>
          </div>
          
          <div className="h-2 bg-black/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-black/10">
          <div>
            <p className="text-sm text-black/60">Current Discount</p>
            <p className="text-2xl font-light">{loyaltyData.discountPercentage}%</p>
          </div>
          <div className="text-sm text-black/60">
            {isLoyal ? (
              "You've reached the highest loyalty status!"
            ) : (
              `Earn ${loyaltyData.pointsToNextStatus} more points to become an Oricând Loyal member`
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard; 