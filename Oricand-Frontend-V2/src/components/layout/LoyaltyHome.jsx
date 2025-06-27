import { useLoyaltyCard } from '../../hooks/useLoyaltyCard';
import { useVoting } from '../../hooks/useVoting';
import { useNavigate } from 'react-router-dom';

const LoyaltyHome = () => {
  const { loyaltyData, loading, error, progress, isLoyal } = useLoyaltyCard();
  const { campaign, isEligible, hasVoted } = useVoting();
  const navigate = useNavigate();

  if (loading) return <div className="animate-pulse">Loading loyalty card...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!loyaltyData) return null;

  return (
    <div className="max-w-3xl mx-auto text-center">
      {isLoyal ? (
        <div className="space-y-3">
            <div className="inline-block px-4 py-2 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-full">
              LOYAL STATUS ACHIEVED
            </div>
            <div className="text-xl font-bold text-richblack">
              CURRENT POINTS: {loyaltyData.points}
            </div>

          <div className="space-y-4">
            {campaign && isEligible && !hasVoted ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold uppercase text-richblack leading-tight">
                  VOTING OPEN NOW
                </h2>
                <p className="text-lg text-richblack font-medium">
                  AS A LOYAL MEMBER, YOU HAVE THE POWER TO SHAPE OUR NEXT DROP
                </p>
                <button 
                  onClick={() => navigate('/vote')}
                  className="cursor-pointer bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 text-lg"
                >
                  SUBMIT YOUR VOTE FOR THE NEXT DROP
                </button>
              </>
            ) : hasVoted ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold uppercase text-richblack leading-tight">
                  VOTE SUBMITTED
                </h2>
                <p className="text-lg text-richblack font-medium">
                  THANK YOU FOR PARTICIPATING IN SHAPING OUR NEXT DROP
                </p>
                <button 
                  onClick={() => navigate('/vote')}
                  className="cursor-pointer border-2 border-black text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300 text-lg"
                >
                  VIEW VOTING RESULTS
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl md:text-4xl font-bold uppercase text-richblack leading-tight">
                  LOYAL MEMBER
                </h2>
                <p className="text-lg text-richblack font-medium">
                  YOU'VE ACHIEVED LOYAL STATUS - STAY TUNED FOR EXCLUSIVE VOTING OPPORTUNITIES
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xl font-semibold">
              <span>CURRENT POINTS: {loyaltyData.points}</span>
              <span>1000</span>
            </div>
            
            <div className="h-10 bg-black/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black transition-all duration-500 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          <div className="text-lg text-richblack font-semibold">
            EARN {loyaltyData.pointsToNextStatus} MORE POINTS TO BECOME AN ORICÂND LOYAL MEMBER
          </div>
        </div>
      )}
    </div>
  );
};

export default LoyaltyHome; 