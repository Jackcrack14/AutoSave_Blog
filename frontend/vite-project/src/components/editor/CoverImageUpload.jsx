import React from "react";
import { Image, X } from "lucide-react";

export function CoverImageUpload({ coverImage, onImageUpload, onImageRemove }) {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="mb-8">
      {coverImage ? (
        <div className="relative">
          <img
            src={coverImage}
            alt="Cover"
            className="w-full h-64 object-cover rounded-lg"
          />
          <button
            onClick={onImageRemove}
            className="absolute top-4 right-4 p-2 bg-gray-900/80 rounded-full hover:bg-gray-900 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      ) : (
        <label className="block w-full h-64 border-2 border-dashed border-gray-700 rounded-lg hover:border-purple-500 transition-colors cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Image className="w-12 h-12 mb-4" />
            <p className="text-lg font-medium">Add a cover image</p>
            <p className="text-sm">Recommended: 1600x900px</p>
          </div>
        </label>
      )}
    </div>
  );
}
