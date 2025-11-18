"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, X, Plus } from "lucide-react";
import { KeenIcon } from "@/components/keenicons";

interface Tab {
  id: string;
  label: string;
}

interface DisbursementHeaderProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onCreateSingleTransfer?: () => void;
  onCreateBulkTransfer?: () => void;
  selectedCount: number;
  onRejectSelected: () => void;
  onApproveSelected: () => void;
  onClearSelection: () => void;
}

export function DisbursementHeader({
  activeTab,
  onTabChange,
  onCreateSingleTransfer,
  onCreateBulkTransfer,
  selectedCount,
  onRejectSelected,
  onApproveSelected,
  onClearSelection,
}: DisbursementHeaderProps) {
  const tabs: Tab[] = [
    { id: "draft", label: "Draft" },
    { id: "pending-approval", label: "Pending Approval" },
    { id: "approval-log", label: "Approval Log" },
  ];

  const showBulkActions = activeTab === "pending-approval";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Disbursement</h1>
          <p className="text-sm text-slate-600 mt-1">
            Create disbursement and track your requests here
          </p>
        </div>
        {activeTab === "draft" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Disbursement
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                onClick={onCreateSingleTransfer}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div>
                  <div className="font-medium">Single Transfer</div>
                  <div className="text-xs text-gray-500">Create one-time disbursement</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onCreateBulkTransfer}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div>
                  <div className="font-medium">Batch Transfer</div>
                  <div className="text-xs text-gray-500">Upload CSV for multiple transfers</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Tabs with Bulk Actions */}
      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {showBulkActions && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700">
              <span>Selected Request: {selectedCount}</span>
              {selectedCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearSelection}
                  className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <Button
              variant="destructive"
              size="md"
              onClick={onRejectSelected}
              className="gap-2"
              disabled={selectedCount === 0}
            >
              <KeenIcon
                icon="cross-circle"
                style="outline"
                className="w-4 flex-shrink-0 leading-none"
              />
              Reject
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={onApproveSelected}
              className="gap-2 bg-green-600 hover:bg-green-700 text-white"
              disabled={selectedCount === 0}
            >
              <KeenIcon
                icon="check-circle"
                style="outline"
                className="w-4 flex-shrink-0 leading-none"
              />
              Approve
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
