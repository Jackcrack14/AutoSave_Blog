import React, { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";

export function FilterDropdown({ options, selectedFilter, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:border-purple-500 transition-colors"
      >
        <Filter className="w-5 h-5" />
        <span>Filter</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-48 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors ${
                selectedFilter === option.value
                  ? "text-purple-400"
                  : "text-gray-300"
              } ${option.value === options[0].value ? "rounded-t-lg" : ""} ${
                option.value === options[options.length - 1].value
                  ? "rounded-b-lg"
                  : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
