import React from "react";
import { X } from "lucide-react";

export function PublishModal({ isOpen, onClose, onPublish, isPublishing }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-4">Ready to publish?</h2>
        <p className="text-gray-300 mb-6">
          This will make your story available to readers worldwide. You can
          still edit it after publishing.
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            disabled={isPublishing}
          >
            Cancel
          </button>
          <button
            onClick={onPublish}
            disabled={isPublishing}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {isPublishing ? "Publishing..." : "Publish Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
