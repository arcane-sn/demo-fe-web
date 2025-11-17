"use client";

import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchField: string;
  searchQuery: string;
  onFieldChange: (field: string) => void;
  onQueryChange: (query: string) => void;
  className?: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  placeholderMapping?: Record<string, string>;
}

const searchFieldOptions = [
  { value: "merchantName", label: "Merchant Name" },
  { value: "clientId", label: "Client ID" },
  { value: "status", label: "Status" },
  { value: "merchantLevel", label: "Merchant Level" },
];

export function SearchBar({
  searchField,
  searchQuery,
  onFieldChange,
  onQueryChange,
  className = "",
  placeholder = "Search merchant name",
  options = searchFieldOptions,
  placeholderMapping,
}: SearchBarProps) {
  const selectedOption = options.find((option) => option.value === searchField);

  // Get dynamic placeholder based on selected field
  const dynamicPlaceholder = placeholderMapping?.[searchField] || placeholder;

  return (
    <div className={`size- inline-flex justify-start items-start ${className}`}>
      {/* Left side - Dropdown filter */}
      <div
        data-darkmode="False"
        data-size="Small"
        data-state="Default"
        data-style="Outline"
        data-type="Dropdown"
        className="w-36 self-stretch px-2.5 py-2 bg-gray-100 rounded-tl-md rounded-bl-md outline outline-offset-[-1px] outline-zinc-200 flex justify-start items-center gap-2.5"
      >
        <Select value={searchField} onValueChange={onFieldChange}>
          <SelectTrigger className="w-full h-auto p-0 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none">
            <div className="flex-1 justify-start text-slate-500 text-xs font-normal font-['Inter'] leading-3">
              {selectedOption?.label || "Merchant Name"}
            </div>
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Right side - Search input */}
      <div
        data-darkmode="False"
        data-label="Icon"
        data-placement="Right"
        data-size="Small"
        data-style="Outline"
        data-type="Default"
        className="w-64 pl-2.5 bg-white rounded-tr-md rounded-br-md border-r border-t border-b border-zinc-200 flex justify-start items-center gap-2.5"
      >
        <Input
          placeholder={dynamicPlaceholder}
          value={searchQuery}
          onChange={(e) => onQueryChange(e.target.value)}
          className="flex-1 justify-start text-slate-400 text-xs font-medium font-['Inter'] leading-3 border-0 bg-transparent shadow-none focus-visible:ring-transparent !focus-visible:ring-0 focus-visible:border-none !focus-visible:outline-none placeholder:text-slate-400 focus:border-none"
        />
        <div className="bg-white size- p-2  rounded-tr-md rounded-br-md outline-offset-[-1px] outline-zinc-200 flex justify-center items-center gap-2.5">
          <div className="size-4 relative overflow-hidden">
            <Search className="size-4 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook for managing search state
export function useSearchBar(initialField: string = "merchantName") {
  const [searchField, setSearchField] = useState(initialField);
  const [searchQuery, setSearchQuery] = useState("");

  return {
    searchField,
    searchQuery,
    setSearchField,
    setSearchQuery,
  };
}
