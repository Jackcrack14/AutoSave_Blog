import React from "react";

export default function SocialButton({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}
