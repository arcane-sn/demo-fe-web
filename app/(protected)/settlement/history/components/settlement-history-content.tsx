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
import { mockSettlementHistoryData } from "./table/config/data/mock-settlement-history";
import { useSettlementHistoryList } from "./table/config/hooks/use-settlement-history-list";
import { useState } from "react";
import ModalBalanceFilter from "./modal/modal.balance.filter";
import ModalBalanceExport from "./modal/modal.balance.export";

export function SettlementHistoryContent() {
  const { loading, error, handleSelectionChange } = useSettlementHistoryList();
  const [openFilters, setOpenFilters] = useState(false);
  const [openExport, setOpenExport] = useState(false);

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
          onSelectionChange={handleSelectionChange}
          loading={loading}
          error={error || undefined}
          onOpenFilters={() => setOpenFilters(true)}
          onOpenExport={() => setOpenExport(true)}
        />
      </div>

      <ModalBalanceFilter
        open={openFilters}
        onClose={() => setOpenFilters(false)}
      />
      <ModalBalanceExport
        open={openExport}
        onClose={() => setOpenExport(false)}
      />
    </div>
  );
}
