import { Dispatch, SetStateAction } from "react";

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  todoTitle: string;
}

export default function ConfirmModal({
  onClose,
  onConfirm,
  todoTitle,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-white">Delete Todo</h2>
        <p className="text-white mb-6">
          Are you sure you want to delete "{todoTitle}"?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
