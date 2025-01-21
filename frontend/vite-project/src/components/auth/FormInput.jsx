import React from "react";

export default function FormInput({ label, error, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-1.5">
        {label}
      </label>
      <input
        className={`w-full px-4 py-2 bg-gray-800 border ${
          error ? "border-red-500" : "border-gray-700"
        } rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
