import React from "react";

export function CategoryTabs({ categories, selectedCategory, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full text-sm transition-all transform hover:scale-105 ${
            selectedCategory === category
              ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
