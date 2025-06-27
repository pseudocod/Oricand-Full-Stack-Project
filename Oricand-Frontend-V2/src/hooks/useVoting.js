import { useState, useEffect } from 'react';
import {
  getCurrentVotingCampaign,
  submitVote,
  checkVotingEligibility
} from '../services/votingService';

export const useVoting = () => {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEligible, setIsEligible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const loadCampaign = async () => {
    try {
      setLoading(true);
      setError(null);

      const [campaignData, eligibilityData] = await Promise.all([
        getCurrentVotingCampaign(),
        checkVotingEligibility()
      ]);

      setCampaign(campaignData);
      setIsEligible(eligibilityData);
      
      if (campaignData && campaignData.userHasVoted) {
        setHasVoted(true);
        setSelectedOption(campaignData.userVotedOptionId);
      } else {
        setHasVoted(false);
        setSelectedOption(null);
      }

    } catch (err) {
      console.error('Failed to load voting data:', err);
      if (err.response?.status === 404) {
        setError('No active voting campaign at the moment');
      } else {
        setError(err.response?.data?.message || 'Failed to load voting data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (optionId) => {
    if (!campaign || !isEligible || hasVoted) return false;

    try {
      setIsSubmitting(true);
      setError(null);

      const voteData = {
        campaignId: campaign.id,
        optionId: optionId
      };

      const updatedCampaign = await submitVote(voteData);
      
      setCampaign(updatedCampaign);
      setHasVoted(true);
      setSelectedOption(optionId);
      
      return true;
    } catch (err) {
      console.error('Failed to submit vote:', err);
      setError(err.response?.data?.message || 'Failed to submit vote');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetVoting = () => {
    setSelectedOption(null);
    setHasVoted(false);
    setError(null);
  };

  useEffect(() => {
    loadCampaign();
  }, []);

  return {
    // Data
    campaign,
    isEligible,
    selectedOption,
    hasVoted,
    
    // States
    loading,
    error,
    isSubmitting,
    
    // Actions
    handleVote,
    resetVoting,
    loadCampaign,
    setSelectedOption
  };
}; 