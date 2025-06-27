import { createPortal } from "react-dom";

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return createPortal(
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 backdrop-blur-xs">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <p className="text-gray-800 mb-6 whitespace-pre-line">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
