import React from "react";

export function ToolbarButton({ icon: Icon, onClick, tooltip, active }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-700 transition-colors group relative ${
        active ? "text-purple-400 bg-gray-700" : "text-gray-400"
      }`}
      title={tooltip}
    >
      <Icon className="w-5 h-5" />
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {tooltip}
      </span>
    </button>
  );
}
