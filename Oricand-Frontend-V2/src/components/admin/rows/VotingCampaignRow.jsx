export default function VotingCampaignRow({ campaign, onEdit, onDelete, onViewDetails, onToggleStatus }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'CLOSED': return 'bg-gray-100 text-gray-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'DRAFT': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    if (newStatus !== campaign.status) {
      onToggleStatus(campaign.id, newStatus);
    }
  };

  const totalVotes = campaign.totalVotes || 0;
  const statuses = ['DRAFT', 'ACTIVE', 'CLOSED', 'CANCELLED'];

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-semibold text-lg">{campaign.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
        
        <div className="flex items-center gap-6 text-sm text-gray-500">
          <span>📊 {totalVotes} total votes</span>
          <span>🎯 {campaign.options?.length || 0} options</span>
          <span>📅 {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}</span>
        </div>
      </div>
      
      <div className="flex gap-2 ml-4 items-center">
        <button
          onClick={() => onViewDetails(campaign)}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm cursor-pointer"
        >
          Details
        </button>
        
        {/* Status Dropdown */}
        <select
          value={campaign.status}
          onChange={handleStatusChange}
          className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        
        <button
          onClick={() => onEdit(campaign)}
          className="px-3 py-1 bg-black text-white rounded text-sm cursor-pointer"
        >
          Edit
        </button>
        
        <button
          onClick={() => onDelete(campaign.id)}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
} 