import { useState, useEffect } from 'react';
import { loyaltyService } from '../services/loyaltyService';

export const useLoyaltyCard = () => {
    const [loyaltyData, setLoyaltyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [canVote, setCanVote] = useState(false);

    const fetchLoyaltyData = async () => {
        try {
            setLoading(true);
            const [cardData, votingStatus] = await Promise.all([
                loyaltyService.getMyLoyaltyCard(),
                loyaltyService.canVoteOnDrops()
            ]);
            setLoyaltyData(cardData);
            setCanVote(votingStatus);
            setError(null);
        } catch (err) {
            console.error('Error fetching loyalty data:', err);
            setError('Failed to load loyalty card data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoyaltyData();
    }, []);

    const progress = loyaltyData ? (loyaltyData.points / 1000) * 100 : 0;
    const isLoyal = loyaltyData?.status === 'ORICAND_LOYAL';

    return {
        loyaltyData,
        loading,
        error,
        progress,
        isLoyal,
        canVote,
        refresh: fetchLoyaltyData
    };
}; 