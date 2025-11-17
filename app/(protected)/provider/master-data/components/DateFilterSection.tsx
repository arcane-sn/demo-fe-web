"use client";

import { ChevronDown, Calendar } from "lucide-react";

interface DateFilterSectionProps {
  onClear: () => void;
}

export function DateFilterSection({ onClear }: DateFilterSectionProps) {
  return (
    <div className="flex flex-col items-start justify-center gap-5 px-8 pb-2.5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <h3 className="text-b-13-14-400 text-gray-800">Date Filter</h3>
        <button onClick={onClear} className="px-1 py-1 rounded-md">
          <span className="text-b-11-12-500 text-red-500">Clear</span>
        </button>
      </div>

      {/* Input Fields */}
      <div className="flex flex-col items-start gap-2.5 w-full">
        {/* Transaction Date Input */}
        <div className="flex items-center justify-between px-3 py-2.5 w-full bg-white rounded-md border border-gray-300">
          <span className="text-b-13-14-400 text-gray-800">
            Transaction Date
          </span>
          <ChevronDown className="w-4 h-4" />
        </div>

        {/* Date Range Input */}
        <div className="flex items-center justify-between px-3 py-2.5 w-full bg-white rounded-md border border-gray-300">
          <span className="text-b-13-14-400 text-gray-800">
            01/12/2025 - 31/12/2025
          </span>
          <Calendar className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
