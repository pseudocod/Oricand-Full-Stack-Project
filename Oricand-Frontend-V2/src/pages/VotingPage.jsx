import { useNavigate } from "react-router-dom";
import { useVoting } from "../hooks/useVoting";

export default function VotingPage() {
  const navigate = useNavigate();
  const {
    campaign,
    isEligible,
    selectedOption,
    hasVoted,
    loading,
    error,
    isSubmitting,
    handleVote,
    setSelectedOption,
  } = useVoting();

  const handleSubmitVote = async () => {
    if (!selectedOption) return;

    const success = await handleVote(selectedOption);
    if (!success) {
      console.log("Vote submission failed - error handled by hook");
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  // Show loading state
  if (loading) {
    return (
      <section className="min-h-screen bg-offwhite flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-richblack mx-auto"></div>
          <p className="text-richblack font-medium">
            Loading voting campaign...
          </p>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="min-h-screen bg-offwhite flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-richblack">
              Unable to Load Voting
            </h1>
            <p className="text-richblack/70">{error}</p>
          </div>
          <button
            onClick={handleBackToHome}
            className="bg-richblack text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  // Show not eligible state
  if (isEligible === false) {
    return (
      <section className="min-h-screen bg-offwhite flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-richblack">
              Voting Not Available
            </h1>
            <p className="text-richblack/70">
              Only loyal members with 1000+ points can participate in voting.
            </p>
          </div>
          <button
            onClick={handleBackToHome}
            className="bg-richblack text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  // Show no active campaign state
  if (!campaign) {
    return (
      <section className="min-h-screen bg-offwhite flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-richblack">
              No Active Voting
            </h1>
            <p className="text-richblack/70">
              There's no active voting campaign at the moment.
            </p>
          </div>
          <button
            onClick={handleBackToHome}
            className="bg-richblack text-white px-6 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  const votingOptions = campaign.options || [];

  if (hasVoted) {
    return (
      <section className="min-h-screen bg-offwhite flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-6 py-3 bg-richblack text-white text-sm font-bold uppercase tracking-widest rounded-full">
              VOTE SUBMITTED
            </div>
            <h1 className="text-4xl md:text-6xl font-bold uppercase text-richblack leading-tight">
              THANK YOU
            </h1>
            <p className="text-lg text-richblack/70 font-medium">
              Your voice has been heard. The community will decide our next drop
              together.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-richblack font-medium">
              You voted for:{" "}
              <span className="font-bold">
                {votingOptions.find((opt) => opt.id === selectedOption)?.name}
              </span>
            </p>
            <p className="text-sm text-richblack/60">
              Results will be announced when voting closes.
            </p>
          </div>

          <button
            onClick={handleBackToHome}
            className="cursor-pointer bg-richblack text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors duration-300"
          >
            BACK TO HOME
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-offwhite px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 bg-richblack text-white text-sm font-bold uppercase tracking-widest rounded-full">
              LOYAL MEMBER VOTING
            </div>
            <h1 className="text-4xl md:text-7xl font-bold uppercase text-richblack leading-tight">
              {campaign.title || "CHOOSE OUR NEXT DROP"}
            </h1>
            <p className="text-lg md:text-xl text-richblack/70 font-medium max-w-2xl mx-auto">
              {campaign.description ||
                "As a loyal member, your vote shapes our next limited-edition blend."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {votingOptions.map((option) => {
            const percentage = option.percentage || 0;
            const isSelected = selectedOption === option.id;

            return (
              <div
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`cursor-pointer border-4 p-8 md:p-12 transition-all duration-300 ${
                  isSelected
                    ? "border-richblack bg-richblack text-white"
                    : "border-gray-300 hover:border-black bg-offwhite text-richblack"
                }`}
              >
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none">
                      {option.name}
                    </h3>
                    <p
                      className={`text-lg md:text-xl leading-relaxed ${
                        isSelected ? "text-white/90" : "text-richblack/80"
                      }`}
                    >
                      {option.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold uppercase tracking-widest">
                        VOTES
                      </span>
                      <span className="text-2xl font-bold">{percentage}%</span>
                    </div>
                    <div
                      className={`h-4 overflow-hidden ${
                        isSelected ? "bg-offwhite/20" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`h-full transition-all duration-700 ease-out ${
                          isSelected ? "bg-offwhite" : "bg-richblack"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p
                      className={`text-sm font-medium ${
                        isSelected ? "text-white/70" : "text-richblack/60"
                      }`}
                    >
                      {option.voteCount} total votes
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-richblack/70 font-medium">
              {selectedOption
                ? "Ready to submit your vote?"
                : "Select an option to continue"}
            </p>
            {selectedOption && (
              <p className="text-sm text-richblack/50">
                You're voting for:{" "}
                <span className="font-bold">
                  {votingOptions.find((opt) => opt.id === selectedOption)?.name}
                </span>
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBackToHome}
              className="cursor-pointer px-8 py-4 border-2 border-richblack text-richblack font-bold uppercase tracking-widest hover:bg-richblack hover:text-white transition-colors duration-300"
            >
              BACK TO HOME
            </button>

            <button
              onClick={handleSubmitVote}
              disabled={!selectedOption || isSubmitting}
              className="cursor-pointer px-8 py-4 bg-richblack text-white font-bold uppercase tracking-widest hover:bg-offwhite hover:text-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  SUBMITTING...
                </span>
              ) : (
                "SUBMIT VOTE"
              )}
            </button>
          </div>
        </div>

        <div className="mt-16 text-center space-y-2">
          <p className="text-sm text-richblack/50">
            {campaign.status === "ACTIVE"
              ? "Voting is currently active"
              : "Voting status: " + campaign.status}{" "}
            • Only loyal members can vote • One vote per member
          </p>
          <p className="text-xs text-richblack/40">
            The winning blend will be our next limited-edition drop
          </p>
        </div>
      </div>
    </section>
  );
}
