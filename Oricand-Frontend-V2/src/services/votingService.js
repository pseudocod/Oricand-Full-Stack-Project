import axiosInstance from "./axiosInstance";

// User voting functions
export async function getCurrentVotingCampaign() {
  const res = await axiosInstance.get("/voting/current");
  return res.data;
}

export async function getCampaignById(campaignId) {
  const res = await axiosInstance.get(`/voting/campaign/${campaignId}`);
  return res.data;
}

export async function submitVote(voteData) {
  const res = await axiosInstance.post("/voting/vote", voteData);
  return res.data;
}

export async function checkVotingEligibility() {
  const res = await axiosInstance.get("/voting/eligibility");
  return res.data;
}

// Admin functions
export async function getAllCampaigns() {
  const res = await axiosInstance.get("/voting/admin/campaigns");
  return res.data;
}

export async function createCampaign(campaignData) {
  // campaignData should be VotingCampaignRequestDto format
  const res = await axiosInstance.post("/voting/admin/campaigns", campaignData);
  return res.data;
}

export async function updateCampaignStatus(campaignId, status) {
  // status should be a VotingStatus enum value (string)
  // Send as JSON string since backend expects @RequestBody VotingStatus
  const res = await axiosInstance.put(`/voting/admin/campaigns/${campaignId}/status`, `"${status}"`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return res.data;
} 