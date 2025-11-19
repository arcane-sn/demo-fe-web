"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProviderBalance from "./provider-balance";
import SettlementOverview from "./settlement-overview";
import { SettlementHistoryTable } from "./table";
import { mockSettlementHistoryData } from "../core/data/mock-settlement-history";
import { useSettlementHistoryList } from "./table/config/hooks/use-settlement-history-list";

export function SettlementHistoryContent() {
  const { loading, error } = useSettlementHistoryList();

  return (
    <div className="w-full">
      <ProviderBalance />
      <SettlementOverview />

      <div className="mt-7.5 flex flex-col gap-4">
        <div>
          <div className="justify-start text-grey-900 text-xl font-semibold  leading-tight">
            Settlement History
          </div>
          <div className="justify-start text-grey-700 text-sm font-normal">
            View all settled transactions
          </div>
        </div>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Payment Methods" />
          </SelectTrigger>
          <SelectContent className="w-[200px]">
            <SelectItem value="va">Virtual Account</SelectItem>
            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
            <SelectItem value="e_wallet">E-Wallet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="mt-6">
        <SettlementHistoryTable
          data={mockSettlementHistoryData}
          loading={loading}
          error={error || undefined}
        />
      </div>
    </div>
  );
}
