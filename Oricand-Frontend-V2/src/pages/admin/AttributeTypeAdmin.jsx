import { useEffect, useState } from "react";
import {
  fetchAttributeTypes,
  createAttributeType,
  updateAttributeType,
  deleteAttributeType,
} from "../../services/attributeTypeService";
import toast from "react-hot-toast";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

import AttributeTypeForm from "../../components/admin/forms/AttributeTypeForm.JSX";
import AdminRow from "../../components/admin/rows/AdminRow";

export default function AttributeTypeAdmin() {
  const [types, setTypes] = useState([]);
  const [editingType, setEditingType] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      const data = await fetchAttributeTypes();
      setTypes(data);
    } catch {
      toast.error("Failed to load attribute types");
    }
  };

  const handleCreateOrUpdate = async (data) => {
    try {
      if (editingType) {
        await updateAttributeType(editingType.id, data);
        toast.success("Attribute type updated");
      } else {
        await createAttributeType(data);
        toast.success("Attribute type created");
      }
      setEditingType(null);
      loadTypes();
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
      await deleteAttributeType(pendingDeleteId);
      toast.success("Deleted successfully");
      loadTypes();
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowConfirm(false);
      setPendingDeleteId(null);
    }
  };

  // Calculate stats
  const stats = {
    total: types.length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-4xl font-light text-gray-900">
          ATTRIBUTE TYPES
        </h1>
        <p className="text-gray-600">Create product characteristics</p>
      </div>

      {/* Stats Cards */}
      <div className="flex justify-center">
        <div className="bg-white p-4 border border-gray-200 rounded-lg w-full max-w-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Types</p>
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
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {editingType ? "Edit Attribute Type" : "Add New Attribute Type"}
        </h2>
        <AttributeTypeForm
          onSubmit={handleCreateOrUpdate}
          editingType={editingType}
          onCancel={() => setEditingType(null)}
        />
      </div>

      {/* Attribute Types List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">All Attribute Types</h2>
          <div className="text-sm text-gray-500">
            Showing {types.length} type{types.length !== 1 ? "s" : ""}
          </div>
        </div>

        {types.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No attribute types found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {types.map((type) => (
              <div key={type.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <AdminRow
                  label={type.name}
                  onEdit={() => setEditingType(type)}
                  onDelete={() => requestDelete(type.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this attribute type?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
