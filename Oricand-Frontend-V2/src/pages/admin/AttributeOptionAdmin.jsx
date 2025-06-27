import { useEffect, useState } from "react";
import {
  fetchAttributeOptions,
  createAttributeOption,
  updateAttributeOption,
  deleteAttributeOption,
} from "../../services/attributeOptionService";
import toast from "react-hot-toast";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import AdminRow from "../../components/admin/rows/AdminRow";
import AttributeOptionForm from "../../components/admin/forms/AttributeOptionForm";

export default function AttributeOptionAdmin() {
  const [options, setOptions] = useState([]);
  const [editingOption, setEditingOption] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const data = await fetchAttributeOptions();
      setOptions(data);
    } catch {
      toast.error("Failed to load attribute options");
    }
  };

  const handleCreateOrUpdate = async (data) => {
    try {
      if (editingOption) {
        await updateAttributeOption(editingOption.id, data);
        toast.success("Attribute option updated");
      } else {
        await createAttributeOption(data);
        toast.success("Attribute option created");
      }
      setEditingOption(null);
      loadOptions();
    } catch {
      toast.error("Save failed");
    }
  };

  const requestDelete = (id) => {
    setPendingDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteAttributeOption(pendingDeleteId);
      toast.success("Deleted successfully");
      loadOptions();
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowConfirm(false);
      setPendingDeleteId(null);
    }
  };

  const stats = {
    total: options.length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-4xl font-light text-gray-900">
          ATTRIBUTE OPTIONS
        </h1>
        <p className="text-gray-600">Configure option values</p>
      </div>

      {/* Stats Cards */}
      <div className="flex justify-center">
        <div className="bg-white p-4 border border-gray-200 rounded-lg w-full max-w-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Options</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {editingOption ? "Edit Attribute Option" : "Add New Attribute Option"}
        </h2>
        <AttributeOptionForm
          onSubmit={handleCreateOrUpdate}
          editingOption={editingOption}
          onCancel={() => setEditingOption(null)}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">All Attribute Options</h2>
          <div className="text-sm text-gray-500">
            Showing {options.length} option{options.length !== 1 ? "s" : ""}
          </div>
        </div>

        {options.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No attribute options found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {options.map((option) => (
              <div key={option.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <AdminRow
                  label={option.value}
                  onEdit={() => setEditingOption(option)}
                  onDelete={() => requestDelete(option.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this attribute option?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
