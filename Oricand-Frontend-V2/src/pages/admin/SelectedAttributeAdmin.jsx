import { useEffect, useState } from "react";
import {
  fetchSelectedAttributes,
  createSelectedAttribute,
  updateSelectedAttribute,
  deleteSelectedAttribute,
} from "../../services/selectedAttributeService";
import { fetchAttributeTypes } from "../../services/attributeTypeService";
import { fetchAttributeOptions } from "../../services/attributeOptionService";
import { useAuth } from "../../context/UserContext";
import toast from "react-hot-toast";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import AdminRow from "../../components/admin/rows/AdminRow";
import SelectedAttributeForm from "../../components/admin/forms/SelectedAttributeForm";

export default function SelectedAttributeAdmin() {
  const { token } = useAuth();
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attributeTypes, setAttributeTypes] = useState([]);
  const [attributeOptions, setAttributeOptions] = useState([]);
  const [editingSelectedAttribute, setEditingSelectedAttribute] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [selectedAttrs, types, options] = await Promise.all([
        fetchSelectedAttributes(),
        fetchAttributeTypes(),
        fetchAttributeOptions(),
      ]);
      setSelectedAttributes(selectedAttrs);
      setAttributeTypes(types);
      setAttributeOptions(options);
    } catch {
      toast.error("Failed to load data");
    }
  };

  const handleCreateOrUpdate = async (data) => {
    try {
      if (editingSelectedAttribute) {
        await updateSelectedAttribute(editingSelectedAttribute.id, data, token);
        toast.success("Selected attribute updated");
      } else {
        await createSelectedAttribute(data, token);
        toast.success("Selected attribute created");
      }
      setEditingSelectedAttribute(null);
      loadAllData();
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
      await deleteSelectedAttribute(pendingDeleteId, token);
      toast.success("Deleted successfully");
      loadAllData();
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowConfirm(false);
      setPendingDeleteId(null);
    }
  };

  const stats = {
    total: selectedAttributes.length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-4xl font-light text-gray-900">
          SELECTED ATTRIBUTES
        </h1>
        <p className="text-gray-600">Assign options to products</p>
      </div>

      {/* Stats Cards */}
      <div className="flex justify-center">
        <div className="bg-white p-4 border border-gray-200 rounded-lg w-full max-w-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assignments</p>
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
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {editingSelectedAttribute ? "Edit Selected Attribute" : "Add New Selected Attribute"}
        </h2>
        <SelectedAttributeForm
          onSubmit={handleCreateOrUpdate}
          editingItem={editingSelectedAttribute}
          onCancel={() => setEditingSelectedAttribute(null)}
          attributeTypes={attributeTypes}
          attributeOptions={attributeOptions}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">All Selected Attributes</h2>
          <div className="text-sm text-gray-500">
            Showing {selectedAttributes.length} assignment{selectedAttributes.length !== 1 ? "s" : ""}
          </div>
        </div>

        {selectedAttributes.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No selected attributes found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedAttributes.map((attr) => (
              <div key={attr.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <AdminRow
                  label={`${attr.attributeName || 'Unknown Attribute'}: ${attr.value || 'Unknown Value'}`}
                  onEdit={() => setEditingSelectedAttribute(attr)}
                  onDelete={() => requestDelete(attr.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to delete this selected attribute?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
