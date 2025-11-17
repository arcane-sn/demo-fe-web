"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KeenIcon } from "@/components/keenicons";

interface FilterTransactionHistoryProps {
  onOpenFilter?: () => void;
  onOpenExport?: () => void;
  onSearch?: (searchTerm: string, searchType: string) => void;
}

const FilterTransactionHistory = ({
  onOpenFilter,
  onOpenExport,
  onSearch,
}: FilterTransactionHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("transaction_id");

  const handleSearch = () => {
    onSearch?.(searchTerm, searchType);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full self-stretch border-b border-gray-100 inline-flex flex-col justify-start items-start gap-2.5">
      {/* Header Section */}
      <div className="w-full inline-flex justify-between items-center">
        <div className="justify-start text-dark text-b-14-14-500">
          Transaction History
        </div>

        {/* Actions Section */}
        <div className="flex justify-end items-center gap-2.5">
          {/* Search Section */}
          <div className="flex justify-start items-stretch">
            {/* Search Type Selector */}
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-36 px-3 py-2.5 bg-gray-100 rounded-tl-md rounded-bl-md rounded-r-none border-r-0 border-gray-300 h-auto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="transaction_id">Transaction ID</SelectItem>
                <SelectItem value="order_id">Order ID</SelectItem>
                <SelectItem value="external_id">External ID</SelectItem>
                <SelectItem value="merchant_name">Merchant Name</SelectItem>
              </SelectContent>
            </Select>

            {/* Search Input */}
            <div className="relative flex">
              <Input
                type="text"
                placeholder="Search transaction ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-64 px-3 py-2.5 bg-light rounded-l-none rounded-tr-md rounded-br-md border-l-0 border-gray-300 text-b-12-12-500 h-auto"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSearch}
                className="absolute right-0 top-0 px-3 py-2.5 bg-gray-50 rounded-tr-md rounded-br-md border border-gray-300 border-l-0 h-full"
              >
                <KeenIcon icon="magnifier" className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenFilter}
            className="px-3 py-2.5 bg-light rounded-md border border-gray-300 flex justify-center items-center gap-1.5 h-auto"
          >
            <KeenIcon icon="filter" className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-gray-600 text-b-12-12-500">Filter</span>
          </Button>

          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenExport}
            className="px-3 py-2.5 bg-light rounded-md border border-gray-300 flex justify-center items-center gap-1.5 h-auto"
          >
            <KeenIcon icon="exit-down" className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-gray-600 text-b-12-12-500">Export</span>
          </Button>
        </div>
      </div>

      {/* Active Filters Section */}
      <div className="self-stretch inline-flex justify-start items-center gap-2.5">
        <div className="px-2.5 py-2 bg-gray-50 rounded-md border border-gray-300 flex justify-start items-center gap-2.5">
          <div className="flex justify-start items-center gap-1">
            <span className="text-gray-500 text-b-12-12-400">
              Transaction Date
            </span>
            <span className="text-dark text-b-12-12-400">
              01/12/2025 - 31/12/2025
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-4 h-4 p-0 hover:bg-gray-200 rounded"
          >
            <KeenIcon icon="cross" className="w-3 h-3 text-gray-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterTransactionHistory;
