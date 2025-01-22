import React from "react";

export default function AuthDivider() {
  return (
    <div className="flex items-center my-6">
      <div className="flex-1 border-t border-gray-700"></div>
      <span className="px-4 text-sm text-gray-500">or continue with</span>
      <div className="flex-1 border-t border-gray-700"></div>
    </div>
  );
}
