import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAllCampaigns,
  createCampaign,
  updateCampaignStatus,
} from "../../services/votingService";
import VotingCampaignForm from "../../components/admin/forms/VotingCampaignForm";
import VotingCampaignRow from "../../components/admin/rows/VotingCampaignRow";

export default function VotingAdmin() {
  const [campaigns, setCampaigns] = useState([]);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const data = await getAllCampaigns();
      // Ensure data is always an array
      setCampaigns(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load campaigns:', error);
      setCampaigns([]); // Set to empty array on error
      toast.error("Failed to load campaigns");
    }
  };

  const handleCreateOrUpdateCampaign = async (formData) => {
    try {
      if (editingCampaign) {
        // Update not implemented in backend yet
        toast.error("Campaign update not available yet");
      } else {
        await createCampaign(formData);
        toast.success("Campaign created");
      }
      setEditingCampaign(null);
      loadCampaigns();
    } catch (error) {
      console.error('Campaign save error:', error);
      toast.error(error.response?.data?.message || "Save failed");
    }
  };

  const handleToggleStatus = async (campaignId, newStatus) => {
    try {
      await updateCampaignStatus(campaignId, newStatus);
      toast.success(`Campaign ${newStatus.toLowerCase()}`);
      loadCampaigns();
    } catch {
      toast.error("Status update failed");
    }
  };

  const requestDeleteCampaign = () => {
    // Delete not implemented in backend yet
    toast.error("Campaign deletion not available yet");
  };

  const handleViewDetails = (campaign) => {
    setSelectedCampaign(campaign);
  };

  // Calculate stats (with safety checks)
  const campaignsArray = Array.isArray(campaigns) ? campaigns : [];
  const stats = {
    totalCampaigns: campaignsArray.length,
    activeCampaigns: campaignsArray.filter(c => c.status === 'ACTIVE').length,
    totalVotes: campaignsArray.reduce((sum, c) => sum + (c.totalVotes || 0), 0),
    totalOptions: campaignsArray.reduce((sum, c) => sum + (c.options?.length || 0), 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-4xl font-light text-gray-900">
          VOTING MANAGEMENT
        </h1>
        <p className="text-gray-600">Manage voting campaigns and analyze results</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCampaigns}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">🗳️</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeCampaigns}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Votes</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalVotes}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Options</p>
              <p className="text-2xl font-bold text-orange-600">{stats.totalOptions}</p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Campaign Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <VotingCampaignForm
          onSubmit={handleCreateOrUpdateCampaign}
          editingItem={editingCampaign}
          onCancel={() => setEditingCampaign(null)}
        />
      </div>

      {/* Campaign Details Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50" data-lenis-prevent>
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-scroll">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedCampaign.title}</h2>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-gray-500 text-2xl cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Campaign Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Status:</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    selectedCampaign.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                    selectedCampaign.status === 'CLOSED' ? 'bg-gray-100 text-gray-800' :
                    selectedCampaign.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedCampaign.status}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Total Votes:</span>
                  <span className="ml-2">{selectedCampaign.totalVotes || 0}</span>
                </div>
              </div>

              {/* Options List */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Voting Options</h3>
                {selectedCampaign.options?.length === 0 ? (
                  <p className="text-gray-500">No options added yet</p>
                ) : (
                  selectedCampaign.options?.map((option) => {
                    const percentage = option.percentage || 0;
                    
                    return (
                      <div key={option.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold">{option.name}</h4>
                            <p className="text-sm text-gray-600">{option.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{option.voteCount || 0} votes ({percentage}%)</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">All Campaigns</h2>
          <div className="text-sm text-gray-500">
            Showing {campaignsArray.length} campaign{campaignsArray.length !== 1 ? "s" : ""}
          </div>
        </div>

        {campaignsArray.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No campaigns found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {campaignsArray.map((campaign) => (
              <div key={campaign.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <VotingCampaignRow
                  campaign={campaign}
                  onEdit={setEditingCampaign}
                  onDelete={requestDeleteCampaign}
                  onViewDetails={handleViewDetails}
                  onToggleStatus={handleToggleStatus}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 