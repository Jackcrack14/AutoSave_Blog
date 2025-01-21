import React from "react";
import { Search } from "lucide-react";

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles..."
        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
    </div>
  );
}
