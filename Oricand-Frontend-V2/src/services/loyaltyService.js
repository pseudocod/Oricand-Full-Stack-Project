import axios from './axiosInstance';

export const loyaltyService = {
    getMyLoyaltyCard: async () => {
        const response = await axios.get('loyalty/my-card');
        return response.data;
    },

    getMyDiscount: async () => {
        const response = await axios.get('loyalty/discount');
        return response.data;
    },

    canVoteOnDrops: async () => {
        const response = await axios.get('loyalty/can-vote');
        return response.data;
    }
}; 